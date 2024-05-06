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
    console.error('Stripe key is missing!');
    return;
  }
  stripe = await loadStripe(apiKey);
  console.log(paymentAmount);
  
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
  props.products.forEach((item: any) => {
    const ticket = new Sale(item.id, item.quantity);
    bookingItems.push(ticket);
  });

  // Create payment intents first and grab secret
  try {
    const response = await fetch(
      "http://localhost:8080/payment/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: paymentAmount, // Setzen Sie den Betrag entsprechend Ihrer Anforderung
          currency: "eur", // Setzen Sie die Währung entsprechend Ihrer Anforderung
          product: "Test", // Setzen Sie die Produktbeschreibung entsprechend Ihrer Anforderung
        }),
      }
    );
    const paymentIntent = await response.json();

    const customer = new Customer(email, undefined, paymentIntent.id);
    const clientSecret = paymentIntent.client_secret;
    const bookings = new Booking(customer, bookingItems, paymentIntent.Id);
    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.log("error submit");
      loading.value = false;
      return;
    }
    const processResponse = await fetch(
      "https://engine.pe.benevolo.de/process_models/{d41149ad-2aea-4e96-a897-fb592db30144}/start",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer ${eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ6TnQ5dnl6ekxzNGhUb3RKRGplSFhkRUtDWGhCckZGMG1ka1FjQktad2FZIn0.eyJleHAiOjE3MTUwMDIwNjEsImlhdCI6MTcxNDk5NDg2MSwiYXV0aF90aW1lIjoxNzE0OTk0ODU4LCJqdGkiOiI3ZDI0MzAxOS04NmQyLTQxNDYtOTUxNy1hMTgwOGZhODM1ZmEiLCJpc3MiOiJodHRwczovL2F1dGguYmVuZXZvbG8uZGUvcmVhbG1zL2JlbmV2b2xvIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjEyYjFmODMxLTRlOTYtNDcwMS05NDJkLWVhYzk0YzU4YjNlYSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImJlbmV2b2xvIiwic2Vzc2lvbl9zdGF0ZSI6ImExYTZmMDA2LWYzNGYtNDJmNC04MWYyLTAxZDM2MjViOGYyYyIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9iZW5ldm9sby5kZSIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLWJlbmV2b2xvIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwic2lkIjoiYTFhNmYwMDYtZjM0Zi00MmY0LTgxZjItMDFkMzYyNWI4ZjJjIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJBbmRyZWFzIE90dCIsInByZWZlcnJlZF91c2VybmFtZSI6ImFuZGkiLCJnaXZlbl9uYW1lIjoiQW5kcmVhcyIsImZhbWlseV9uYW1lIjoiT3R0IiwiZW1haWwiOiJhbm8yMDEzQHRoaS5kZSJ9.mFTmzljWelF98hA1DAsGyPsMJq8Szt6lx3LtpD_LgCSQ6hqqjMHpF3xjbZTCBCbrB2cIxd5EaxQQ_d54Tu44XnbjBkNi2BR48zKWYRVTYfqkGzO90lGZ4uVrJvh3Bhjeiweoi9r-r5AFGObxRZaZqD3eqQHlmLzhWU145zO0czfkCaK7Zdhy7EujByJEKSeTvbuUB2RXO2bO5mHoGsKCkBlgaNs62KiUIs9QyaTyRpbMF8DtMJ4icLbYOU7Z8jbBrm25f2YlLyerN5cXEwEqoAqcIy41d7CFsXhgJdQ5FKW8KHlTsqebEg7mbsjieS7uPYAM44I9RVE-i6W2z4DXpw}",
        },
        body: bookings.toJSON(),
      }
    );
    alert("pause");
    console.log(processResponse);
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        receipt_email: email as string,
        return_url: "http://localhost:3000",
      },
    });

    loading.value = false;

    if (error?.type === "card_error" || error?.type === "validation_error") {
      router.push("/error");
    } else {
    }
  } catch (error) {
    console.log("error", error);
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
