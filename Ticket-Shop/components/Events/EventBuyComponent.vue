<template>
  <div class="max-w-7xl mx-auto px-4 py-6">
    <div class="bg-slate-100 shadow-lg rounded-lg">
      
      <div
        class="h-64 bg-cover bg-center rounded-t-lg"
        :style="{ backgroundImage: 'url(' + event.thumbnail + ')' }"
      ></div>

      <div class="p-4">
        <h2 class="text-2xl font-bold mb-2">{{ event.eventName }}</h2>
        <p class="text-gray-700 mb-4">{{ event.description }}</p>
        <div class="mb-4">
          <span class="text-gray-900 font-bold">Datum:</span>
          <span class="text-gray-700">{{ event.startsAt }}</span>
        </div>
       <div class="text-sm text-gray-600">
          <p>{{ event.address.street }}</p>
          <p>{{ event.address.street }}, {{ event.address.zip }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { Event } from "~/classes/Event";



defineProps<{
  event: Event;
}>();
</script>
