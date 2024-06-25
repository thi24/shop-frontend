<template>
  <section class="showcase">
    <div class="nes-container with-title"></div>
  </section>

  <div class="nes-container with-title is-centered">
    <form @submit.prevent="handleSubmit">
      <fieldset :class="{ dis: loading }" class="fields">
        <legend class="text-lg"></legend>
        <div class="nes-field py-2">
          <label for="email_field">E-Mail: </label>
          <input
            placeholder="Ihre E-Mail"
            type="email"
            name="email"
            id="email_field"
            class="peer w-full h-11 bg-transparent text-blue-gray-800 font-sans font-normal outline outline-0 border text-md px-3 py-2 rounded-[6px] border-blue-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-indigo-100"
            required
          />
        </div>

        <div class="Hier kann die Farbe des Stripe elements angepasst werden">
          <label for="payment-element">Credit Card</label>
          <div id="payment-element" class="nes-input"></div>
        </div>
      </fieldset>

      <div class="">
        <p class="m-2 font-medium">
          Summe:
          {{
            props.amount.toLocaleString("de-DE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }}€
        </p>
        <div class="flex items-center">
          <button
            type="submit"
            @click="handleLoadingArrow"
            class="mt-3 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
          >
            {{ loading ? "Loading..." : "Hier Bezahlen!" }}
          </button>
          <div v-if="arrow && loading" class="ml-3">
            <LoadingSign />
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  type Stripe,
  type StripeElements,
  loadStripe,
} from "@stripe/stripe-js";
import { useRouter } from "vue-router";
import { usePaymentStore } from "~/stores/paymentStore";
import { Sale } from "~/classes/Sale";
import { Booking } from "~/classes/Booking";
import { Customer } from "~/classes/Customer";
import type { Product } from "~/stores/paymentStore";

import LoadingSign from "~/components/svg/loading-sign.vue";

const router = useRouter();
const config = useRuntimeConfig();
const props = defineProps({
  amount: { type: Number, required: true },
  products: { type: Array as PropType<Product[]>, required: true },
  eventId: { type: String, required: true },
});

let stripe: Stripe | null;
let loading = ref(true);
let arrow = ref(false);
let elements: StripeElements;
let paymentAmount = Math.ceil(props.amount * 100);

const paymentStore = usePaymentStore();

onMounted(async () => {
  const apiKey = import.meta.env.VITE_STRIPE_KEY;
  if (!apiKey) {
    console.error("Stripe key is missing!");
    return;
  }
  stripe = await loadStripe(apiKey);

  elements = stripe!.elements({
    mode: "payment",
    amount: paymentAmount,
    currency: "eur",
  });
  const paymentElement = elements.create("payment");
  paymentElement.mount("#payment-element");

  loading.value = false;
});

const handleSubmit = async (e: Event) => {
  if (loading.value) return;
  if (!stripe || !elements) {
    return;
  }

  loading.value = true;

  const formData = Object.fromEntries(
    new FormData(e.target as HTMLFormElement)
  );
  const email = formData.email.toString();

  const bookingItems: Sale[] = [];
  let productString = "";
  let eventName = "";

  props.products.forEach((item: any) => {
    const ticket = new Sale(item.id, item.quantity);
    bookingItems.push(ticket);
    productString += `${item.name} (${item.quantity}),`;
    eventName = item.eventName;
  });

  try {
    const response = await fetch(config.public.apiPaymentIntent, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: paymentAmount,
        currency: "eur",
        product: productString,
      }),
    });
    const paymentIntent = await response.json();

    const customer = new Customer(email, undefined, paymentIntent.id);
    const clientSecret = paymentIntent.client_secret;

    const bookings = new Booking(customer, bookingItems, props.eventId);
    const { error: submitError } = await elements.submit();
    const queryString = new URLSearchParams(bookings.toJSON());
    // für online
    const returnUrl = `${
      useRuntimeConfig().public.returnUrl
    }/success?${queryString}`;
    //für lokal testen
    //const returnUrl = `http://localhost:3000/success/?${queryString}`;

    // Save the payment details in the store
    paymentStore.setPaymentDetails(
      paymentIntent.id,
      eventName,
      props.amount,
      props.products
    );

    // das die Process Engine nicht aufgerufen wird bei wiederholtem laden der success seite
    localStorage.setItem("processEngineCalled", "false");

    if (submitError) {
      console.log("error submit");
      loading.value = false;
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        receipt_email: email as string,
        return_url: returnUrl,
      },
    });

    loading.value = true;

    if (error) {
      const paymentError = true;
      router.push(`/error/?${paymentError}`);
    } else {
      router.push("/success");
    }
  } catch (err) {
    console.log("error", err);
    router.push("/error");
    loading.value = false;
  }
};

function handleLoadingArrow() {
  setTimeout(() => {
    arrow.value = true;
  }, 1000);
}
</script>
