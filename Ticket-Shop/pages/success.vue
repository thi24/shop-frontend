<template>
    <div
        class="min-h-screen flex flex-col items-center justify-center bg-gray-100"
    >
        <div class="bg-white p-6 rounded-lg shadow-lg text-center">
            <h1 class="text-2xl font-bold text-green-600">
                Zahlung erfolgreich!
            </h1>
            <p class="mt-4 text-gray-600">
                Vielen Dank für Ihre Bestellung. Ihre Zahlung war erfolgreich.
            </p>
            <div class="mt-6">
                <h2 class="text-xl font-semibold">Bestelldetails</h2>
                <ul class="mt-2 text-left text-gray-700">
                    <li><strong>Bestellnummer:</strong> #123456</li>
                    <li><strong>Datum:</strong> 19. Mai 2024</li>
                    <li><strong>Betrag:</strong> €50,00</li>
                </ul>
            </div>
            <button
                @click="goToHome"
                class="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
                Zur Startseite
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const router = useRouter();
const config = useRuntimeConfig();

onMounted(async () => {
    const url = window.location.href;
    const redirectStatus = getParameterByName("redirect_status", url);
    if (redirectStatus === "succeeded") {
        const jsonString = getParameterByName("data", url);
        if (jsonString) {
            try {
                const parsedData = JSON.parse(decodeURIComponent(jsonString));
                const newData = JSON.stringify({
                    returnOn: 1,
                    initialToken: parsedData,
                });

                window.history.replaceState(
                    {},
                    document.title,
                    window.location.pathname,
                );

                const response = await fetch(config.public.processEngineStart, {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        Authorization: "Bearer " + config.public.processToken,
                        "Content-Type": "application/json",
                    },
                    body: newData,
                });

                const data = await response.json();
                console.log(data);
                return data;
            } catch (error) {
                console.error("Error:", error);
                router.push("error");
            }
        } else {
            console.error("Fehlende Daten im URL-Parameter.");
            router.push("error");
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

function goToHome() {
    router.push("/");
}
</script>
