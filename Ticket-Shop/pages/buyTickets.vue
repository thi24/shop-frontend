<template>
  <div class="w-full max-w-md p-4">
    <TicketTypeComponent
      v-for="ticketType in tickettypes"
      :ticketType="ticketType"
      :key="ticketType.id"
    ></TicketTypeComponent>
    <button
      class="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
      @click="logUserInputs"
    >
      Hier bezahlen
    </button>
    <button @click="togglePopup">Open Popup</button>
    <Popup v-if="popupTriggers.buttonTrigger" :togglePopup="togglePopup" :selectedTickets="selectedTickets">
      <ul>
        <li v-for="ticket in selectedTickets" :key="ticket.id">
          {{ ticket.name }}: {{ ticket.quantity }}
        </li>
      </ul>
    </Popup>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from "vue";
import Popup from "../components/PaymentPopup/Popup.vue";
import { TicketType } from "~/classes/TicketType";
import TicketTypeComponent from "~/components/TicketType/TicketTypeComponent.vue";

const tickettypes: Ref<TicketType[]> = ref(getTicketTypes());
const popupTriggers: Ref<{ buttonTrigger: boolean }> = ref({
  buttonTrigger: false,
});
const selectedTickets = ref<{ id: any; name: any; quantity: number }[]>([]);

function getTicketTypes(): TicketType[] {
  const results: TicketType[] = [];

  const tickettype1 = new TicketType();
  tickettype1.id = "01575dfb-eb8c-43bd-9182-376d2a7c5123";
  tickettype1.name = "Freitag Ticket";
  tickettype1.price = 19.99;
  results.push(tickettype1);

  const tickettype2 = new TicketType();
  tickettype2.id = "01575dfb-eb8c-43bd-9182-376d2a7c5124";
  tickettype2.name = "Samstag Ticket";
  tickettype2.price = 24.99;
  results.push(tickettype2);

  const tickettype3 = new TicketType();
  tickettype3.id = "01575dfb-eb8c-43bd-9182-376d2a7c5125";
  tickettype3.name = "Wochenend Ticket";
  tickettype3.price = 39.99;
  results.push(tickettype3);

  return results;
}

function logUserInputs() {
  selectedTickets.value = [];

  // Iterieren durch die Tickettypen und speichern der ausgewählten Tickets
  tickettypes.value.forEach((ticketType) => {
   
    const inputElement = document.querySelector(
      `#number-input-${ticketType.id}`
    ) as HTMLInputElement;
    if (inputElement && parseInt(inputElement.value) != 0) {
      
      selectedTickets.value.push({
        id: ticketType.id,
        name: ticketType.name,
        quantity: parseInt(inputElement.value),
      });
    }
  });

  // Popup anzeigen, wenn Tickets ausgewählt wurden
  if (selectedTickets.value.length != 0) {
    togglePopup();
  }
}

function togglePopup() {
  popupTriggers.value.buttonTrigger = !popupTriggers.value.buttonTrigger;
}
</script>
