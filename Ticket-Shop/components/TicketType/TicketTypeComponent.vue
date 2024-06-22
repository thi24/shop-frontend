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
    <table class="min-w-full">
      <thead class="">
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
          <td class="py-2 text-sm text-gray-700 font-bold">
            {{
              ticketType.price ? (ticketType.price / 100).toLocaleString("de-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) : ""
            }}€
          </td>
          <td class="py-2">
            <input
              :id="'number-input-' + ticketType.id"
              type="number"
              min="0"
              max="999"
              placeholder="0"
              class="p-1 rounded-lg focus:outline-none w-11 placeholder-gray-400 border-gray-300 border [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { TicketType } from "~/classes/TicketType";

const props = defineProps<{
  tickettypes: TicketType[];
}>();

const { tickettypes } = toRefs(props);
</script>


