<template>
  <div class="flex flex-wrap">
    <!-- ab hier EventBuyComponent -->
    <div
      class="w-full rounded-lg sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2 p-1 mb-1 mt-2 mr-2 ml-2 sm:mr-6 sm:ml-5 md:mr-2 md:ml-8 lg:ml-7 lg:mr-8 xl:mr-5 xl:ml-20 2xl:mr-10 2xl:ml-30"
    >
      <div v-if="event" class="p-1 rounded-lg">
        <EventBuyComponent :event="event" />
      </div>
    </div>

    <!-- ab hier Ticket auswahl Component -->
    <div
      class="w-full rounded-lg sm:w-2/5 md:w-2/5 lg:w-2/5 xl:w-2/5 2xl:w-2/5"
    >
      <div
        v-if="tickettypes"
        class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md mb-4 mt-1 mr-4 ml-4 sm:mt-4 sm:mr-0 sm:ml-0 md:mt-4 md:mr-0 md:ml-2 lg:ml-8 lg:mr-0 xl:mr-10 xl:ml-10 2xl:mr-5 2xl:ml-20"
      >
        <TicketTypeComponent :tickettypes="tickettypes" />

        <div class="flex justify-center">
          <button
            class="mb-8 w-1/2 max-w-xs align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg border border-blue-500 text-blue-500 hover:opacity-75 focus:ring focus:ring-blue-200 active:opacity-[0.85]"
            @click="handlePayment"
          >
            Jetzt bezahlen
          </button>
        </div>
      </div>
      <PaymentPopup ref="paymentPopup" :selectedTickets="selectedTickets" />
    </div>
    <AlertComponent
      v-if="errorMessage"
      :message="errorMessage"
      @close="errorMessage = null"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from "vue";
import { useEventStore } from "~/stores/eventIdStore";
import EventBuyComponent from "~/components/Events/EventBuyComponent.vue";
import TicketTypeComponent from "~/components/TicketType/TicketTypeComponent.vue";
import AlertComponent from "~/components/Alerts/Alert1Component.vue";
import { Event } from "~/classes/Event";
import { TicketType } from "~/classes/TicketType";
//import TicketTypeComponent from "~/components/TicketType/TicketTypeComponent.vue";

import {
  fetchTicketTypesByEventId,
  fetchEventById,
} from "~/services/eventService";

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

const popupTriggers: Ref<{ buttonTrigger: boolean }> = ref({
  buttonTrigger: false,
});

const tickettypes = ref<TicketType[]>([]);
const event = ref<Event | null>(null);
const eventStore = useEventStore();
const paymentPopup = ref();
const errorMessage = ref<string | null>(null);
let amount = ref(0);

onMounted(async () => {
  const eventId = eventStore.eventId;
  const response = await fetch(
    `https://dev.benevolo.de/api/analytics-service/events/${eventId}/event-views`,
    {
      method: "PATCH",
    }
  );
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
});

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
  for (let i = 0; i < selectedTickets.value.length; i++) {
    amount.value =
      amount.value +
      selectedTickets.value[i].price * selectedTickets.value[i].quantity;
  }
  amount.value = amount.value / 100;

  return amount;
}
//new Alert/Fehler nachricht
function handlePayment() {
  var inputsAreNumeric = checkInputs(); // Pruefen ob die Eingaben Zahlen sind

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

function checkInputs() {
  var inputsAreNumeric = true;
  var inputs = document.getElementsByTagName("input");

  for (var i = 0; i < inputs.length; ++i) {
    var inputValue = inputs[i].value.trim();

    if (
      !(/^(\d+)$/.test(inputValue) || inputValue == "" || inputValue == null)
    ) {
      inputsAreNumeric = false;
      inputs[i].style.outline = "2px solid red";
      console.log("Input " + i + " is not numeric. Value: " + inputValue);
    } else {
      inputs[i].style.outline = "";
    }
  }

  return inputsAreNumeric;
}
</script>
