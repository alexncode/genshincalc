<template>
  <div class="container bg-gray-700 text-gray-200 p-4">
    <h3 class="text-xl">General information</h3>
    <div class="mb-2">
      <p>The main purpose of the app is to compare 2 different sets of artifacts to find
        the best build for your character.</p>
        <p>Generally the best artifacts should be ATK% for a Clock, Elemental% or Physical% for Goblet,
          CRate% or CDmg% for Circlet and keep the CRate/CDmg ratio as 1/2.
        </p>
    </div>
    <h3 class="text-xl">Stats tab</h3>
    <div class="mb-2">
      <ul class="list-disc pl-8">
        <li>Physical, Elemental, Normal and Charged attack its a average with crit stat that calculated by formula -
          <code class="bg-gray-800 px-2 py-1">attack * (1 + (CRate% * CDmg%) / 100).</code>
        </li>
        <li>All other stats is the same as in the game.</li>
        <li>You can click on "Elemental mastery" to see the elemental reactions percentages.</li>
      </ul>
    </div>
    <h3 class="text-xl">Damage tab</h3>
    <div class="mb-2">
      <p>Actual damage that you deal to monsters.</p>
      <p>The default values for talents are based on talents level 6.</p>
    </div>
    <h3 class="text-xl">Reactions tab</h3>
    <div>
      <p>Actual elemental reactions damage.</p>
      <p>To view different reactions pick different characters.</p>
      <p>Type of attack affect only Melt and Vaporize.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Help",
};
</script>

<style>
</style>