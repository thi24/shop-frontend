<template>
  <div class="max-w-9xl mx-auto px-1 py-1 lg:px-3 lg:py-3">
    <div
      class="grid grid-cols-1 lg:grid-cols-2 gap-0 sm:gap-2 hover:rounded-lg"
    >
      <div class="p-1 rounded-lg">
        <EventBuyComponent />
      </div>

      <div class="p-5 lg:pt-10">
        <div
          class="bg-slate-100 p-1 lg:rounded-lg rounded-lg lg:shadow-lg shadow-lg px-1"
        >
          <div
            v-for="ticketType in tickettypes"
            :key="ticketType.id"
            class="last:mb-0"
          >
            <TicketTypeComponent :ticketType="ticketType" />
          </div>

          <div class="flex justify-center mt-4 pb-4">
            <button
              class="relative z-0 h-12 rounded-full bg-blue-500 px-6 text-neutral-50 after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:rounded-full after:bg-blue-500 hover:after:scale-x-125 hover:after:scale-y-150 hover:after:opacity-0 hover:after:transition hover:after:duration-500"
              @click="logUserInputs"
            >
              Jetzt bezahlen
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from "vue";

import { useEventStore } from "~/stores/eventIdStore";

import EventBuyComponent from "~/components/Events/EventBuyComponent";

import { TicketType } from "~/classes/TicketType";
import TicketTypeComponent from "~/components/TicketType/TicketTypeComponent.vue";

const selectedTickets = ref<
  { id: any; name: any; quantity: number; price: any }[]
>([]);

const popupTriggers: Ref<{ buttonTrigger: boolean }> = ref({
  buttonTrigger: false,
});

const tickettypes = ref<TicketType[]>([]);

const eventStore = useEventStore();

onMounted(async () => {
  const token = import.meta.env.VITE_AUTH_TOKEN;
  var eventId = eventStore.eventId;

  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    tickettypes.value = await $fetch(
      "https://dev.benevolo.de/api/event-service/ticket-types?eventId=383f700f-5449-4e40-b509-bee0b5d139d6",
      options
    );
  } catch (error) {
    console.error("Failed to load ticket types:", error);
  }
});

function logUserInputs() {
  selectedTickets.value = [];

  tickettypes.value.forEach((ticketType) => {
    const inputElement = document.querySelector(
      `#number-input-${ticketType.id}`
    ) as HTMLInputElement;
    if (inputElement && parseInt(inputElement.value) != 0) {
      selectedTickets.value.push({
        id: ticketType.id,
        name: ticketType.name,
        price: ticketType.price,
        quantity: parseInt(inputElement.value),
      });
    }
  });

  let amount = 0;
  for (let i = 0; i < selectedTickets.value.length; i++) {
    amount =
      amount +
      selectedTickets.value[i].price * selectedTickets.value[i].quantity;
  }

  console.log(amount);

  // Popup anzeigen, wenn Tickets ausgewählt wurden
  if (selectedTickets.value.length != 0) {
    togglePopup();
  }
}

function togglePopup() {
  popupTriggers.value.buttonTrigger = !popupTriggers.value.buttonTrigger;
}
</script>
