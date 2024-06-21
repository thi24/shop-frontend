<template>
  <footer class="bg-stone-100 border-t-2 border-stone-200 p-4">
    <div class="container mx-auto flex flex-col md:flex-row items-center">
      <div
        class="flex flex-1 justify-center md:justify-center space-x-8 text-gray-500 mb-4 md:mb-0"
      >
        <nuxt-link to="/footer/about" class="hover:text-black">About</nuxt-link>
        <nuxt-link to="/footer/contact" class="hover:text-black"
          >Kontakt</nuxt-link
        >
        <nuxt-link to="/footer/licence" class="hover:text-black"
          >Lizenz</nuxt-link
        >
        <nuxt-link to="/footer/privacy" class="hover:text-black"
          >Privatsphäre</nuxt-link
        >
      </div>
      <div class="flex justify-center md:justify-end w-full md:w-auto">
        <a
          href="https://dev.benevolo.de"
          class="bg-stone-200 hover:bg-stone-300 text-gray-500 py-2 px-4 rounded"
        >
          Adminbereich
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
  .container .mb-4 {
    margin-bottom: 0;
  }
}
</style>
