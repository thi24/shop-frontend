<template>
  <div class="flex flex-col justify-center items-center" v-if="error">
    <div
      class="bg-slate-100 flex flex-col items-center rounded-lg overflow-hidden shadow-xl m-4 cursor-pointer w-1/2 p-4"
    >
      <img class="w-24 h-24" src="../utils/pictures/error.png" />
      <h1
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl"
      >
        Die Zahlung ist fehlgeschlagen
      </h1>
      <p class="text-center">
        Es wurde versucht die Zahlung durchzuführen, aber etwas ist
        fehlgeschlagen. Das tut uns sehr leid! <br />
        Bitte versuchen Sie es in ein paar Minuten noch einmal.
      </p>
      <button
        class="mt-4 relative z-0 h-12 rounded-full bg-blue-500 px-6 text-neutral-50 after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:rounded-full after:bg-blue-500 hover:after:scale-x-125 hover:after:scale-y-150 hover:after:opacity-0 hover:after:transition hover:after:duration-500"
        @click="navigateToIndex()"
      >
        Ok
      </button>
    </div>
  </div>
  <div v-else>
    <p>Text für wenn Zahlung fehschlägt</p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const error = ref(false);
onMounted(async () => {
  const url = window.location.href;
  if (url.includes("true")) {
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
