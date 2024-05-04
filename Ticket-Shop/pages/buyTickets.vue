<template>
  <div class="max-w-9xl mx-auto px-1 py-1 lg:px-3 lg:py-3">
    <div
      class="grid grid-cols-1 lg:grid-cols-2 gap-0 sm:gap-2 hover:rounded-lg"
    >
      <div class="p-1 rounded-lg">
        <EventBuyComponent />
      </div>

      <div class="p-5 lg:pt-10">
        <div
          class="bg-slate-100 p-1 lg:rounded-lg rounded-lg lg:shadow-lg shadow-lg px-1"
        >
          <div
            v-for="ticketType in tickettypes"
            :key="ticketType.id"
            class="last:mb-0"
          >
            <TicketTypeComponent :ticketType="ticketType" />
          </div>

          <div class="flex justify-center mt-4 pb-4">
            <button
              class="relative z-0 h-12 rounded-full bg-blue-500 px-6 text-neutral-50 after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:rounded-full after:bg-blue-500 hover:after:scale-x-125 hover:after:scale-y-150 hover:after:opacity-0 hover:after:transition hover:after:duration-500"
              @click="
                paymentPopup.openPopup(calculateAmount(), selectedTickets)
              "
            >
              Jetzt bezahlen
            </button>
          </div>
          <PaymentPopup ref="paymentPopup" :selectedTickets="selectedTickets" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from "vue";

import PaymentPopup from "../components/PaymentPopup/PaymentPopup.vue";
import EventBuyComponent from "../components/Events/EventBuyComponent.vue";
import { TicketType } from "~/classes/TicketType";
import TicketTypeComponent from "~/components/TicketType/TicketTypeComponent.vue";

const paymentPopup = ref();

const tickettypes: Ref<TicketType[]> = ref(getTicketTypes());
let amount = ref(0);

const selectedTickets = ref<
  { id: any; name: any; quantity: number; price: any }[]
>([]);

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

function getUserInputs() {
  selectedTickets.value = [];

  tickettypes.value.forEach((ticketType) => {
    const inputElement = document.querySelector(
      `#number-input-${ticketType.id}`
    ) as HTMLInputElement;
    if (inputElement && parseInt(inputElement.value) != 0) {
      selectedTickets.value.push({
        id: ticketType.id,
        name: ticketType.name,
        price: ticketType.price,
        quantity: parseInt(inputElement.value),
      });
    }
  });

  // Popup anzeigen, wenn Tickets ausgewählt wurden
  if (selectedTickets.value.length != 0) {
  }
}

function calculateAmount() {
  getUserInputs();
  amount.value = 0;
  for (let i = 0; i < selectedTickets.value.length; i++) {
    amount.value =
      amount.value +
      selectedTickets.value[i].price * selectedTickets.value[i].quantity;
  }
  return amount;
}
</script>
