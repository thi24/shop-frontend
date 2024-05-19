<template>
    <div>
        <h1>Da ist was schief gelaufen :(</h1>
    </div>
    <div v-if="processError">
        <p>Text für wenn Prozess fehschlägt</p>
        <p></p>
        <button
            class="relative z-0 h-12 rounded-full bg-blue-500 px-6 text-neutral-50 after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:rounded-full after:bg-blue-500 hover:after:scale-x-125 hover:after:scale-y-150 hover:after:opacity-0 hover:after:transition hover:after:duration-500"
            @click="toggleProcessError()"
        >
            Das eine Verschwinden lassen
        </button>
    </div>
    <div v-else>
        <p>Text für wenn Zahlung fehschlägt</p>
        <button
            class="relative z-0 h-12 rounded-full bg-blue-500 px-6 text-neutral-50 after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:rounded-full after:bg-blue-500 hover:after:scale-x-125 hover:after:scale-y-150 hover:after:opacity-0 hover:after:transition hover:after:duration-500"
            @click="toggleProcessError()"
        >
            Das andere Verschwinden lassen
        </button>
    </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
    data() {
        return {
            processError: true, // Hier kannst du den initialen Wert setzen
        };
    },
    methods: {
        toggleProcessError() {
            this.processError = !this.processError;
        },
    },
};
</script>
