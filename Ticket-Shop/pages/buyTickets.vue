<template>
  <div>
    <AlertComponent
      v-if="errorMessage"
      :message="errorMessage"
      @close="errorMessage = null"
    />
    <div class="flex flex-wrap">
      <!-- EventBuyComponent starts here -->
      <div
        class="w-full rounded-lg sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2 p-1 mb-1 mt-2 mr-2 ml-2 sm:mr-6 sm:ml-5 md:mr-2 md:ml-8 lg:ml-7 lg:mr-8 xl:mr-5 xl:ml-20 2xl:mr-10 2xl:ml-30"
      >
        <div v-if="event" class="p-1 rounded-lg">
          <EventBuyComponent :event="event" />
        </div>
      </div>
      <!-- Ticket selection component starts here -->
      <div
        class="w-full rounded-lg sm:w-2/5 md:w-2/5 lg:w-2/5 xl:w-2/5 2xl:w-2/5"
      >
        <div
          v-if="tickettypes"
          class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md mb-4 mt-1 mr-4 ml-4 sm:mt-4 sm:mr-0 sm:ml-0 md:mt-4 md:mr-0 md:ml-2 lg:ml-8 lg:mr-0 xl:mr-10 xl:ml-10 2xl:mr-5 2xl:ml-20"
        >
          <TicketTypeComponent :tickettypes="tickettypes" />
          <div
            class="flex justify-center my-10"
            id="no-tickets"
            style="display: none"
          >
            <p class="flex justify-center mb-10">
              Aktuell keine Tickets verfügbar
            </p>
          </div>
          <div class="flex justify-center">
            <button
              v-if="hasTicketTypes"
              class="mb-8 mt-2 w-1/2 max-w-xs align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg border border-blue-500 text-blue-500 hover:opacity-75 focus:ring focus:ring-blue-200 active:opacity-[0.85]"
              @click="handlePayment"
            >
              Jetzt bezahlen
            </button>
          </div>
        </div>
        <PaymentPopup ref="paymentPopup" :selectedTickets="selectedTickets" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useEventStore } from "~/stores/eventIdStore";
import { Event } from "~/classes/Event";
import { TicketType } from "~/classes/TicketType";
import { fetchTicketTypesByEventId, fetchEventById } from "~/services/eventService";
import { checkInputs } from "~/utils/checkInputs";
import { trackEventView } from "~/services/analyticsService";

import EventBuyComponent from "~/components/events/EventBuyComponent.vue";
import TicketTypeComponent from "~/components/ticketType/TicketTypeComponent.vue";
import AlertComponent from "~/components/alerts/InfoAlertComponent.vue";
import PaymentPopup from "~/components/popups/PaymentPopup.vue";

const selectedTickets = ref<
  {
    id: any;
    name: any;
    quantity: number;
    price: any;
    eventName: string;
    eventId: any;
  }[]
>([]);

const tickettypes = ref<TicketType[]>([]);
const event = ref<Event | null>(null);
const eventStore = useEventStore();
const paymentPopup = ref();
const errorMessage = ref<string | null>(null);
let amount = ref(0);

const hasTicketTypes = computed(() => tickettypes.value.length > 0);

onMounted(async () => {
  const eventId = eventStore.eventId;
  await trackEventView(eventId);
  if (!eventId) {
    console.error("No event ID found in store");
    return;
  }
  try {
    try {
      tickettypes.value = await fetchTicketTypesByEventId(eventId);
    } catch (error) {
      console.error("Failed to load ticket types:", error);
    }
    try {
      event.value = await fetchEventById(eventId);
    } catch (error) {
      console.error("Failed to load singleEvent:", error);
    }
  } catch (error) {
    console.error("Failed to load data:", error);
  }

  checkTicketTypes();
});

function checkTicketTypes() {
  const noTicketsElement = document.getElementById("no-tickets");
  if (tickettypes.value.length == 0) {
    if (noTicketsElement) noTicketsElement.style.display = "block";
  } else if (noTicketsElement) {
    noTicketsElement.style.display = "none";
  }
}

function getUserInputs() {
  selectedTickets.value = [];
  tickettypes.value.forEach((ticketType) => {
    const inputElement = document.querySelector(
      `#number-input-${ticketType.id}`
    ) as HTMLInputElement;
    if ((inputElement && parseInt(inputElement.value)) || 0) {
      selectedTickets.value.push({
        id: ticketType.id,
        name: ticketType.name,
        price: ticketType.price,
        quantity: parseInt(inputElement.value),
        eventName: event.value!.eventName,
        eventId: ticketType.event!.id,
      });
    }
  });
}

function calculateAmount() {
  getUserInputs();
  amount.value = 0;
  for (const ticket of selectedTickets.value) {
    amount.value += ticket.price * ticket.quantity;
  }
  amount.value /= 100;
  return amount;
}
// new alert/error message
function handlePayment() {
  const inputElements = Array.from(document.querySelectorAll('input[type="number"]')) as HTMLInputElement[];
  let inputsAreNumeric = checkInputs(inputElements); 
  if (inputsAreNumeric) {
    if (calculateAmount().value <= 0) {
      errorMessage.value = "Bitte wählen Sie mindestens ein Ticket aus.";
      setTimeout(() => {
        errorMessage.value = null;
      }, 3000);
    } else {
      paymentPopup.value.openPopup(calculateAmount());
    }
  } else {
    errorMessage.value = "Bitte geben Sie nur Zahlen von 0 bis 9 ein!";
  }
}

</script>