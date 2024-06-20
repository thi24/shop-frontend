<template>
    <div class="relative flex h-screen w-full items-start justify-center pt-10">
        <div
            class="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded  px-6 pt-12 pb-8 shadow-lg"
        >
            <div class="text-center">
                <h1 class="text-2xl font-bold text-green-600">
                    Stornierung erfolgreich angestoßen!
                </h1>
                <p class="mt-2 text-gray-600 text-sm">
                    Ihre Stornierung wurde erfolgreich angestoßen. Unser Team kümmert sich nun um Ihre Bestellung. Dies kann 2-5 Werktage dauern und Sie werden per E-Mail über das Ergebnis informiert. Vielen Dank für Ihr Verständnis.
                </p>
            </div>
            <div class="py-4 flex justify-center items-center flex-col gap-2">
                <router-link to="/" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                    Zur Startseite
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>