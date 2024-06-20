<template>
  <div class="mx-auto">
    <div class="flex justify-center items-center">
      <p
        id="no-results"
        class="flex justify-center text-gray-600 my-10"
        style="display: none"
      >
        Keine Suchergebnisse
      </p>
    </div>
    <div
      class="pt-4 px-4 hover:rounded-lg rounded-3xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-4"
    >
      <EventComponent v-for="event in events" :event="event"></EventComponent>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import EventComponent from "~/components/Events/EventComponent.vue";
import { Event } from "~/classes/Event";
import { fetchEvents, fetchEventsByEventName } from "~/services/eventService";
import { useSearchStore } from "~/stores/searchStore";

const events = ref<Event[]>([]);
const searchStore = useSearchStore();

onMounted(async () => {
  try {
    const eventName = searchStore.eventName;
    writeStoreInInput(eventName);

    if (eventName == null || eventName == "") {
      try {
        events.value = await fetchEvents();
      } catch (error) {}
      document.getElementById("no-results").style.display =
        events.value.length === 0 ? "block" : "none";
    } else {
      try {
        events.value = await fetchEventsByEventName(eventName);
      } catch (error) {}
      document.getElementById("no-results").style.display =
        events.value.length === 0 ? "block" : "none";
    }
  } catch (error) {
    console.error("Failed to load events:", error);
  }
});

function writeStoreInInput(eventName: string) {
  var inputs = document.getElementsByTagName("input");

  for (var i = 0; i < inputs.length; ++i) {
    inputs[i].value = eventName;
  }
}
</script>
