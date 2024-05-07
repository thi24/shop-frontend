<template>
  <div
    class="bg-slate-100 flex flex-col items-center rounded-lg overflow-hidden shadow-xl m-4 cursor-pointer"
    @click="navigateToBuyTickets(event.id, thumbnail)"
  >
    <img class="w-full h-48" :src="thumbnail" alt="Thumbnail" />
    <div
      class="p-4 rounded-md hover:from-gray-300 hover:to-gray-200 active:shadow-none"
    >
      <h3 class="text-lg font-sans">{{ event.eventName }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import type { Event } from "~/classes/Event";
import { useEventStore } from "~/stores/eventIdStore";

const props = defineProps<{
  event: Event;
}>();

const thumbnail = ref<string | undefined>(undefined);

onMounted(async () => {
  const token = import.meta.env.VITE_AUTH_TOKEN;
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(
      "https://dev.benevolo.de/api/event-service/events/" +
        props.event.id +
        "/image",
      options
    );
    const blob = await response.blob();
    thumbnail.value = URL.createObjectURL(blob);
  } catch (error) {
    console.error("Failed to load event image:", error);
  }
});
const router = useRouter();
const eventStore = useEventStore();

function navigateToBuyTickets(eventId: string, thumbnail: string | undefined) {
  eventStore.setEventId(eventId);
  eventStore.setEventThumbnail(thumbnail);
  router.push("/buyTickets");
}
</script>
