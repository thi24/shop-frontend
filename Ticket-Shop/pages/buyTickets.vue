<template>

    <div class="w-full max-w-md ">
        <div class="mb-4">
            <TicketTypeComponent v-for="(ticketType, index) in tickettypes" :ticketType="ticketType" :key="ticketType.id" :id="index">
            </TicketTypeComponent>
        </div>

    </div>
    <button class="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors" @click=callFunction()>Hier
        bezahlen</button>
</template>

<script lang="ts" setup>
import { TicketType } from '~/classes/TicketType';
import TicketTypeComponent from '~/components/TicketType/TicketTypeComponent.vue';

const tickettypes: Ref<TicketType[]> = ref(getTicketTypes());

function getTicketTypes(): TicketType[] {
    const results: TicketType[] = [];
    //hier in der Theorie aufruf ins Backend für das entsprechend angeclickte Event
    const tickettype1 = new TicketType();
    tickettype1.id = '01575dfb-eb8c-43bd-9182-376d2a7c5123';
    tickettype1.name = "Freitag Ticket";
    tickettype1.price = 19.99;
    results.push(tickettype1);

    const tickettype2 = new TicketType();
    tickettype2.id = '01575dfb-eb8c-43bd-9182-376d2a7c5124';
    tickettype2.name = "Samstag Ticket";
    tickettype2.price = 24.99;
    results.push(tickettype2);

    const tickettype3 = new TicketType();
    tickettype3.id = '01575dfb-eb8c-43bd-9182-376d2a7c5125';
    tickettype3.name = "Wochenend Ticket";
    tickettype3.price = 39.99;
    results.push(tickettype3);

    return results;
}
function callFunction(){
    alert("Wir lösen schonmal aus");
}
</script>