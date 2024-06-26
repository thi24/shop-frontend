<template>
  <div
    v-if="showBanner"
    class="flex items-center justify-between bg-stone-200 text-black px-6 py-3.5 rounded"
  >
    <p class="text-base flex-1 hidden md:block text-center">
      Finden Sie Ihr nächstes Erlebnis – Ihr Ticketshop für Konzerte, Events und
      mehr
    </p>
    <p class="md:hidden block text-base flex-1 text-left sm:text-center">
      Ihr Ticketshop für Konzerte, Events und mehr
    </p>
    <div @click="closeBanner">
      <xSign />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import xSign from "~/components/svg/x-sign.vue";

const showBanner = ref(true);

const closeBanner = () => {
  showBanner.value = false;
};
</script>
