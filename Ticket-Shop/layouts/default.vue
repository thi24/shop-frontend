<template>
  <div class="flex flex-col min-h-screen">
    <HeaderComponent :showInput="isIndexPage"/>
    <div class="flex-grow bg-stone-100">
      <slot />
    </div>
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const isIndexPage = computed(() => route.name === "index");
</script>
