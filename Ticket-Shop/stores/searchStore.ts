import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
    state: () => ({
      eventName: '',
    }),
    persist: true,
    actions: {
      searchEventName(eventName: string) {
        this.eventName = eventName;
      },
      setEventName(eventName: string) {
        this.eventName = eventName;
      }
    },  
  });
