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
            <svg
              aria-hidden="true"
              class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 h-4 w-4 text-indigo-700"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 h-4 w-4 text-indigo-700"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="h-4 w-4 text-indigo-700"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                stroke="currentColor"
                d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
                fill="white"
              />
            </svg>
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
import noImage from "~/assets/Image/no_image.png";

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
    //console.error("Failed to load event image:", error);
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
