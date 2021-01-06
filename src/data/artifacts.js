export function generateArtifacts(key) {
  return {
    flower: {
      id: "flower",
      key: `flower${key}`,
      value: 3571,
      max: { HP: { 4: 3571, 5: 4780 } },
      label: "Flower",
      mainStat: ["HP"],
      name: "HP",
      substats: [],
      rarity: 4
    },
    feather: {
      id: "feather",
      key: `feather${key}`,
      value: 232,
      label: "Feather",
      mainStat: ["FlatATK"],
      name: "FlatATK",
      substats: [],
      rarity: 4
    },
    clock: {
      id: "clock",
      key: `clock${key}`,
      value: 46.6,
      label: "Clock",
      mainStat: ["HP%", "ATK%", "DEF%", "EM", "EnRe%"],
      name: "ATK%",
      substats: [],
      rarity: 5
    },
    goblet: {
      id: "goblet",
      key: `goblet${key}`,
      value: 46.6,
      label: "Goblet",
      mainStat: ["HP%", "ATK%", "DEF%", "EM", "Elemental%", "Physical%"],
      name: "ATK%",
      substats: [],
      rarity: 5
    },
    circlet: {
      id: "circlet",
      key: `circlet${key}`,
      value: 46.6,
      label: "Circlet",
      mainStat: ["HP%", "ATK%", "DEF%", "EM", "CRate%", "CDmg%", "Healing%"],
      name: "ATK%",
      substats: [],
      rarity: 5
    },
  };
}