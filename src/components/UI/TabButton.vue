<template>
  <div
    class="px-4 py-2 cursor-pointer hover:bg-gray-500 border-green-600"
    :class="active ? 'border-b-4' : 'border-none'"
    @click="$emit('click')"
  >
    {{ name }}
  </div>
</template>

<script>
export default {
  name: "TabButton",
  props: {
    name: String,
    active: Boolean,
  },
};
</script>
