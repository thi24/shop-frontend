<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  type Stripe,
  type StripeElements,
  loadStripe,
} from "@stripe/stripe-js";

const router = useRouter();
const config = useRuntimeConfig();
const props = defineProps({
  amount: Number,
});
let stripe: Stripe | null;
let loading = ref(true);
let elements: StripeElements;
let paymentAmount = Math.ceil(props.amount * 100);

onMounted(async () => {
  stripe = await loadStripe(
    "pk_test_51P3MkWCzSI00rA1V0QfsOEhJFA0tx8eRTSVTnciAW2wgK9cr9Zk1Ra8oU4xwvJubsf1he4EbEvDfi33Gi5QS2prh00AGzSJTcW"
  );
  console.log(paymentAmount);
  //wichtig das die elements laden !!!
  elements = stripe!.elements({
    mode: "payment",
    amount: 1999,
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
  const { name, email } = Object.fromEntries(
    new FormData(e.target as HTMLFormElement)
  );

  // Create payment intents first and grab secret
  try {
    const response = await fetch(
      "http://localhost:8080/hello/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: paymentAmount, // Setzen Sie den Betrag entsprechend Ihrer Anforderung
          currency: "eur", // Setzen Sie die Währung entsprechend Ihrer Anforderung
          product: "Beschreibung des Produkts", // Setzen Sie die Produktbeschreibung entsprechend Ihrer Anforderung
        }),
      }
    );
    const jsonResponse = await response.json();
    console.log(jsonResponse.client_secret);
    const clientSecret = jsonResponse.client_secret;
    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.log("error submit");
      loading.value = false;
      return;
    }

    const { error } = await stripe!.confirmPayment({
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
      console.log("great");
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
          <label for="email_field">Email</label>
          <input
            placeholder="jane.doe@example.com"
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
