<template>
  <div
    class="bg-white flex flex-col items-center rounded-lg overflow-hidden shadow-xl m-4 cursor-pointer"
    @click="navigateToBuyTickets(event.id)"
  >
    <div v-if="loading" class="flex justify-center items-center w-full h-48">
      <div role="status">
        <LoadingSign />
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <img v-else class="w-full h-48 object-cover" :src="thumbnail" alt="test" />
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
import { fetchEventImage } from "~/services/eventService";

import LoadingSign from "~/components/svg/loading-sign.vue";

import noImage from "~/assets/image/no_image.png";

const props = defineProps<{
  event: Event;
}>();
const loading = ref<boolean>(true);
const thumbnail = ref<string | undefined>(undefined);

onMounted(async () => {
  try {
    thumbnail.value = await fetchEventImage(props.event.id);
  } catch (error) {
    thumbnail.value = noImage;
  } finally {
    loading.value = false;
  }
});

const router = useRouter();
const eventStore = useEventStore();

function navigateToBuyTickets(eventId: string) {
  eventStore.setEventId(eventId);
  router.push("/buyTickets");
}
</script>
