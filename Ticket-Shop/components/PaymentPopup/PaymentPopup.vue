<template>
  <PopupTemplate ref="popupTemplate">
    <div>
      <p>Test</p>
    </div>
  </PopupTemplate>
</template>
<script lang="ts" setup>
import PopupTemplate from "./PopupTemplate.vue";
import PaymentStripe from "~/components/PaymentPopup/PaymentStripe.vue";

const popupTemplate = ref();
function close() {
  popupTemplate.value.close();
}
function open() {
  popupTemplate.value.openPopup();
}
defineExpose({
  close,
  open,
});
</script>
