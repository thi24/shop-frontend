<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      
      <div class="bg-white rounded-lg p-8 max-w-md">
        <ul>
            <li v-for="ticket in selectedTickets" :key="ticket.id">
              {{ ticket.name }}: {{ ticket.quantity }}
            </li>
          </ul>
      <p>kleiner Test</p>
        <button @click="closePopup" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Jetzt Bezahlen</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['togglePopup', 'selectedTickets'],
    setup(props) {
      const selectedTickets = props.selectedTickets;
  
      const closePopup = () => {
        props.togglePopup();
      };
  
      return {
        selectedTickets,
        closePopup
      };
    }
  };
  </script>
  