<template>
  <div class="max-w-9xl mx-auto px-1 py-1 lg:px-3 lg:py-3 ">
    <div
      class="grid grid-cols-1 lg:grid-cols-2 gap-0 sm:gap-2 hover:rounded-lg"
    >
      <div v-if="event" class="p-1 rounded-lg">
        <EventBuyComponent :event="event"  />
      </div>

      <div class="p-5 lg:pt-10">
        <div
          class=" bg-slate-100 p-1 lg:rounded-lg rounded-lg lg:shadow-lg shadow-lg px-1"
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
              @click="paymentPopup.openPopup(calculateAmount())"
            >
              Jetzt bezahlen
            </button>
          </div>
          <PaymentPopup ref="paymentPopup" :selectedTickets="selectedTickets" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from "vue";
import { useEventStore } from "~/stores/eventIdStore";
import EventBuyComponent from "~/components/Events/EventBuyComponent.vue";
import { Event } from "~/classes/Event";
import { TicketType } from "~/classes/TicketType";
import TicketTypeComponent from "~/components/TicketType/TicketTypeComponent.vue";
import { fetchTicketTypesByEventId, fetchEventById, fetchEventImage } from '~/services/eventService';

const selectedTickets = ref<
  { id: any; name: any; quantity: number; price: any; eventName: string; eventId: any}[]
>([]);

const popupTriggers: Ref<{ buttonTrigger: boolean }> = ref({
  buttonTrigger: false,
});

const tickettypes = ref<TicketType[]>([]);

const event = ref<Event | null>(null);

const eventStore = useEventStore();
const paymentPopup = ref();

let amount = ref(0);


onMounted(async () => {
  const eventId = eventStore.eventId;
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
    if (inputElement && parseInt(inputElement.value) != 0) {
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
  return amount;
}
</script>
