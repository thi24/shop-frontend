<template>
  <div class="bg-white p-4 rounded-xl shadow-md">
    <div class="flex flex-col lg:flex-row">
      <!-- hier wird das Bild ausgegeben -->
      <div class="h-64 bg-cover bg-center rounded-lg flex-shrink-0 lg:w-1/2">
        <div
          v-if="loading"
          class="flex justify-center items-center w-full h-48"
        >
          <div role="status">
            <LoadingSign />
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <img
          v-else
          class="object-scale-down max-h-full rounded-md m-auto"
          :src="thumbnail"
          alt="Thumbnail"
        />
      </div>
      <!-- hier die Event Details -->
      <div class="mt-2 lg:mt-0 lg:ml-4 flex-grow">
        <dl>
          <div>
            <dt class="sr-only">Event Name</dt>
            <dd class="text-xl font-bold">{{ event.eventName }}</dd>
          </div>
          <div class="mt-2">
            <dt class="sr-only">Description</dt>
            <dd class="text-sm text-gray-700 mb-4">
              <span v-if="!showFullDescription"
                >{{ truncatedDescription }}...</span
              >
              <span v-else>{{ event.description }}</span>
              <button
                v-if="shouldShowButton"
                @click="toggleDescription"
                class="text-blue-500 ml-2"
              >
                {{ showFullDescription ? "Weniger anzeigen" : "Mehr anzeigen" }}
              </button>
            </dd>
          </div>
          <div class="flex items-center gap-2 mt-2">
            <CalenderSign />
            <div>
              <dt class="sr-only">Date</dt>
              <dd class="text-gray-900 font-bold">
                Datum:
                <span class="text-gray-700 text-sm">{{
                  formatDate(new Date(event.startsAt))
                }}</span>
              </dd>
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2">
            <TimeSign />
            <div>
              <dt class="sr-only">Start Time</dt>
              <dd class="text-gray-900 font-bold">
                Beginn:
                <span class="text-gray-700 text-sm"
                  >{{ formatTime(new Date(event.startsAt)) }} Uhr</span
                >
              </dd>
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2">
            <PlaceSign />
            <div>
              <dt class="sr-only">Address</dt>
              <dd class="font-bold text-gray-900">
                Adresse:
                <span class="text-sm text-gray-700"
                  >{{ event.address.street }}, {{ event.address.zip }}
                  {{ event.address.city }}</span
                >
              </dd>
            </div>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Event } from "~/classes/Event";
import { fetchEventImage } from "~/services/eventService";

import LoadingSign from "~/components/svg/loading-sign.vue";
import CalenderSign from "~/components/svg/calender-sign.vue";
import TimeSign from "~/components/svg/time-sign.vue";
import PlaceSign from "~/components/svg/place-sign.vue";

import noImage from "~/assets/image/no_image.png";

const props = defineProps<{
  event: Event;
}>();
const loading = ref<boolean>(true);
const thumbnail = ref<string | undefined>(undefined);
const showFullDescription = ref<boolean>(false);

const truncatedDescription = computed(() => {
  const words = props.event.description.split(" ");
  if (words.length <= 20) return props.event.description;
  return words.slice(0, 20).join(" ");
});

const toggleDescription = () => {
  showFullDescription.value = !showFullDescription.value;
};

const shouldShowButton = computed(() => {
  return props.event.description.split(" ").length > 20;
});

const formatTime = (date: Date) => {
  return date.toISOString().split("T")[1].slice(0, 5);
};

onMounted(async () => {
  try {
    thumbnail.value = await fetchEventImage(props.event.id);
  } catch (error) {
    thumbnail.value = noImage;
  } finally {
    loading.value = false;
  }
});

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("de-DE", options);
}
</script>
