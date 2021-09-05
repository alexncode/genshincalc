<template>
  <div class="container max-w-screen-md bg-gray-700 text-gray-200 p-4 overflow-y-auto max-h-screen">
    <h3 class="text-xl text-green-300">
      General information
    </h3>
    <div class="mb-2">
      <p>
        The main purpose of the app is to compare 2 different sets of artifacts to find
        the best build for your character.
      </p>
      <p>
        You can change <b>Characters</b>, <b>Weapons</b>, <b>Artifact sets</b>, <b>Artifact main and sub stats</b>, <b>add additional bonuses</b>,
        set buffs and debuffs and more.
      </p>
      <p>
        Your goal for best build is to maximize "Normal" or "Charged" or "Physical"
        or "Elemental" values in the "Stats" tab, depending on what type of attack you use.
      </p>
      <p>
        Generally the best artifacts should be ATK% for a Clock, Elemental% or Physical% for Goblet,
        CRate% or CDmg% for Circlet and you should keep the CRate/CDmg ratio as 1/2.
      </p>
    </div>
    <h3 class="text-xl text-green-300">
      Stats tab
    </h3>
    <div class="mb-2">
      <ul class="list-disc pl-8">
        <li>
          Physical, Elemental, Normal and Charged attack are average with crit, that calculated by formula -
          <code class="bg-gray-800 px-2 py-1">attack * (1 + (CRate% * CDmg%) / 100).</code>
        </li>
        <li>All other stats is the same as in the game.</li>
        <li>You can click on "Elemental mastery" to see the elemental reactions percentages.</li>
      </ul>
    </div>
    <h3 class="text-xl text-green-300">
      Damage tab
    </h3>
    <div class="mb-2">
      <p>Actual damage that you deal to monsters. </p>
      <p>
        You can change talents values, or set level in the "Characters change" dialog
        (all talents levels would be equal in this case).
      </p>
    </div>
    <h3 class="text-xl text-green-300">
      Reactions tab
    </h3>
    <div class="mb-2">
      <p>
        Actual elemental reactions damage. Damage of most of the elemental reactions depends on your level,
        except Melt and Vaporize, they depend on your damage.
      </p>
      <p>To view different reactions pick different characters.</p>
      <p>Type of attack affect only Melt and Vaporize.</p>
    </div>
    <h3 class="text-xl text-green-300">
      Weapons choose dialog
    </h3>
    <div>
      <p>If secondary effects have "stack" mechanic I assume them max for simplicity.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Help",
};
</script>

<style>
p {
  text-indent: 1em;
}
</style>