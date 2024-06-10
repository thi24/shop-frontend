<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col min-h-screen ">
    <HeaderComponent/>
    <div class="flex-grow bg-stone-100">
      <slot/>
    </div>
    <FooterComponent/>
  </div>  
</template>