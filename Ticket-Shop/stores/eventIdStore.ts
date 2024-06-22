import { defineStore } from 'pinia';

export const useEventStore = defineStore('event', {
    state: () => ({
      eventId: '' as string,
      eventName: '' as string,
    }),
    persist: true,
    actions: {
      setEventId(id: string) {
        this.eventId = id;
      },
      setEventName(name: string) {
        this.eventName = name;
      },
    },  
  });
