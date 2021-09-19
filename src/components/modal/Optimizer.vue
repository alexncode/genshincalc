<template>
  <div class="bg-gray-700 text-gray-200 p-2 max-w-screen-md">
    <div v-if="attribute == 'Attack'">
      <p>Base ATK to ATK% ratio is {{ totalATKPercent[order] }}% should be close to 114% before you start to need to invest in other stats.</p>
      <p>Keep in mind that you can have other sources of ATK% like Fire resonance or Thrilling Tales of Dragon Slayers.</p>
    </div>
    <div v-if="attribute == 'Physical attack'">
      <p>
        If you building physical attack character is better to look at Normal or Charged attack stats,
        they would be more relevant.
      </p>
      <p>ATK% to Physical dmg ratio is {{ dmg }} should be close to 1.25.</p>
    </div>
    <div v-if="attribute == 'Elemental attack'">
      <p>If you building character who deals Elemental damage or mainly uses Skill and Burst optimize this stat.</p>
      <p>ATK% to Elemental dmg ratio is {{ dmg[0] }} should be close to 1.</p>
      <p>ATK% to Skill dmg ratio is {{ dmg[1] }} should be close to 1.</p>
      <p>ATK% to Burst dmg ratio is {{ dmg[2] }} should be close to 1.</p>
    </div>
    <div v-if="attribute == 'Normal attack'">
      <p>If you mainly use normal attacks optimize this stat.</p>
      <p>ATK% to Normal dmg ratio is {{ dmg }} should be close to 1.</p>
    </div>
    <div v-if="attribute == 'Charged attack'">
      <p>If you mainly use charged attacks optimize this stat.</p>
      <p>ATK% to Charged dmg ratio is {{ dmg }} should be close to 1.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Optimizer",
  props: {
    attribute: String,
    order: Number,
  },
  computed: {
    ...mapGetters(["baseATK", "allStats"]),
    totalATKPercent() {
      return this.allStats.map((x, i) =>
        Math.round(
          ((this.baseATK[i] * (x["ATK%"] / 100) + x["FlatATK"]) /
            this.baseATK[i]) *
            100
        )
      );
    },
    elementalDMG() {
      const e = this.dmgType(["Elemental%"], [0, 0]);
      const s = this.dmgType(["Elemental%", "SkillDMG%"], [0, 0]);
      const b = this.dmgType(["Elemental%", "Burst%"], [0, 0]);
      return e.map((x, i) => [x, s[i], b[i]]);
    },
    physicalDMG() {
      return this.dmgType(["Physical%"], [0, 0]);
    },
    normalDMG() {
      const mod = [
        Math.max(this.allStats[0]["Elemental%"], this.allStats[0]["Physical%"]),
        Math.max(this.allStats[1]["Elemental%"], this.allStats[1]["Physical%"]),
      ];
      return this.dmgType(["NCATK%", "NormalATK%"], mod);
    },
    chargedDMG() {
      const mod = [
        Math.max(this.allStats[0]["Elemental%"], this.allStats[0]["Physical%"]),
        Math.max(this.allStats[1]["Elemental%"], this.allStats[1]["Physical%"]),
      ];
      return this.dmgType(["NCATK%", "Charged%"], mod);
    },
    dmg() {
      const typeList = {
        Attack: this.totalATKPercent,
        "Normal attack": this.normalDMG,
        "Charged attack": this.chargedDMG,
        "Elemental attack": this.elementalDMG,
        "Physical attack": this.physicalDMG,
      };
      return typeList[this.attribute][this.order];
    },
  },
  methods: {
    dmgType(types, mod) {
      let arr = ["AllDMG%", ...types];
      return this.totalATKPercent.map(
        (x, i) =>
          Math.round(
            ((mod[i] + arr.reduce((sum, y) => sum + this.allStats[i][y], 0)) /
              x) *
              100
          ) / 100
      );
    },
  },
};
</script>
