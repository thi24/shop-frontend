<template>
  <div class="max-w-9xl mx-auto px-1 py-1 lg:px-3 lg:py-3">
    <div
      class="grid grid-cols-1 lg:grid-cols-2 gap-0 sm:gap-2 hover:rounded-lg"
    >
      <div class="p-1 rounded-lg">
        <EventBuyComponent :event="event" />
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

          <div class="flex justify-center mt-4 pb-4"></div>
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
var event = ref<Event>();

const eventStore = useEventStore();

onMounted(async () => {
  const token = import.meta.env.VITE_AUTH_TOKEN;
  const eventId = eventStore.eventId;

  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    tickettypes.value = await $fetch(
      "https://dev.benevolo.de/api/event-service/ticket-types?eventId=" +
        eventId,
      options
    );
    event = await $fetch(
      "https://dev.benevolo.de/api/event-service/events/" + eventId,
      options
    );
  } catch (error) {
    console.error("Failed to load ticket types:", error);
  }
});

function togglePopup() {
  popupTriggers.value.buttonTrigger = !popupTriggers.value.buttonTrigger;
}
</script>
