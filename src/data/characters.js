export let characters = {
  Keqing: {
    name: "Keqing", stat: "CDmg%", value: 38.4, element: "Electro", rarity: 5,
    baseATK: 323, baseHP: 13103, baseDEF: 799,
    normal: 59.6, charged: 236.6, skill: 235.2, burst: 123.2 + 33.6 * 8 + 264.3
  },
  Razor: {
    name: "Razor", stat: "Physical%", value: 25.4, element: "Electro", rarity: 4,
    baseATK: 234, baseHP: 11962, baseDEF: 751,
    normal: 131.9, charged: 91, skill: 413.3, burst: 224
  },
  Qiqi: {
    name: "Qiqi", stat: "Healing%", value: 16.6, element: "Ice", rarity: 5,
    baseATK: 287, baseHP: 12368, baseDEF: 922,
    normal: 54.9, charged: 187, skill: 134.4, burst: 398.7
  },
  Beidou: {
    name: "Beidou", stat: "Elemental%", value: 24, element: "Electro", rarity: 4,
    baseATK: 225, baseHP: 13050, baseDEF: 648,
    normal: 103.4, charged: 81.7, skill: 618, burst: 134.4
  },
  Diluc: {
    name: "Diluc", stat: "CRate%", value: 24.2, element: "Fire", rarity: 5,
    baseATK: 335, baseHP: 12981, baseDEF: 784,
    normal: 130.4, charged: 100, skill: 132.1, burst: 571
  },
  Lisa: {
    name: "Lisa", stat: "EM", value: 96, element: "Electro", rarity: 4,
    baseATK: 232, baseHP: 9570, baseDEF: 573,
    normal: 55.4, charged: 248, skill: 682, burst: 51.2
  },
  Amber: {
    name: "Amber", stat: "ATK%", value: 24, element: "Fire", rarity: 4,
    baseATK: 223, baseHP: 9461, baseDEF: 601,
    normal: 52.5, charged: 173.6, skill: 172.5, burst: 707.6
  },
  Barbara: {
    name: "Barbara", stat: "HP%", value: 20.3, element: "Water", rarity: 4,
    baseATK: 159, baseHP: 9787, baseDEF: 669,
    normal: 53, charged: 232.7, skill: 81.8, burst: 0
  },
  Venti: {
    name: "Venti", stat: "EnRe%", value: 32, element: "Anemo", rarity: 5,
    baseATK: 263, baseHP: 10531, baseDEF: 669,
    normal: 59.2, charged: 173.6, skill: 532, burst: 52.6
  },
  Klee: {
    name: "Klee", stat: "Elemental%", value: 28.8, element: "Fire", rarity: 5,
    baseATK: 311, baseHP: 10287, baseDEF: 615,
    normal: 101, charged: 220.3, skill: 133.3, burst: 59.7
  },
  Mona: {
    name: "Mona", stat: "EnRe%", value: 32, element: "Water", rarity: 5,
    baseATK: 287, baseHP: 10409, baseDEF: 653,
    normal: 52.6, charged: 209.6, skill: 185.9, burst: 619.3
  },
  Fischl: {
    name: "Fischl", stat: "ATK%", value: 24, element: "Electro", rarity: 4,
    baseATK: 244, baseHP: 9189, baseDEF: 594,
    normal: 61.1, charged: 173.6, skill: 124, burst: 291.2
  },
  Jean: {
    name: "Jean", stat: "Healing%", value: 16.6, element: "Anemo", rarity: 5,
    baseATK: 239, baseHP: 14695, baseDEF: 769,
    normal: 70.2, charged: 235.5, skill: 408.8, burst: 594.7
  },
  Bennett: {
    name: "Bennett", stat: "EnRe%", value: 26.7, element: "Fire", rarity: 4,
    baseATK: 191, baseHP: 12397, baseDEF: 771,
    normal: 64.7, charged: 169.5, skill: 192.6, burst: 325.9
  },
  Xinyan: {
    name: "Xinyan", stat: "ATK%", value: 24, element: "Fire", rarity: 4,
    baseATK: 249, baseHP: 11201, baseDEF: 799,
    normal: 111.2, charged: 90.9, skill: 237.4, burst: 477.1
  },
  Kaeya: {
    name: "Kaeya", stat: "EnRe%", value: 26.7, element: "Ice", rarity: 4,
    baseATK: 223, baseHP: 11636, baseDEF: 792,
    normal: 78.1, charged: 186.2, skill: 267.7, burst: 108.6
  },
  Chongyun: {
    name: "Chongyun", stat: "ATK%", value: 24, element: "Ice", rarity: 4,
    baseATK: 223, baseHP: 10984, baseDEF: 648,
    normal: 101.7, charged: 81.8, skill: 240.8, burst: 598
  },
  Diona: {
    name: "Diona", stat: "Elemental%", value: 24, element: "Ice", rarity: 4,
    baseATK: 212, baseHP: 9570, baseDEF: 601,
    normal: 52.5, charged: 173.6, skill: 58.7 * 5, burst: 73.7
  },
  Tartaglia: {
    name: "Tartaglia", stat: "Elemental%", value: 28.8, element: "Water", rarity: 5,
    baseATK: 301, baseHP: 13103, baseDEF: 815,
    normal: 60, charged: 173.6, skill: 100.8, burst: 649.6
  },
  Ningguang: {
    name: "Ningguang", stat: "Elemental%", value: 36, element: "Earth", rarity: 4,
    baseATK: 212, baseHP: 9787, baseDEF: 573,
    normal: 39.2, charged: 442, skill: 322.5, burst: 121.7
  },
  Zhongli: {
    name: "Zhongli", stat: "Elemental%", value: 28.8, element: "Earth", rarity: 5,
    baseATK: 251, baseHP: 14695, baseDEF: 738,
    normal: 44.7, charged: 161.4, skill: 112, burst: 639.5
  },
  Noelle: {
    name: "Noelle", stat: "DEF%", value: 30, element: "Earth", rarity: 4,
    baseATK: 191, baseHP: 12071, baseDEF: 799,
    normal: 115, charged: 73.7, skill: 168, burst: 94
  },
  Sucrose: {
    name: "Sucrose", stat: "Elemental%", value: 24, element: "Anemo", rarity: 4,
    baseATK: 170, baseHP: 9244, baseDEF: 703,
    normal: 46.8, charged: 168.2, skill: 295.7, burst: 207.2
  },
  Xiangling: {
    name: "Xiangling", stat: "EM", value: 96, element: "Fire", rarity: 4,
    baseATK: 225, baseHP: 10875, baseDEF: 669,
    normal: 61.1, charged: 176.9, skill: 155.8, burst: 156.8
  },
  Xingqiu: {
    name: "Xingqiu", stat: "ATK%", value: 24, element: "Water", rarity: 4,
    baseATK: 202, baseHP: 10222, baseDEF: 758,
    normal: 67.7, charged: 68.7 + 81.6, skill: 235.2 + 267.7, burst: 76
  },
  Traveler: {
    name: "Traveler", stat: "ATK%", value: 24, element: "Anemo", rarity: 5,
    baseATK: 225, baseHP: 12310, baseDEF: 723,
    normal: 64.6, charged: 169.5, skill: 268.8, burst: 113.1
  },
};