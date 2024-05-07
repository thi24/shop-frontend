<template>
  <div class="bg-stone-100">
    <div class="mx-auto">
      <div
        class="pt-4 px-4 hover:rounded-lg rounded-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
      >
        <EventComponent v-for="event in events" :event="event"></EventComponent>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import EventComponent from "~/components/Events/EventComponent.vue";
import { Event } from "~/classes/Event";

const events = ref<Event[]>([]);

onMounted(async () => {
  const token = import.meta.env.VITE_AUTH_TOKEN;
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    events.value = await $fetch(
      "https://dev.benevolo.de/api/event-service/events",
      options
    );
  } catch (error) {
    console.error("Failed to load events:", error);
  }
});
</script>
