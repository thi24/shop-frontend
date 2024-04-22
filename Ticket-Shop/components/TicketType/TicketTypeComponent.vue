<template>
  <div class="p-3 m-3 border-solid border rounded border-gray-300 flex">
    <label :for="'number-input-' + ticketType.id" class="flex-1">{{
      ticketType.name
    }}</label>
    <label :for="'number-input-' + ticketType.id" class="flex-1"
      >{{ ticketType.price }}€</label
    >
    <input
      :id="'number-input-' + ticketType.id"
      type="number"
      min="0"
      max="999"
      value="0"
      class="p-1 w-15 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    />
  </div>
</template>

<script setup lang="ts">


defineProps<{
  ticketType: TicketType;
}>();

import { TicketType } from "~/classes/TicketType";


const tickettypes: Ref<TicketType[]> = ref(getTicketTypes());

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
  tickettypes.value.forEach((ticketType) => {
    const inputElement = document.querySelector(
      `#number-input-${ticketType.id}`
    ) as HTMLInputElement;
    if (inputElement) {
      console.log(`Ticket '${ticketType.name}': ${inputElement.value}`);
    }
  });
}
</script>

