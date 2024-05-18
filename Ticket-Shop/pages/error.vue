<template>
    <div>
        <h1>Da ist was schief gelaufen :(</h1>
    </div>
    <div v-if="processError">
        <p>Text für wenn Prozess fehschlägt</p>
        <p></p>
    </div>
    <div v-if="paymentError">
        <p>Text für wenn Zahlung fehschlägt</p>
        <p></p>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
</script>
