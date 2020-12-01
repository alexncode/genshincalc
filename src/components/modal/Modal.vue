<template>
  <transition
    name="modal"
    appear
  >
    <div class="fixed inset-0 bg-modal flex justify-center items-center bg-opacity-50 bg-gray-900 z-10">
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
};
</script>

<style>
.modal-enter,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}
</style>

