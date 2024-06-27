<template>
  <div class="relative flex w-full items-start justify-center pt-20">
    <InfoAlertComponent
      v-if="errorMessage"
      :message="errorMessage"
      @close="errorMessage = null"
    />
    <div
      class="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-2xl bg-white px-6 pt-12 pb-8 shadow-lg"
    >
      <div class="text-center">
        <h1 class="text-2xl font-bold text-blue-600">Rückerstattung</h1>
        <p class="mt-2 text-gray-600 text-sm">
          Bitte wählen Sie die Tickets aus, die Sie stornieren möchten.
        </p>
      </div>
      <div class="flex flex-col gap-3 py-6 text-xs mt-4">
        <table v-if="tickets.length > 0" class="w-full text-left table-fixed">
          <caption class=""></caption>
          <thead>
            <tr>
              <th
                class="w-0 sm:w-0 md:w-0 lg:w-1/2 xl:w-5/8 2xl:w-1/2 py-2 hidden lg:table-cell"
              >
                Tickets
              </th>
              <th
                class="w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/8 2xl:w-1/4 py-2"
              >
                Ticketart
              </th>
              <th
                class="w-1/4 sm:w-1/4 md:w-1/4 lg:w-1/8 xl:w-1/8 2xl:w-1/8 py-2 text-center"
              >
                Preis
              </th>
              <th
                class="w-1/4 sm:w-1/4 md:w-1/4 lg:w-1/8 xl:w-1/8 2xl:w-1/8 py-2 text-center"
              >
                Auswahl
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ticket in tickets" :key="ticket.id">
              <td class="py-1 hidden lg:table-cell pr-4">{{ ticket.id }}</td>
              <td class="py-1">{{ ticket.bookingItem?.ticketType?.name }}</td>
              <td class="py-1 text-center">
                {{ formatPrice(ticket.price ?? null) }}
              </td>
              <td class="py-1 text-center">
                <input
                  type="checkbox"
                  v-model="selectedTickets"
                  :value="ticket.id"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else class="text-center text-gray-500">Keine Tickets verfügbar.</p>
        <div class="border-b border border-dashed"></div>
        <div class="py-4 flex justify-center items-center gap-20">
          <button
            @click="goToHome"
            class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Zurück
          </button>
          <button
            @click="showPopup"
            class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Stornieren
          </button>
        </div>
      </div>
    </div>

    <Popup
      :visible="isPopupVisible"
      :selectedTicketsDetails="selectedTicketsDetails"
      @confirm="confirmCancellation"
      @cancel="hidePopup"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { Ticket } from "~/classes/Ticket";
import { parseUrl } from "~/utils/parseUrl";
import { formatPrice } from "~/utils/formatPrice"; 
import { fetchTickets, processRefund } from "~/services/ticketService";

import InfoAlertComponent from "~/components/alerts/InfoAlertComponent.vue";
import Popup from "~/components/popups/StornoConfirmation.vue";

const router = useRouter();
const refundId = ref<string>("");
const selectedTickets = ref<string[]>([]);
const errorMessage = ref<string | null>(null);
const tickets = ref<Ticket[]>([]);
const isPopupVisible = ref(false);

const selectedTicketsDetails = computed(() => {
  return tickets.value.filter((ticket) =>
    selectedTickets.value.includes(ticket.id!)
  );
});

const showPopup = () => {
  if (selectedTickets.value.length === 0) {
    errorMessage.value = "Bitte wählen Sie mindestens ein Ticket aus.";
    setTimeout(() => {
      errorMessage.value = null;
    }, 3000);
  } else {
    isPopupVisible.value = true;
  }
};

const hidePopup = () => {
  isPopupVisible.value = false;
};


onMounted(() => {
  const url = window.location.href;
  refundId.value = parseUrl(url);
  loadTickets();
});

// Load the order based on the ID
const loadTickets = async () => {
  try {
    tickets.value = await fetchTickets(refundId.value);
  } catch (error: any) { 
    errorMessage.value = error.message;
  }
};

const confirmCancellation = async () => {
  const result = await processRefund(refundId.value, selectedTickets.value);
  if (result.success) {
    router.push("/cancellationForwarded");
  } else {
    console.error("Error processing refund:", result.message);
    router.push("/cancellationError");
  }
  hidePopup();
};

// Back to home
const goToHome = () => {
  router.push("/");
};
</script>
