<template>
    <div class="frelative flex h-screen w-full items-start justify-center pt-10">
        <div class="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded  px-6 pt-12 pb-8 shadow-lg">
            <div class="text-center">
                <h1 class="text-2xl font-bold mb-4 text-red-600">Stornierung fehlgeschlagen</h1>
                <p>Es gab einen Fehler bei der Bearbeitung Ihrer Stornierung. Bitte versuchen Sie es später erneut über Ihren Refund-Link in Ihrer E-Mail.</p>
            </div>
            <div class="py-4 flex justify-center items-center flex-col gap-2">
                <router-link to="/" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                    Zurück zur Startseite
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>
  