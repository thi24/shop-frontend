<template>
    <div class="flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-lg m-4">
        <div class="w-full">
        <img class="h-48 w-full object-cover rounded-t-lg" :src="event.thumbnail" alt="">
    </div>
        <div class="p-4">
            <h3 class="text-lg font-bold">{{ event.eventName }}</h3>
            <p class="text-gray-700 text-sm">{{ event.description }}</p>
            <button class="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors w-full sm:w-auto"  icon="navigate_next" :reverse="true">Ansehen</button>
          <!-- @click="() => useRouter().push('/event-dashboard/' + event.id)-->
        </div>
    </div>
</template>

<script setup lang="ts">

import type { Event } from '~/classes/Event';

defineProps<{
    event: Event
}>()
</script>

