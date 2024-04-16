<template>
    <div class="p-6 flex-items-stretch">
        <div class="event__body">
            <label for="number-input" class="block mb-2 text-sm font-medium text-black">{{ ticketType.name }}</label>
            <label for="number-input" class="block mb-2 text-sm font-medium text-black">{{ ticketType.price }}</label>
            <input type="number" min="1" max="999" value="1" class="w-16 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
        </div>
    </div>
</template>

<script setup lang="ts">

import type { TicketType } from '~/classes/TicketType';

defineProps<{
    ticketType: TicketType
}>()
</script>

