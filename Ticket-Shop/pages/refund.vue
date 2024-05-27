<template>
    <div class="relative flex h-screen w-full items-center justify-center">
      <div v-if="errorMessage" id="alert-1" class="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
        <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span class="sr-only">Info</span>
        <div class="ml-3 text-sm font-medium">
          {{ errorMessage }}
        </div>
        <button @click="closeAlert" type="button" class="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" aria-label="Close">
          <span class="sr-only">Close</span>
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>
  
      <div class="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded bg-gray-50 px-6 pt-12 pb-8 shadow-lg">
        <div class="text-center">
          <h1 class="text-2xl font-bold text-blue-600">Rückerstattung</h1>
          <p class="mt-2 text-gray-600 text-sm">
            Bitte wählen Sie die Tickets aus, die Sie stornieren möchten.
          </p>
        </div>
        <div class="flex flex-col gap-3 py-6 text-xs mt-4">
          <table class="w-full text-left table-fixed">
            <thead>
              <tr>
                <th class="w-3/4 py-2">Tickets</th>
                <th class="w-1/4 py-2 text-center">test</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ticket in tickets" :key="ticket.id">
                <td class=" py-1 ">{{ ticket.name }}</td>
                <td class=" py-1 text-center">
                  <input type="checkbox" v-model="selectedTickets" :value="ticket.id" />
                </td>
              </tr>
            </tbody>
          </table>
          
          <div class="border-b border border-dashed"></div>
          <div class="py-4 flex justify-center items-center gap-20">
            <button
              @click="goToHome"
              class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Zurück
            </button>
            <button
              @click="validateAndProcessRefund"
              class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Stornieren
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>

  
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const bookingId = ref(0);
const selectedTickets = ref<number[]>([]);
const errorMessage = ref<string | null>(null);
    const tickets = ref([
  { id: 1, name: 'Ticket 1' },
  { id: 2, name: 'Ticket 2' },
  { id: 3, name: 'Ticket 3' }
]);

onMounted(() => {
    parseURL();
    //fetchTickets();
});
//const tickets = ref([]);
const fetchTickets = async () => {
    const response = await fetch(
        `http://benevolo.de/api/ticket-service/bookings/${bookingId}`,
    );
    const data = await response.json();
    tickets.value = data;
};
const refundTicket = async (ticketId: number) => {
    await fetch(`http://benevolo.de/api/ticket-service/refund/${ticketId}`, {
        method: "UPDATE",
    });
    fetchTickets();
};
const processRefund = () => {
  selectedTickets.value.forEach(refundTicket);
};

const validateAndProcessRefund = () => {
  if (selectedTickets.value.length === 0) {
    errorMessage.value = "Bitte wählen Sie mindestens ein Ticket aus.";
    setTimeout(() => {
      errorMessage.value = null;
    }, 3000);
  } else {
    errorMessage.value = null;
    processRefund();
  }
};

const closeAlert = () => {
  errorMessage.value = null;
};

const parseURL = () => {
    const url = window.location.href;
    const regex = /\$\{bookingId: ([^\}]+)\}/;
    const match = url.match(regex);
    if (match && match[1]) {
        const bookingId = match[1];
        console.log("Extracted bookingId:", bookingId);
        return bookingId;
    } else {
        console.log("bookingId not found in the URL");

        return null;
    }
};
function goToHome() {
    router.push("/");
}
</script>
