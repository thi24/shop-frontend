import { defineStore } from 'pinia';

export const useEventStore = defineStore('event', {
    state: () => ({
      eventId: '',
      thumbnail: "",
    }),
    actions: {
      setEventId(id) {
        this.eventId = id;
      },
      setEventThumbnail(thumbnail) {
        this.thumbnail = thumbnail
      }
    },  
  });

  