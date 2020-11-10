<template>
  <div>
    <table class="table-auto w-full mt-4 text-gray-300 leading-none bg-gray-900">
      <thead>
        <tr>
          <th class="border px-2 py-2 w-1/5">Attribute</th>
          <th class="border px-2 py-2 w-2/5">First set</th>
          <th class="border px-2 py-2 w-2/5">Second set</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(att, i) in attributes"
          :key="att"
          class="bg-gray-800 even:bg-gray-900"
        >
          <td class="border border-gray-600 px-1 py-1">{{ att }}</td>
          <td
            class="border border-gray-600 px-1 py-1 text-center"
            :class="j > 0 ? allResults[i].class : ''"
            v-for="(res, j) in allResults[i].value"
            :key="res + j"
          >{{ res }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "StatTable",
  props: {
    attributes: Array,
    allResults: Array,
  },
};
</script>

<style>
</style>