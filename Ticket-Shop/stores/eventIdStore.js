import { defineStore } from 'pinia';


export const useEventStore = defineStore('event', {
    state: () => ({
      eventId: '',
      eventName: '',
    }),
    persist: true,
    actions: {
      setEventId(id) {
        this.eventId = id;
      },
      setEventName(name) {
        this.eventName = name;
      },

    },  
  });





  