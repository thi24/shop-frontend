<template>
  <div
    class="relative bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none !m-0 p-6"
  >
    <h5
      class="block antialiased tracking-normal font-sans text-xl leading-snug text-black capitalize font-bold"
    >
      Tickets
    </h5>
  </div>
  <div class="p-6 border-t border-blue-gray-50">
    <table class="min-w-full" aria-label="Tickettypes">
      <thead>
        <tr>
          <th class="sr-only">Name</th>
          <th class="sr-only">Price</th>
          <th class="sr-only">Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="ticketType in tickettypes"
          :key="ticketType.id"
          class="border-b"
        >
          <td class="py-2 text-gray-900 font-bold">
            {{ ticketType.name }}
          </td>
          <td class="py-2 text-sm text-gray-7000 font-bold">
            {{ formatPrice(ticketType.price ?? null) }}
          </td>
          <td class="py-2">
            <input
              :id="'number-input-' + ticketType.id"
              type="number"
              min="0"
              max="99"
              placeholder="0"
              class="p-1 rounded-lg focus:outline-none w-11 placeholder-gray-400 border-gray-300 border [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
              @input="filterInput($event)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { TicketType } from "~/classes/TicketType";
import { formatPrice } from "~/utils/formatPrice";

const props = defineProps<{
  tickettypes: TicketType[];
}>();

const { tickettypes } = toRefs(props);

function filterInput(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  let inputValue = inputElement.value;
  inputValue = inputValue.replace(/[^0-9]/g, '');
  if (parseInt(inputValue) > 99) {
    inputValue = '99';
  }
  inputElement.value = inputValue;
}
</script>