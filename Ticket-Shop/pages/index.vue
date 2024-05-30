<template>
  
        <div class="mx-auto">
            <div
                class="pt-4 px-4 hover:rounded-lg rounded-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
            >
                <EventComponent
                    v-for="event in events"
                    :event="event"
                ></EventComponent>

            </div>
        </div>

</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import EventComponent from "~/components/Events/EventComponent.vue";
import { Event } from "~/classes/Event";
import { fetchEvents } from "~/services/eventService";

const events = ref<Event[]>([]);

onMounted(async () => {
    try {
        events.value = await fetchEvents();
    } catch (error) {
        console.error("Failed to load events:", error);
    }
});
</script>
