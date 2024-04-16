<template>
  <div class="">
    <div
      class="h-auto max-w-md p-4 border-solid border rounded border-gray-300"
    >
      <TicketTypeComponent
        v-for="ticketType in tickettypes"
        :ticketType="ticketType"
        :key="ticketType.id"
      ></TicketTypeComponent>
      <hr class="" />
      <div class="flex flex-col items-center w-full">
        <button
          class="m-3 p-4 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors flex"
          @click="logUserInputs"
        >
          Hier bezahlen
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TicketType } from "~/classes/TicketType";
import TicketTypeComponent from "~/components/TicketType/TicketTypeComponent.vue";

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
