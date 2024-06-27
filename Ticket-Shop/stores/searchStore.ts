import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
    state: () => ({
      eventName: '',
    }),
    persist: true,
    actions: {
      searchEventName(eventName) {
        this.eventName = eventName;
      },
      setEventName(eventName) {
        this.eventName = eventName;
      }
    },  
  });
