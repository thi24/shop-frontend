<template>
    <div class="flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-lg m-4">
      
        <img class="h-auto max-w-full rounded-t-lg" :src="event.thumbnail" alt="">

        <div class="p-4">
            <h3 class="text-lg font-bold">{{ event.eventName }}</h3>
            <p class="text-gray-700 text-sm">{{ event.description }}</p>
            <button class="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors" @click="() => useRouter().push('/event-dashboard/' + event.id)" icon="navigate_next" :reverse="true">Ansehen</button>
        </div>
    </div>
</template>

<script setup lang="ts">

import type { Event } from '~/classes/Event';

defineProps<{
    event: Event
}>()
</script>

