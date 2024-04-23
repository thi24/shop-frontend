<template>
  <div class="max-w-7xl mx-auto px-4 py-6">
    <div class="bg-white shadow-lg rounded-lg">

      <div class="h-64 bg-cover bg-center rounded-t-lg" :style="{ backgroundImage: 'url(' + event.thumbnail + ')' }"></div>

      <div class="p-4">
        <h2 class="text-2xl font-bold mb-2">{{ event.eventName }}</h2>
        <p class="text-gray-700 mb-4">{{ event.description }}</p>
        <div class="mb-4">
          <span class="text-gray-900 font-bold">Datum:</span>
          <span class="text-gray-700">{{ event.startsAt }}</span>
        </div>
        <div class="text-sm text-gray-600">
          <p>{{ event.address.city }}</p>
          <p>{{ event.address.street }}, {{ event.address.zip }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
  import { ref, type Ref } from 'vue';
  import { Event } from '~/classes/Event';
  import { Address } from '~/classes/Address';
  
  const event: Ref<Event> = ref(getEvents()[0]);  // Annahme, dass das erste Event das ausgewählte ist
  
  function getEvents(): Event[] {
      const results: Event[] = [];
      const address = new Address("Main Street", "New City", "NC", "12345");
      const event = new Event();
      event.id = '01575dfb-eb8c-43bd-9182-376d2a7c5f1f';
      event.eventName = "Hippi Parade Smoke Weed 420";
      event.thumbnail = "https://c8.alamy.com/compde/w095m6/marihuana-raucher-leuchten-bei-420-an-der-jahrlichen-420-marihuana-party-in-der-hippie-hill-im-golden-gate-park-in-san-francisco-am-20-april-2018-obwohl-2018-das-erste-jahr-ist-der-rechtlichen-cannibis-in-kalifornien-die-partei-hat-schon-seit-vielen-jahren-foto-von-terry-schmittupi-w095m6.jpg";
      event.description = "Bekiffen Sie sich grenzenlos. Aber lassen Sie sich nicht vom SEK (Söder Einsatzkomando) erwischen.";
      event.address = address;
      results.push(event);
      return results;
  }
  </script>
  