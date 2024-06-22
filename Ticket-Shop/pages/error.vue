<template>
  <div class="relative flex w-full items-start justify-center pt-10 " v-if="error">
    <div
      class="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl  flex flex-col items-center rounded-2xl overflow-hidden shadow-xl p-6 m-4 bg-white">
      <img class="w-24 h-24 mb-4" src="../utils/pictures/error.png" />
      <h1 class="text-2xl font-extrabold text-center text-black md:text-3xl lg:text-4xl mb-4">
        Zahlung fehlgeschlagen
      </h1>
      <p class="text-center mt-2 text-gray-600">
        Leider ist ein Fehler bei der Verarbeitung Ihrer Zahlung aufgetreten. <br />
        Wir entschuldigen uns für die Unannehmlichkeiten. <br />
        Bitte versuchen Sie es in ein paar Minuten noch einmal oder wählen Sie eine andere Zahlungsmethode.
      </p>
      <button
        class="mt-6 mb-4 bg-blue-500 text-white py-2 px-8 rounded-lg hover:bg-blue-600 transition-all"
        @click="navigateToIndex()">
        Zurück zur Startseite
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const error = ref(false);
onMounted(async () => {
  const url = window.location.href;
  if (url.includes("true")) {
    error.value = true;
  } else {
    toggleError();
  }
});
function toggleError() {
  error.value = !error.value;
}

const router = useRouter();
function navigateToIndex() {
  router.push("/");
}
</script>
