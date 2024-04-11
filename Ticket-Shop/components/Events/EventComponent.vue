<template>
    <div class="p-6 flex-items-stretch">
        <img class="object-cover h-48 w-96" :src="event.thumbnail" alt="">
        <div class="event__body">
            <h3 class="event__heading">{{ event.eventName }}</h3>
            <p class="event__description">{{ event.description }}</p>
            <button class="event__view" @click="() => useRouter().push('/event-dashboard/' + event.id)" icon="navigate_next" :reverse="true">Ansehen</button>
        </div>
    </div>
</template>

<script setup lang="ts">

import type { Event } from '~/classes/Event';

defineProps<{
    event: Event
}>()
</script>

