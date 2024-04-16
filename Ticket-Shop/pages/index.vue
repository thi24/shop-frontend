<template>
    <div class="bg-white-100 p-4 sm:p-6 lg:p-8">
        <div class="max-w-6xl mx-auto">
            <h1 class="text-2xl font-black text-center mb-6">Veranstaltungen</h1>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <EventComponent v-for="event in events" :event="event"></EventComponent>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { Event } from '~/classes/Event';
import EventComponent from '~/components/Events/EventComponent.vue';

const events: Ref<Event[]> = ref(getEvents());

function getEvents(): Event[] {
    const results: Event[] = [];
    const event = new Event();
    event.id = '01575dfb-eb8c-43bd-9182-376d2a7c5f1f';
    event.eventName = "Hippi Parade Smoke Weed 420";
    event.thumbnail = "https://c8.alamy.com/compde/w095m6/marihuana-raucher-leuchten-bei-420-an-der-jahrlichen-420-marihuana-party-in-der-hippie-hill-im-golden-gate-park-in-san-francisco-am-20-april-2018-obwohl-2018-das-erste-jahr-ist-der-rechtlichen-cannibis-in-kalifornien-die-partei-hat-schon-seit-vielen-jahren-foto-von-terry-schmittupi-w095m6.jpg";
    event.description = "Bekiffen Sie sich grenzenlos. Aber lassen Sie sich nicht vom SEK (Söder Einsatzkomando) erwischen.";
    results.push(event);
    const event2 = new Event();
    event2.id = '01575dfb-eb8c-43bd-9182-376d2a7c5f1f';
    event2.eventName = "Ü80 Seniorenparty";
    event2.thumbnail = "https://img.luzernerzeitung.ch/2018/4/11/2b210e9f-2912-48b2-a392-8b5f87e9f79a.jpeg?width=640&height=360&fit=bound&quality=75&auto=webp&crop=640,360,x0,y32&wmark=none";
    event2.description = "Verbringen Sie einen entspannten Abend mit Horst und Gertlinde. Inklusive Bingo und Kreuzworträtsel.";
    results.push(event2);
    const event3 = new Event();
    event3.id = '01575dfb-eb8c-43bd-9182-376d2a7c5f1f';
    event3.eventName = "Tomatenschlacht in Seoul";
    event3.thumbnail = "https://www.stuttgarter-zeitung.de/media.media.1405e2b5-5149-4906-bc6d-29b99a1ded4b.original1024.jpg";
    event3.description = "Beschmeißen Sie sich mit Tomaten und Tomatenpampe.";
    results.push(event3);
    return results;
}
</script>
