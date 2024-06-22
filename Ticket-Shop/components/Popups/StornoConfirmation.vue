<template>
  <div
    v-if="visible"
    class="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 p-4"
  >
    <div
      class="mt-[20vh] bg-white p-6 rounded-2xl shadow-lg  sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3"
    >
      <h2 class="text-2xl font-bold mb-4 text-center text-blue-600">Bestätigung</h2>
      <p class="mb-4">
        Sind Sie sicher, dass Sie die folgenden Tickets stornieren möchten?
      </p>
      <ul class="my-5 w-full">
        <li
          v-for="ticket in selectedTicketsDetails"
          :key="ticket.id"
          class="mb-2 text-center"
        >
          <span class="font-semibold">{{ ticket.bookingItem?.ticketType?.name }}</span>
          <span class="mx-2 md:mx-4">
            -
          </span>
          <span class="font-normal">
            {{
              ticket.price ? (ticket.price / 100).toLocaleString("de-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) : "0,00"
            }}
            €
          </span>
        </li>
      </ul>
      <div class="flex justify-center gap-20 py-4 items-center">
        <button
          @click="cancel"
          class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
        >
          Abbrechen
        </button>
        <button
          @click="confirm"
          class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Bestätigen
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ticket } from "~/classes/Ticket";

const props = defineProps<{
  visible: boolean;
  selectedTicketsDetails: Ticket[];
}>();

const emit = defineEmits(["confirm", "cancel"]);

const confirm = () => {
  emit("confirm");
};

const cancel = () => {
  emit("cancel");
};
</script>




