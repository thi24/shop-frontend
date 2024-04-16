<template>
  <div class="p-8 border-solid border rounded border-black flex">
    <label :for="'number-input-' + ticketType.id" class="flex-1 p-1">{{
      ticketType.name
    }}</label>
    <label :for="'number-input-' + ticketType.id" class="flex-1 p-1"
      >{{ ticketType.price }}€</label
    >
    <input
      :id="'number-input-' + ticketType.id"
      type="number"
      min="0"
      max="999"
      value="0"
      class="w-10 p-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    />
  </div>
</template>

<script setup lang="ts">
import type { TicketType } from "~/classes/TicketType";

defineProps<{
  ticketType: TicketType;
}>();
</script>
