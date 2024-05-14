<template>
  <div class="bg-stone-100">
    <div class="mx-auto">
      <div
        class="pt-4 px-4 hover:rounded-lg rounded-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
      >
        <EventComponent v-for="event in events" :event="event"></EventComponent>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import EventComponent from "~/components/Events/EventComponent.vue";
import { Event } from "~/classes/Event";
import { fetchEvents } from '~/services/eventService';
import { compileScript } from "vue/compiler-sfc";

const events = ref<Event[]>([]);

onMounted(async () => {
  const url = window.location.href;
  
    try {
    events.value = await fetchEvents(); 
  } catch (error) {
    console.error("Failed to load events:", error);
  }
  if (window.location.href == useRuntimeConfig().public.returnUrl) {
    return;
  }
  const redirectStatus = getParameterByName("redirect_status", url);
  if (redirectStatus === "succeeded") {
    const jsonString = url.split("?")[1].split("=")[0];
    //Muss noch aufgeraeumt werden
    const replacedString = decodeURIComponent(jsonString);
    const parsedData = JSON.parse(replacedString);
    const newData = JSON.stringify({
      returnOn: 1,
      initialToken: parsedData,
    });
    console.log(newData);
    window.history.replaceState({}, document.title, window.location.pathname);

    try {
      const response = await fetch(
        useRuntimeConfig().public.processEngineStart,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + useRuntimeConfig().public.processToken,
            "Content-Type": "application/json",
          },
          body: newData,
        }
      ); 

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    console.error("Zahlung fehlgeschlagen oder Redirect-Status ungültig.");
  }
});

function getParameterByName(name: string, url: string) {
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}



</script>
