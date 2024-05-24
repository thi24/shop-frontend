<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div class="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 class="text-2xl font-bold text-green-600">Zahlung erfolgreich!</h1>
        <p class="mt-4 text-gray-600">Vielen Dank für Ihre Bestellung. Ihre Zahlung war erfolgreich.</p>
        <div class="mt-6">
          <h2 class="text-xl font-semibold">Bestelldetails</h2>
          <ul class="mt-2 text-left text-gray-700">
            <li><strong>Bestellnummer:</strong> {{ orderNumber }}</li>
            <li><strong>Event:</strong> {{ eventDetails }}</li>
            <li><strong>Betrag:</strong> {{ amount }} €</li>
          </ul>
        </div>
        <button @click="goToHome" class="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
          Zur Startseite
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { onMounted, ref } from 'vue';
  
  const router = useRouter();
  const orderNumber = ref('');
  const eventDetails = ref('');
  const amount = ref(0);
  
  const getParameterByName = (name: string, url: string) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };
  
  onMounted(() => {
    const url = window.location.href;
    orderNumber.value = getParameterByName('orderNumber', url) || '';
    eventDetails.value = getParameterByName('event', url) || '';
    amount.value = parseFloat(getParameterByName('amount', url) || '0');
  });
  
  const goToHome = () => {
    router.push('/');
  };
  </script>