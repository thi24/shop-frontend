import { defineStore } from 'pinia';


export const useEventStore = defineStore('event', {
    state: () => ({
      eventId: '',
    }),
    persist: true,
    actions: {
      setEventId(id) {
        this.eventId = id;
      },

    },  
  });



  