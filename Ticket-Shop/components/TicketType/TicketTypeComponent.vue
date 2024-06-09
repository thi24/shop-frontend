<template>
  <div
    class="relative bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none !m-0 p-6"
  >
    <h5
      class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 capitalize"
    >
      Tickets
    </h5>
  </div>
  <div class="p-6 border-t border-blue-gray-50">
    <div
      v-for="ticketType in tickettypes"
      :key="ticketType.id"
      class="p-3 m-3 flex bg-white border-b"
    >
      <label :for="'number-input-' + ticketType.id" class="flex-1">{{
        ticketType.name
      }}</label>
      <label :for="'number-input-' + ticketType.id" class="flex-1"
        >{{ ticketType.price }}€</label
      >
      <input
        :id="'number-input-' + ticketType.id"
        type="text"
        min="0"
        max="999"
        placeholder="0"
        class="p-1 rounded-lg focus:outline-none w-11 placeholder-gray-400 border-gray-300 border [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TicketType } from "~/classes/TicketType";

const props = defineProps<{
  tickettypes: TicketType[];
}>();

const { tickettypes } = toRefs(props);
</script>
