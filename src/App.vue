<template>
  <div
    id="app"
    class="absolute inset-0 grid grid-cols-1 justify-items-center"
  >
    <div class="font-bold overflow-y-auto">
      <div>
        <h1 class="text-green-400 text-center text-2xl mb-4">Genshin impact artifact build simulator v0.1a</h1>
        <div class="flex mb-2">
          <label
            for="character"
            class="mr-2"
          >Character 80lvl</label>
          <select
            name="character"
            id="character"
            v-model="character"
            class="mr-2"
          >
            <option
              v-for="(character, name) in characters"
              :key="name"
            >{{ name }}</option>
          </select>
          <label
            for="base"
            class="mr-2 border-l-2 pl-2"
          >Base attack</label>
          <input
            class="w-10"
            type="text"
            id="base"
            v-model.number="base"
          >
        </div>
      </div>
      <div class="flex">
        <div>
          <Set
            :sets="sets"
            v-model="set[0]"
            side="0"
          />
          <Weapon
            :weapon="weapons[0].standart"
            side="0"
          />
          <Artifact
            v-for="artifact in artifacts[0]"
            :key="artifact.id"
            :artifact="artifact"
            side="0"
          />
        </div>
        <div class="ml-4 border-gray-700 border-l-2 pl-4">
          <Set
            :sets="sets"
            v-model="set[1]"
            side="1"
          />
          <Weapon
            :weapon="weapons[1].standart"
            side="1"
          />
          <Artifact
            v-for="artifact in artifacts[1]"
            :key="artifact.id"
            :artifact="artifact"
            side="1"
          />
        </div>
      </div>
      <div class="">
        <table class="table-fixed mt-4 text-gray-300 leading-none">
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
              class="bg-gray-800 even:bg-gray-700"
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
      <div class="mt-2 text-right"><a
          class="text-blue-400"
          href="mailto:alexncode@gmail.com"
          target="_blank"
        >Feedback</a></div>
    </div>
  </div>
</template>

<script>
import Artifact from "@/components/Artifact.vue";
import Weapon from "@/components/Weapon.vue";
import Set from "@/components/Set.vue";

let artifactsList = {
  flower: {
    id: "flower",
    value: 3571,
    max: { HP: { 4: 3571, 5: 4780 } },
    label: "Flower",
    mainStat: ["HP"],
    mainStatName: "HP",
    substats: [],
  },
  feather: {
    id: "feather",
    value: 232,
    label: "Feather",
    mainStat: ["FlatATK"],
    mainStatName: "FlatATK",
    substats: [],
  },
  clock: {
    id: "clock",
    value: 46.6,
    label: "Clock",
    mainStat: ["HP%", "ATK%", "DEF%", "EM", "EnRe%"],
    mainStatName: "ATK%",
    substats: [],
  },
  goblet: {
    id: "goblet",
    value: 46.6,
    label: "Goblet",
    mainStat: ["HP%", "ATK%", "DEF%", "EM", "Elemental%", "Physical%"],
    mainStatName: "ATK%",
    substats: [],
  },
  circlet: {
    id: "circlet",
    value: 46.6,
    label: "Circlet",
    mainStat: ["HP%", "ATK%", "DEF%", "EM", "CRate%", "CDmg%", "Healing%"],
    mainStatName: "ATK%",
    substats: [],
  },
};

let characters = {
  Keqing: { name: "CDmg%", value: 38.4 },
  Razor: { name: "Physical%", value: 25.4 },
  Qiqi: { name: "Healing%", value: 16.6 },
  Beidou: { name: "Elemental%", value: 24 },
  Diluc: { name: "CRate%", value: 24.2 },
  Lisa: { name: "EM", value: 96 },
  Amber: { name: "ATK%", value: 24 },
  Barbara: { name: "HP%", value: 20.3 },
  Venti: { name: "EnRe%", value: 32 },
  Klee: { name: "Elemental%", value: 28.8 },
  Mona: { name: "EnRe%", value: 32 },
  Fischl: { name: "ATK%", value: 24 },
  Jean: { name: "Healing%", value: 16.6 },
  Bennet: { name: "EnRe%", value: 26.7 },
  Kaeya: { name: "EnRe%", value: 26.7 },
  Chongyun: { name: "ATK%", value: 24 },
  Ningguang: { name: "Elemental%", value: 36 },
  Noelle: { name: "DEF%", value: 30 },
  Sucrose: { name: "Elemental%", value: 24 },
  Xiangling: { name: "EM", value: 96 },
  Xingqiu: { name: "ATK%", value: 24 },
  Traveller: { name: "ATK%", value: 24 },
};

let weapon = {
  standart: {
    id: "weapon",
    value: 37.7,
    label: "Weapon Bonus",
    mainStat: ["ATK%", "PhysATK%", "EnRe%", "CRate%", "CDmg%", "DEF%", "HP%"],
    mainStatName: "ATK%",
  },
};

let sets = {
  Berserker: {
    name: "Berserker",
    rarity: 4,
    "2pcs": { name: "CRate%", value: 12 },
    "4pcs": { name: "CRate%", value: 24 },
  },
  Instructor: {
    name: "Instructor",
    rarity: 4,
    "2pcs": { name: "EM", value: 80 },
    "4pcs": { name: "EM", value: 120 },
  },
  Exile: {
    name: "Exile",
    rarity: 4,
    "2pcs": { name: "EnRe%", value: 12 },
    "4pcs": { name: "Engen", value: 8 },
  },
  "Resolution of Sojourner": {
    name: "Resolution of Sojourner",
    rarity: 4,
    "2pcs": { name: "ATK%", value: 18 },
    "4pcs": { name: "ChargeCRate%", value: 30 },
  },
  "Martial Artist": {
    name: "Martial Artist",
    rarity: 4,
    "2pcs": { name: "NCATK%", value: 15 },
    "4pcs": { name: "NCATK%", value: 25 },
  },
  "Defender's Will": {
    name: "Defender's Will",
    rarity: 4,
    "2pcs": { name: "DEF%", value: 30 },
    "4pcs": { name: "ElRES%", value: 30 },
  },
  "Tiny Miracle": {
    name: "Tiny Miracle",
    rarity: 4,
    "2pcs": { name: "ElRES%", value: 20 },
    "4pcs": { name: "ElRES%", value: 30 },
  },
  "Brave Heart": {
    name: "Brave Heart",
    rarity: 4,
    "2pcs": { name: "ATK%", value: 18 },
    "4pcs": { name: "ATK%", value: 15 },
  },
  Gambler: {
    name: "Gambler",
    rarity: 4,
    "2pcs": { name: "SkillDMG%", value: 20 },
    "4pcs": { name: "SkillCD", value: 0 },
  },
  Scholar: {
    name: "Scholar",
    rarity: 4,
    "2pcs": { name: "EnRe%", value: 20 },
    "4pcs": { name: "Engen", value: 3 },
  },
  "Gladiator's Finale": {
    rarity: 5,
    name: "Gladiator's Finale",
    "2pcs": { name: "ATK%", value: 18 },
    "4pcs": { name: "NormalATK%", value: 35 },
  },
  "Maiden Beloved": {
    name: "Maiden Beloved",
    rarity: 5,
    "2pcs": { name: "Healing%", value: 15 },
    "4pcs": { name: "Healing%", value: 20 },
  },
  "Noblesse Oblige": {
    name: "Noblesse Oblige",
    rarity: 5,
    "2pcs": { name: "Burst%", value: 20 },
    "4pcs": { name: "ATK%", value: 20 },
  },
  "Bloodstained Chivalry": {
    name: "Bloodstained Chivalry",
    rarity: 5,
    "2pcs": { name: "Physical%", value: 25 },
    "4pcs": { name: "Charged%", value: 50 },
  },
  "Wanderer's Troupe": {
    name: "Wanderer's Troupe",
    rarity: 5,
    "2pcs": { name: "EM", value: 80 },
    "4pcs": { name: "Charged%", value: 35 },
  },
  "Viridescent Venerer": {
    name: "Viridescent Venerer",
    rarity: 5,
    "2pcs": { name: "Elemental%", value: 15 },
    "4pcs": { name: "Swirl%", value: 60 },
  },
  "Thundering Fury": {
    name: "Thundering Fury",
    rarity: 5,
    "2pcs": { name: "Elemental%", value: 15 },
    "4pcs": { name: "Reactions%", value: 40 },
  },
  Thundersoother: {
    name: "Thundersoother",
    rarity: 5,
    "2pcs": { name: "ElectroRES%", value: 40 },
    "4pcs": { name: "DMGEl%", value: 35 },
  },
  "Crimson Witch of Flames": {
    name: "Crimson Witch of Flames",
    rarity: 5,
    "2pcs": { name: "Elemental%", value: 15 },
    "4pcs": { name: "Reactions%", value: 40 },
  },
  Lavawalker: {
    name: "Lavawalker",
    rarity: 5,
    "2pcs": { name: "PyroRES%", value: 40 },
    "4pcs": { name: "DMGEl%", value: 35 },
  },
  "Archaic Petra": {
    name: "Archaic Petra",
    rarity: 5,
    "2pcs": { name: "Elemental%", value: 15 },
    "4pcs": { name: "DMGEl%", value: 35 },
  },
  "Retracing Bolide": {
    name: "Retracing Bolide",
    rarity: 5,
    "2pcs": { name: "Shields%", value: 35 },
    "4pcs": { name: "NCATK%", value: 40 },
  },
  none: {
    name: "none",
  },
};

export default {
  name: "App",
  components: {
    Artifact,
    Weapon,
    Set,
  },
  data() {
    return {
      character: "Keqing",
      artifacts: [artifactsList, JSON.parse(JSON.stringify(artifactsList))],
      characters: characters,
      weapons: [weapon, Object.create(weapon)],
      base: 720,
      sets: sets,
      set: [
        { pieces: "4pcs", set: ["Gladiator's Finale", "none"] },
        { pieces: "4pcs", set: ["Bloodstained Chivalry", "none"] },
      ],
      attributes: [
        "Attack",
        "Physical attack",
        "Elemental attack",
        "Crit chance%",
        "Crit damage%",
        "Normal attack",
        "Charged attack",
        "Elemental mastery",
        "Energy recharge%",
        "Defence",
        "Health points",
      ],
      refreshing: false,
    };
  },
  created() {
    document.addEventListener("swUpdated", this.updateAvailable, {
      once: true,
    });

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;

      window.location.reload();
    });
  },
  computed: {
    sumAllStats() {
      const allStats = [
        "HP%",
        "ATK%",
        "DEF%",
        "EM",
        "HP",
        "FlatDEF",
        "FlatATK",
        "CRate%",
        "CDmg%",
        "Healing%",
        "Elemental%",
        "Physical%",
        "EnRe%",
        "Charged%",
        "NormalATK%",
        "NCATK%",
      ];
      let allStatsRes = [{}, {}];
      let sets = this.set.map((x) => {
        let result = {};
        if (x.set[0] != "none") {
          if (x.pieces == "4pcs") {
            result = {
              a: this.sets[x.set[0]]["2pcs"],
              b: this.sets[x.set[0]]["4pcs"],
            };
          } else {
            if (x.set[1] != "none") {
              result = {
                a: this.sets[x.set[0]]["2pcs"],
                b: this.sets[x.set[1]]["2pcs"],
              };
            } else {
              result = { a: this.sets[x.set[0]]["2pcs"] };
            }
          }
        }
        return result;
      });
      let allEquip = [this.weapons, this.artifacts, sets];
      for (const name of allStats) {
        for (const equip of allEquip) {
          equip.forEach((x, i) => {
            for (const key in x) {
              if (
                Object.prototype.hasOwnProperty.call(x[key], "mainStatName")
              ) {
                const value = x[key].mainStatName == name ? x[key].value : 0;
                allStatsRes[i][name] = allStatsRes[i][name] + value || value;
              }
              if (Object.prototype.hasOwnProperty.call(x[key], "substats")) {
                x[key].substats.forEach((substat) => {
                  const value = (substat.name == name) * substat.value;
                  allStatsRes[i][name] = allStatsRes[i][name] + value || value;
                });
              }
              if (Object.prototype.hasOwnProperty.call(x[key], "name")) {
                const value = x[key].name == name ? x[key].value : 0;
                allStatsRes[i][name] = allStatsRes[i][name] + value || value;
              }
            }
          });
        }
      }
      const ch = this.characters[this.character];
      allStatsRes[0][ch.name] = allStatsRes[0][ch.name] + ch.value || ch.value;
      allStatsRes[1][ch.name] = allStatsRes[1][ch.name] + ch.value || ch.value;
      return allStatsRes;
    },
    atkPower() {
      return this.sumAllStats.map((x) => {
        return Math.round(this.base * (1 + x["ATK%"] / 100) + x["FlatATK"]);
      });
    },
    critDmg() {
      return this.sumAllStats.map((x) => {
        return ((50 + x["CDmg%"]) / 100) * ((5 + x["CRate%"]) / 100);
      });
    },
    physAtk() {
      return this.sumAllStats.map((x, i) => {
        let phys = this.atkPower[i] * (1 + x["Physical%"] / 100);
        return Math.round(phys + phys * this.critDmg[i]);
      });
    },
    normalAtk() {
      return this.sumAllStats.map((x, i) => {
        let phys =
          this.atkPower[i] *
          (1 +
            (Math.max(x["Physical%"], x["Elemental%"]) +
              x["NormalATK%"] +
              x["NCATK%"]) /
              100);
        return Math.round(phys + phys * this.critDmg[i]);
      });
    },
    chargedAtk() {
      return this.sumAllStats.map((x, i) => {
        let phys =
          this.atkPower[i] *
          (1 +
            (Math.max(x["Physical%"], x["Elemental%"]) +
              x["Charged%"] +
              x["NCATK%"]) /
              100);
        return Math.round(phys + phys * this.critDmg[i]);
      });
    },
    elemAtk() {
      return this.sumAllStats.map((x, i) => {
        let elem = this.atkPower[i] * (1 + x["Elemental%"] / 100);
        return Math.round(elem + elem * this.critDmg[i]);
      });
    },
    allResults() {
      const critChance = this.sumAllStats.map(
        (x) => Math.round((x["CRate%"] + 5) * 10) / 10
      );
      const critDamage = this.sumAllStats.map(
        (x) => Math.round((x["CDmg%"] + 50) * 10) / 10
      );
      const EM = this.sumAllStats.map((x) => x["EM"]);
      const EnRe = this.sumAllStats.map((x) => x["EnRe%"]);
      const DEF = this.sumAllStats.map((x) =>
        Math.round(700 + 700 * (x["DEF%"] / 100) + x["FlatDEF"])
      );
      const HP = this.sumAllStats.map((x) =>
        Math.round(10000 + 10000 * (x["HP%"] / 100) + x["HP"])
      );

      return [
        this.atkPower,
        this.physAtk,
        this.elemAtk,
        critChance,
        critDamage,
        this.normalAtk,
        this.chargedAtk,
        EM,
        EnRe,
        DEF,
        HP,
      ].map((x) => {
        return {
          class: x[0] <= x[1] ? "text-green-500" : "text-red-400",
          value: x,
        };
      });
    },
  },
  methods: {
    swUpdated(event) {
      const registration = event.detail;
      if (!registration || !registration.waiting) return;
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    },
  },
};
</script>

<style>
#app {
  background-color: #1b2027;
}

.grid-center {
  grid-template-columns: auto 1fr auto;
}

input {
  text-align: center;
  border-radius: 3px;
}
</style>
