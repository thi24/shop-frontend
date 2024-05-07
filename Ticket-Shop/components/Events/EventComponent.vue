<template>
  <div
    class="bg-slate-100 flex flex-col items-center rounded-lg overflow-hidden shadow-xl m-4 cursor-pointer"
    @click="navigateToBuyTickets(event.id)"
  >
    <img class="w-full h-48" :src="event.thumbnail" alt="test" />
    <div
      class="p-4 rounded-md hover:from-gray-300 hover:to-gray-200 active:shadow-none"
    >
      <h3 class="text-lg font-sans">{{ event.eventName }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import type { Event } from "~/classes/Event";
import { useEventStore } from "~/stores/eventIdStore";

defineProps<{
  event: Event;
}>();

const router = useRouter();
const eventStore = useEventStore();

function navigateToBuyTickets(eventId: string) {
  eventStore.setEventId(eventId);
  router.push("/buyTickets");
}
</script>
