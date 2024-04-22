<template>
  <div class=" w-full max-w-md p-4">
    <div class="mx-auto">
    <TicketTypeComponent
      v-for="ticketType in ticketTypes"
      :ticketType="ticketType"
      :key="ticketType.id"
    ></TicketTypeComponent>
    <button
      class="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
      @click="logUserInputs"
    >
      jetzt bezahlen
    </button>
  </div>
</div>

</template>



<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useEventStore } from '~/stores/eventIdStore';
import TicketTypeComponent from '~/components/TicketType/TicketTypeComponent.vue';
import type { TicketType } from '~/classes/TicketType';

const eventStore = useEventStore();

const ticketTypes = ref<TicketType[]>([]);

onMounted(async () => {
  const token = import.meta.env.VITE_AUTH_TOKEN;
  const eventId = eventStore.eventId;

  if (eventId) {
    try {
      const options = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      ticketTypes.value = await fetch(`https://dev.benevolo.de/api/event-service/ticket-types?eventId=${eventId}`, options).then(res => res.json());
    } catch (error) {
      console.error('Failed to load ticket types:', error);
    }
  }
});

function logUserInputs() {
  ticketTypes.value.forEach((ticketType) => {
    const inputElement = document.querySelector(
      `#number-input-${ticketType.id}`
    ) as HTMLInputElement;
    if (inputElement) {
      console.log(`Ticket '${ticketType.name}': ${inputElement.value}`);
    }
  });
}

</script>
