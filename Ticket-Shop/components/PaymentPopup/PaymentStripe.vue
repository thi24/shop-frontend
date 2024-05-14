<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  type Stripe,
  type StripeElements,
  loadStripe,
} from "@stripe/stripe-js";
import { Sale } from "~/classes/Sale";
import { Booking } from "~/classes/Booking";
import { Customer } from "~/classes/Customer";
const router = useRouter();
const config = useRuntimeConfig();
const props = defineProps({
  amount: { type: Number, required: true },
  products: { type: Array, required: true },
});

let stripe: Stripe | null;
let loading = ref(true);
let elements: StripeElements;
let paymentAmount = Math.ceil(props.amount * 100);

onMounted(async () => {
  const apiKey = import.meta.env.VITE_STRIPE_KEY;
  if (!apiKey) {
    console.error("Stripe key is missing!");
    return;
  }
  stripe = await loadStripe(apiKey);

  //wichtig das die elements laden !!!
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
    // Stripe.js hasn't yet loaded.
    return;
  }
  loading.value = true;
  const formData = Object.fromEntries(
    new FormData(e.target as HTMLFormElement)
  );
  const email = formData.email.toString();
  //Array fuer Booking Klasse erstellen
  const bookingItems: Sale[] = [];
  let productString = "";
  props.products.forEach((item: any) => {
    const ticket = new Sale(item.id, item.quantity);
    bookingItems.push(ticket);
    productString = productString + item.name;
  });

  // Create payment intents first and grab secret
  try {
    const response = await fetch(useRuntimeConfig().public.apiPaymentIntent, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: paymentAmount, // Setzen Sie den Betrag entsprechend Ihrer Anforderung
        currency: "eur", // Setzen Sie die Währung entsprechend Ihrer Anforderung
        product: productString, // Setzen Sie die Produktbeschreibung entsprechend Ihrer Anforderung
      }),
    });
    const paymentIntent = await response.json();

    const customer = new Customer(email, undefined, paymentIntent.id);
    const clientSecret = paymentIntent.client_secret;
    const bookings = new Booking(customer, bookingItems, paymentIntent.Id);
    const { error: submitError } = await elements.submit();
    const queryString = new URLSearchParams(bookings.toJSON());
    const returnUrl = useRuntimeConfig().public.returnUrl + `${queryString}`;
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
      router.push("/error");
    } else {
      console.log("test");
    }
  } catch (err) {
    console.log("error", err);
    router.push("/error");
    loading.value = false;
  }
};
</script>

<template>
  <section class="showcase">
    <div class="nes-container with-title"></div>
  </section>

  <div class="nes-container with-title is-centered">
    <form @submit.prevent="handleSubmit">
      <fieldset :class="{ dis: loading }" class="fields">
        <div class="nes-field">
          <label for="email_field">Email: </label>
          <input
            placeholder="Ihre e-Mail"
            type="email"
            name="email"
            id="email_field"
            class="nes-input"
            required
          />
        </div>

        <div class="Hier kann die Farbe des Stripe elements angepasst werden">
          <label for="payment-element">Credit Card</label>
          <div id="payment-element" class="nes-input"></div>
        </div>
      </fieldset>

      <div class="">
        <p>Summe: {{ props.amount }}</p>
        <button
          type="submit"
          class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          {{ loading ? "Loading..." : "Hier Bezahlen!" }}
        </button>
      </div>
    </form>
  </div>
</template>
