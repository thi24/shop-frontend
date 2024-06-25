<template>
  <div
    v-if="message"
    class="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50"
    role="alert"
  >
    <InfoSign />
    <span class="sr-only">Info</span>
    <div class="ml-3 text-sm font-medium">{{ message }}</div>
    <button
      @click="closeAlert"
      type="button"
      class="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8"
      aria-label="Close"
    >
      <span class="sr-only">Close</span>
      <xSign />
    </button>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from "vue";

import InfoSign from "~/components/svg/info-sign.vue";
import xSign from "~/components/svg/x-sign.vue";

const props = defineProps({
  message: String,
  duration: {
    type: Number,
    default: 3000,
  },
});

const emit = defineEmits(["close"]);

const timer = ref(null);

const closeAlert = () => {
  emit("close");
};

watch(
  () => props.message,
  (newVal) => {
    if (newVal) {
      clearTimeout(timer.value);
      timer.value = setTimeout(() => {
        closeAlert();
      }, props.duration);
    }
  }
);

onUnmounted(() => {
  clearTimeout(timer.value);
});
</script>
