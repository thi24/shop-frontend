<template>

<template>
  <div class="p-3 m-3 flex bg-white border-b">
    <label :for="'number-input-' + ticketType.id" class="flex-1">{{ ticketType.name }}</label>
    <label :for="'number-input-' + ticketType.id" class="flex-1">{{ ticketType.price }}€</label>
    <input :id="'number-input-' + ticketType.id" type="number" min="0" max="999" v-model="ticketQuantity" class="p-1 rounded-lg focus:outline-none" />
  </div>
</template>

</template>

<script setup lang="ts">


defineProps<{
  ticketType: TicketType;
}>();

import { TicketType } from "~/classes/TicketType";


</script>