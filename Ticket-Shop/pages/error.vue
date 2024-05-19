<template>
    <div>
        <h1>Da ist was schief gelaufen :(</h1>
    </div>
    <div v-if="processError">
        <p>Text für wenn Prozess fehschlägt</p>
        <p></p>
    </div>
    <div v-else>
        <p>Text für wenn Zahlung fehschlägt</p>
        <p></p>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
export default {
    data() {
        return {
            processError: true, // Hier kannst du den initialen Wert setzen
        };
    },
};
</script>
