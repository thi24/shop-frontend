<template>
    <div>
        <h1>Rückerstattungen</h1>
        <h2>Welche Tickets wollen sie Rückerstattet haben?</h2>
        <ul>
            <li v-for="ticket in tickets" :key="ticket.id">
                <span>{{ ticket.name }}</span>
                <button @click="refundTicket(ticket.id)">Rückerstatten</button>
            </li>
        </ul>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
onMounted(() => {
    fetchTickets();
});
const tickets = ref([]);
const fetchTickets = async () => {
    const response = await fetch("http://localhost:3000/tickets");
    const data = await response.json();
    tickets.value = data;
};
const refundTicket = async (ticketId: number) => {
    await fetch(`http://localhost:3000/tickets/${ticketId}`, {
        method: "DELETE",
    });
    fetchTickets();
};
</script>
