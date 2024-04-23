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
      class="p-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
    />
  </div>
</template>

<script setup lang="ts">


defineProps<{
  ticketType: TicketType;
}>();

import { TicketType } from "~/classes/TicketType";


</script>