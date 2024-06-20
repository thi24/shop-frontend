<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  type Stripe,
  type StripeElements,
  loadStripe,
} from "@stripe/stripe-js";
import { useRouter } from "vue-router";
import { usePaymentStore } from "~/stores/paymentStore"; // Import the store
import { Sale } from "~/classes/Sale";
import { Booking } from "~/classes/Booking";
import { Customer } from "~/classes/Customer";

const router = useRouter();
const config = useRuntimeConfig();
const props = defineProps({
  amount: { type: Number, required: true },
  products: { type: Array, required: true },
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

  

    //const eventId = "testEventId";
    const bookings = new Booking(customer, bookingItems, props.eventId);
    const { error: submitError } = await elements.submit();
    const queryString = new URLSearchParams(bookings.toJSON());
    // für online
   /* const returnUrl = `${
      useRuntimeConfig().public.returnUrl
    }/success?${queryString}`;*/
    //für lokal testen
    const returnUrl = `http://localhost:3000/success/?${queryString}`;

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
      router.push("/success"); // Ensure navigation to success page
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

<template>
  <section class="showcase">
    <div class="nes-container with-title"></div>
  </section>

  <div class="nes-container with-title is-centered">
    <form @submit.prevent="handleSubmit">
      <fieldset :class="{ dis: loading }" class="fields">
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
            <svg
              aria-hidden="true"
              class="inline w-7 h-7 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
