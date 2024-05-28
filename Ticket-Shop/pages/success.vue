<template>
    <div class="flex h-screen w-full items-center justify-center">
        <div
            class="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded bg-gray-50 px-6 pt-12 pb-8 shadow-lg"
        >
            <div class="text-center">
                <h1 class="text-2xl font-bold text-green-600">
                    Zahlung erfolgreich!
                </h1>
                <p class="mt-2 text-gray-600 text-sm">
                    Vielen Dank für Ihre Bestellung. Ihre Zahlung war
                    erfolgreich.
                </p>
            </div>
            <div class="flex flex-col gap-3 border-b py-6 text-xs mt-4">
                <p class="flex justify-between">
                    <span class="text-gray-400">Bestellnummer:</span>
                    <span>{{ orderNumber }}</span>
                </p>
                <p class="flex justify-between">
                    <span class="text-gray-400">Event:</span>
                    <span>{{ eventName }}</span>
                </p>
            </div>
            <div class="flex flex-col gap-3 pb-6 pt-2 text-xs">
                <table class="w-full text-left table-fixed">
                    <thead>
                        <tr>
                            <th class="w-1/2 py-2">Tickets</th>
                            <th class="w-1/4 py-2 text-right">Menge</th>
                            <th class="w-1/4 py-2 text-right">Gesamt</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product.id">
                            <td class="py-1">{{ product.name }}</td>
                            <td class="py-1 text-right">
                                {{ product.quantity }}
                            </td>
                            <td class="py-1 text-right">
                                {{
                                    (product.price * product.quantity).toFixed(
                                        2,
                                    )
                                }}
                                €
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="border-b border border-dashed"></div>
                <p class="flex justify-between">
                    <span>Bezahlt:</span>
                    <span>{{ amount.toFixed(2) }} €</span>
                </p>
                <div
                    class="py-4 flex justify-center items-center flex-col gap-2"
                >
                    <button
                        @click="goToHome"
                        class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                    >
                        Zur Startseite
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
const router = useRouter();
const config = useRuntimeConfig();
import { usePaymentStore } from "~/stores/paymentStore";

const paymentStore = usePaymentStore();
const { orderNumber, eventName, amount, products } = storeToRefs(paymentStore);

onMounted(async () => {
    //Abgleich ob Engine aufruf erfolgt ist
    const url = window.location.href;
    const processEngineCalled = localStorage.getItem("processEngineCalled");

    if (window.location.href == useRuntimeConfig().public.returnUrl) {
        return;
    }
    const redirectStatus = getParameterByName("redirect_status", url);
    if (processEngineCalled === "false") {
        if (redirectStatus === "succeeded") {
            const jsonString = url.split("?")[1].split("=")[0];

            //Manche Zeichen werden nicht richtig decodiert
            const replacedString = decodeURIComponent(jsonString);
            const parsedData = JSON.parse(replacedString);
            //Die bereinigten Daten für die Engine aufbereitet
            const newData = JSON.stringify({
                returnOn: 1,
                initialToken: parsedData,
            });
            //Window Title bereinigen
            window.history.replaceState(
                {},
                document.title,
                window.location.pathname,
            );
            //Aufruf der Engine
            try {
                const response = await fetch(
                    useRuntimeConfig().public.processEngineStart,
                    {
                        method: "POST",
                        headers: {
                            accept: "application/json",
                            Authorization:
                                "Bearer " +
                                useRuntimeConfig().public.processToken,
                            "Content-Type": "application/json",
                        },
                        body: newData,
                    },
                );
                const data = await response.json();
                localStorage.setItem("processEngineCalled", "true");
                return data;
            } catch (error) {
                console.error("Error:", error);
                router.push("../error");
            }
        } else {
            console.error(
                "Zahlung fehlgeschlagen oder Redirect-Status ungültig.",
            );
            router.push("../error");
        }
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
