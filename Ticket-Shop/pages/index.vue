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
import { compileScript } from "vue/compiler-sfc";

const events: Ref<Event[]> = ref(getEvents());
onMounted(async () => {
  const url = window.location.href;
  if (window.location.href == "http://localhost:3000/") {
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
        "https://engine.pe.benevolo.de/atlas_engine/api/v1/process_models/g220a903d-0191-4af7-996f-5961b83b85ad_Process/start",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer ZwZjA2yArALFjvW21DJiOMsYPSmSVad1eAhbpmEmhdWkAoKrxvZMvTOliWFZ7huRfoVcgOXuYcvi5KFcCqHTovDuJ3EkWPjURo6IsM8A",
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

function getEvents(): Event[] {
  const results: Event[] = [];
  const event = new Event();
  event.id = "01575dfb-eb8c-43bd-9182-376d2a7c5f1f";
  event.eventName = "Hippi Parade Smoke Weed 420";
  event.thumbnail =
    "https://c8.alamy.com/compde/w095m6/marihuana-raucher-leuchten-bei-420-an-der-jahrlichen-420-marihuana-party-in-der-hippie-hill-im-golden-gate-park-in-san-francisco-am-20-april-2018-obwohl-2018-das-erste-jahr-ist-der-rechtlichen-cannibis-in-kalifornien-die-partei-hat-schon-seit-vielen-jahren-foto-von-terry-schmittupi-w095m6.jpg";
  event.description =
    "Bekiffen Sie sich grenzenlos. Aber lassen Sie sich nicht vom SEK (Söder Einsatzkomando) erwischen.";
  results.push(event);
  const event2 = new Event();
  event2.id = "01575dfb-eb8c-43bd-9182-376d2a7c5f1f";
  event2.eventName = "Ü80 Seniorenparty";
  event2.thumbnail =
    "https://img.luzernerzeitung.ch/2018/4/11/2b210e9f-2912-48b2-a392-8b5f87e9f79a.jpeg?width=640&height=360&fit=bound&quality=75&auto=webp&crop=640,360,x0,y32&wmark=none";
  event2.description =
    "Verbringen Sie einen entspannten Abend mit Horst und Gertlinde. Inklusive Bingo und Kreuzworträtsel.";
  results.push(event2);
  const event3 = new Event();
  event3.id = "01575dfb-eb8c-43bd-9182-376d2a7c5f1f";
  event3.eventName = "Tomatenschlacht in Seoul";
  event3.thumbnail =
    "https://www.stuttgarter-zeitung.de/media.media.1405e2b5-5149-4906-bc6d-29b99a1ded4b.original1024.jpg";
  event3.description = "Beschmeißen Sie sich mit Tomaten und Tomatenpampe.";
  results.push(event3);
  return results;
}
</script>
