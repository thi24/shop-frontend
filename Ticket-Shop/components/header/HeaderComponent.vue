<template>
  <header
    class="bg-[radial-gradient(ellipse_100%_100%_at_50%_30%,rgba(241,238,220,1.000),rgba(255,255,255,1))] shadow py-2 sticky"
  >
    <div class="flex flex-wrap justify-between items-center mx-auto">
      <div @click="navigateHome" class="cursor-pointer">
        <div class="flex items-center space-x-1">
          <h1 class="px-10 text-4xl font-bold leading-6">Show-Pass</h1>
        </div>
      </div>
      <div class="p-4 flex justify-center">
        <form class="max-w-md mx-auto">
          <label
            for="search-events"
            class="mb-2 font-medium text-black sr-only dark:text-white"
            >Search-Bar</label
          >
          <div class="relative" v-if="showInput">
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
            >
              <SearchSign />
            </div>
            <input
              type="search"
              id="search-events"
              class="px-8 block w-full p-2 ps-10 text-sm border focus:outline-none rounded-full bg-white dark:bg-white-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Events suchen"
              @input="setInputIntoStore"
            />
          </div>
          <div v-else class="h-9"></div>
        </form>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useSearchStore } from "~/stores/searchStore";

import SearchSign from "~/components/svg/search-sign.vue";

const router = useRouter();
const searchStore = useSearchStore();

function setInputIntoStore() {
  let inputElement = document.getElementById("search-events");
  if (inputElement) {
    let value = (inputElement as HTMLInputElement).value;
    searchStore.setEventName(value);
  }
}

function navigateHome() {
  router.push("/");
}

defineProps<{
  showInput: boolean;
}>();
</script>
