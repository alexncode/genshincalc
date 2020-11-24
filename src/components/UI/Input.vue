<template>
  <label
    :for="label"
    class="text-gray-200"
  > {{ label }} <input
      class="w-12  text-gray-800"
      :type="type"
      :id="label"
      :value="value"
      @input="$emit('input', $event.target.value)"
    ></label>

</template>

<script>
export default {
  name: "Input",
  props: {
    label: String,
    type: String,
    value: Number,
  },
};
</script>

<style>
</style>