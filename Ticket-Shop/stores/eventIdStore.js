import { defineStore } from 'pinia';

export const useEventStore = defineStore('event', {
    state: () => ({
      eventId: ''
    }),
    actions: {
      setEventId(id) {
        this.eventId = id;
      }
    },  
  });

  