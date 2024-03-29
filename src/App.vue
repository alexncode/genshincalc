<template>
  <div
    id="app"
    class="absolute inset-0 grid grid-cols-1 justify-items-center max-h-screen"
  >
    <div class="font-bold overflow-y-auto px-2">
      <div class="flex">
        <div @click="characterPick = false">
          <Modal v-if="characterPick">
            <CharacterPick @visibility="characterPick = false" />
          </Modal>
        </div>
        <div
          class="bg-gray-800 rounded pt-1 px-1 cursor-pointer hover:bg-gray-700 min-w-max"
          @click="characterPick = true"
        >
          <img
            :src="`/img/avatars/${character.charName}.png`"
            :alt="character.charName"
          >
        </div>
        <div class="flex flex-col ml-2 text-gray-200 w-full">
          <div class="flex justify-between">
            <a
              href="https://buildsim.netlify.app/"
              class="invisible w-0 h-0 md:visible md:h-auto md:w-auto"
            >
              <h1 class="text-green-400 text-lg">Genshin impact artifact build simulator v0.9.8</h1>
            </a>
            <div class="flex">
              <div
                class="text-blue-400 mr-2 cursor-pointer hover:text-blue-200"
                @click="showHelp = true"
              >
                Help
              </div>
              <div>
                <a
                  class="text-blue-400 mr-2 hover:text-blue-200"
                  href="mailto:alexnkcode@gmail.com"
                  target="_blank"
                >Feedback</a>
              </div>
              <div
                class="text-blue-400 cursor-pointer hover:text-blue-200"
                @click="showAbout = true"
              >
                About
              </div>
            </div>
          </div>
          <div class="flex flex-col md:flex-row mt-1">
            <div>
              Base Attack: <span class="text-blue-300">{{ baseATK[0] }}</span> / <span class="text-blue-300">{{ baseATK[1] }}</span>
            </div>
            <div class="md:ml-2 md:border-l-2 md:pl-2">
              Base HP: <span class="text-blue-300">{{ character.baseHP }}</span>
            </div>
            <div class="md:mx-2 md:border-l-2 md:pl-2">
              Base defense: <span class="text-blue-300">{{ character.baseDEF }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col md:flex-row">
        <div>
          <div class="flex justify-between">
            <Set :side="0" />
            <Weapon side="0" />
          </div>
          <div v-if="randomizeArtifacts">
            <Artifact
              v-for="artifact in artifacts[0]"
              :key="artifact.key"
              :artifact="artifact"
              side="0"
            />
          </div>
          <div
            v-else
            class="w-80"
            style="height: 136px;"
          >
            Substitute
          </div>
          <Additional side="0" />
        </div>
        <div class="flex md:flex-col justify-center mx-2 px-2 border-l-2 border-r-2 border-gray-700">
          <button
            class="bg-gray-600 text-gray-100 rounded w-8 hover:bg-gray-400"
            title="Equalize artifacts"
            @click="equalize"
          >
            =
          </button>
          <button
            class="bg-gray-600 text-gray-100 rounded w-8 mx-2 md:my-2 md:mx-0 hover:bg-gray-400"
            title="Randomize substats"
            @click="randomize"
          >
            &#10227;
          </button>
          <button
            class="bg-gray-600 text-gray-100 rounded w-8 hover:bg-gray-400"
            title="Save & Load"
            @click="save"
          >
            &#128190;
          </button>
          <button
            class="bg-blueGray-600 text-gray-100 rounded w-8 mx-2 md:my-2 md:mx-0 hover:bg-blueGray-400"
            title="Share"
            @click="showShare = true"
          >
            &#8682;
          </button>
        </div>
        <div class="md:pl-4">
          <div class="flex justify-between">
            <Set :side="1" />
            <Weapon side="1" />
          </div>
          <div v-if="randomizeArtifacts">
            <Artifact
              v-for="artifact in artifacts[1]"
              :key="artifact.key"
              :artifact="artifact"
              side="1"
            />
          </div>
          <div
            v-else
            class="w-80"
            style="height: 136px;"
          >
            Substitute
          </div>
          <Additional side="1" />
        </div>
      </div>
      <div class=" bg-gray-700 rounded mt-4 px-2 pb-1">
        <div class="flex border-gray-800 border-b-2 box-border text-gray-200">
          <TabButton
            v-for="tab in ['Stats', 'Damage', 'Elemental reactions']"
            :key="tab"
            :name="tab"
            :active="activeTab == tab"
            @click="changeTab(tab)"
          />
          <div 
            v-if="activeTab == 'Stats'" 
            class="flex-grow text-blue-400 text-right hover:text-blue-200 cursor-pointer py-2 pr-4"
            @click="showTableFilter = true"
          >
            Filter
          </div>
          <div @click="showTableFilter = false">
            <Modal v-if="showTableFilter">
              <TableFilter />
            </Modal>
          </div>
        </div>
        <StatTable
          v-show="activeTab == 'Stats'"
          class="overflow-y-auto"
        />
        <Damage v-show="activeTab == 'Damage'" />
        <Reactions v-show="activeTab == 'Elemental reactions'" />
      </div>
    </div>
    <div @click="save">
      <Modal v-if="showSave">
        <Save @visibility="showSave = false" />
      </Modal>
    </div>
    <div @click="showHelp = false">
      <Modal v-if="showHelp">
        <Help />
      </Modal>
    </div>
    <div @click="showAbout = false">
      <Modal v-if="showAbout">
        <About />
      </Modal>
    </div>
    <div @click="showShare = false">
      <Modal v-if="showShare">
        <Share :share-link="shareLink" />
      </Modal>
    </div>
    <transition name="slide">
      <div
        v-if="updateReady"
        class="absolute mx-auto mt-4 left-1/2"
      >
        <div class="flex p-2 items-center bg-gray-700 text-gray-200 rounded relative -left-1/2 shadow-lg">
          <div>New version available</div>
          <div
            class="rounded-xl bg-gray-500 ml-4 px-2 py-1 hover:bg-gray-600 cursor-pointer"
            @click="update"
          >
            Update
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Artifact from "@/components/Artifact.vue";
import Weapon from "@/components/Weapon.vue";
import Set from "@/components/Set.vue";
import StatTable from "@/components/StatTable.vue";
import Damage from "@/components/Damage.vue";
import Reactions from "@/components/Reactions.vue";
import Modal from "@/components/modal/Modal.vue";
import Additional from "@/components/Additional.vue";
import Share from '@/components/modal/Share.vue';
import TableFilter from '@/components/modal/TableFilter.vue';

import TabButton from "@/components/UI/TabButton.vue";

import { getCharData } from "@/data/characters";
import { getWeaponData } from "@/data/weapons";

import { mapFields } from "vuex-map-fields";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Artifact,
    Weapon,
    Set,
    StatTable,
    Damage,
    TabButton,
    Reactions,
    Modal,
    Share,
    CharacterPick: () =>
      import(
        /* webpackChunkName: "characters" */ "@/components/modal/CharacterPick.vue"
      ),
    Additional,
    Save: () => import(/* webpackChunkName: "save" */ "@/components/Save.vue"),
    Help: () => import(/* webpackChunkName: "help" */ "@/components/Help.vue"),
    About: () =>
      import(/* webpackChunkName: "about" */ "@/components/modal/About.vue"),
    TableFilter
  },
  data() {
    return {
      activeTab: "Stats",
      characterPick: false,
      showSave: false,
      showHelp: false,
      showAbout: false,
      showShare: false,
      showTableFilter: false,
      updateReady: false, //New update ready
      refreshing: false, //Page is refreshing
      randomizeArtifacts: true
    };
  },
  computed: {
    ...mapFields([
      "character",
      "set",
      "additionalStats",
      "weapon",
      "artifacts",
    ]),
    ...mapGetters(["baseATK"]),
    shareLink() {
      return `/?l=${this.buildShareString()}`;
    },
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
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const loadData = decodeURIComponent(urlParams.get("l")).replaceAll(
      "_",
      "%"
    );
    let arr = loadData.split("-");
    if (arr.length == 167) {
      this.loadFromString(arr);
    }
  },
  methods: {
    updateAvailable(event) {
      this.updateReady = true;
      this.registration = event.detail;
    },
    update() {
      this.updateReady = false;
      if (!this.registration || !this.registration.waiting) return;
      this.registration.waiting.postMessage({ type: "SKIP_WAITING" });
    },
    equalize() {
      for (const art in this.artifacts[1]) {
        this.artifacts[1][art].value = this.artifacts[0][art].value;
        this.artifacts[1][art].rarity = this.artifacts[0][art].rarity;
        this.artifacts[1][art].name = this.artifacts[0][art].name;
        this.artifacts[1][art].substats = JSON.parse(
          JSON.stringify(this.artifacts[0][art].substats)
        );
      }
    },
    randomize() {
      this.randomizeArtifacts = false
      setTimeout(() => this.randomizeArtifacts = true)
    },
    changeTab(name) {
      this.activeTab = name;
    },
    save() {
      this.showSave = !this.showSave;
    },
    buildShareString() {
      let ar = [
        this.character.charName,
        this.character.charLvl,
        this.character.talentLvl,
      ];
      for (let i = 0; i < 2; i++) {
        ar.push(this.set[i].pieces, this.set[i].set[0], this.set[i].set[1]);
        this.additionalStats[i].forEach((x) => ar.push(x.stat, x.value));
        ar.push(this.weapon[i].weaponName, this.weapon[i].refinement);

        for (const key in this.artifacts[i]) {
          const at = this.artifacts[i][key];
          ar.push(at.name, at.value, at.rarity);
          at.substats.forEach((x) => ar.push(x.name, x.value, x.upgrade));
        }
      }
      return encodeURIComponent(ar.join("-").replaceAll("%", "_"));
    },
    loadFromString(arr) {
      this.character = getCharData(
        arr.shift(),
        arr.shift(),
        parseInt(arr.shift() - 1)
      );
      for (let i = 0; i < 2; i++) {
        this.set[i].pieces = arr.shift();
        this.set[i].set = [arr.shift(), arr.shift()];
        this.additionalStats[i].forEach((x) => {
          x.stat = arr.shift();
          x.value = parseFloat(arr.shift());
        });
        this.weapon[i] = getWeaponData(arr.shift(), parseInt(arr.shift()));
        for (const key in this.artifacts[i]) {
          const at = this.artifacts[i][key];
          at.name = arr.shift();
          at.value = parseFloat(arr.shift());
          at.rarity = parseInt(arr.shift());
          at.substats.forEach((x) => {
            x.name = arr.shift();
            x.value = parseFloat(arr.shift());
            x.upgrade = parseInt(arr.shift());
          });
        }
      }
    },
  },
};
</script>

<style>
#app {
  background-color: #1b2027;
}

input {
  text-align: center;
  border-radius: 3px;
}

.slide-enter-active {
  transition-property: transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
.slide-leave-active {
  transition-property: transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 600ms;
}
.slide-enter {
  opacity: 0;
  transform: translateY(-20px);
}
.slider-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
