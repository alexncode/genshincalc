<template>
  <div
    id="app"
    class="absolute inset-0 grid grid-cols-1 justify-items-center"
  >
    <div class="font-bold overflow-y-auto">
      <div>
        <h1 class="text-green-400 text-center text-2xl mb-4">Genshin impact artifact build simulator v0.2a</h1>
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
            for="baseATK"
            class="mx-2 border-l-2 pl-2"
          >Base attack</label>
          <input
            class="w-10"
            type="text"
            id="baseATK"
            v-model.number="baseATK"
          >
          <label
            for="baseHP"
            class="mx-2 border-l-2 pl-2"
          >Base HP</label>
          <input
            class="w-16"
            type="text"
            id="baseHP"
            v-model.number="baseHP"
          >
          <label
            for="baseDEF"
            class="mx-2 border-l-2 pl-2"
          >Base defense</label>
          <input
            class="w-10"
            type="text"
            id="baseDEF"
            v-model.number="baseDEF"
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
            :key="artifact.key"
            :artifact="artifact"
            side="0"
          />
        </div>
        <div class="flex flex-col justify-center mx-2 px-2 border-l-2 border-r-2 border-gray-700">
          <button
            class="bg-gray-600 text-gray-100 rounded w-8"
            title="Equalize"
            @click="equalize"
          >=</button>
          <button
            class="bg-gray-600 text-gray-100 rounded w-8 mt-2"
            title="Randomize substats"
            @click="randomize"
          >&#10227;</button>
        </div>
        <div class=" pl-4">
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
            :key="artifact.key"
            :artifact="artifact"
            side="1"
          />
        </div>
      </div>
      <div class="">
        <table class="table-auto w-full mt-4 text-gray-300 leading-none">
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
          href="mailto:alexnkcode@gmail.com"
          target="_blank"
        >Feedback</a></div>
    </div>
  </div>
</template>

<script>
import Artifact from "@/components/Artifact.vue";
import Weapon from "@/components/Weapon.vue";
import Set from "@/components/Set.vue";

import { artifactsList } from "@/data/artifacts";
import { characters } from "@/data/characters";
import { weapons } from "@/data/weapons";
import { sets } from "@/data/sets";

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
      weapons: [weapons, Object.create(weapons)],
      baseATK: 720,
      baseHP: 12182,
      baseDEF: 743,
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
        "Defense",
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
        return Math.round(this.baseATK * (1 + x["ATK%"] / 100) + x["FlatATK"]);
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
        Math.round(
          this.baseDEF + this.baseDEF * (x["DEF%"] / 100) + x["FlatDEF"]
        )
      );
      const HP = this.sumAllStats.map((x) =>
        Math.round(this.baseHP + this.baseHP * (x["HP%"] / 100) + x["HP"])
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
    updateAvailable(event) {
      const registration = event.detail;
      if (!registration || !registration.waiting) return;
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    },
    equalize() {
      this.artifacts = [
        this.artifacts[0],
        JSON.parse(JSON.stringify(this.artifacts[0])),
      ];
    },
    randomize() {
      this.artifacts.forEach((side) => {
        for (const artifact in side) {
          side[artifact].key = "" + Math.floor(Math.random() * 999999);
        }
      });
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
