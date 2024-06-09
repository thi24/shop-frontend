<template>
    <div class="relative flex h-screen w-full items-center justify-center">
        <div v-if="errorMessage" id="alert-1"
            class="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert">
            <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 20">
                <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div class="ml-3 text-sm font-medium">
                {{ errorMessage }}
            </div>
            <button @click="closeAlert" type="button"
                class="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
                aria-label="Close">
                <span class="sr-only">Close</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
        </div>

        <div
            class="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded bg-gray-50 px-6 pt-12 pb-8 shadow-lg">
            <div class="text-center">
                <h1 class="text-2xl font-bold text-blue-600">Rückerstattung</h1>
                <p class="mt-2 text-gray-600 text-sm">
                    Bitte wählen Sie die Tickets aus, die Sie stornieren
                    möchten.
                </p>
            </div>
            <div class="flex flex-col gap-3 py-6 text-xs mt-4">
                <table class="w-full text-left table-fixed">
                    <thead>
                        <tr>
                            <th class="w-4/6 py-2">Tickets</th>
                            <th class="w-1/6 py-2">Preis</th>
                            <th class="w-1/6 py-2 text-center">Anzahl</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="ticket in tickets" :key="ticket.id">
                            <td class="py-1">{{ ticket.id }}</td>
                            <td class="py-1">{{ ticket.price }} €</td>
                            <td class="py-1 text-center">
                                <input type="checkbox" v-model="selectedTickets" :value="ticket.id" />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="border-b border border-dashed"></div>
                <div class="py-4 flex justify-center items-center gap-20">
                    <button @click="goToHome"
                        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                        Zurück
                    </button>
                    <button @click="showPopup"
                        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                        Stornieren
                    </button>
                </div>
            </div>
        </div>

        <Popup :visible="isPopupVisible" :selectedTicketsDetails="selectedTicketsDetails" @confirm="confirmCancellation"
            @cancel="hidePopup" />
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Popup from "@/components/Popups/StornoConfirmation.vue";

const router = useRouter();
const refundId = ref("");
const selectedTickets = ref<number[]>([]);
const errorMessage = ref<string | null>(null);
const tickets = ref([]);
const isPopupVisible = ref(false);

const selectedTicketsDetails = computed(() => {
    return tickets.value.filter(ticket => selectedTickets.value.includes(ticket.id));
});

const showPopup = () => {
    if (selectedTickets.value.length === 0) {
        errorMessage.value = "Bitte wählen Sie mindestens ein Ticket aus.";
        setTimeout(() => {
            errorMessage.value = null;
        }, 3000);
    } else {
        isPopupVisible.value = true;
    }
};


const hidePopup = () => {
    isPopupVisible.value = false;
};

const confirmCancellation = async () => {
    await processRefund();
    hidePopup();
};



onMounted(() => {
    parseURL();
    fetchTickets();
});

// Laden der Bestellung anhand der ID

const fetchTickets = async () => {
    try {
        const response = await fetch(
            `https://dev.benevolo.de/api/ticket-service/tickets/public/093d3023-2b42-4523-940f-e971c392522b`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + import.meta.env.VITE_AUTH_TOKEN,
                },
            },
        );
        const data = await response.json();
        tickets.value = data;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        errorMessage.value = "Fehler beim Laden der Tickets.";
    }
};

const processRefund = async () => {
    try {
        const response = await fetch(
            `https://dev.benevolo.de/api/ticket-service/cancellations/093d3023-2b42-4523-940f-e971c392522b`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + import.meta.env.VITE_AUTH_TOKEN,
                },
                body: JSON.stringify(selectedTickets.value),
            },
        );
        if (response.ok) {
            router.push("/cancellationForwarded");
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || "Fehler bei der Rückerstattung.");
        }
    } catch (error) {
        console.error("Error processing refund:", error);
        router.push("/cancellationError");
    }
};

const closeAlert = () => {
    errorMessage.value = null;
};

// Extrahieren der Buchungs-ID aus der URL
const parseURL = () => {
    const regex = /([0-9a-fA-F-]{36})/; // Corrected regex to match UUID
    const url = window.location.href;
    const match = url.match(regex);
    const id = match ? match[0] : null;
    //    console.log("Extracted ID:", id);
    refundId.value = id;
};

// Zurück zur Startseite
const goToHome = () => {
    router.push("/");
};
</script>
