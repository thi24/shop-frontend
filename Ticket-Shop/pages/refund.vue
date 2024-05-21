<template>
    <div>
        <h1>Rückerstattungen</h1>
        <h2>Welche Tickets wollen sie Rückerstattet haben?</h2>
        <ul>
            <li v-for="ticket in tickets" :key="ticket.id">
                <span>{{ ticket.name }}</span>
                <button
                    class="relative z-0 h-12 m-5 rounded-full bg-blue-500 px-6 text-neutral-50 after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:rounded-full after:bg-blue-500 hover:after:scale-x-125 hover:after:scale-y-150 hover:after:opacity-0 hover:after:transition hover:after:duration-500"
                    @click="refundTicket(ticket.id)"
                >
                    Rückerstatten
                </button>
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
