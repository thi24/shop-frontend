<template>
  <div
    class="flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-xl  m-4 cursor-pointer"
    @click="navigateToBuyTickets(event.id)"
  >
    <img class="w-full h-48 " :src="event.thumbnail" alt="">
    <div class="p-4 rounded-md hover:from-gray-300 hover:to-gray-200 active:shadow-none">
      <h3 class="text-lg font-sans ">{{ event.eventName }}</h3>
      <div class="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
    </div>

</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Event } from '~/classes/Event';
import { useEventStore } from '~/stores/eventIdStore';

defineProps<{
  event: Event
}>()

const router = useRouter();
const eventStore = useEventStore();

function navigateToBuyTickets(eventId: string) {
  eventStore.setEventId(eventId);
  router.push('/buyTickets');
}
</script>
