export function getCharData(name, charLvl, talentLvl) {
  const char = charactersData[name];
  const baseStats = char[charLvl];

  let burstBonus  = 0
  let normalBonus = 0
  const charInfo = characters[name]
  if (charInfo.stackBonus) {
    if (charInfo.stackBonus.burst) {
      burstBonus = Math.floor(charInfo.stackBonus.burst.perStack[talentLvl] * charInfo.stackBonus.stacks * 10) / 10
    }
    if (charInfo.stackBonus.normal) {
      normalBonus = Math.floor(charInfo.stackBonus.normal.perStack[talentLvl] * charInfo.stackBonus.stacks * 10) / 10
    }
  }

  const talents = {
    normal: char.normal[talentLvl] + normalBonus,
    charged: char.charged[talentLvl],
    skill: char.skill[talentLvl],
    burst: char.burst[talentLvl] + burstBonus,
  };

  return {
    ...characters[name],
    ...baseStats,
    ...talents,
    charLvl,
    talentLvl: talentLvl + 1
  };
}

export let characters = {
  Keqing: {
    charName: "Keqing",
    element: "Electro", rarity: 5,
    weapon: "Sword",
    talentsBonus: [
      { desc: "15% bonus to CRate from Burst", name: "CRate%", value: 15, active: false },
      { desc: "15% bonus to Energy recharge from Burst", name: "EnRe%", value: 15, active: false }],
    constellationBonus: [
      { c: 4, desc: "After triggering reaction gain 25% ATK bonus", name: "ATK%", value: 25, active: false },
      { c: 6, desc: "Gain 6-24%(12) Electro DMG bonus", name: "Elemental%", value: 12, active: false }
    ]
  },
  Razor: {
    charName: "Razor",
    element: "Electro", rarity: 4,
    weapon: "Claymore",
    talentsBonus: [],
    constellationBonus: [
      { c: 1, desc: "Picking up elemental Orb increases DMG by 10%", name: "AllDMG%", value: 10, active: false },
      { c: 1, desc: "Crit Rate against enemies with less than 30%HP +10%", name: "CRate%", value: 10, active: false },
    ]
  },
  Qiqi: {
    charName: "Qiqi",
    element: "Ice", rarity: 5,
    weapon: "Sword",
    talentsBonus: [],
    constellationBonus: [
      { c: 2, desc: "Normal and Charged attack gain 15% bonus against Cryo", name: "NCATK%", value: 15, active: false },
    ]
  },
  Beidou: {
    charName: "Beidou",
    element: "Electro", rarity: 4,
    weapon: "Claymore",
    talentsBonus: [
      { desc: "Bonus after maximum counter attack Normal and Charged +15% dmg.", name: "NCATK", value: 15, active: false }
    ],
    constellationBonus: [
      { c: 4, desc: "After taking DMG Normal attack deals 20% additional Electo DMG", name: "Elemental%", value: 20, active: false },
    ]
  },
  Diluc: {
    charName: "Diluc",
    element: "Fire", rarity: 5,
    weapon: "Claymore",
    talentsBonus: [
      { desc: "Effect after burst, Pyro DMG 20% increase", name: "Elemental%", value: 20, active: false }
    ],
    constellationBonus: [
      { c: 1, desc: "Gain 15% more DMG", name: "AllDMG%", value: 15, active: false },
      { c: 2, desc: "When takes DMG gain 10-30%(20) ATK% bonus", name: "ATK%", value: 15, active: false },
      { c: 6, desc: "After Skill use gain 30% bonus to Normal ATK DMG", name: "NormalATK", value: 30, active: false }
    ]
  },
  Lisa: {
    charName: "Lisa",
    element: "Electro", rarity: 4,
    weapon: "Catalyst",
    talentsBonus: []
  },
  Amber: {
    charName: "Amber",
    element: "Fire", rarity: 4,
    weapon: "Bow",
    talentsBonus: [
      { desc: "Burst CRate increased by 10%", name: "BurstCRate%", value: 10, active: true },
      { desc: "ATK after hit on weak point increased by 15%", name: "ATK%", value: 15, active: false }
    ],
    constellationBonus: [
      { c: 1, desc: "Additional charged attack DMG 20%", name: "Charged%", value: 20, active: false },
      { c: 6, desc: "After Burst ATK +15% for 10s", name: "ATK%", value: 15, active: false }
    ]
  },
  Barbara: {
    charName: "Barbara",
    element: "Water", rarity: 4,
    weapon: "Catalyst",
    talentsBonus: [],
    constellationBonus: [
      { c: 2, desc: "During Skill effect gain +15% Hydro DMG bonus", name: "Elemental%", value: 15, active: false },
      { c: 6, desc: "After Burst ATK +15% for 10s", name: "ATK%", value: 15, active: false }
    ]
  },
  Venti: {
    charName: "Venti",
    element: "Anemo", rarity: 5,
    weapon: "Bow",
    talentsBonus: [],
    constellationBonus: [
      { c: 4, desc: "When obtain a Elemental Particle gain 25% Anemo DMG bonus", name: "Elemental%", value: 25, active: false },
    ]
  },
  Klee: {
    charName: "Klee",
    element: "Fire", rarity: 5,
    weapon: "Catalyst",
    talentsBonus: [
      { desc: "If you have a spark increases charged attack DMG by 50%", name: "Charged%", value: 50, active: false }
    ],
    constellationBonus: [
      { c: 6, desc: "After Burst gain 10% Pyro DMG bonus", name: "Elemental%", value: 10, active: false }
    ]
  },
  Mona: {
    charName: "Mona",
    element: "Water", rarity: 5,
    weapon: "Catalyst",
    talentsBonus: [
      { desc: "Increases Hydro DMG by 20% of Energy recharge.", name: "Elemental%", value: 0, active: true, func: (all) => {
        let bonus = Math.round((all["EnRe%"] + 100) * 0.2 * 10) / 10;
        all["Elemental%"] = all["Elemental%"] + bonus || bonus
      } 
    }
    ],
    constellationBonus: [
      { c: 6, desc: "After sprinting gain 60-180%(180) Charged attack bonus", name: "Charged%", value: 180, active: false }
    ]
  },
  Fischl: {
    charName: "Fischl",
    element: "Electro", rarity: 4,
    weapon: "Bow",
    talentsBonus: []
  },
  Jean: {
    charName: "Jean",
    element: "Anemo", rarity: 5,
    weapon: "Sword",
    talentsBonus: [],
    constellationBonus: [
      { c: 1, desc: "Increases Skill DMG by 40%", name: "Skill%", value: 40, active: false },
    ]
  },
  Bennett: {
    charName: "Bennett",
    element: "Fire", rarity: 4,
    weapon: "Sword",
    talentsBonus: [],
    constellationBonus: [
      { c: 6, desc: "Within Burst gain 15% Pyro DMG bonus", name: "Elemental%", value: 15, active: false }
    ]
  },
  Xinyan: {
    charName: "Xinyan",
    element: "Fire", rarity: 4,
    weapon: "Claymore",
    talentsBonus: [{ desc: "If shielded deals 15% more Physical dmg", name: "Physical%", value: 15, active: false }],
    constellationBonus: [
      { c: 6, desc: "Charged attack gain additional 50% DEF Bonus", name: "ChargedByDEF", value: 0, active: false },
    ]
  },
  Kaeya: {
    charName: "Kaeya",
    element: "Ice", rarity: 4,
    weapon: "Sword",
    talentsBonus: [],
    constellationBonus: [
      { c: 1, desc: "Gain 15% Crit Rate against enemies affected by Cryo", name: "CRate%", value: 15, active: false },
    ]
  },
  Chongyun: {
    charName: "Chongyun",
    element: "Ice", rarity: 4,
    weapon: "Claymore",
    talentsBonus: [],
    constellationBonus: [
      { c: 6, desc: "Burst DMG 15% bonus", name: "Burst%", value: 15, active: false }
    ]
  },
  Diona: {
    charName: "Diona",
    element: "Ice", rarity: 4,
    weapon: "Bow",
    talentsBonus: [],
    constellationBonus: [
      { c: 2, desc: "Skill DMG increased by 15%", name: "Skill%", value: 15, active: false },
      { c: 6, desc: "Inside Burst EM increased by 200", name: "EM", value: 200, active: false },
    ]
  },
  Tartaglia: {
    charName: "Tartaglia",
    element: "Water", rarity: 5,
    weapon: "Bow",
    talentsBonus: []
  },
  Ningguang: {
    charName: "Ningguang",
    element: "Geo", rarity: 4,
    weapon: "Catalyst",
    talentsBonus: [{ desc: "When passed through Jade screen gain 12% Geo dmg", name: "Elemental%", value: 12, active: false }]
  },
  Zhongli: {
    charName: "Zhongli",
    element: "Geo", rarity: 5,
    weapon: "Polearm",
    talentsBonus: [
      { desc: "Burst deals additional dmg equal 33% of HP", name: "ZhongliBurst", value: true, active: true }
    ]
  },
  Noelle: {
    charName: "Noelle",
    element: "Geo", rarity: 4,
    weapon: "Claymore",
    talentsBonus: [
      { desc: "Bonus to ATK from Burst", name: "FlatATK", value: 0, active: false, 
          func: (all, ch) => {
            const defence = ch.baseDEF * (1 + all["DEF%"] / 100) + all["FlatDEF"]
            const burstBonus = [40, 43, 46, 50, 53, 56, 60, 64, 68, 72, 76, 80, 85, 90, 95]
            const bonus = defence * (burstBonus[ch.talentLvl - 1] / 100)
            all["FlatATK"] += bonus
          } 
      }
    ],
    constellationBonus: [
      { c: 2, desc: "Charged ATK DMG increases by 15%", name: "Charged%", value: 15, active: false },
      { c: 6, desc: "Attack gain additional 50% DEF Bonus", name: "FlatATK", value: 0, active: false,
            func: (all, ch) => {
              const defence = ch.baseDEF * (1 + all["DEF%"] / 100) + all["FlatDEF"]
              if (ch.constellationBonus[1].active) {
                const bonus = defence * 0.5
                all["FlatATK"] += bonus
              }
            }  
      },
    ]
  },
  Sucrose: {
    charName: "Sucrose",
    element: "Anemo", rarity: 4,
    weapon: "Catalyst",
    talentsBonus: []
  },
  Xiangling: {
    charName: "Xiangling",
    element: "Fire", rarity: 4,
    weapon: "Polearm",
    talentsBonus: [{ desc: "Chili pepper increases ATK by 10%", name: "ATK%", value: 10, active: false }],
    constellationBonus: [
      { c: 6, desc: "During Burst gain 15% Pyro DMG bonus", name: "Elemental%", value: 15, active: false },
    ]
  },
  Xingqiu: {
    charName: "Xingqiu",
    element: "Water", rarity: 4,
    weapon: "Sword",
    talentsBonus: [{ desc: "Gain 20% Hydro DMG bonus", name: "Elemental%", value: 20, active: true }]
  },
  Ganyu: {
    charName: "Ganyu",
    element: "Ice", rarity: 5,
    weapon: "Bow",
    talentsBonus: [{ desc: "Crit rate of fully charged aimshot increased by 20% after firing one for 5s", name: "CRate%", value: 20, active: false },
    { desc: "After burst gain 20% bonus to Cryo DMG", name: "Elemental%", value: 20, active: false }]
  },
  Albedo: {
    charName: "Albedo",
    element: "Geo", rarity: 5,
    weapon: "Sword",
    talentsBonus: [
      { desc: "25% more dmg against enemies with 50% or lower HP", name: "AllDMG%", value: 25, active: true },
      { desc: "After Burst EM increased by 125", name: "EM", value: 125, active: false }]
  },
  Xiao: {
    charName: "Xiao",
    element: "Anemo", rarity: 5,
    weapon: "Polearm",
    talentsBonus: [
      { desc: "For the duration of Burst gain bonus to Normal and Charged Attack", name: "NCATK%", value: 0, active: false,
          func: (all, ch) =>  all["NCATK%"] = all["NCATK%"] + ch.burst || ch.burst },
      { desc: "While under burst effect gain maximum of 25% DMG bonus", name: "AllDMG%", value: 25, active: false }]
  },
  Hutao: {
    charName: "Hutao",
    element: "Fire", rarity: 5,
    weapon: "Polearm",
    talentsBonus: [
      { desc: "Bonus to ATK from Skill based on MaxHP", name: "FlatATK", value: 0, active: false,
        func: (all, ch, getters) => {
          const hp = Math.round(ch.baseHP * (1 + all["HP%"] / 100) + all["HP"])
          const skillBonus = [3.84, 4.07, 4.3, 4.6, 4.83, 5.06, 5.36, 5.66, 5.96, 6.26, 6.56, 6.85, 7.15, 7.45, 7.75]
          let bonus = hp * (skillBonus[ch.talentLvl - 1] / 100)
          if (bonus > getters.baseATK * 4) {
            bonus = getters.baseATK * 4
          }
          all["FlatATK"] += bonus
        }
      },
      { desc: "When HP <= 50% gains 33% Pyro DMG bonus", name: "Elemental%", value: 33, active: false },],
    constellationBonus: [
      { c: 6, desc: "When almost died CRate gains 100% bonus", name: "CRate%", value: 100, active: false },
    ]
  },
  Rosaria: {
    charName: "Rosaria",
    element: "Ice", rarity: 4,
    weapon: "Polearm",
    talentsBonus: [
      { desc: "When strikes from behind gain 12% CRate ", name: "CRate%", value: 12, active: false },
    ],
    constellationBonus: [
      { c: 1, desc: "When crit have Normal ATK DMG increased by 10%", name: "NormalATK%", value: 10, active: false },
    ]
  },
  Feiyan: {
    charName: "Feiyan",
    element: "Fire", rarity: 4,
    weapon: "Catalyst",
    talentsBonus: [],
    constellationBonus: [
      { c: 2, desc: "Against enemies with less than 50% gain 20% CRate", name: "CRate%", value: 20, active: false },
    ]
  },
  Eula: {
    charName: "Eula",
    element: "Ice", rarity: 5,
    weapon: "Claymore",
    talentsBonus: [
    ],
    stackBonus: {
      stacks: 0,
      max: 30,
      burst: { desc: (arr) => `Gain ${arr[0]}% bonus to Burst damage from Lightfall Sword stacks`,
        perStack: [74.99, 81.1, 87.2, 95.92, 102.02, 109, 118.59, 128.18, 137.78, 148.24, 160.23, 174.33, 188.43, 202.53, 217.91] },
  }
  },
  Kazuha: {
    charName: "Kazuha",
    element: "Anemo", rarity: 5,
    weapon: "Sword",
    talentsBonus: [],
    constellationBonus: [
      { c: 2, desc: "Inside Burst increases EM by 200", name: "EM", value: 200, active: false },
    ]
  },
  Ayaka: {
    charName: "Ayaka",
    element: "Ice", rarity: 5,
    weapon: "Sword",
    talentsBonus: [
      { desc: "Use of skill increases Normal and Charged DMG by 30% for 6s", name: "NCATK%", value: 30, active: false },
      { desc: "When sprint cryo hit opponent gain 18% of Cryo DMG", name: "Elemental%", value: 18, active: false },
    ],
  },
  Yoimiya: {
    charName: "Yoimiya",
    element: "Fire", rarity: 5,
    weapon: "Bow",
    talentsBonus: [
      { desc: "During elemental skill Normal attacks will increase Pyro DMG by maximum of 20% for 3s", name: "Elemental%", value: 20, active: false },
    ],
    constellationBonus: [
      { c: 1, desc: "If opponent defeated by Burst gain 20% ATK", name: "ATK%", value: 20, active: false },
      { c: 2, desc: "When Pyro DMG scores a crit gain 25% Pyro DMG", name: "Elemental%", value: 25, active: false }
    ]
  },
  Sayu: {
    charName: "Sayu",
    element: "Anemo", rarity: 4,
    weapon: "Claymore",
    talentsBonus: [],
  },
  Raiden: {
    charName: "Raiden",
    element: "Electro", rarity: 5,
    weapon: "Polearm",
    talentsBonus: [
      { desc: "Gain 0.4% of Elemental damage for each Energy recharge% over 100%", name: "Elemental%", value: 0, active: true,
        func: (all) => {
          const bonus = all["EnRe%"] * 0.4;
          all["Elemental%"] = Math.round((all["Elemental%"] + bonus || bonus) * 10) / 10    
        }
      },
      { desc: "If Burst active Normal and Charged attacks counts as Burst damage", name: "Burst%", value: 0, active: false,
        func: (all) => {
          all["NormalATK%"] = 0
          all["Charged%"] = 0
          all["NCATK%"] = all["Burst%"]
        }
    },
    ],
    stackBonus: {
      stacks: 0,
      max: 60,
      burst: { desc: (arr) => `Gain ${arr[0]}% bonus to Burst damage from Resolve stacks`,
        perStack: [3.89, 4.18, 4.47, 4.86, 5.15, 5.44, 5.83, 6.22, 6.61, 7, 7.39, 7.78, 8.26, 8.75, 9.23] },
      normal: { desc: (arr) => `Gain ${arr[0]}% bonus to Normal attacks damage from Resolve stacks`,
        perStack: [0.73, 0.78, 0.84, 0.91, 0.96, 1.02, 1.09, 1.16, 1.23, 1.31, 1.38, 1.45, 1.54, 1.63, 1.72] },
    }
  },
  Sara: {
    charName: "Sara",
    element: "Electro", rarity: 4,
    weapon: "Bow",
    talentsBonus: [],
  },
  Aloy: {
    charName: "Aloy",
    element: "Ice", rarity: 5,
    weapon: "Bow",
    talentsBonus: [
      { desc: "When receive Coil bonus ATK is increased by 16%", name: "ATK%", value: 16, active: false },
      { desc: "When in Rushing Ice state gain 3.5% - 35%(20%) bonus to Cryo DMG.", name: "Elemental%", value: 20, active: false },
    ],
  },
  Kokomi: {
    charName: "Kokomi",
    element: "Water", rarity: 5,
    weapon: "Catalyst",
    talentsBonus: [
      { desc: "Bonus to Normal,Charged and Skill DMG during Burst based on Max HP", name: "AllDMG%", value: 0, active: false }, 
      { desc: "Additional bonus to Normal and Charged DMG based on 15% of Healing bonus", name: "NCATK%", value: 0, active: false },
      { desc: "Gain 25% Healing bonus, lose 100% CRate", name: "Healing%", value: 25, active: true },   
    ],
  },
  Thoma: {
    charName: "Thoma",
    element: "Fire", rarity: 4,
    weapon: "Polearm",
    talentsBonus: [],
    constellationBonus: [
      { c: 6, desc: "When getting or updating the shield get 15% bonus to Normal, Charged and Plunging attack", name: "NCATK%", value: 15, active: false }
    ]
  },
  "Traveler (Anemo)": {
    charName: "Traveler (Anemo)",
    element: "Anemo", rarity: 5,
    weapon: "Sword",
    talentsBonus: []
  },
  "Traveler (Geo)": {
    charName: "Traveler (Anemo)",
    element: "Geo", rarity: 5,
    weapon: "Sword",
    talentsBonus: [],
    constellationBonus: [
      { c: 1, desc: "Crit Rate inside Burst increased by 10%", name: "CRate%", value: 10, active: false },
    ]
  },
  "Traveler (Electro)": {
    charName: "Traveler (Electro)",
    element: "Electro", rarity: 5,
    weapon: "Sword",
    talentsBonus: []
  },
};

export const charactersData = {
  "Keqing": {
    1: {
      "baseHP": 1020,
      "baseATK": 25,
      "baseDEF": 62,
      "value": 0,
      "name": "CDmg%"
    },
    20: {
      "baseHP": 2646,
      "baseATK": 65,
      "baseDEF": 161,
      "value": 0,
      "name": "CDmg%"
    },
    40: {
      "baseHP": 5268,
      "baseATK": 130,
      "baseDEF": 321,
      "value": 0,
      "name": "CDmg%"
    },
    50: {
      "baseHP": 6776,
      "baseATK": 167,
      "baseDEF": 413,
      "value": 9.6,
      "name": "CDmg%"
    },
    60: {
      "baseHP": 8500,
      "baseATK": 209,
      "baseDEF": 519,
      "value": 19.2,
      "name": "CDmg%"
    },
    70: {
      "baseHP": 10025,
      "baseATK": 247,
      "baseDEF": 612,
      "value": 19.2,
      "name": "CDmg%"
    },
    80: {
      "baseHP": 11561,
      "baseATK": 285,
      "baseDEF": 705,
      "value": 28.8,
      "name": "CDmg%"
    },
    90: {
      "baseHP": 13103,
      "baseATK": 323,
      "baseDEF": 799,
      "value": 38.4,
      "name": "CDmg%"
    },
    "normal": [
      41.02,
      44.36,
      47.7,
      52.47,
      55.81,
      59.62,
      64.87,
      70.12,
      75.37,
      81.09,
      86.81,
      92.54,
      98.26,
      103.99,
      109.71
    ],
    "charged": [
      162.8,
      176.05,
      189.3,
      208.23,
      221.48,
      236.63,
      257.45,
      278.27,
      299.09,
      321.81,
      344.53,
      367.24,
      389.96,
      412.67,
      435.39
    ],
    "skill": [
      168,
      180.6,
      193.2,
      210,
      222.6,
      235.2,
      252,
      268.8,
      285.6,
      302.4,
      319.2,
      336,
      357,
      378,
      399
    ],
    "burst": [
      468.8,
      504,
      539.1,
      586,
      621.2,
      656.3,
      703.2,
      750.1,
      797,
      843.8,
      890.7,
      937.6,
      996.2,
      1054.8,
      1113.4
    ],
    "20+": {
      "baseHP": 3521,
      "baseATK": 87,
      "baseDEF": 215,
      "value": 0,
      "name": "CDmg%"
    },
    "40+": {
      "baseHP": 5889,
      "baseATK": 145,
      "baseDEF": 359,
      "value": 9.6,
      "name": "CDmg%"
    },
    "50+": {
      "baseHP": 7604,
      "baseATK": 187,
      "baseDEF": 464,
      "value": 19.2,
      "name": "CDmg%"
    },
    "60+": {
      "baseHP": 9121,
      "baseATK": 225,
      "baseDEF": 556,
      "value": 19.2,
      "name": "CDmg%"
    },
    "70+": {
      "baseHP": 10647,
      "baseATK": 262,
      "baseDEF": 649,
      "value": 28.8,
      "name": "CDmg%"
    },
    "80+": {
      "baseHP": 12182,
      "baseATK": 300,
      "baseDEF": 743,
      "value": 38.4,
      "name": "CDmg%"
    }
  },
  "Venti": {
    1: {
      "baseHP": 820,
      "baseATK": 20,
      "baseDEF": 52,
      "value": 0,
      "name": "EnRe%"
    },
    20: {
      "baseHP": 2127,
      "baseATK": 53,
      "baseDEF": 135,
      "value": 0,
      "name": "EnRe%"
    },
    40: {
      "baseHP": 4234,
      "baseATK": 106,
      "baseDEF": 269,
      "value": 0,
      "name": "EnRe%"
    },
    50: {
      "baseHP": 5446,
      "baseATK": 136,
      "baseDEF": 346,
      "value": 8,
      "name": "EnRe%"
    },
    60: {
      "baseHP": 6832,
      "baseATK": 171,
      "baseDEF": 434,
      "value": 16,
      "name": "EnRe%"
    },
    70: {
      "baseHP": 8058,
      "baseATK": 201,
      "baseDEF": 512,
      "value": 16,
      "name": "EnRe%"
    },
    80: {
      "baseHP": 9292,
      "baseATK": 232,
      "baseDEF": 590,
      "value": 24,
      "name": "EnRe%"
    },
    90: {
      "baseHP": 10531,
      "baseATK": 263,
      "baseDEF": 669,
      "value": 32,
      "name": "EnRe%"
    },
    "normal": [
      40.76,
      44.08,
      47.4,
      52.14,
      55.46,
      59.26,
      64.46,
      69.68,
      74.9,
      80.58,
      87.1,
      94.76,
      102.42,
      110.1,
      118.46
    ],
    "charged": [
      124,
      133.3,
      142.6,
      155,
      164.3,
      173.6,
      186,
      198.4,
      210.8,
      223.2,
      236.1,
      252.96,
      269.82,
      286.69,
      303.55
    ],
    "skill": [
      276,
      296.7,
      317.4,
      345,
      365.7,
      386.4,
      414,
      441.6,
      469.2,
      496.8,
      524.4,
      552,
      586.5,
      621,
      655.5
    ],
    "burst": [
      37.6,
      40.42,
      43.24,
      47,
      49.82,
      52.64,
      56.4,
      60.16,
      63.92,
      67.68,
      71.44,
      75.2,
      79.9,
      84.6,
      89.3
    ],
    "20+": {
      "baseHP": 2830,
      "baseATK": 71,
      "baseDEF": 180,
      "value": 0,
      "name": "EnRe%"
    },
    "40+": {
      "baseHP": 4734,
      "baseATK": 118,
      "baseDEF": 301,
      "value": 8,
      "name": "EnRe%"
    },
    "50+": {
      "baseHP": 6112,
      "baseATK": 153,
      "baseDEF": 388,
      "value": 16,
      "name": "EnRe%"
    },
    "60+": {
      "baseHP": 7331,
      "baseATK": 183,
      "baseDEF": 465,
      "value": 16,
      "name": "EnRe%"
    },
    "70+": {
      "baseHP": 8557,
      "baseATK": 214,
      "baseDEF": 543,
      "value": 24,
      "name": "EnRe%"
    },
    "80+": {
      "baseHP": 9791,
      "baseATK": 245,
      "baseDEF": 622,
      "value": 32,
      "name": "EnRe%"
    }
  },
  "Fischl": {
    1: {
      "baseHP": 770,
      "baseATK": 20,
      "baseDEF": 50,
      "value": 0,
      "name": "ATK%"
    },
    20: {
      "baseHP": 1979,
      "baseATK": 53,
      "baseDEF": 128,
      "value": 0,
      "name": "ATK%"
    },
    40: {
      "baseHP": 3827,
      "baseATK": 102,
      "baseDEF": 247,
      "value": 0,
      "name": "ATK%"
    },
    50: {
      "baseHP": 4872,
      "baseATK": 130,
      "baseDEF": 315,
      "value": 6,
      "name": "ATK%"
    },
    60: {
      "baseHP": 6054,
      "baseATK": 161,
      "baseDEF": 391,
      "value": 12,
      "name": "ATK%"
    },
    70: {
      "baseHP": 7099,
      "baseATK": 189,
      "baseDEF": 459,
      "value": 12,
      "name": "ATK%"
    },
    80: {
      "baseHP": 8144,
      "baseATK": 216,
      "baseDEF": 526,
      "value": 18,
      "name": "ATK%"
    },
    90: {
      "baseHP": 9189,
      "baseATK": 244,
      "baseDEF": 594,
      "value": 24,
      "name": "ATK%"
    },
    "normal": [
      44.12,
      47.71,
      51.3,
      56.43,
      60.02,
      64.13,
      69.77,
      75.41,
      81.05,
      87.21,
      93.37,
      99.52,
      105.68,
      111.83,
      117.99
    ],
    "charged": [
      124,
      133.3,
      142.6,
      155,
      164.3,
      173.6,
      186,
      198.4,
      210.8,
      223.2,
      235.6,
      248,
      263.5,
      279,
      294.5
    ],
    "skill": [
      88.8,
      95.46,
      102.12,
      111,
      117.66,
      124.32,
      133.2,
      142.08,
      150.96,
      159.84,
      168.72,
      177.6,
      188.7,
      199.8,
      210.9
    ],
    "burst": [
      208,
      223.6,
      239.2,
      260,
      275.6,
      291.2,
      312,
      332.8,
      353.6,
      374.4,
      395.2,
      416,
      442,
      468,
      494
    ],
    "20+": {
      "baseHP": 2555,
      "baseATK": 68,
      "baseDEF": 165,
      "value": 0,
      "name": "ATK%"
    },
    "40+": {
      "baseHP": 4236,
      "baseATK": 113,
      "baseDEF": 274,
      "value": 6,
      "name": "ATK%"
    },
    "50+": {
      "baseHP": 5418,
      "baseATK": 144,
      "baseDEF": 350,
      "value": 12,
      "name": "ATK%"
    },
    "60+": {
      "baseHP": 6463,
      "baseATK": 172,
      "baseDEF": 418,
      "value": 12,
      "name": "ATK%"
    },
    "70+": {
      "baseHP": 7508,
      "baseATK": 200,
      "baseDEF": 485,
      "value": 18,
      "name": "ATK%"
    },
    "80+": {
      "baseHP": 8553,
      "baseATK": 227,
      "baseDEF": 553,
      "value": 24,
      "name": "ATK%"
    }
  },
  "Diluc": {
    1: {
      "baseHP": 1011,
      "baseATK": 26,
      "baseDEF": 61,
      "value": 0,
      "name": "CRate%"
    },
    20: {
      "baseHP": 2621,
      "baseATK": 68,
      "baseDEF": 158,
      "value": 0,
      "name": "CRate%"
    },
    40: {
      "baseHP": 5219,
      "baseATK": 135,
      "baseDEF": 315,
      "value": 0,
      "name": "CRate%"
    },
    50: {
      "baseHP": 6712,
      "baseATK": 173,
      "baseDEF": 405,
      "value": 4.8,
      "name": "CRate%"
    },
    60: {
      "baseHP": 8421,
      "baseATK": 217,
      "baseDEF": 509,
      "value": 9.6,
      "name": "CRate%"
    },
    70: {
      "baseHP": 9932,
      "baseATK": 256,
      "baseDEF": 600,
      "value": 9.6,
      "name": "CRate%"
    },
    80: {
      "baseHP": 11453,
      "baseATK": 295,
      "baseDEF": 692,
      "value": 14.4,
      "name": "CRate%"
    },
    90: {
      "baseHP": 12981,
      "baseATK": 335,
      "baseDEF": 784,
      "value": 19.2,
      "name": "CRate%"
    },
    "normal": [
      89.7,
      97,
      104.3,
      114.73,
      122.03,
      130.38,
      141.85,
      153.32,
      164.79,
      177.31,
      191.65,
      208.52,
      225.38,
      242.25,
      260.65
    ],
    "charged": [
      68.8,
      74.4,
      80,
      88,
      93.6,
      100,
      108.8,
      117.6,
      126.4,
      136,
      147,
      159.94,
      172.87,
      185.81,
      199.92
    ],
    "skill": [
      94.4,
      101.48,
      108.56,
      118,
      125.08,
      132.16,
      141.6,
      151.04,
      160.48,
      169.92,
      179.36,
      188.8,
      200.6,
      212.4,
      224.2
    ],
    "burst": [
      408,
      438.6,
      469.2,
      510,
      540.6,
      571.2,
      612,
      652.8,
      693.6,
      734.4,
      775.2,
      816,
      867,
      918,
      969
    ],
    "20+": {
      "baseHP": 3488,
      "baseATK": 90,
      "baseDEF": 211,
      "value": 0,
      "name": "CRate%"
    },
    "40+": {
      "baseHP": 5834,
      "baseATK": 151,
      "baseDEF": 352,
      "value": 4.8,
      "name": "CRate%"
    },
    "50+": {
      "baseHP": 7533,
      "baseATK": 194,
      "baseDEF": 455,
      "value": 9.6,
      "name": "CRate%"
    },
    "60+": {
      "baseHP": 9036,
      "baseATK": 233,
      "baseDEF": 546,
      "value": 9.6,
      "name": "CRate%"
    },
    "70+": {
      "baseHP": 10547,
      "baseATK": 272,
      "baseDEF": 637,
      "value": 14.4,
      "name": "CRate%"
    },
    "80+": {
      "baseHP": 12068,
      "baseATK": 311,
      "baseDEF": 729,
      "value": 19.2,
      "name": "CRate%"
    }
  },
  "Klee": {
    1: {
      "baseHP": 801,
      "baseATK": 24,
      "baseDEF": 48,
      "value": 0,
      "name": "Elemental%"
    },
    20: {
      "baseHP": 2077,
      "baseATK": 63,
      "baseDEF": 124,
      "value": 0,
      "name": "Elemental%"
    },
    40: {
      "baseHP": 4136,
      "baseATK": 125,
      "baseDEF": 247,
      "value": 0,
      "name": "Elemental%"
    },
    50: {
      "baseHP": 5319,
      "baseATK": 161,
      "baseDEF": 318,
      "value": 7.2,
      "name": "Elemental%"
    },
    60: {
      "baseHP": 6673,
      "baseATK": 202,
      "baseDEF": 399,
      "value": 14.4,
      "name": "Elemental%"
    },
    70: {
      "baseHP": 7870,
      "baseATK": 238,
      "baseDEF": 470,
      "value": 14.4,
      "name": "Elemental%"
    },
    80: {
      "baseHP": 9076,
      "baseATK": 274,
      "baseDEF": 542,
      "value": 21.6,
      "name": "Elemental%"
    },
    90: {
      "baseHP": 10287,
      "baseATK": 311,
      "baseDEF": 615,
      "value": 28.8,
      "name": "Elemental%"
    },
    "normal": [
      72.16,
      77.57,
      82.98,
      90.2,
      95.61,
      101.02,
      108.24,
      115.46,
      122.67,
      129.89,
      137.39,
      147.21,
      157.02,
      166.83,
      176.65
    ],
    "charged": [
      157.36,
      169.16,
      180.96,
      196.7,
      208.5,
      220.3,
      236.04,
      251.78,
      267.51,
      283.25,
      299.61,
      321.01,
      342.42,
      363.82,
      385.22
    ],
    "skill": [
      95.2,
      102.34,
      109.48,
      119,
      126.14,
      133.28,
      142.8,
      152.32,
      161.84,
      171.36,
      180.88,
      190.4,
      202.3,
      214.2,
      226.1
    ],
    "burst": [
      42.64,
      45.84,
      49.04,
      53.3,
      56.5,
      59.7,
      63.96,
      68.22,
      72.49,
      76.75,
      81.02,
      85.28,
      90.61,
      95.94,
      101.27
    ],
    "20+": {
      "baseHP": 2764,
      "baseATK": 84,
      "baseDEF": 165,
      "value": 0,
      "name": "Elemental%"
    },
    "40+": {
      "baseHP": 4623,
      "baseATK": 140,
      "baseDEF": 276,
      "value": 7.2,
      "name": "Elemental%"
    },
    "50+": {
      "baseHP": 5970,
      "baseATK": 180,
      "baseDEF": 357,
      "value": 14.4,
      "name": "Elemental%"
    },
    "60+": {
      "baseHP": 7161,
      "baseATK": 216,
      "baseDEF": 428,
      "value": 14.4,
      "name": "Elemental%"
    },
    "70+": {
      "baseHP": 8358,
      "baseATK": 253,
      "baseDEF": 500,
      "value": 21.6,
      "name": "Elemental%"
    },
    "80+": {
      "baseHP": 9563,
      "baseATK": 289,
      "baseDEF": 572,
      "value": 28.8,
      "name": "Elemental%"
    }
  },
  "Bennett": {
    1: {
      "baseHP": 1039,
      "baseATK": 16,
      "baseDEF": 65,
      "value": 0,
      "name": "EnRe%"
    },
    20: {
      "baseHP": 2670,
      "baseATK": 41,
      "baseDEF": 166,
      "value": 0,
      "name": "EnRe%"
    },
    40: {
      "baseHP": 5163,
      "baseATK": 80,
      "baseDEF": 321,
      "value": 0,
      "name": "EnRe%"
    },
    50: {
      "baseHP": 6573,
      "baseATK": 101,
      "baseDEF": 409,
      "value": 6.7,
      "name": "EnRe%"
    },
    60: {
      "baseHP": 8168,
      "baseATK": 126,
      "baseDEF": 508,
      "value": 13.3,
      "name": "EnRe%"
    },
    70: {
      "baseHP": 9577,
      "baseATK": 148,
      "baseDEF": 596,
      "value": 13.3,
      "name": "EnRe%"
    },
    80: {
      "baseHP": 10987,
      "baseATK": 169,
      "baseDEF": 684,
      "value": 20,
      "name": "EnRe%"
    },
    90: {
      "baseHP": 12397,
      "baseATK": 191,
      "baseDEF": 771,
      "value": 26.7,
      "name": "EnRe%"
    },
    "normal": [
      44.55,
      48.17,
      51.8,
      56.98,
      60.61,
      64.75,
      70.45,
      76.15,
      81.84,
      88.06,
      94.28,
      100.49,
      106.71,
      112.92,
      119.14
    ],
    "charged": [
      116.62,
      126.11,
      135.6,
      149.16,
      158.65,
      169.5,
      184.42,
      199.33,
      214.25,
      230.52,
      246.79,
      263.06,
      279.34,
      295.61,
      311.88
    ],
    "skill": [
      137.6,
      147.92,
      158.24,
      172,
      182.32,
      192.64,
      206.4,
      220.16,
      233.92,
      247.68,
      261.44,
      275.2,
      292.4,
      309.6,
      326.8
    ],
    "burst": [
      232.8,
      250.26,
      267.72,
      291,
      308.46,
      325.92,
      349.2,
      372.48,
      395.76,
      419.04,
      442.32,
      465.6,
      494.7,
      523.8,
      552.9
    ],
    "20+": {
      "baseHP": 3447,
      "baseATK": 53,
      "baseDEF": 214,
      "value": 0,
      "name": "EnRe%"
    },
    "40+": {
      "baseHP": 5715,
      "baseATK": 88,
      "baseDEF": 356,
      "value": 6.7,
      "name": "EnRe%"
    },
    "50+": {
      "baseHP": 7309,
      "baseATK": 113,
      "baseDEF": 455,
      "value": 13.3,
      "name": "EnRe%"
    },
    "60+": {
      "baseHP": 8719,
      "baseATK": 134,
      "baseDEF": 542,
      "value": 13.3,
      "name": "EnRe%"
    },
    "70+": {
      "baseHP": 10129,
      "baseATK": 156,
      "baseDEF": 630,
      "value": 20,
      "name": "EnRe%"
    },
    "80+": {
      "baseHP": 11539,
      "baseATK": 178,
      "baseDEF": 718,
      "value": 26.7,
      "name": "EnRe%"
    }
  },
  "Xiangling": {
    1: {
      "baseHP": 912,
      "baseATK": 19,
      "baseDEF": 56,
      "value": 0,
      "name": "EM"
    },
    20: {
      "baseHP": 2342,
      "baseATK": 48,
      "baseDEF": 144,
      "value": 0,
      "name": "EM"
    },
    40: {
      "baseHP": 4529,
      "baseATK": 94,
      "baseDEF": 279,
      "value": 0,
      "name": "EM"
    },
    50: {
      "baseHP": 5766,
      "baseATK": 119,
      "baseDEF": 355,
      "value": 24,
      "name": "EM"
    },
    60: {
      "baseHP": 7164,
      "baseATK": 148,
      "baseDEF": 441,
      "value": 48,
      "name": "EM"
    },
    70: {
      "baseHP": 8401,
      "baseATK": 174,
      "baseDEF": 517,
      "value": 48,
      "name": "EM"
    },
    80: {
      "baseHP": 9638,
      "baseATK": 200,
      "baseDEF": 593,
      "value": 72,
      "name": "EM"
    },
    90: {
      "baseHP": 10875,
      "baseATK": 225,
      "baseDEF": 669,
      "value": 96,
      "name": "EM"
    },
    "normal": [
      42.05,
      45.48,
      48.9,
      53.79,
      57.21,
      61.13,
      66.5,
      71.88,
      77.26,
      83.13,
      89.85,
      97.76,
      105.67,
      113.58,
      122.2
    ],
    "charged": [
      121.69,
      131.6,
      141.5,
      155.65,
      165.56,
      176.88,
      192.44,
      208.01,
      223.57,
      240.55,
      260.01,
      282.89,
      305.77,
      328.65,
      353.61
    ],
    "skill": [
      111.28,
      119.63,
      127.97,
      139.1,
      147.45,
      155.79,
      166.92,
      178.05,
      189.18,
      200.3,
      211.43,
      222.56,
      236.47,
      250.38,
      264.29
    ],
    "burst": [
      112,
      120.4,
      128.8,
      140,
      148.4,
      156.8,
      168,
      179.2,
      190.4,
      201.6,
      212.8,
      224,
      238,
      252,
      266
    ],
    "20+": {
      "baseHP": 3024,
      "baseATK": 63,
      "baseDEF": 186,
      "value": 0,
      "name": "EM"
    },
    "40+": {
      "baseHP": 5013,
      "baseATK": 104,
      "baseDEF": 308,
      "value": 24,
      "name": "EM"
    },
    "50+": {
      "baseHP": 6411,
      "baseATK": 133,
      "baseDEF": 394,
      "value": 48,
      "name": "EM"
    },
    "60+": {
      "baseHP": 7648,
      "baseATK": 158,
      "baseDEF": 470,
      "value": 48,
      "name": "EM"
    },
    "70+": {
      "baseHP": 8885,
      "baseATK": 184,
      "baseDEF": 546,
      "value": 72,
      "name": "EM"
    },
    "80+": {
      "baseHP": 10122,
      "baseATK": 210,
      "baseDEF": 623,
      "value": 96,
      "name": "EM"
    }
  },
  "Xingqiu": {
    1: {
      "baseHP": 857,
      "baseATK": 17,
      "baseDEF": 64,
      "value": 0,
      "name": "ATK%"
    },
    20: {
      "baseHP": 2202,
      "baseATK": 43,
      "baseDEF": 163,
      "value": 0,
      "name": "ATK%"
    },
    40: {
      "baseHP": 4257,
      "baseATK": 84,
      "baseDEF": 316,
      "value": 0,
      "name": "ATK%"
    },
    50: {
      "baseHP": 5420,
      "baseATK": 107,
      "baseDEF": 402,
      "value": 6,
      "name": "ATK%"
    },
    60: {
      "baseHP": 6735,
      "baseATK": 133,
      "baseDEF": 499,
      "value": 12,
      "name": "ATK%"
    },
    70: {
      "baseHP": 7897,
      "baseATK": 156,
      "baseDEF": 585,
      "value": 12,
      "name": "ATK%"
    },
    80: {
      "baseHP": 9060,
      "baseATK": 179,
      "baseDEF": 671,
      "value": 18,
      "name": "ATK%"
    },
    90: {
      "baseHP": 10222,
      "baseATK": 202,
      "baseDEF": 758,
      "value": 24,
      "name": "ATK%"
    },
    "normal": [
      46.61,
      50.41,
      54.2,
      59.62,
      63.41,
      67.75,
      73.71,
      79.67,
      85.64,
      92.14,
      99.59,
      108.36,
      117.12,
      125.88,
      135.45
    ],
    "charged": [
      103.46,
      111.88,
      120.3,
      132.33,
      140.75,
      150.38,
      163.61,
      176.84,
      190.07,
      204.51,
      221.05,
      240.51,
      259.96,
      279.41,
      300.63
    ],
    "skill": [
      359.2,
      386.14,
      413.08,
      449,
      475.94,
      502.88,
      538.8,
      574.72,
      610.64,
      646.56,
      682.48,
      718.4,
      763.3,
      808.2,
      853.1
    ],
    "burst": [
      54.27,
      58.34,
      62.41,
      67.84,
      71.91,
      75.98,
      81.41,
      86.84,
      92.26,
      97.69,
      103.12,
      108.54,
      115.33,
      122.11,
      128.9
    ],
    "20+": {
      "baseHP": 2842,
      "baseATK": 56,
      "baseDEF": 211,
      "value": 0,
      "name": "ATK%"
    },
    "40+": {
      "baseHP": 4712,
      "baseATK": 93,
      "baseDEF": 349,
      "value": 6,
      "name": "ATK%"
    },
    "50+": {
      "baseHP": 6027,
      "baseATK": 119,
      "baseDEF": 447,
      "value": 12,
      "name": "ATK%"
    },
    "60+": {
      "baseHP": 7190,
      "baseATK": 142,
      "baseDEF": 533,
      "value": 12,
      "name": "ATK%"
    },
    "70+": {
      "baseHP": 8352,
      "baseATK": 165,
      "baseDEF": 619,
      "value": 18,
      "name": "ATK%"
    },
    "80+": {
      "baseHP": 9514,
      "baseATK": 188,
      "baseDEF": 705,
      "value": 24,
      "name": "ATK%"
    }
  },
  "Mona": {
    1: {
      "baseHP": 810,
      "baseATK": 22,
      "baseDEF": 51,
      "value": 0,
      "name": "EnRe%"
    },
    20: {
      "baseHP": 2102,
      "baseATK": 58,
      "baseDEF": 132,
      "value": 0,
      "name": "EnRe%"
    },
    40: {
      "baseHP": 4185,
      "baseATK": 115,
      "baseDEF": 263,
      "value": 0,
      "name": "EnRe%"
    },
    50: {
      "baseHP": 5383,
      "baseATK": 148,
      "baseDEF": 338,
      "value": 8,
      "name": "EnRe%"
    },
    60: {
      "baseHP": 6752,
      "baseATK": 186,
      "baseDEF": 424,
      "value": 16,
      "name": "EnRe%"
    },
    70: {
      "baseHP": 7964,
      "baseATK": 220,
      "baseDEF": 500,
      "value": 16,
      "name": "EnRe%"
    },
    80: {
      "baseHP": 9184,
      "baseATK": 253,
      "baseDEF": 576,
      "value": 24,
      "name": "EnRe%"
    },
    90: {
      "baseHP": 10409,
      "baseATK": 287,
      "baseDEF": 653,
      "value": 32,
      "name": "EnRe%"
    },
    "normal": [
      37.6,
      40.42,
      43.24,
      47,
      49.82,
      52.64,
      56.4,
      60.16,
      63.92,
      67.68,
      71.44,
      75.2,
      79.9,
      84.6,
      89.3
    ],
    "charged": [
      149.72,
      160.95,
      172.18,
      187.15,
      198.38,
      209.61,
      224.58,
      239.55,
      254.52,
      269.5,
      285.07,
      305.43,
      325.79,
      346.15,
      366.51
    ],
    "skill": [
      132.8,
      142.76,
      152.72,
      166,
      175.96,
      185.92,
      199.2,
      212.48,
      225.76,
      239.04,
      252.32,
      265.6,
      282.2,
      298.8,
      315.4
    ],
    "burst": [
      442.4,
      475.58,
      508.76,
      553,
      586.18,
      619.36,
      663.6,
      707.84,
      752.08,
      796.32,
      840.56,
      884.8,
      940.1,
      995.4,
      1050.7
    ],
    "20+": {
      "baseHP": 2797,
      "baseATK": 77,
      "baseDEF": 176,
      "value": 0,
      "name": "EnRe%"
    },
    "40+": {
      "baseHP": 4678,
      "baseATK": 129,
      "baseDEF": 294,
      "value": 8,
      "name": "EnRe%"
    },
    "50+": {
      "baseHP": 6041,
      "baseATK": 167,
      "baseDEF": 379,
      "value": 16,
      "name": "EnRe%"
    },
    "60+": {
      "baseHP": 7246,
      "baseATK": 200,
      "baseDEF": 455,
      "value": 16,
      "name": "EnRe%"
    },
    "70+": {
      "baseHP": 8458,
      "baseATK": 233,
      "baseDEF": 531,
      "value": 24,
      "name": "EnRe%"
    },
    "80+": {
      "baseHP": 9677,
      "baseATK": 267,
      "baseDEF": 607,
      "value": 32,
      "name": "EnRe%"
    }
  },
  "Jean": {
    1: {
      "baseHP": 1144,
      "baseATK": 19,
      "baseDEF": 60,
      "value": 0,
      "name": "Healing%"
    },
    20: {
      "baseHP": 2967,
      "baseATK": 48,
      "baseDEF": 155,
      "value": 0,
      "name": "Healing%"
    },
    40: {
      "baseHP": 5908,
      "baseATK": 96,
      "baseDEF": 309,
      "value": 0,
      "name": "Healing%"
    },
    50: {
      "baseHP": 7599,
      "baseATK": 124,
      "baseDEF": 397,
      "value": 5.5,
      "name": "Healing%"
    },
    60: {
      "baseHP": 9533,
      "baseATK": 155,
      "baseDEF": 499,
      "value": 11.1,
      "name": "Healing%"
    },
    70: {
      "baseHP": 11243,
      "baseATK": 183,
      "baseDEF": 588,
      "value": 11.1,
      "name": "Healing%"
    },
    80: {
      "baseHP": 12965,
      "baseATK": 211,
      "baseDEF": 678,
      "value": 16.6,
      "name": "Healing%"
    },
    90: {
      "baseHP": 14695,
      "baseATK": 239,
      "baseDEF": 769,
      "value": 22.2,
      "name": "Healing%"
    },
    "normal": [
      48.33,
      52.27,
      56.2,
      61.82,
      65.75,
      70.25,
      76.43,
      82.61,
      88.8,
      95.54,
      103.27,
      112.36,
      121.44,
      130.53,
      140.44
    ],
    "charged": [
      162.02,
      175.21,
      188.4,
      207.24,
      220.43,
      235.5,
      256.22,
      276.95,
      297.67,
      320.28,
      346.19,
      376.65,
      407.11,
      437.58,
      470.81
    ],
    "skill": [
      292,
      313.9,
      335.8,
      365,
      386.9,
      408.8,
      438,
      467.2,
      496.4,
      525.6,
      554.8,
      584,
      620.5,
      657,
      693.5
    ],
    "burst": [
      424.8,
      456.66,
      488.52,
      531,
      562.86,
      594.72,
      637.2,
      679.68,
      722.16,
      764.64,
      807.12,
      849.6,
      902.7,
      955.8,
      1008.9
    ],
    "20+": {
      "baseHP": 3948,
      "baseATK": 64,
      "baseDEF": 206,
      "value": 0,
      "name": "Healing%"
    },
    "40+": {
      "baseHP": 6605,
      "baseATK": 108,
      "baseDEF": 345,
      "value": 5.5,
      "name": "Healing%"
    },
    "50+": {
      "baseHP": 8528,
      "baseATK": 139,
      "baseDEF": 446,
      "value": 11.1,
      "name": "Healing%"
    },
    "60+": {
      "baseHP": 10230,
      "baseATK": 166,
      "baseDEF": 535,
      "value": 11.1,
      "name": "Healing%"
    },
    "70+": {
      "baseHP": 11940,
      "baseATK": 194,
      "baseDEF": 624,
      "value": 16.6,
      "name": "Healing%"
    },
    "80+": {
      "baseHP": 13662,
      "baseATK": 222,
      "baseDEF": 715,
      "value": 22.2,
      "name": "Healing%"
    }
  },
  "Sucrose": {
    1: {
      "baseHP": 775,
      "baseATK": 14,
      "baseDEF": 59,
      "value": 0,
      "name": "Elemental%"
    },
    20: {
      "baseHP": 1991,
      "baseATK": 37,
      "baseDEF": 151,
      "value": 0,
      "name": "Elemental%"
    },
    40: {
      "baseHP": 3850,
      "baseATK": 71,
      "baseDEF": 293,
      "value": 0,
      "name": "Elemental%"
    },
    50: {
      "baseHP": 4901,
      "baseATK": 90,
      "baseDEF": 373,
      "value": 6,
      "name": "Elemental%"
    },
    60: {
      "baseHP": 6090,
      "baseATK": 112,
      "baseDEF": 463,
      "value": 12,
      "name": "Elemental%"
    },
    70: {
      "baseHP": 7141,
      "baseATK": 131,
      "baseDEF": 543,
      "value": 12,
      "name": "Elemental%"
    },
    80: {
      "baseHP": 8192,
      "baseATK": 151,
      "baseDEF": 623,
      "value": 18,
      "name": "Elemental%"
    },
    90: {
      "baseHP": 9244,
      "baseATK": 170,
      "baseDEF": 703,
      "value": 24,
      "name": "Elemental%"
    },
    "normal": [
      33.46,
      35.97,
      38.48,
      41.83,
      44.34,
      46.85,
      50.2,
      53.54,
      56.89,
      60.24,
      63.58,
      66.93,
      71.11,
      75.29,
      79.48
    ],
    "charged": [
      120.16,
      129.17,
      138.18,
      150.2,
      159.21,
      168.22,
      180.24,
      192.26,
      204.27,
      216.29,
      228.3,
      240.32,
      255.34,
      270.36,
      285.38
    ],
    "skill": [
      211.2,
      227.04,
      242.88,
      264,
      279.84,
      295.68,
      316.8,
      337.92,
      359.04,
      380.16,
      401.28,
      422.4,
      448.8,
      475.2,
      501.6
    ],
    "burst": [
      148,
      159.1,
      170.2,
      185,
      196.1,
      207.2,
      222,
      236.8,
      251.6,
      266.4,
      281.2,
      296,
      314.5,
      333,
      351.5
    ],
    "20+": {
      "baseHP": 2570,
      "baseATK": 47,
      "baseDEF": 195,
      "value": 0,
      "name": "Elemental%"
    },
    "40+": {
      "baseHP": 4261,
      "baseATK": 78,
      "baseDEF": 324,
      "value": 6,
      "name": "Elemental%"
    },
    "50+": {
      "baseHP": 5450,
      "baseATK": 100,
      "baseDEF": 414,
      "value": 12,
      "name": "Elemental%"
    },
    "60+": {
      "baseHP": 6501,
      "baseATK": 120,
      "baseDEF": 494,
      "value": 12,
      "name": "Elemental%"
    },
    "70+": {
      "baseHP": 7552,
      "baseATK": 139,
      "baseDEF": 574,
      "value": 18,
      "name": "Elemental%"
    },
    "80+": {
      "baseHP": 8604,
      "baseATK": 158,
      "baseDEF": 654,
      "value": 24,
      "name": "Elemental%"
    }
  },
  "Qiqi": {
    1: {
      "baseHP": 963,
      "baseATK": 22,
      "baseDEF": 72,
      "value": 0,
      "name": "Healing%"
    },
    20: {
      "baseHP": 2498,
      "baseATK": 58,
      "baseDEF": 186,
      "value": 0,
      "name": "Healing%"
    },
    40: {
      "baseHP": 4973,
      "baseATK": 115,
      "baseDEF": 371,
      "value": 0,
      "name": "Healing%"
    },
    50: {
      "baseHP": 6396,
      "baseATK": 148,
      "baseDEF": 477,
      "value": 5.5,
      "name": "Healing%"
    },
    60: {
      "baseHP": 8023,
      "baseATK": 186,
      "baseDEF": 598,
      "value": 11.1,
      "name": "Healing%"
    },
    70: {
      "baseHP": 9463,
      "baseATK": 220,
      "baseDEF": 706,
      "value": 11.1,
      "name": "Healing%"
    },
    80: {
      "baseHP": 10912,
      "baseATK": 253,
      "baseDEF": 814,
      "value": 16.6,
      "name": "Healing%"
    },
    90: {
      "baseHP": 12368,
      "baseATK": 287,
      "baseDEF": 922,
      "value": 22.2,
      "name": "Healing%"
    },
    "normal": [
      37.75,
      40.83,
      43.9,
      48.29,
      51.36,
      54.88,
      59.7,
      64.53,
      69.36,
      74.63,
      79.9,
      85.17,
      90.43,
      95.7,
      100.97
    ],
    "charged": [
      128.66,
      139.12,
      149.6,
      164.56,
      175.04,
      187,
      203.46,
      219.92,
      236.36,
      254.32,
      272.28,
      290.22,
      308.18,
      326.12,
      344.08
    ],
    "skill": [
      96,
      103.2,
      110.4,
      120,
      127.2,
      134.4,
      144,
      153.6,
      163.2,
      172.8,
      182.4,
      192,
      204,
      216,
      228
    ],
    "burst": [
      284.8,
      306.16,
      327.52,
      356,
      377.36,
      398.72,
      427.2,
      455.68,
      484.16,
      512.64,
      541.12,
      569.6,
      605.2,
      640.8,
      676.4
    ],
    "20+": {
      "baseHP": 3323,
      "baseATK": 77,
      "baseDEF": 248,
      "value": 0,
      "name": "Healing%"
    },
    "40+": {
      "baseHP": 5559,
      "baseATK": 129,
      "baseDEF": 415,
      "value": 5.5,
      "name": "Healing%"
    },
    "50+": {
      "baseHP": 7178,
      "baseATK": 167,
      "baseDEF": 535,
      "value": 11.1,
      "name": "Healing%"
    },
    "60+": {
      "baseHP": 8610,
      "baseATK": 200,
      "baseDEF": 642,
      "value": 11.1,
      "name": "Healing%"
    },
    "70+": {
      "baseHP": 10050,
      "baseATK": 233,
      "baseDEF": 749,
      "value": 16.6,
      "name": "Healing%"
    },
    "80+": {
      "baseHP": 11499,
      "baseATK": 267,
      "baseDEF": 857,
      "value": 22.2,
      "name": "Healing%"
    }
  },
  "Diona": {
    1: {
      "baseHP": 802,
      "baseATK": 18,
      "baseDEF": 50,
      "value": 0,
      "name": "Elemental%"
    },
    20: {
      "baseHP": 2061,
      "baseATK": 46,
      "baseDEF": 129,
      "value": 0,
      "name": "Elemental%"
    },
    40: {
      "baseHP": 3985,
      "baseATK": 88,
      "baseDEF": 250,
      "value": 0,
      "name": "Elemental%"
    },
    50: {
      "baseHP": 5074,
      "baseATK": 113,
      "baseDEF": 318,
      "value": 6,
      "name": "Elemental%"
    },
    60: {
      "baseHP": 6305,
      "baseATK": 140,
      "baseDEF": 396,
      "value": 12,
      "name": "Elemental%"
    },
    70: {
      "baseHP": 7393,
      "baseATK": 164,
      "baseDEF": 464,
      "value": 12,
      "name": "Elemental%"
    },
    80: {
      "baseHP": 8481,
      "baseATK": 188,
      "baseDEF": 532,
      "value": 18,
      "name": "Elemental%"
    },
    90: {
      "baseHP": 9570,
      "baseATK": 212,
      "baseDEF": 601,
      "value": 24,
      "name": "Elemental%"
    },
    "normal": [
      36.12,
      39.06,
      42,
      46.2,
      49.14,
      52.5,
      57.12,
      61.74,
      66.36,
      71.4,
      77.18,
      83.97,
      90.76,
      97.55,
      104.96
    ],
    "charged": [
      124,
      133.3,
      142.6,
      155,
      164.3,
      173.6,
      186,
      198.4,
      210.8,
      223.2,
      236.1,
      252.96,
      269.82,
      286.69,
      303.55
    ],
    "skill": [
      209.60000000000002,
      225.3,
      241.05,
      262,
      277.7,
      293.45,
      314.40000000000003,
      335.34999999999997,
      356.3,
      377.29999999999995,
      398.25,
      419.20000000000005,
      445.4,
      471.59999999999997,
      497.8
    ],
    "burst": [
      52.64,
      56.59,
      60.54,
      65.8,
      69.75,
      73.7,
      78.96,
      84.22,
      89.49,
      94.75,
      100.02,
      105.28,
      111.86,
      118.44,
      125.02
    ],
    "20+": {
      "baseHP": 2661,
      "baseATK": 59,
      "baseDEF": 167,
      "value": 0,
      "name": "Elemental%"
    },
    "40+": {
      "baseHP": 4411,
      "baseATK": 98,
      "baseDEF": 277,
      "value": 6,
      "name": "Elemental%"
    },
    "50+": {
      "baseHP": 5642,
      "baseATK": 125,
      "baseDEF": 354,
      "value": 12,
      "name": "Elemental%"
    },
    "60+": {
      "baseHP": 6731,
      "baseATK": 149,
      "baseDEF": 422,
      "value": 12,
      "name": "Elemental%"
    },
    "70+": {
      "baseHP": 7818,
      "baseATK": 174,
      "baseDEF": 491,
      "value": 18,
      "name": "Elemental%"
    },
    "80+": {
      "baseHP": 8907,
      "baseATK": 198,
      "baseDEF": 559,
      "value": 24,
      "name": "Elemental%"
    }
  },
  "Xinyan": {
    1: {
      "baseHP": 939,
      "baseATK": 21,
      "baseDEF": 67,
      "value": 0,
      "name": "ATK%"
    },
    20: {
      "baseHP": 2413,
      "baseATK": 54,
      "baseDEF": 172,
      "value": 0,
      "name": "ATK%"
    },
    40: {
      "baseHP": 4665,
      "baseATK": 103,
      "baseDEF": 333,
      "value": 0,
      "name": "ATK%"
    },
    50: {
      "baseHP": 5939,
      "baseATK": 132,
      "baseDEF": 423,
      "value": 6,
      "name": "ATK%"
    },
    60: {
      "baseHP": 7379,
      "baseATK": 164,
      "baseDEF": 526,
      "value": 12,
      "name": "ATK%"
    },
    70: {
      "baseHP": 8653,
      "baseATK": 192,
      "baseDEF": 617,
      "value": 12,
      "name": "ATK%"
    },
    80: {
      "baseHP": 9927,
      "baseATK": 220,
      "baseDEF": 708,
      "value": 18,
      "name": "ATK%"
    },
    90: {
      "baseHP": 11201,
      "baseATK": 249,
      "baseDEF": 799,
      "value": 24,
      "name": "ATK%"
    },
    "normal": [
      76.54,
      82.77,
      89,
      97.9,
      104.13,
      111.25,
      121.04,
      130.83,
      140.62,
      151.3,
      161.98,
      172.66,
      183.34,
      194.02,
      204.7
    ],
    "charged": [
      62.55,
      67.64,
      72.73,
      80,
      85.09,
      90.91,
      98.91,
      106.91,
      114.91,
      123.64,
      132.36,
      141.09,
      149.82,
      158.55,
      167.27
    ],
    "skill": [
      169.6,
      182.32,
      195.04,
      212,
      224.72,
      237.44,
      254.4,
      271.36,
      288.32,
      305.28,
      322.24,
      339.2,
      360.4,
      381.6,
      402.8
    ],
    "burst": [
      340.8,
      366.36,
      391.92,
      426,
      451.56,
      477.12,
      511.2,
      545.28,
      579.36,
      613.44,
      647.52,
      681.6,
      724.2,
      766.8,
      809.4
    ],
    "20+": {
      "baseHP": 3114,
      "baseATK": 69,
      "baseDEF": 222,
      "value": 0,
      "name": "ATK%"
    },
    "40+": {
      "baseHP": 5163,
      "baseATK": 115,
      "baseDEF": 368,
      "value": 6,
      "name": "ATK%"
    },
    "50+": {
      "baseHP": 6604,
      "baseATK": 147,
      "baseDEF": 471,
      "value": 12,
      "name": "ATK%"
    },
    "60+": {
      "baseHP": 7878,
      "baseATK": 175,
      "baseDEF": 562,
      "value": 12,
      "name": "ATK%"
    },
    "70+": {
      "baseHP": 9151,
      "baseATK": 203,
      "baseDEF": 652,
      "value": 18,
      "name": "ATK%"
    },
    "80+": {
      "baseHP": 10425,
      "baseATK": 231,
      "baseDEF": 743,
      "value": 24,
      "name": "ATK%"
    }
  },
  "Razor": {
    1: {
      "baseHP": 1003,
      "baseATK": 20,
      "baseDEF": 63,
      "value": 0,
      "name": "Physical%"
    },
    20: {
      "baseHP": 2577,
      "baseATK": 50,
      "baseDEF": 162,
      "value": 0,
      "name": "Physical%"
    },
    40: {
      "baseHP": 4982,
      "baseATK": 97,
      "baseDEF": 313,
      "value": 0,
      "name": "Physical%"
    },
    50: {
      "baseHP": 6343,
      "baseATK": 124,
      "baseDEF": 398,
      "value": 7.5,
      "name": "Physical%"
    },
    60: {
      "baseHP": 7881,
      "baseATK": 154,
      "baseDEF": 495,
      "value": 15,
      "name": "Physical%"
    },
    70: {
      "baseHP": 9241,
      "baseATK": 180,
      "baseDEF": 580,
      "value": 15,
      "name": "Physical%"
    },
    80: {
      "baseHP": 10602,
      "baseATK": 207,
      "baseDEF": 665,
      "value": 22.5,
      "name": "Physical%"
    },
    90: {
      "baseHP": 11962,
      "baseATK": 234,
      "baseDEF": 751,
      "value": 30,
      "name": "Physical%"
    },
    "normal": [
      95.92,
      102.46,
      109,
      117.72,
      124.26,
      131.89,
      141.7,
      151.51,
      161.32,
      171.13,
      180.94,
      190.75,
      200.56,
      210.37,
      220.18
    ],
    "charged": [
      62.54,
      67.63,
      72.72,
      79.99,
      85.08,
      90.9,
      98.9,
      106.9,
      114.9,
      123.62,
      132.35,
      141.08,
      149.8,
      158.53,
      167.26
    ],
    "skill": [
      295.2,
      317.34,
      339.48,
      369,
      391.14,
      413.28,
      442.8,
      472.32,
      501.84,
      531.36,
      560.88,
      590.4,
      627.3,
      664.2,
      701.1
    ],
    "burst": [
      160,
      172,
      184,
      200,
      212,
      224,
      240,
      256,
      272,
      288,
      304,
      320,
      340,
      360,
      380
    ],
    "20+": {
      "baseHP": 3326,
      "baseATK": 65,
      "baseDEF": 209,
      "value": 0,
      "name": "Physical%"
    },
    "40+": {
      "baseHP": 5514,
      "baseATK": 108,
      "baseDEF": 346,
      "value": 7.5,
      "name": "Physical%"
    },
    "50+": {
      "baseHP": 7052,
      "baseATK": 138,
      "baseDEF": 443,
      "value": 15,
      "name": "Physical%"
    },
    "60+": {
      "baseHP": 8413,
      "baseATK": 164,
      "baseDEF": 528,
      "value": 15,
      "name": "Physical%"
    },
    "70+": {
      "baseHP": 9773,
      "baseATK": 191,
      "baseDEF": 613,
      "value": 22.5,
      "name": "Physical%"
    },
    "80+": {
      "baseHP": 11134,
      "baseATK": 217,
      "baseDEF": 699,
      "value": 30,
      "name": "Physical%"
    }
  },
  "Tartaglia": {
    1: {
      "baseHP": 1020,
      "baseATK": 23,
      "baseDEF": 63,
      "value": 0,
      "name": "Elemental%"
    },
    20: {
      "baseHP": 2646,
      "baseATK": 61,
      "baseDEF": 165,
      "value": 0,
      "name": "Elemental%"
    },
    40: {
      "baseHP": 5268,
      "baseATK": 121,
      "baseDEF": 328,
      "value": 0,
      "name": "Elemental%"
    },
    50: {
      "baseHP": 6776,
      "baseATK": 156,
      "baseDEF": 421,
      "value": 7.2,
      "name": "Elemental%"
    },
    60: {
      "baseHP": 8500,
      "baseATK": 195,
      "baseDEF": 528,
      "value": 14.4,
      "name": "Elemental%"
    },
    70: {
      "baseHP": 10025,
      "baseATK": 231,
      "baseDEF": 623,
      "value": 14.4,
      "name": "Elemental%"
    },
    80: {
      "baseHP": 11561,
      "baseATK": 266,
      "baseDEF": 719,
      "value": 21.6,
      "name": "Elemental%"
    },
    90: {
      "baseHP": 13103,
      "baseATK": 301,
      "baseDEF": 815,
      "value": 28.8,
      "name": "Elemental%"
    },
    "normal": [
      41.28,
      44.64,
      48,
      52.8,
      56.16,
      60,
      65.28,
      70.56,
      75.84,
      81.6,
      87.36,
      93.12,
      98.88,
      104.64,
      110.4
    ],
    "charged": [
      124,
      133.3,
      142.6,
      155,
      164.3,
      173.6,
      186,
      198.4,
      210.8,
      223.2,
      235.6,
      248,
      263.5,
      279,
      294.5
    ],
    "skill": [
      73.1,
      79.05,
      85,
      93.5,
      99.45,
      106.25,
      115.6,
      124.95,
      134.3,
      144.5,
      154.7,
      164.9,
      175.1,
      185.3,
      195.5
    ],
    "burst": [
      464,
      498.8,
      533.6,
      580,
      614.8,
      649.6,
      696,
      742.4,
      788.8,
      835.2,
      881.6,
      928,
      986,
      1044,
      1102
    ],
    "20+": {
      "baseHP": 3521,
      "baseATK": 81,
      "baseDEF": 219,
      "value": 0,
      "name": "Elemental%"
    },
    "40+": {
      "baseHP": 5889,
      "baseATK": 135,
      "baseDEF": 366,
      "value": 7.2,
      "name": "Elemental%"
    },
    "50+": {
      "baseHP": 7604,
      "baseATK": 175,
      "baseDEF": 473,
      "value": 14.4,
      "name": "Elemental%"
    },
    "60+": {
      "baseHP": 9121,
      "baseATK": 210,
      "baseDEF": 567,
      "value": 14.4,
      "name": "Elemental%"
    },
    "70+": {
      "baseHP": 10647,
      "baseATK": 245,
      "baseDEF": 662,
      "value": 21.6,
      "name": "Elemental%"
    },
    "80+": {
      "baseHP": 12182,
      "baseATK": 280,
      "baseDEF": 757,
      "value": 28.8,
      "name": "Elemental%"
    }
  },
  "Beidou": {
    1: {
      "baseHP": 1094,
      "baseATK": 19,
      "baseDEF": 54,
      "value": 0,
      "name": "Elemental%"
    },
    20: {
      "baseHP": 2811,
      "baseATK": 48,
      "baseDEF": 140,
      "value": 0,
      "name": "Elemental%"
    },
    40: {
      "baseHP": 5435,
      "baseATK": 94,
      "baseDEF": 270,
      "value": 0,
      "name": "Elemental%"
    },
    50: {
      "baseHP": 6919,
      "baseATK": 119,
      "baseDEF": 344,
      "value": 6,
      "name": "Elemental%"
    },
    60: {
      "baseHP": 8597,
      "baseATK": 148,
      "baseDEF": 427,
      "value": 12,
      "name": "Elemental%"
    },
    70: {
      "baseHP": 10081,
      "baseATK": 174,
      "baseDEF": 501,
      "value": 12,
      "name": "Elemental%"
    },
    80: {
      "baseHP": 11565,
      "baseATK": 200,
      "baseDEF": 575,
      "value": 18,
      "name": "Elemental%"
    },
    90: {
      "baseHP": 13050,
      "baseATK": 225,
      "baseDEF": 648,
      "value": 24,
      "name": "Elemental%"
    },
    "normal": [
      71.12,
      76.91,
      82.7,
      90.97,
      96.76,
      103.38,
      112.47,
      121.57,
      130.67,
      140.59,
      151.96,
      165.33,
      178.71,
      192.08,
      206.67
    ],
    "charged": [
      56.24,
      60.82,
      65.4,
      71.94,
      76.52,
      81.75,
      88.94,
      96.14,
      103.33,
      111.18,
      120.17,
      130.75,
      141.32,
      151.9,
      163.43
    ],
    "skill": [
      441.6,
      474.72,
      507.84000000000003,
      552,
      585.12,
      618.24,
      662.4,
      706.56,
      750.72,
      794.88,
      839.04,
      883.2,
      938.4,
      993.6,
      1048.8
    ],
    "burst": [
      121.6,
      130.72,
      139.84,
      152,
      161.12,
      170.24,
      182.4,
      194.56,
      206.72,
      218.88,
      231.04,
      243.2,
      258.4,
      273.6,
      288.8
    ],
    "20+": {
      "baseHP": 3628,
      "baseATK": 63,
      "baseDEF": 180,
      "value": 0,
      "name": "Elemental%"
    },
    "40+": {
      "baseHP": 6015,
      "baseATK": 104,
      "baseDEF": 299,
      "value": 6,
      "name": "Elemental%"
    },
    "50+": {
      "baseHP": 7694,
      "baseATK": 133,
      "baseDEF": 382,
      "value": 12,
      "name": "Elemental%"
    },
    "60+": {
      "baseHP": 9178,
      "baseATK": 158,
      "baseDEF": 456,
      "value": 12,
      "name": "Elemental%"
    },
    "70+": {
      "baseHP": 10662,
      "baseATK": 184,
      "baseDEF": 530,
      "value": 18,
      "name": "Elemental%"
    },
    "80+": {
      "baseHP": 12146,
      "baseATK": 210,
      "baseDEF": 603,
      "value": 24,
      "name": "Elemental%"
    }
  },
  "Traveler (Anemo)": {
    1: {
      "baseHP": 912,
      "baseATK": 18,
      "baseDEF": 57,
      "value": 0,
      "name": "ATK%"
    },
    20: {
      "baseHP": 2342,
      "baseATK": 46,
      "baseDEF": 147,
      "value": 0,
      "name": "ATK%"
    },
    40: {
      "baseHP": 4529,
      "baseATK": 88,
      "baseDEF": 284,
      "value": 0,
      "name": "ATK%"
    },
    50: {
      "baseHP": 5766,
      "baseATK": 113,
      "baseDEF": 362,
      "value": 6,
      "name": "ATK%"
    },
    60: {
      "baseHP": 7164,
      "baseATK": 140,
      "baseDEF": 450,
      "value": 12,
      "name": "ATK%"
    },
    70: {
      "baseHP": 8401,
      "baseATK": 164,
      "baseDEF": 527,
      "value": 12,
      "name": "ATK%"
    },
    80: {
      "baseHP": 9638,
      "baseATK": 188,
      "baseDEF": 605,
      "value": 18,
      "name": "ATK%"
    },
    90: {
      "baseHP": 10875,
      "baseATK": 212,
      "baseDEF": 683,
      "value": 24,
      "name": "ATK%"
    },
    "normal": [
      44.46,
      48.08,
      51.7,
      56.87,
      60.49,
      64.63,
      70.31,
      76,
      81.69,
      87.89,
      94.09,
      100.3,
      106.5,
      112.71,
      118.91
    ],
    "charged": [
      116.62,
      126.11,
      135.6,
      149.16,
      158.65,
      169.5,
      184.42,
      199.33,
      214.25,
      230.52,
      246.79,
      263.06,
      279.34,
      295.61,
      311.88
    ],
    "skill": [
      192,
      206.4,
      220.8,
      240,
      254.4,
      268.8,
      288,
      307.2,
      326.4,
      345.6,
      364.8,
      384,
      408,
      432,
      456
    ],
    "burst": [
      80.8,
      86.86,
      92.92,
      101,
      107.06,
      113.12,
      121.2,
      129.28,
      137.36,
      145.44,
      153.52,
      161.6,
      171.7,
      181.8,
      191.9
    ],
    "20+": {
      "baseHP": 3024,
      "baseATK": 59,
      "baseDEF": 190,
      "value": 0,
      "name": "ATK%"
    },
    "40+": {
      "baseHP": 5013,
      "baseATK": 98,
      "baseDEF": 315,
      "value": 6,
      "name": "ATK%"
    },
    "50+": {
      "baseHP": 6411,
      "baseATK": 125,
      "baseDEF": 402,
      "value": 12,
      "name": "ATK%"
    },
    "60+": {
      "baseHP": 7648,
      "baseATK": 149,
      "baseDEF": 480,
      "value": 12,
      "name": "ATK%"
    },
    "70+": {
      "baseHP": 8885,
      "baseATK": 174,
      "baseDEF": 558,
      "value": 18,
      "name": "ATK%"
    },
    "80+": {
      "baseHP": 10122,
      "baseATK": 198,
      "baseDEF": 635,
      "value": 24,
      "name": "ATK%"
    }
  },
  "Chongyun": {
    1: {
      "baseHP": 921,
      "baseATK": 19,
      "baseDEF": 54,
      "value": 0,
      "name": "ATK%"
    },
    20: {
      "baseHP": 2366,
      "baseATK": 48,
      "baseDEF": 140,
      "value": 0,
      "name": "ATK%"
    },
    40: {
      "baseHP": 4574,
      "baseATK": 93,
      "baseDEF": 270,
      "value": 0,
      "name": "ATK%"
    },
    50: {
      "baseHP": 5824,
      "baseATK": 118,
      "baseDEF": 344,
      "value": 6,
      "name": "ATK%"
    },
    60: {
      "baseHP": 7236,
      "baseATK": 147,
      "baseDEF": 427,
      "value": 12,
      "name": "ATK%"
    },
    70: {
      "baseHP": 8485,
      "baseATK": 172,
      "baseDEF": 501,
      "value": 12,
      "name": "ATK%"
    },
    80: {
      "baseHP": 9734,
      "baseATK": 198,
      "baseDEF": 575,
      "value": 18,
      "name": "ATK%"
    },
    90: {
      "baseHP": 10984,
      "baseATK": 223,
      "baseDEF": 648,
      "value": 24,
      "name": "ATK%"
    },
    "normal": [
      70,
      75.7,
      81.4,
      89.54,
      95.24,
      101.75,
      110.7,
      119.66,
      128.61,
      138.38,
      148.15,
      157.92,
      167.68,
      177.45,
      187.22
    ],
    "charged": [
      56.29,
      60.87,
      65.45,
      71.99,
      76.57,
      81.81,
      89.01,
      96.21,
      103.41,
      111.26,
      119.12,
      126.97,
      134.82,
      142.68,
      150.53
    ],
    "skill": [
      172.04,
      184.94,
      197.85,
      215.05,
      227.95,
      240.86,
      258.06,
      275.26,
      292.47,
      309.67,
      326.88,
      344.08,
      365.59,
      387.09,
      408.6
    ],
    "burst": [
      427.20000000000005,
      459.24,
      491.28,
      534,
      566.04,
      598.08,
      640.8,
      683.52,
      726.24,
      768.96,
      811.6800000000001,
      854.4000000000001,
      907.8000000000001,
      961.1999999999999,
      1014.5999999999999
    ],
    "20+": {
      "baseHP": 3054,
      "baseATK": 62,
      "baseDEF": 180,
      "value": 0,
      "name": "ATK%"
    },
    "40+": {
      "baseHP": 5063,
      "baseATK": 103,
      "baseDEF": 299,
      "value": 6,
      "name": "ATK%"
    },
    "50+": {
      "baseHP": 6475,
      "baseATK": 131,
      "baseDEF": 382,
      "value": 12,
      "name": "ATK%"
    },
    "60+": {
      "baseHP": 7725,
      "baseATK": 157,
      "baseDEF": 456,
      "value": 12,
      "name": "ATK%"
    },
    "70+": {
      "baseHP": 8974,
      "baseATK": 182,
      "baseDEF": 530,
      "value": 18,
      "name": "ATK%"
    },
    "80+": {
      "baseHP": 10223,
      "baseATK": 208,
      "baseDEF": 603,
      "value": 24,
      "name": "ATK%"
    }
  },
  "Barbara": {
    1: {
      "baseHP": 821,
      "baseATK": 13,
      "baseDEF": 56,
      "value": 0,
      "name": "HP%"
    },
    20: {
      "baseHP": 2108,
      "baseATK": 34,
      "baseDEF": 144,
      "value": 0,
      "name": "HP%"
    },
    40: {
      "baseHP": 4076,
      "baseATK": 66,
      "baseDEF": 279,
      "value": 0,
      "name": "HP%"
    },
    50: {
      "baseHP": 5189,
      "baseATK": 84,
      "baseDEF": 355,
      "value": 6,
      "name": "HP%"
    },
    60: {
      "baseHP": 6448,
      "baseATK": 105,
      "baseDEF": 441,
      "value": 12,
      "name": "HP%"
    },
    70: {
      "baseHP": 7561,
      "baseATK": 123,
      "baseDEF": 517,
      "value": 12,
      "name": "HP%"
    },
    80: {
      "baseHP": 8674,
      "baseATK": 141,
      "baseDEF": 593,
      "value": 18,
      "name": "HP%"
    },
    90: {
      "baseHP": 9787,
      "baseATK": 159,
      "baseDEF": 669,
      "value": 24,
      "name": "HP%"
    },
    "normal": [
      37.84,
      40.68,
      43.52,
      47.3,
      50.14,
      52.98,
      56.76,
      60.54,
      64.33,
      68.11,
      72.05,
      77.19,
      82.34,
      87.49,
      92.63
    ],
    "charged": [
      166.24,
      178.71,
      191.18,
      207.8,
      220.27,
      232.74,
      249.36,
      265.98,
      282.61,
      299.23,
      316.52,
      339.13,
      361.74,
      384.35,
      406.96
    ],
    "skill": [
      58.4,
      62.78,
      67.16,
      73,
      77.38,
      81.76,
      87.6,
      93.44,
      99.28,
      105.12,
      110.96,
      116.8,
      124.1,
      131.4,
      138.7
    ],
    "burst": 0,
    "20+": {
      "baseHP": 2721,
      "baseATK": 44,
      "baseDEF": 186,
      "value": 0,
      "name": "HP%"
    },
    "40+": {
      "baseHP": 4512,
      "baseATK": 73,
      "baseDEF": 308,
      "value": 6,
      "name": "HP%"
    },
    "50+": {
      "baseHP": 5770,
      "baseATK": 94,
      "baseDEF": 394,
      "value": 12,
      "name": "HP%"
    },
    "60+": {
      "baseHP": 6884,
      "baseATK": 112,
      "baseDEF": 470,
      "value": 12,
      "name": "HP%"
    },
    "70+": {
      "baseHP": 7996,
      "baseATK": 130,
      "baseDEF": 546,
      "value": 18,
      "name": "HP%"
    },
    "80+": {
      "baseHP": 9110,
      "baseATK": 148,
      "baseDEF": 623,
      "value": 24,
      "name": "HP%"
    }
  },
  "Traveler (Geo)": {
    1: {
      "baseHP": 912,
      "baseATK": 18,
      "baseDEF": 57,
      "value": 0,
      "name": "ATK%"
    },
    20: {
      "baseHP": 2342,
      "baseATK": 46,
      "baseDEF": 147,
      "value": 0,
      "name": "ATK%"
    },
    40: {
      "baseHP": 4529,
      "baseATK": 88,
      "baseDEF": 284,
      "value": 0,
      "name": "ATK%"
    },
    50: {
      "baseHP": 5766,
      "baseATK": 113,
      "baseDEF": 362,
      "value": 6,
      "name": "ATK%"
    },
    60: {
      "baseHP": 7164,
      "baseATK": 140,
      "baseDEF": 450,
      "value": 12,
      "name": "ATK%"
    },
    70: {
      "baseHP": 8401,
      "baseATK": 164,
      "baseDEF": 527,
      "value": 12,
      "name": "ATK%"
    },
    80: {
      "baseHP": 9638,
      "baseATK": 188,
      "baseDEF": 605,
      "value": 18,
      "name": "ATK%"
    },
    90: {
      "baseHP": 10875,
      "baseATK": 212,
      "baseDEF": 683,
      "value": 24,
      "name": "ATK%"
    },
    "normal": [
      44.46,
      48.08,
      51.7,
      56.87,
      60.49,
      64.63,
      70.31,
      76,
      81.69,
      87.89,
      94.09,
      100.3,
      106.5,
      112.71,
      118.91
    ],
    "charged": [
      116.62,
      126.11,
      135.6,
      149.16,
      158.65,
      169.5,
      184.42,
      199.33,
      214.25,
      230.52,
      246.79,
      263.06,
      279.34,
      295.61,
      311.88
    ],
    "skill": [
      248,
      266.6,
      285.2,
      310,
      328.6,
      347.2,
      372,
      396.8,
      421.6,
      446.4,
      471.2,
      496,
      527,
      558,
      589
    ],
    "burst": [
      444,
      477.29999999999995,
      510.59999999999997,
      555,
      588.3,
      621.5999999999999,
      666,
      710.4000000000001,
      754.8,
      799.1999999999999,
      843.5999999999999,
      888,
      943.5,
      999,
      1054.5
    ],
    "20+": {
      "baseHP": 3024,
      "baseATK": 59,
      "baseDEF": 190,
      "value": 0,
      "name": "ATK%"
    },
    "40+": {
      "baseHP": 5013,
      "baseATK": 98,
      "baseDEF": 315,
      "value": 6,
      "name": "ATK%"
    },
    "50+": {
      "baseHP": 6411,
      "baseATK": 125,
      "baseDEF": 402,
      "value": 12,
      "name": "ATK%"
    },
    "60+": {
      "baseHP": 7648,
      "baseATK": 149,
      "baseDEF": 480,
      "value": 12,
      "name": "ATK%"
    },
    "70+": {
      "baseHP": 8885,
      "baseATK": 174,
      "baseDEF": 558,
      "value": 18,
      "name": "ATK%"
    },
    "80+": {
      "baseHP": 10122,
      "baseATK": 198,
      "baseDEF": 635,
      "value": 24,
      "name": "ATK%"
    }
  },
  "Kaeya": {
    1: {
      "baseHP": 976,
      "baseATK": 19,
      "baseDEF": 66,
      "value": 0,
      "name": "EnRe%"
    },
    20: {
      "baseHP": 2506,
      "baseATK": 48,
      "baseDEF": 171,
      "value": 0,
      "name": "EnRe%"
    },
    40: {
      "baseHP": 4846,
      "baseATK": 93,
      "baseDEF": 330,
      "value": 0,
      "name": "EnRe%"
    },
    50: {
      "baseHP": 6170,
      "baseATK": 118,
      "baseDEF": 420,
      "value": 6.7,
      "name": "EnRe%"
    },
    60: {
      "baseHP": 7666,
      "baseATK": 147,
      "baseDEF": 522,
      "value": 13.3,
      "name": "EnRe%"
    },
    70: {
      "baseHP": 8989,
      "baseATK": 172,
      "baseDEF": 612,
      "value": 13.3,
      "name": "EnRe%"
    },
    80: {
      "baseHP": 10312,
      "baseATK": 198,
      "baseDEF": 702,
      "value": 20,
      "name": "EnRe%"
    },
    90: {
      "baseHP": 11636,
      "baseATK": 223,
      "baseDEF": 792,
      "value": 26.7,
      "name": "EnRe%"
    },
    "normal": [
      53.75,
      58.13,
      62.5,
      68.75,
      73.13,
      78.13,
      85,
      91.88,
      98.75,
      106.25,
      114.84,
      124.95,
      135.06,
      145.16,
      156.19
    ],
    "charged": [
      128.14,
      138.57,
      149,
      163.9,
      174.33,
      186.25,
      202.64,
      219.03,
      235.42,
      253.3,
      273.79,
      297.88,
      321.98,
      346.07,
      372.36
    ],
    "skill": [
      191.2,
      205.54,
      219.88,
      239,
      253.34,
      267.68,
      286.8,
      305.92,
      325.04,
      344.16,
      363.28,
      382.4,
      406.3,
      430.2,
      454.1
    ],
    "burst": [
      77.6,
      83.42,
      89.24,
      97,
      102.82,
      108.64,
      116.4,
      124.16,
      131.92,
      139.68,
      147.44,
      155.2,
      164.9,
      174.6,
      184.3
    ],
    "20+": {
      "baseHP": 3235,
      "baseATK": 62,
      "baseDEF": 220,
      "value": 0,
      "name": "EnRe%"
    },
    "40+": {
      "baseHP": 5364,
      "baseATK": 103,
      "baseDEF": 365,
      "value": 6.7,
      "name": "EnRe%"
    },
    "50+": {
      "baseHP": 6860,
      "baseATK": 131,
      "baseDEF": 467,
      "value": 13.3,
      "name": "EnRe%"
    },
    "60+": {
      "baseHP": 8184,
      "baseATK": 157,
      "baseDEF": 557,
      "value": 13.3,
      "name": "EnRe%"
    },
    "70+": {
      "baseHP": 9507,
      "baseATK": 182,
      "baseDEF": 647,
      "value": 20,
      "name": "EnRe%"
    },
    "80+": {
      "baseHP": 10830,
      "baseATK": 208,
      "baseDEF": 737,
      "value": 26.7,
      "name": "EnRe%"
    }
  },
  "Ningguang": {
    1: {
      "baseHP": 821,
      "baseATK": 18,
      "baseDEF": 48,
      "value": 0,
      "name": "Elemental%"
    },
    20: {
      "baseHP": 2108,
      "baseATK": 46,
      "baseDEF": 123,
      "value": 0,
      "name": "Elemental%"
    },
    40: {
      "baseHP": 4076,
      "baseATK": 88,
      "baseDEF": 239,
      "value": 0,
      "name": "Elemental%"
    },
    50: {
      "baseHP": 5189,
      "baseATK": 113,
      "baseDEF": 304,
      "value": 6,
      "name": "Elemental%"
    },
    60: {
      "baseHP": 6448,
      "baseATK": 140,
      "baseDEF": 378,
      "value": 12,
      "name": "Elemental%"
    },
    70: {
      "baseHP": 7561,
      "baseATK": 164,
      "baseDEF": 443,
      "value": 12,
      "name": "Elemental%"
    },
    80: {
      "baseHP": 8674,
      "baseATK": 188,
      "baseDEF": 508,
      "value": 18,
      "name": "Elemental%"
    },
    90: {
      "baseHP": 9787,
      "baseATK": 212,
      "baseDEF": 573,
      "value": 24,
      "name": "Elemental%"
    },
    "normal": [
      28,
      30.1,
      32.2,
      35,
      37.1,
      39.2,
      42,
      44.8,
      47.6,
      50.4,
      53.31,
      57.12,
      60.93,
      64.74,
      68.54
    ],
    "charged": [
      174.08,
      187.14,
      200.19,
      217.6,
      230.66,
      243.71,
      261.12,
      278.53,
      295.94,
      313.34,
      331.45,
      355.12,
      378.8,
      402.47,
      426.15
    ],
    "skill": [
      230.4,
      247.68,
      264.96,
      288,
      305.28,
      322.56,
      345.6,
      368.64,
      391.68,
      414.72,
      437.76,
      460.8,
      489.6,
      518.4,
      547.2
    ],
    "burst": [
      86.96,
      93.48,
      100,
      108.7,
      115.22,
      121.74,
      130.44,
      139.14,
      147.83,
      156.53,
      165.22,
      173.92,
      184.79,
      195.66,
      206.53
    ],
    "20+": {
      "baseHP": 2721,
      "baseATK": 59,
      "baseDEF": 159,
      "value": 0,
      "name": "Elemental%"
    },
    "40+": {
      "baseHP": 4512,
      "baseATK": 98,
      "baseDEF": 264,
      "value": 6,
      "name": "Elemental%"
    },
    "50+": {
      "baseHP": 5770,
      "baseATK": 125,
      "baseDEF": 338,
      "value": 12,
      "name": "Elemental%"
    },
    "60+": {
      "baseHP": 6884,
      "baseATK": 149,
      "baseDEF": 403,
      "value": 12,
      "name": "Elemental%"
    },
    "70+": {
      "baseHP": 7996,
      "baseATK": 174,
      "baseDEF": 468,
      "value": 18,
      "name": "Elemental%"
    },
    "80+": {
      "baseHP": 9110,
      "baseATK": 198,
      "baseDEF": 534,
      "value": 24,
      "name": "Elemental%"
    }
  },
  "Zhongli": {
    1: {
      "baseHP": 1144,
      "baseATK": 20,
      "baseDEF": 57,
      "value": 0,
      "name": "Elemental%"
    },
    20: {
      "baseHP": 2967,
      "baseATK": 51,
      "baseDEF": 149,
      "value": 0,
      "name": "Elemental%"
    },
    40: {
      "baseHP": 5908,
      "baseATK": 101,
      "baseDEF": 297,
      "value": 0,
      "name": "Elemental%"
    },
    50: {
      "baseHP": 7599,
      "baseATK": 130,
      "baseDEF": 382,
      "value": 7.2,
      "name": "Elemental%"
    },
    60: {
      "baseHP": 9533,
      "baseATK": 163,
      "baseDEF": 479,
      "value": 14.4,
      "name": "Elemental%"
    },
    70: {
      "baseHP": 11243,
      "baseATK": 192,
      "baseDEF": 564,
      "value": 14.4,
      "name": "Elemental%"
    },
    80: {
      "baseHP": 12965,
      "baseATK": 222,
      "baseDEF": 651,
      "value": 21.6,
      "name": "Elemental%"
    },
    90: {
      "baseHP": 14695,
      "baseATK": 251,
      "baseDEF": 738,
      "value": 28.8,
      "name": "Elemental%"
    },
    "normal": [
      30.77,
      33.27,
      35.78,
      39.36,
      41.86,
      44.72,
      48.66,
      52.59,
      56.53,
      60.82,
      65.74,
      71.53,
      77.31,
      83.1,
      89.41
    ],
    "charged": [
      111.03,
      120.06,
      129.1,
      142.01,
      151.05,
      161.38,
      175.58,
      189.78,
      203.98,
      219.47,
      237.22,
      258.1,
      278.97,
      299.85,
      322.62
    ],
    "skill": [
      80,
      86,
      92,
      100,
      106,
      112,
      120,
      128,
      136,
      144,
      152,
      160,
      170,
      180,
      190
    ],
    "burst": [
      401.08,
      444.44,
      487.8,
      542,
      590.78,
      639.56,
      704.6,
      769.64,
      834.68,
      899.72,
      964.76,
      1029.8,
      1084,
      1138.2,
      1192.4
    ],
    "20+": {
      "baseHP": 3948,
      "baseATK": 67,
      "baseDEF": 198,
      "value": 0,
      "name": "Elemental%"
    },
    "40+": {
      "baseHP": 6605,
      "baseATK": 113,
      "baseDEF": 332,
      "value": 7.2,
      "name": "Elemental%"
    },
    "50+": {
      "baseHP": 8528,
      "baseATK": 146,
      "baseDEF": 428,
      "value": 14.4,
      "name": "Elemental%"
    },
    "60+": {
      "baseHP": 10230,
      "baseATK": 175,
      "baseDEF": 514,
      "value": 14.4,
      "name": "Elemental%"
    },
    "70+": {
      "baseHP": 11940,
      "baseATK": 204,
      "baseDEF": 599,
      "value": 21.6,
      "name": "Elemental%"
    },
    "80+": {
      "baseHP": 13662,
      "baseATK": 233,
      "baseDEF": 686,
      "value": 28.8,
      "name": "Elemental%"
    }
  },
  "Amber": {
    1: {
      "baseHP": 793,
      "baseATK": 19,
      "baseDEF": 50,
      "value": 0,
      "name": "ATK%"
    },
    20: {
      "baseHP": 2038,
      "baseATK": 48,
      "baseDEF": 129,
      "value": 0,
      "name": "ATK%"
    },
    40: {
      "baseHP": 3940,
      "baseATK": 93,
      "baseDEF": 250,
      "value": 0,
      "name": "ATK%"
    },
    50: {
      "baseHP": 5016,
      "baseATK": 118,
      "baseDEF": 318,
      "value": 6,
      "name": "ATK%"
    },
    60: {
      "baseHP": 6233,
      "baseATK": 147,
      "baseDEF": 396,
      "value": 12,
      "name": "ATK%"
    },
    70: {
      "baseHP": 7309,
      "baseATK": 172,
      "baseDEF": 464,
      "value": 12,
      "name": "ATK%"
    },
    80: {
      "baseHP": 8385,
      "baseATK": 198,
      "baseDEF": 532,
      "value": 18,
      "name": "ATK%"
    },
    90: {
      "baseHP": 9461,
      "baseATK": 223,
      "baseDEF": 601,
      "value": 24,
      "name": "ATK%"
    },
    "normal": [
      36.12,
      39.06,
      42,
      46.2,
      49.14,
      52.5,
      57.12,
      61.74,
      66.36,
      71.4,
      76.44,
      81.48,
      86.52,
      91.56,
      96.6
    ],
    "charged": [
      124,
      133.3,
      142.6,
      155,
      164.3,
      173.6,
      186,
      198.4,
      210.8,
      223.2,
      235.6,
      248,
      263.5,
      279,
      294.5
    ],
    "skill": [
      123.2,
      132.44,
      141.68,
      154,
      163.24,
      172.48,
      184.8,
      197.12,
      209.44,
      221.76,
      234.08,
      246.4,
      261.8,
      277.2,
      292.6
    ],
    "burst": [
      505.44,
      543.35,
      581.26,
      631.8,
      669.71,
      707.62,
      758.16,
      808.7,
      859.25,
      909.79,
      960.34,
      1010.88,
      1074.06,
      1137.24,
      1200.42
    ],
    "20+": {
      "baseHP": 2630,
      "baseATK": 62,
      "baseDEF": 167,
      "value": 0,
      "name": "ATK%"
    },
    "40+": {
      "baseHP": 4361,
      "baseATK": 103,
      "baseDEF": 277,
      "value": 6,
      "name": "ATK%"
    },
    "50+": {
      "baseHP": 5578,
      "baseATK": 131,
      "baseDEF": 354,
      "value": 12,
      "name": "ATK%"
    },
    "60+": {
      "baseHP": 6654,
      "baseATK": 157,
      "baseDEF": 422,
      "value": 12,
      "name": "ATK%"
    },
    "70+": {
      "baseHP": 7730,
      "baseATK": 182,
      "baseDEF": 491,
      "value": 18,
      "name": "ATK%"
    },
    "80+": {
      "baseHP": 8806,
      "baseATK": 208,
      "baseDEF": 559,
      "value": 24,
      "name": "ATK%"
    }
  },
  "Noelle": {
    1: {
      "baseHP": 1012,
      "baseATK": 16,
      "baseDEF": 67,
      "value": 0,
      "name": "DEF%"
    },
    20: {
      "baseHP": 2600,
      "baseATK": 41,
      "baseDEF": 172,
      "value": 0,
      "name": "DEF%"
    },
    40: {
      "baseHP": 5027,
      "baseATK": 80,
      "baseDEF": 333,
      "value": 0,
      "name": "DEF%"
    },
    50: {
      "baseHP": 6400,
      "baseATK": 101,
      "baseDEF": 423,
      "value": 7.5,
      "name": "DEF%"
    },
    60: {
      "baseHP": 7953,
      "baseATK": 126,
      "baseDEF": 526,
      "value": 15,
      "name": "DEF%"
    },
    70: {
      "baseHP": 9325,
      "baseATK": 148,
      "baseDEF": 617,
      "value": 15,
      "name": "DEF%"
    },
    80: {
      "baseHP": 10698,
      "baseATK": 169,
      "baseDEF": 708,
      "value": 22.5,
      "name": "DEF%"
    },
    90: {
      "baseHP": 12071,
      "baseATK": 191,
      "baseDEF": 799,
      "value": 30,
      "name": "DEF%"
    },
    "normal": [
      79.12,
      85.56,
      92,
      101.2,
      107.64,
      115,
      125.12,
      135.24,
      145.36,
      156.4,
      167.44,
      178.48,
      189.52,
      200.56,
      211.6
    ],
    "charged": [
      50.74,
      54.87,
      59,
      64.9,
      69.03,
      73.75,
      80.24,
      86.73,
      93.22,
      100.3,
      107.38,
      114.46,
      121.54,
      128.62,
      135.7
    ],
    "skill": [
      120,
      129,
      138,
      150,
      159,
      168,
      180,
      192,
      204,
      216,
      228,
      240,
      255,
      270,
      285
    ],
    "burst": [
      67.2,
      72.24,
      77.28,
      84,
      89.04,
      94.08,
      100.8,
      107.52,
      114.24,
      120.96,
      127.68,
      134.4,
      142.8,
      151.2,
      159.6
    ],
    "20+": {
      "baseHP": 3356,
      "baseATK": 53,
      "baseDEF": 222,
      "value": 0,
      "name": "DEF%"
    },
    "40+": {
      "baseHP": 5564,
      "baseATK": 88,
      "baseDEF": 368,
      "value": 7.5,
      "name": "DEF%"
    },
    "50+": {
      "baseHP": 7117,
      "baseATK": 113,
      "baseDEF": 471,
      "value": 15,
      "name": "DEF%"
    },
    "60+": {
      "baseHP": 8490,
      "baseATK": 134,
      "baseDEF": 562,
      "value": 15,
      "name": "DEF%"
    },
    "70+": {
      "baseHP": 9862,
      "baseATK": 156,
      "baseDEF": 652,
      "value": 22.5,
      "name": "DEF%"
    },
    "80+": {
      "baseHP": 11235,
      "baseATK": 178,
      "baseDEF": 743,
      "value": 30,
      "name": "DEF%"
    }
  },
  "Lisa": {
    1: {
      "baseHP": 802,
      "baseATK": 19,
      "baseDEF": 48,
      "value": 0,
      "name": "EM"
    },
    20: {
      "baseHP": 2061,
      "baseATK": 50,
      "baseDEF": 123,
      "value": 0,
      "name": "EM"
    },
    40: {
      "baseHP": 3985,
      "baseATK": 96,
      "baseDEF": 239,
      "value": 0,
      "name": "EM"
    },
    50: {
      "baseHP": 5074,
      "baseATK": 123,
      "baseDEF": 304,
      "value": 24,
      "name": "EM"
    },
    60: {
      "baseHP": 6305,
      "baseATK": 153,
      "baseDEF": 378,
      "value": 48,
      "name": "EM"
    },
    70: {
      "baseHP": 7393,
      "baseATK": 179,
      "baseDEF": 443,
      "value": 48,
      "name": "EM"
    },
    80: {
      "baseHP": 8481,
      "baseATK": 205,
      "baseDEF": 508,
      "value": 72,
      "name": "EM"
    },
    90: {
      "baseHP": 9570,
      "baseATK": 232,
      "baseDEF": 573,
      "value": 96,
      "name": "EM"
    },
    "normal": [
      39.6,
      42.57,
      45.54,
      49.5,
      52.47,
      55.44,
      59.4,
      63.36,
      67.32,
      71.28,
      75.4,
      80.78,
      86.17,
      91.56,
      96.94
    ],
    "charged": [
      177.12,
      190.4,
      203.69,
      221.4,
      234.68,
      247.97,
      265.68,
      283.39,
      301.1,
      318.82,
      337.24,
      361.32,
      385.41,
      409.5,
      433.59
    ],
    "skill": [
      487.2,
      523.74,
      560.28,
      609,
      645.54,
      682.08,
      730.8,
      779.52,
      828.24,
      876.96,
      925.68,
      974.4,
      1035.3,
      1096.2,
      1157.1
    ],
    "burst": [
      36.56,
      39.3,
      42.04,
      45.7,
      48.44,
      51.18,
      54.84,
      58.5,
      62.15,
      65.81,
      69.46,
      73.12,
      77.69,
      82.26,
      86.83
    ],
    "20+": {
      "baseHP": 2661,
      "baseATK": 64,
      "baseDEF": 159,
      "value": 0,
      "name": "EM"
    },
    "40+": {
      "baseHP": 4411,
      "baseATK": 107,
      "baseDEF": 264,
      "value": 24,
      "name": "EM"
    },
    "50+": {
      "baseHP": 5642,
      "baseATK": 136,
      "baseDEF": 338,
      "value": 48,
      "name": "EM"
    },
    "60+": {
      "baseHP": 6731,
      "baseATK": 163,
      "baseDEF": 403,
      "value": 48,
      "name": "EM"
    },
    "70+": {
      "baseHP": 7818,
      "baseATK": 189,
      "baseDEF": 468,
      "value": 72,
      "name": "EM"
    },
    "80+": {
      "baseHP": 8907,
      "baseATK": 215,
      "baseDEF": 534,
      "value": 96,
      "name": "EM"
    }
  },
  "Albedo": {
    1: {
      "baseHP": 1030,
      "baseATK": 20,
      "baseDEF": 68,
      "value": 0,
      "name": "Elemental%"
    },
    20: {
      "baseHP": 2671,
      "baseATK": 51,
      "baseDEF": 177,
      "value": 0,
      "name": "Elemental%"
    },
    40: {
      "baseHP": 5317,
      "baseATK": 101,
      "baseDEF": 352,
      "value": 0,
      "name": "Elemental%"
    },
    50: {
      "baseHP": 6839,
      "baseATK": 130,
      "baseDEF": 453,
      "value": 7.2,
      "name": "Elemental%"
    },
    60: {
      "baseHP": 8579,
      "baseATK": 163,
      "baseDEF": 568,
      "value": 14.4,
      "name": "Elemental%"
    },
    70: {
      "baseHP": 10119,
      "baseATK": 192,
      "baseDEF": 670,
      "value": 14.4,
      "name": "Elemental%"
    },
    80: {
      "baseHP": 11669,
      "baseATK": 222,
      "baseDEF": 773,
      "value": 21.6,
      "name": "Elemental%"
    },
    90: {
      "baseHP": 13226,
      "baseATK": 251,
      "baseDEF": 876,
      "value": 28.8,
      "name": "Elemental%"
    },
    "normal": [
      36.74,
      39.73,
      42.72,
      46.99,
      49.98,
      53.4,
      58.1,
      62.8,
      67.5,
      72.62,
      78.5,
      85.41,
      92.31,
      99.22,
      106.76
    ],
    "charged": [
      107.5,
      116.25,
      125,
      137.5,
      146.25,
      156.25,
      170,
      183.75,
      197.5,
      212.5,
      229.68,
      249.9,
      270.11,
      290.32,
      312.38
    ],
    "skill": [
      130.4,
      140.18,
      149.96,
      163,
      172.78,
      182.56,
      195.6,
      208.64,
      221.68,
      234.72,
      247.76,
      260.8,
      277.1,
      293.4,
      309.7
    ],
    "burst": [
      367.2,
      394.74,
      422.28,
      459,
      486.54,
      514.08,
      550.8,
      587.52,
      624.24,
      660.96,
      697.68,
      734.4,
      780.3,
      826.2,
      872.1
    ],
    "20+": {
      "baseHP": 3554,
      "baseATK": 67,
      "baseDEF": 235,
      "value": 0,
      "name": "Elemental%"
    },
    "40+": {
      "baseHP": 5944,
      "baseATK": 113,
      "baseDEF": 394,
      "value": 7.2,
      "name": "Elemental%"
    },
    "50+": {
      "baseHP": 7675,
      "baseATK": 146,
      "baseDEF": 508,
      "value": 14.4,
      "name": "Elemental%"
    },
    "60+": {
      "baseHP": 9207,
      "baseATK": 175,
      "baseDEF": 610,
      "value": 14.4,
      "name": "Elemental%"
    },
    "70+": {
      "baseHP": 10746,
      "baseATK": 204,
      "baseDEF": 712,
      "value": 21.6,
      "name": "Elemental%"
    },
    "80+": {
      "baseHP": 12296,
      "baseATK": 233,
      "baseDEF": 815,
      "value": 28.8,
      "name": "Elemental%"
    }
  },
  "Ganyu": {
    1: {
      "baseHP": 763,
      "baseATK": 26,
      "baseDEF": 49,
      "value": 0,
      "name": "CDmg%"
    },
    20: {
      "baseHP": 1978,
      "baseATK": 68,
      "baseDEF": 127,
      "value": 0,
      "name": "CDmg%"
    },
    40: {
      "baseHP": 3939,
      "baseATK": 135,
      "baseDEF": 253,
      "value": 0,
      "name": "CDmg%"
    },
    50: {
      "baseHP": 5066,
      "baseATK": 173,
      "baseDEF": 326,
      "value": 9.6,
      "name": "CDmg%"
    },
    60: {
      "baseHP": 6355,
      "baseATK": 217,
      "baseDEF": 409,
      "value": 19.2,
      "name": "CDmg%"
    },
    70: {
      "baseHP": 7495,
      "baseATK": 256,
      "baseDEF": 482,
      "value": 19.2,
      "name": "CDmg%"
    },
    80: {
      "baseHP": 8643,
      "baseATK": 295,
      "baseDEF": 556,
      "value": 28.8,
      "name": "CDmg%"
    },
    90: {
      "baseHP": 9797,
      "baseATK": 335,
      "baseDEF": 630,
      "value": 38.4,
      "name": "CDmg%"
    },
    "normal": [
      31.73,
      34.32,
      36.9,
      40.59,
      43.17,
      46.13,
      50.18,
      54.24,
      58.3,
      62.73,
      67.8,
      73.77,
      79.74,
      85.7,
      92.21
    ],
    "charged": [
      217.6,
      233.92,
      250.24,
      272,
      288.32,
      304.64,
      326.4,
      348.16,
      369.92,
      391.68,
      413.44,
      435.2,
      462.4,
      489.6,
      516.8
    ],
    "skill": [
      120,
      129,
      138,
      150,
      159,
      168,
      180,
      192,
      204,
      216,
      228,
      240,
      255,
      270,
      285
    ],
    "burst": [
      70.27,
      75.54,
      80.81,
      87.84,
      93.11,
      98.38,
      105.41,
      112.44,
      119.46,
      126.49,
      133.52,
      140.54,
      149.33,
      158.11,
      166.9
    ],
    "20+": {
      "baseHP": 2632,
      "baseATK": 94,
      "baseDEF": 215,
      "value": 0,
      "name": "CDmg%"
    },
    "40+": {
      "baseHP": 4403,
      "baseATK": 157,
      "baseDEF": 359,
      "value": 9.6,
      "name": "CDmg%"
    },
    "50+": {
      "baseHP": 5686,
      "baseATK": 203,
      "baseDEF": 464,
      "value": 19.2,
      "name": "CDmg%"
    },
    "60+": {
      "baseHP": 6820,
      "baseATK": 243,
      "baseDEF": 556,
      "value": 19.2,
      "name": "CDmg%"
    },
    "70+": {
      "baseHP": 7960,
      "baseATK": 284,
      "baseDEF": 649,
      "value": 28.8,
      "name": "CDmg%"
    },
    "80+": {
      "baseHP": 9108,
      "baseATK": 325,
      "baseDEF": 743,
      "value": 38.4,
      "name": "CDmg%"
    }
  },
  "Xiao": {
    "1": {
      "baseHP": 991,
      "baseATK": 27,
      "baseDEF": 62,
      "value": 0,
      "name": "CRate%"
    },
    "20": {
      "baseHP": 2572,
      "baseATK": 71,
      "baseDEF": 161,
      "value": 0,
      "name": "CRate%"
    },
    "40": {
      "baseHP": 5120,
      "baseATK": 140,
      "baseDEF": 321,
      "value": 0,
      "name": "CRate%"
    },
    "50": {
      "baseHP": 6586,
      "baseATK": 181,
      "baseDEF": 413,
      "value": 4.8,
      "name": "CRate%"
    },
    "60": {
      "baseHP": 8262,
      "baseATK": 227,
      "baseDEF": 519,
      "value": 9.6,
      "name": "CRate%"
    },
    "70": {
      "baseHP": 9744,
      "baseATK": 267,
      "baseDEF": 612,
      "value": 9.6,
      "name": "CRate%"
    },
    "80": {
      "baseHP": 11236,
      "baseATK": 308,
      "baseDEF": 705,
      "value": 14.4,
      "name": "CRate%"
    },
    "90": {
      "baseHP": 12736,
      "baseATK": 349,
      "baseDEF": 799,
      "value": 19.2,
      "name": "CRate%"
    },
    "normal": [
      55.08,
      58.84,
      62.6,
      67.6,
      71.36,
      75.74,
      81.38,
      87.02,
      92.64,
      98.28,
      103.92,
      109.56,
      115.18,
      120.82,
      126.46
    ],
    "charged": [
      121.09,
      129.34,
      137.6,
      148.61,
      156.86,
      166.5,
      178.88,
      191.26,
      203.65,
      216.03,
      228.42,
      240.8,
      253.18,
      265.57,
      277.95
    ],
    "skill": [
      252.8,
      271.76,
      290.72,
      316,
      334.96,
      353.92,
      379.2,
      404.48,
      429.76,
      455.04,
      480.32,
      505.6,
      537.2,
      568.8,
      600.4
    ],
    "burst": [
      58.45,
      61.95,
      65.45,
      70,
      73.5,
      77,
      81.55,
      86.1,
      90.65,
      95.2,
      99.75,
      104.3,
      108.85,
      113.4,
      117.95
    ],
    "20+": {
      "baseHP": 3422,
      "baseATK": 94,
      "baseDEF": 215,
      "value": 0,
      "name": "CRate%"
    },
    "40+": {
      "baseHP": 5724,
      "baseATK": 157,
      "baseDEF": 359,
      "value": 4.8,
      "name": "CRate%"
    },
    "50+": {
      "baseHP": 7391,
      "baseATK": 203,
      "baseDEF": 464,
      "value": 9.6,
      "name": "CRate%"
    },
    "60+": {
      "baseHP": 8866,
      "baseATK": 243,
      "baseDEF": 556,
      "value": 9.6,
      "name": "CRate%"
    },
    "70+": {
      "baseHP": 10348,
      "baseATK": 284,
      "baseDEF": 649,
      "value": 14.4,
      "name": "CRate%"
    },
    "80+": {
      "baseHP": 11840,
      "baseATK": 325,
      "baseDEF": 743,
      "value": 19.2,
      "name": "CRate%"
    }
  },
  "Hutao": {
    "1": {
      "baseHP": 1211,
      "baseATK": 8,
      "baseDEF": 68,
      "value": 0,
      "name": "CDmg%"
    },
    "20": {
      "baseHP": 3141,
      "baseATK": 21,
      "baseDEF": 177,
      "value": 0,
      "name": "CDmg%"
    },
    "40": {
      "baseHP": 6253,
      "baseATK": 43,
      "baseDEF": 352,
      "value": 0,
      "name": "CDmg%"
    },
    "50": {
      "baseHP": 8042,
      "baseATK": 55,
      "baseDEF": 453,
      "value": 9.6,
      "name": "CDmg%"
    },
    "60": {
      "baseHP": 10089,
      "baseATK": 69,
      "baseDEF": 568,
      "value": 19.2,
      "name": "CDmg%"
    },
    "70": {
      "baseHP": 11899,
      "baseATK": 81,
      "baseDEF": 670,
      "value": 19.2,
      "name": "CDmg%"
    },
    "80": {
      "baseHP": 13721,
      "baseATK": 94,
      "baseDEF": 773,
      "value": 28.8,
      "name": "CDmg%"
    },
    "90": {
      "baseHP": 15552,
      "baseATK": 106,
      "baseDEF": 876,
      "value": 38.4,
      "name": "CDmg%"
    },
    "normal": [
      46.89,
      50.08,
      53.28,
      57.54,
      60.74,
      64.47,
      69.26,
      74.06,
      78.85,
      83.65,
      88.44,
      93.24,
      98.04,
      102.83,
      107.63
    ],
    "charged": [
      135.96,
      145.23,
      154.5,
      166.86,
      176.13,
      186.95,
      200.85,
      214.76,
      228.66,
      242.57,
      256.47,
      270.38,
      284.28,
      298.19,
      312.09
    ],
    "skill": [
      64,
      68.8,
      73.6,
      80,
      84.8,
      89.6,
      96,
      102.4,
      108.8,
      115.2,
      121.6,
      128,
      136,
      144,
      152
    ],
    "burst": [
      379.09,
      401.79,
      424.49,
      454,
      476.7,
      499.4,
      528.91,
      558.42,
      587.93,
      617.44,
      646.95,
      676.46,
      705.97,
      735.48,
      764.99
    ],
    "20+": {
      "baseHP": 4179,
      "baseATK": 29,
      "baseDEF": 235,
      "value": 0,
      "name": "CDmg%"
    },
    "40+": {
      "baseHP": 6990,
      "baseATK": 48,
      "baseDEF": 394,
      "value": 9.6,
      "name": "CDmg%"
    },
    "50+": {
      "baseHP": 9026,
      "baseATK": 62,
      "baseDEF": 508,
      "value": 19.2,
      "name": "CDmg%"
    },
    "60+": {
      "baseHP": 10826,
      "baseATK": 74,
      "baseDEF": 610,
      "value": 19.2,
      "name": "CDmg%"
    },
    "70+": {
      "baseHP": 12637,
      "baseATK": 86,
      "baseDEF": 712,
      "value": 28.8,
      "name": "CDmg%"
    },
    "80+": {
      "baseHP": 14459,
      "baseATK": 99,
      "baseDEF": 815,
      "value": 38.4,
      "name": "CDmg%"
    }
  },
  "Rosaria": {
    "1": {
      "baseHP": 1030,
      "baseATK": 20,
      "baseDEF": 60,
      "value": 0,
      "name": "ATK%"
    },
    "20": {
      "baseHP": 2647,
      "baseATK": 52,
      "baseDEF": 153,
      "value": 0,
      "name": "ATK%"
    },
    "40": {
      "baseHP": 5118,
      "baseATK": 100,
      "baseDEF": 296,
      "value": 0,
      "name": "ATK%"
    },
    "50": {
      "baseHP": 6516,
      "baseATK": 127,
      "baseDEF": 376,
      "value": 6,
      "name": "ATK%"
    },
    "60": {
      "baseHP": 8096,
      "baseATK": 158,
      "baseDEF": 468,
      "value": 12,
      "name": "ATK%"
    },
    "70": {
      "baseHP": 9493,
      "baseATK": 185,
      "baseDEF": 548,
      "value": 12,
      "name": "ATK%"
    },
    "80": {
      "baseHP": 10891,
      "baseATK": 213,
      "baseDEF": 629,
      "value": 18,
      "name": "ATK%"
    },
    "90": {
      "baseHP": 12289,
      "baseATK": 240,
      "baseDEF": 710,
      "value": 24,
      "name": "ATK%"
    },
    "normal": [
      52.46,
      56.73,
      61,
      67.1,
      71.37,
      76.25,
      82.96,
      89.67,
      96.38,
      103.7,
      111.02,
      118.34,
      125.66,
      132.98,
      140.3
    ],
    "charged": [
      136.74,
      147.87,
      159,
      174.9,
      186.03,
      198.75,
      216.24,
      233.73,
      251.22,
      270.3,
      289.38,
      308.46,
      327.54,
      346.62,
      365.7
    ],
    "skill": [
      194.4,
      208.98,
      223.56,
      243,
      257.58,
      272.16,
      291.6,
      311.04,
      330.48,
      349.92,
      369.36,
      388.8,
      413.1,
      437.4,
      461.7
    ],
    "burst": [
      132,
      141.9,
      151.8,
      165,
      174.9,
      184.8,
      198,
      211.2,
      224.4,
      237.6,
      250.8,
      264,
      280.5,
      297,
      313.5
    ],
    "20+": {
      "baseHP": 3417,
      "baseATK": 67,
      "baseDEF": 197,
      "value": 0,
      "name": "ATK%"
    },
    "40+": {
      "baseHP": 5665,
      "baseATK": 111,
      "baseDEF": 327,
      "value": 6,
      "name": "ATK%"
    },
    "50+": {
      "baseHP": 7245,
      "baseATK": 141,
      "baseDEF": 418,
      "value": 12,
      "name": "ATK%"
    },
    "60+": {
      "baseHP": 8643,
      "baseATK": 169,
      "baseDEF": 499,
      "value": 12,
      "name": "ATK%"
    },
    "70+": {
      "baseHP": 10040,
      "baseATK": 196,
      "baseDEF": 580,
      "value": 18,
      "name": "ATK%"
    },
    "80+": {
      "baseHP": 11438,
      "baseATK": 223,
      "baseDEF": 661,
      "value": 24,
      "name": "ATK%"
    }
  },
  "Feiyan": {
    "1": {
      "baseHP": 784,
      "baseATK": 20,
      "baseDEF": 49,
      "value": 0,
      "name": "Elemental%"
    },
    "20": {
      "baseHP": 2014,
      "baseATK": 52,
      "baseDEF": 126,
      "value": 0,
      "name": "Elemental%"
    },
    "40": {
      "baseHP": 3895,
      "baseATK": 100,
      "baseDEF": 244,
      "value": 0,
      "name": "Elemental%"
    },
    "50": {
      "baseHP": 4959,
      "baseATK": 127,
      "baseDEF": 311,
      "value": 6,
      "name": "Elemental%"
    },
    "60": {
      "baseHP": 6161,
      "baseATK": 158,
      "baseDEF": 387,
      "value": 12,
      "name": "Elemental%"
    },
    "70": {
      "baseHP": 7225,
      "baseATK": 185,
      "baseDEF": 453,
      "value": 12,
      "name": "Elemental%"
    },
    "80": {
      "baseHP": 8289,
      "baseATK": 213,
      "baseDEF": 520,
      "value": 18,
      "name": "Elemental%"
    },
    "90": {
      "baseHP": 9352,
      "baseATK": 240,
      "baseDEF": 587,
      "value": 24,
      "name": "Elemental%"
    },
    "normal": [
      58.34,
      62.72,
      67.09,
      72.93,
      77.3,
      81.68,
      87.51,
      93.35,
      99.18,
      105.01,
      110.85,
      116.68,
      123.98,
      131.27,
      138.56
    ],
    "charged": [
      167.57,
      177.6,
      187.64,
      200.68,
      210.71,
      220.75,
      233.79,
      246.84,
      259.88,
      272.92,
      285.97,
      299.01,
      312.06,
      325.1,
      338.15
    ],
    "skill": [
      169.6,
      182.32,
      195.04,
      212,
      224.72,
      237.44,
      254.4,
      271.36,
      288.32,
      305.28,
      322.24,
      339.2,
      360.4,
      381.6,
      402.8
    ],
    "burst": [
      182.4,
      196.08,
      209.76,
      228,
      241.68,
      255.36,
      273.6,
      291.84,
      310.08,
      328.32,
      346.56,
      364.8,
      387.6,
      410.4,
      433.2
    ],
    "20+": {
      "baseHP": 2600,
      "baseATK": 67,
      "baseDEF": 163,
      "value": 0,
      "name": "Elemental%"
    },
    "40+": {
      "baseHP": 4311,
      "baseATK": 111,
      "baseDEF": 271,
      "value": 6,
      "name": "Elemental%"
    },
    "50+": {
      "baseHP": 5514,
      "baseATK": 141,
      "baseDEF": 346,
      "value": 12,
      "name": "Elemental%"
    },
    "60+": {
      "baseHP": 6578,
      "baseATK": 169,
      "baseDEF": 413,
      "value": 12,
      "name": "Elemental%"
    },
    "70+": {
      "baseHP": 7641,
      "baseATK": 196,
      "baseDEF": 480,
      "value": 18,
      "name": "Elemental%"
    },
    "80+": {
      "baseHP": 8705,
      "baseATK": 223,
      "baseDEF": 546,
      "value": 24,
      "name": "Elemental%"
    }
  },
  "Eula": {
    "1": {
      "baseHP": 1030,
      "baseATK": 27,
      "baseDEF": 58,
      "value": 0,
      "name": "CDmg%"
    },
    "20": {
      "baseHP": 2671,
      "baseATK": 69,
      "baseDEF": 152,
      "value": 0,
      "name": "CDmg%"
    },
    "40": {
      "baseHP": 5317,
      "baseATK": 138,
      "baseDEF": 302,
      "value": 0,
      "name": "CDmg%"
    },
    "50": {
      "baseHP": 6839,
      "baseATK": 177,
      "baseDEF": 388,
      "value": 9.6,
      "name": "CDmg%"
    },
    "60": {
      "baseHP": 8579,
      "baseATK": 222,
      "baseDEF": 487,
      "value": 19.2,
      "name": "CDmg%"
    },
    "70": {
      "baseHP": 10119,
      "baseATK": 262,
      "baseDEF": 574,
      "value": 19.2,
      "name": "CDmg%"
    },
    "80": {
      "baseHP": 11669,
      "baseATK": 302,
      "baseDEF": 662,
      "value": 28.8,
      "name": "CDmg%"
    },
    "90": {
      "baseHP": 13226,
      "baseATK": 342,
      "baseDEF": 751,
      "value": 38.4,
      "name": "CDmg%"
    },
    "normal": [
      89.73,
      97.04,
      104.34,
      114.77,
      122.08,
      130.43,
      141.9,
      153.38,
      164.86,
      177.38,
      191.72,
      208.6,
      225.47,
      242.34,
      260.75
    ],
    "charged": [
      68.8,
      74.4,
      80,
      88,
      93.6,
      100,
      108.8,
      117.6,
      126.4,
      136,
      147,
      159.94,
      172.87,
      185.81,
      199.92
    ],
    "skill": [
      245.6,
      264.02,
      282.44,
      307,
      325.42,
      343.84,
      368.4,
      392.96,
      417.52,
      442.08,
      466.64,
      491.2,
      521.9,
      552.6,
      583.3
    ],
    "burst": [
      352.6,
      381.3,
      410,
      451,
      479.7,
      512.5,
      557.6,
      602.7,
      647.8,
      697,
      753.38,
      819.67,
      885.97,
      952.27,
      1024.59
    ],
    "20+": {
      "baseHP": 3554,
      "baseATK": 92,
      "baseDEF": 202,
      "value": 0,
      "name": "CDmg%"
    },
    "40+": {
      "baseHP": 5944,
      "baseATK": 154,
      "baseDEF": 337,
      "value": 9.6,
      "name": "CDmg%"
    },
    "50+": {
      "baseHP": 7675,
      "baseATK": 198,
      "baseDEF": 436,
      "value": 19.2,
      "name": "CDmg%"
    },
    "60+": {
      "baseHP": 9207,
      "baseATK": 238,
      "baseDEF": 523,
      "value": 19.2,
      "name": "CDmg%"
    },
    "70+": {
      "baseHP": 10746,
      "baseATK": 278,
      "baseDEF": 610,
      "value": 28.8,
      "name": "CDmg%"
    },
    "80+": {
      "baseHP": 12296,
      "baseATK": 318,
      "baseDEF": 698,
      "value": 38.4,
      "name": "CDmg%"
    }
  },
  "Kazuha": {
    "1": {
      "baseHP": 1039,
      "baseATK": 23,
      "baseDEF": 63,
      "value": 0,
      "name": "EM"
    },
    "20": {
      "baseHP": 2695,
      "baseATK": 60,
      "baseDEF": 163,
      "value": 0,
      "name": "EM"
    },
    "40": {
      "baseHP": 5366,
      "baseATK": 119,
      "baseDEF": 324,
      "value": 0,
      "name": "EM"
    },
    "50": {
      "baseHP": 6902,
      "baseATK": 153,
      "baseDEF": 417,
      "value": 28.8,
      "name": "EM"
    },
    "60": {
      "baseHP": 8659,
      "baseATK": 192,
      "baseDEF": 523,
      "value": 57.6,
      "name": "EM"
    },
    "70": {
      "baseHP": 10213,
      "baseATK": 227,
      "baseDEF": 617,
      "value": 57.6,
      "name": "EM"
    },
    "80": {
      "baseHP": 11777,
      "baseATK": 262,
      "baseDEF": 712,
      "value": 86.4,
      "name": "EM"
    },
    "90": {
      "baseHP": 13348,
      "baseATK": 297,
      "baseDEF": 807,
      "value": 115.2,
      "name": "EM"
    },
    "normal": [
      44.98,
      48.64,
      52.3,
      57.53,
      61.19,
      65.38,
      71.13,
      76.88,
      82.63,
      88.91,
      96.1,
      104.56,
      113.02,
      121.47,
      130.7
    ],
    "charged": [
      117.65,
      127.22,
      136.8,
      150.48,
      160.06,
      171,
      186.05,
      201.1,
      216.14,
      232.56,
      251.38,
      273.49,
      295.62,
      317.73,
      341.86
    ],
    "skill": [
      192,
      206.4,
      220.8,
      240,
      254.4,
      268.8,
      288,
      307.2,
      326.4,
      345.6,
      364.8,
      384,
      408,
      432,
      456
    ],
    "burst": [
      262.4,
      282.08,
      301.76,
      328,
      347.68,
      367.36,
      393.6,
      419.84,
      446.08,
      472.32,
      498.56,
      524.8,
      557.6,
      590.4,
      623.2
    ],
    "20+": {
      "baseHP": 3586,
      "baseATK": 80,
      "baseDEF": 217,
      "value": 0,
      "name": "EM"
    },
    "40+": {
      "baseHP": 5999,
      "baseATK": 133,
      "baseDEF": 363,
      "value": 28.8,
      "name": "EM"
    },
    "50+": {
      "baseHP": 7747,
      "baseATK": 172,
      "baseDEF": 468,
      "value": 57.6,
      "name": "EM"
    },
    "60+": {
      "baseHP": 9292,
      "baseATK": 206,
      "baseDEF": 562,
      "value": 57.6,
      "name": "EM"
    },
    "70+": {
      "baseHP": 10846,
      "baseATK": 241,
      "baseDEF": 656,
      "value": 86.4,
      "name": "EM"
    },
    "80+": {
      "baseHP": 12410,
      "baseATK": 276,
      "baseDEF": 750,
      "value": 115.2,
      "name": "EM"
    }
  },
  "Ayaka": {
    "1": {
      "baseHP": 1001,
      "baseATK": 27,
      "baseDEF": 61,
      "value": 0,
      "name": "CDmg%"
    },
    "20": {
      "baseHP": 2597,
      "baseATK": 69,
      "baseDEF": 158,
      "value": 0,
      "name": "CDmg%"
    },
    "40": {
      "baseHP": 5170,
      "baseATK": 138,
      "baseDEF": 315,
      "value": 0,
      "name": "CDmg%"
    },
    "50": {
      "baseHP": 6649,
      "baseATK": 177,
      "baseDEF": 405,
      "value": 9.6,
      "name": "CDmg%"
    },
    "60": {
      "baseHP": 8341,
      "baseATK": 222,
      "baseDEF": 509,
      "value": 19.2,
      "name": "CDmg%"
    },
    "70": {
      "baseHP": 9838,
      "baseATK": 262,
      "baseDEF": 600,
      "value": 19.2,
      "name": "CDmg%"
    },
    "80": {
      "baseHP": 11345,
      "baseATK": 302,
      "baseDEF": 692,
      "value": 28.8,
      "name": "CDmg%"
    },
    "90": {
      "baseHP": 12858,
      "baseATK": 342,
      "baseDEF": 784,
      "value": 38.4,
      "name": "CDmg%"
    },
    "normal": [
      48.68,
      52.65,
      56.61,
      62.27,
      66.23,
      70.76,
      76.99,
      83.22,
      89.44,
      96.24,
      103.03,
      109.82,
      116.62,
      123.41,
      130.2
    ],
    "charged": [
      165.39,
      178.83,
      192.3,
      211.53,
      225,
      240.39,
      261.54,
      282.69,
      303.84,
      326.91,
      349.98,
      373.05,
      396.15,
      419.22,
      442.29
    ],
    "skill": [
      239.2,
      257.14,
      275.08,
      299,
      316.94,
      334.88,
      358.8,
      382.72,
      406.64,
      430.56,
      454.48,
      478.4,
      508.3,
      538.2,
      568.1
    ],
    "burst": [
      168.45,
      181.08,
      193.72,
      210.56,
      223.2,
      235.83,
      252.68,
      269.52,
      286.36,
      303.21,
      320.05,
      336.9,
      357.96,
      379.01,
      400.07
    ],
    "20+": {
      "baseHP": 3455,
      "baseATK": 92,
      "baseDEF": 211,
      "value": 0,
      "name": "CDmg%"
    },
    "40+": {
      "baseHP": 5779,
      "baseATK": 154,
      "baseDEF": 352,
      "value": 9.6,
      "name": "CDmg%"
    },
    "50+": {
      "baseHP": 7462,
      "baseATK": 198,
      "baseDEF": 455,
      "value": 19.2,
      "name": "CDmg%"
    },
    "60+": {
      "baseHP": 8951,
      "baseATK": 238,
      "baseDEF": 546,
      "value": 19.2,
      "name": "CDmg%"
    },
    "70+": {
      "baseHP": 10448,
      "baseATK": 278,
      "baseDEF": 637,
      "value": 28.8,
      "name": "CDmg%"
    },
    "80+": {
      "baseHP": 11954,
      "baseATK": 318,
      "baseDEF": 729,
      "value": 38.4,
      "name": "CDmg%"
    }
  },
  "Yoimiya": {
    "1": {
      "baseHP": 791,
      "baseATK": 25,
      "baseDEF": 48,
      "value": 0,
      "name": "CRate%"
    },
    "20": {
      "baseHP": 2053,
      "baseATK": 65,
      "baseDEF": 124,
      "value": 0,
      "name": "CRate%"
    },
    "40": {
      "baseHP": 4086,
      "baseATK": 130,
      "baseDEF": 247,
      "value": 0,
      "name": "CRate%"
    },
    "50": {
      "baseHP": 5256,
      "baseATK": 167,
      "baseDEF": 318,
      "value": 4.8,
      "name": "CRate%"
    },
    "60": {
      "baseHP": 6593,
      "baseATK": 209,
      "baseDEF": 399,
      "value": 9.6,
      "name": "CRate%"
    },
    "70": {
      "baseHP": 7777,
      "baseATK": 247,
      "baseDEF": 470,
      "value": 9.6,
      "name": "CRate%"
    },
    "80": {
      "baseHP": 8968,
      "baseATK": 285,
      "baseDEF": 542,
      "value": 14.4,
      "name": "CRate%"
    },
    "90": {
      "baseHP": 10164,
      "baseATK": 323,
      "baseDEF": 615,
      "value": 19.2,
      "name": "CRate%"
    },
    "normal": [
      71.28,
      76.14,
      81,
      87.48,
      92.34,
      98.02,
      105.3,
      112.58,
      119.88,
      127.18,
      134.46,
      141.76,
      149.04,
      156.34,
      163.62
    ],
    "charged": [
      124,
      133.3,
      142.6,
      155,
      164.3,
      173.6,
      186,
      198.4,
      210.8,
      223.2,
      235.6,
      248,
      263.5,
      279,
      294.5
    ],
    "skill": [
      137.91,
      140.18,
      142.45,
      145.4,
      147.67,
      149.94,
      152.89,
      155.84,
      158.79,
      161.74,
      164.7,
      167.65,
      170.6,
      173.55,
      176.5
    ],
    "burst": [
      127.2,
      136.74,
      146.28,
      159,
      168.54,
      178.08,
      190.8,
      203.52,
      216.24,
      228.96,
      241.68,
      254.4,
      270.3,
      286.2,
      302.1
    ],
    "20+": {
      "baseHP": 2731,
      "baseATK": 87,
      "baseDEF": 165,
      "value": 0,
      "name": "CRate%"
    },
    "40+": {
      "baseHP": 4568,
      "baseATK": 145,
      "baseDEF": 276,
      "value": 4.8,
      "name": "CRate%"
    },
    "50+": {
      "baseHP": 5899,
      "baseATK": 187,
      "baseDEF": 357,
      "value": 9.6,
      "name": "CRate%"
    },
    "60+": {
      "baseHP": 7075,
      "baseATK": 225,
      "baseDEF": 428,
      "value": 9.6,
      "name": "CRate%"
    },
    "70+": {
      "baseHP": 8259,
      "baseATK": 262,
      "baseDEF": 500,
      "value": 14.4,
      "name": "CRate%"
    },
    "80+": {
      "baseHP": 9450,
      "baseATK": 300,
      "baseDEF": 572,
      "value": 19.2,
      "name": "CRate%"
    }
  },
  "Sayu": {
    "1": {
      "baseHP": 994,
      "baseATK": 20,
      "baseDEF": 62,
      "value": 0,
      "name": "EM"
    },
    "20": {
      "baseHP": 2553,
      "baseATK": 53,
      "baseDEF": 160,
      "value": 0,
      "name": "EM"
    },
    "40": {
      "baseHP": 4937,
      "baseATK": 102,
      "baseDEF": 310,
      "value": 0,
      "name": "EM"
    },
    "50": {
      "baseHP": 6285,
      "baseATK": 130,
      "baseDEF": 395,
      "value": 24,
      "name": "EM"
    },
    "60": {
      "baseHP": 7809,
      "baseATK": 161,
      "baseDEF": 491,
      "value": 48,
      "name": "EM"
    },
    "70": {
      "baseHP": 9157,
      "baseATK": 189,
      "baseDEF": 575,
      "value": 48,
      "name": "EM"
    },
    "80": {
      "baseHP": 10505,
      "baseATK": 216,
      "baseDEF": 660,
      "value": 72,
      "name": "EM"
    },
    "90": {
      "baseHP": 11854,
      "baseATK": 244,
      "baseDEF": 745,
      "value": 96,
      "name": "EM"
    },
    "normal": [
      72.24,
      78.12,
      84,
      92.4,
      98.28,
      105,
      114.24,
      123.48,
      132.72,
      142.8,
      154.35,
      167.93,
      181.52,
      195.1,
      209.92
    ],
    "charged": [
      62.55,
      67.64,
      72.73,
      80,
      85.09,
      90.91,
      98.91,
      106.91,
      114.91,
      123.64,
      133.64,
      145.4,
      157.16,
      168.92,
      181.75
    ],
    "skill": [
      217.6,
      233.92,
      250.24,
      272,
      288.32,
      304.64,
      326.4,
      348.16,
      369.92,
      391.68,
      413.44,
      435.2,
      462.4,
      489.6,
      516.8
    ],
    "burst": [
      116.8,
      125.56,
      134.32,
      146,
      154.76,
      163.52,
      175.2,
      186.88,
      198.56,
      210.24,
      221.92,
      233.6,
      248.2,
      262.8,
      277.4
    ],
    "20+": {
      "baseHP": 3296,
      "baseATK": 68,
      "baseDEF": 207,
      "value": 0,
      "name": "EM"
    },
    "40+": {
      "baseHP": 5464,
      "baseATK": 113,
      "baseDEF": 343,
      "value": 24,
      "name": "EM"
    },
    "50+": {
      "baseHP": 6988,
      "baseATK": 144,
      "baseDEF": 439,
      "value": 48,
      "name": "EM"
    },
    "60+": {
      "baseHP": 8337,
      "baseATK": 172,
      "baseDEF": 524,
      "value": 48,
      "name": "EM"
    },
    "70+": {
      "baseHP": 9684,
      "baseATK": 200,
      "baseDEF": 608,
      "value": 72,
      "name": "EM"
    },
    "80+": {
      "baseHP": 11033,
      "baseATK": 227,
      "baseDEF": 693,
      "value": 96,
      "name": "EM"
    }
  },
  "Traveler (Electro)": {
    "1": {
      "baseHP": 912,
      "baseATK": 18,
      "baseDEF": 57,
      "value": 0,
      "name": "ATK%"
    },
    "20": {
      "baseHP": 2342,
      "baseATK": 46,
      "baseDEF": 147,
      "value": 0,
      "name": "ATK%"
    },
    "40": {
      "baseHP": 4529,
      "baseATK": 88,
      "baseDEF": 284,
      "value": 0,
      "name": "ATK%"
    },
    "50": {
      "baseHP": 5766,
      "baseATK": 113,
      "baseDEF": 362,
      "value": 6,
      "name": "ATK%"
    },
    "60": {
      "baseHP": 7164,
      "baseATK": 140,
      "baseDEF": 450,
      "value": 12,
      "name": "ATK%"
    },
    "70": {
      "baseHP": 8401,
      "baseATK": 164,
      "baseDEF": 527,
      "value": 12,
      "name": "ATK%"
    },
    "80": {
      "baseHP": 9638,
      "baseATK": 188,
      "baseDEF": 605,
      "value": 18,
      "name": "ATK%"
    },
    "90": {
      "baseHP": 10875,
      "baseATK": 212,
      "baseDEF": 683,
      "value": 24,
      "name": "ATK%"
    },
    "normal": [
      44.46,
      48.08,
      51.7,
      56.87,
      60.49,
      64.63,
      70.31,
      76,
      81.69,
      87.89,
      94.09,
      100.3,
      106.5,
      112.71,
      118.91
    ],
    "charged": [
      116.62,
      126.11,
      135.6,
      149.16,
      158.65,
      169.5,
      184.42,
      199.33,
      214.25,
      230.52,
      246.79,
      263.06,
      279.34,
      295.61,
      311.88
    ],
    "skill": [
      78.66,
      84.56,
      90.46,
      98.33,
      104.23,
      110.13,
      118,
      125.86,
      133.73,
      141.6,
      149.46,
      157.33,
      167.16,
      176.99,
      186.83
    ],
    "burst": [
      114.4,
      122.98,
      131.56,
      143,
      151.58,
      160.16,
      171.6,
      183.04,
      194.48,
      205.92,
      217.36,
      228.8,
      243.1,
      257.4,
      271.7
    ],
    "20+": {
      "baseHP": 3024,
      "baseATK": 59,
      "baseDEF": 190,
      "value": 0,
      "name": "ATK%"
    },
    "40+": {
      "baseHP": 5013,
      "baseATK": 98,
      "baseDEF": 315,
      "value": 6,
      "name": "ATK%"
    },
    "50+": {
      "baseHP": 6411,
      "baseATK": 125,
      "baseDEF": 402,
      "value": 12,
      "name": "ATK%"
    },
    "60+": {
      "baseHP": 7648,
      "baseATK": 149,
      "baseDEF": 480,
      "value": 12,
      "name": "ATK%"
    },
    "70+": {
      "baseHP": 8885,
      "baseATK": 174,
      "baseDEF": 558,
      "value": 18,
      "name": "ATK%"
    },
    "80+": {
      "baseHP": 10122,
      "baseATK": 198,
      "baseDEF": 635,
      "value": 24,
      "name": "ATK%"
    }
  },
  "Raiden": {
    "1": {
      "baseHP": 1005,
      "baseATK": 26,
      "baseDEF": 61,
      "value": 0,
      "name": "EnRe%"
    },
    "20": {
      "baseHP": 2606,
      "baseATK": 68,
      "baseDEF": 159,
      "value": 0,
      "name": "EnRe%"
    },
    "40": {
      "baseHP": 5189,
      "baseATK": 136,
      "baseDEF": 317,
      "value": 0,
      "name": "EnRe%"
    },
    "50": {
      "baseHP": 6675,
      "baseATK": 174,
      "baseDEF": 408,
      "value": 8,
      "name": "EnRe%"
    },
    "60": {
      "baseHP": 8373,
      "baseATK": 219,
      "baseDEF": 512,
      "value": 16,
      "name": "EnRe%"
    },
    "70": {
      "baseHP": 9875,
      "baseATK": 258,
      "baseDEF": 604,
      "value": 16,
      "name": "EnRe%"
    },
    "80": {
      "baseHP": 11388,
      "baseATK": 298,
      "baseDEF": 696,
      "value": 24,
      "name": "EnRe%"
    },
    "90": {
      "baseHP": 12907,
      "baseATK": 337,
      "baseDEF": 789,
      "value": 32,
      "name": "EnRe%"
    },
    "normal": [
      39.65,
      42.87,
      46.1,
      50.71,
      53.94,
      57.63,
      62.7,
      67.77,
      72.84,
      78.37,
      84.71,
      92.16,
      99.62,
      107.07,
      115.2
    ],
    "charged": [
      99.59,
      107.69,
      115.8,
      127.38,
      135.49,
      144.75,
      157.49,
      170.23,
      182.96,
      196.86,
      212.78,
      231.51,
      250.23,
      268.96,
      289.38
    ],
    "skill": [
      117.2,
      125.99,
      134.78,
      146.5,
      155.29,
      164.08,
      175.8,
      187.52,
      199.24,
      210.96,
      222.68,
      234.4,
      249.05,
      263.7,
      278.35
    ],
    "burst": [
      400.8,
      430.86,
      460.92,
      501,
      531.06,
      561.12,
      601.2,
      641.28,
      681.36,
      721.44,
      761.52,
      801.6,
      851.7,
      901.8,
      951.9
    ],
    "20+": {
      "baseHP": 3468,
      "baseATK": 91,
      "baseDEF": 212,
      "value": 0,
      "name": "EnRe%"
    },
    "40+": {
      "baseHP": 5801,
      "baseATK": 152,
      "baseDEF": 355,
      "value": 8,
      "name": "EnRe%"
    },
    "50+": {
      "baseHP": 7491,
      "baseATK": 196,
      "baseDEF": 458,
      "value": 16,
      "name": "EnRe%"
    },
    "60+": {
      "baseHP": 8985,
      "baseATK": 235,
      "baseDEF": 549,
      "value": 16,
      "name": "EnRe%"
    },
    "70+": {
      "baseHP": 10487,
      "baseATK": 274,
      "baseDEF": 641,
      "value": 24,
      "name": "EnRe%"
    },
    "80+": {
      "baseHP": 12000,
      "baseATK": 314,
      "baseDEF": 734,
      "value": 32,
      "name": "EnRe%"
    }
  },
  "Sara": {
    "1": {
      "baseHP": 802,
      "baseATK": 16,
      "baseDEF": 53,
      "value": 0,
      "name": "ATK%"
    },
    "20": {
      "baseHP": 2061,
      "baseATK": 42,
      "baseDEF": 135,
      "value": 0,
      "name": "ATK%"
    },
    "40": {
      "baseHP": 3985,
      "baseATK": 81,
      "baseDEF": 262,
      "value": 0,
      "name": "ATK%"
    },
    "50": {
      "baseHP": 5074,
      "baseATK": 104,
      "baseDEF": 333,
      "value": 6,
      "name": "ATK%"
    },
    "60": {
      "baseHP": 6305,
      "baseATK": 129,
      "baseDEF": 414,
      "value": 12,
      "name": "ATK%"
    },
    "70": {
      "baseHP": 7393,
      "baseATK": 151,
      "baseDEF": 485,
      "value": 12,
      "name": "ATK%"
    },
    "80": {
      "baseHP": 8481,
      "baseATK": 173,
      "baseDEF": 556,
      "value": 18,
      "name": "ATK%"
    },
    "90": {
      "baseHP": 9570,
      "baseATK": 195,
      "baseDEF": 628,
      "value": 24,
      "name": "ATK%"
    },
    "normal": [
      36.89,
      39.9,
      42.9,
      47.19,
      50.19,
      53.63,
      58.34,
      63.06,
      67.78,
      72.93,
      78.08,
      83.23,
      88.37,
      93.52,
      98.67
    ],
    "charged": [
      124,
      133.3,
      142.6,
      155,
      164.3,
      173.6,
      186,
      198.4,
      210.8,
      223.2,
      235.6,
      248,
      263.5,
      279,
      294.5
    ],
    "skill": [
      125.76,
      135.19,
      144.62,
      157.2,
      166.63,
      176.06,
      188.64,
      201.22,
      213.79,
      226.37,
      238.94,
      251.52,
      267.24,
      282.96,
      298.68
    ],
    "burst": [
      409.6,
      440.32,
      471.04,
      512,
      542.72,
      573.44,
      614.4,
      655.36,
      696.32,
      737.28,
      778.24,
      819.2,
      870.4,
      921.6,
      972.8
    ],
    "20+": {
      "baseHP": 2661,
      "baseATK": 54,
      "baseDEF": 175,
      "value": 0,
      "name": "ATK%"
    },
    "40+": {
      "baseHP": 4411,
      "baseATK": 90,
      "baseDEF": 289,
      "value": 6,
      "name": "ATK%"
    },
    "50+": {
      "baseHP": 5642,
      "baseATK": 115,
      "baseDEF": 370,
      "value": 12,
      "name": "ATK%"
    },
    "60+": {
      "baseHP": 6731,
      "baseATK": 137,
      "baseDEF": 442,
      "value": 12,
      "name": "ATK%"
    },
    "70+": {
      "baseHP": 7818,
      "baseATK": 160,
      "baseDEF": 513,
      "value": 18,
      "name": "ATK%"
    },
    "80+": {
      "baseHP": 8907,
      "baseATK": 182,
      "baseDEF": 584,
      "value": 24,
      "name": "ATK%"
    }
  },
  "Aloy": {
    "1": {
      "baseHP": 848,
      "baseATK": 18,
      "baseDEF": 53,
      "value": 0,
      "name": "Elemental%"
    },
    "20": {
      "baseHP": 2201,
      "baseATK": 47,
      "baseDEF": 137,
      "value": 0,
      "name": "Elemental%"
    },
    "40": {
      "baseHP": 4382,
      "baseATK": 94,
      "baseDEF": 272,
      "value": 0,
      "name": "Elemental%"
    },
    "50": {
      "baseHP": 5636,
      "baseATK": 121,
      "baseDEF": 350,
      "value": 7.2,
      "name": "Elemental%"
    },
    "60": {
      "baseHP": 7070,
      "baseATK": 152,
      "baseDEF": 439,
      "value": 14.4,
      "name": "Elemental%"
    },
    "70": {
      "baseHP": 8339,
      "baseATK": 179,
      "baseDEF": 517,
      "value": 14.4,
      "name": "Elemental%"
    },
    "80": {
      "baseHP": 9616,
      "baseATK": 206,
      "baseDEF": 597,
      "value": 21.6,
      "name": "Elemental%"
    },
    "90": {
      "baseHP": 10899,
      "baseATK": 234,
      "baseDEF": 676,
      "value": 28.8,
      "name": "Elemental%"
    },
    "normal": [
      44.88,
      47.94,
      51,
      55.08,
      58.14,
      61.71,
      66.3,
      70.89,
      75.48,
      80.07,
      84.66,
      89.25,
      93.84,
      98.43,
      103.02
    ],
    "charged": [
      124,
      133.3,
      142.6,
      155,
      164.3,
      173.6,
      186,
      198.4,
      210.8,
      223.2,
      235.6,
      248,
      263.5,
      279,
      294.5
    ],
    "skill": [
      177.6,
      190.92,
      204.24,
      222,
      235.32,
      248.64,
      266.4,
      284.16,
      301.92,
      319.68,
      337.44,
      355.2,
      377.4,
      399.6,
      421.8
    ],
    "burst": [
      359.2,
      386.14,
      413.08,
      449,
      475.94,
      502.88,
      538.8,
      574.72,
      610.64,
      646.56,
      682.48,
      718.4,
      763.3,
      808.2,
      853.1
    ],
    "20+": {
      "baseHP": 2928,
      "baseATK": 63,
      "baseDEF": 182,
      "value": 0,
      "name": "Elemental%"
    },
    "40+": {
      "baseHP": 4899,
      "baseATK": 105,
      "baseDEF": 304,
      "value": 7.2,
      "name": "Elemental%"
    },
    "50+": {
      "baseHP": 6325,
      "baseATK": 136,
      "baseDEF": 393,
      "value": 14.4,
      "name": "Elemental%"
    },
    "60+": {
      "baseHP": 7587,
      "baseATK": 163,
      "baseDEF": 471,
      "value": 14.4,
      "name": "Elemental%"
    },
    "70+": {
      "baseHP": 8856,
      "baseATK": 190,
      "baseDEF": 550,
      "value": 21.6,
      "name": "Elemental%"
    },
    "80+": {
      "baseHP": 10133,
      "baseATK": 217,
      "baseDEF": 629,
      "value": 28.8,
      "name": "Elemental%"
    }
  },
  "Kokomi": {
    "1": {
      "baseHP": 1049,
      "baseATK": 18,
      "baseDEF": 51,
      "value": 0,
      "name": "Elemental%"
    },
    "20": {
      "baseHP": 2720,
      "baseATK": 47,
      "baseDEF": 133,
      "value": 0,
      "name": "Elemental%"
    },
    "40": {
      "baseHP": 5416,
      "baseATK": 94,
      "baseDEF": 264,
      "value": 0,
      "name": "Elemental%"
    },
    "50": {
      "baseHP": 6966,
      "baseATK": 121,
      "baseDEF": 340,
      "value": 7.2,
      "name": "Elemental%"
    },
    "60": {
      "baseHP": 8738,
      "baseATK": 152,
      "baseDEF": 426,
      "value": 14.4,
      "name": "Elemental%"
    },
    "70": {
      "baseHP": 10306,
      "baseATK": 179,
      "baseDEF": 503,
      "value": 14.4,
      "name": "Elemental%"
    },
    "80": {
      "baseHP": 11885,
      "baseATK": 207,
      "baseDEF": 580,
      "value": 21.6,
      "name": "Elemental%"
    },
    "90": {
      "baseHP": 13471,
      "baseATK": 234,
      "baseDEF": 657,
      "value": 28.8,
      "name": "Elemental%"
    },
    "normal": [
      68.38,
      73.5,
      78.63,
      85.47,
      90.6,
      95.73,
      102.56,
      109.4,
      116.24,
      123.08,
      129.91,
      136.75,
      145.3,
      153.85,
      162.39
    ],
    "charged": [
      148.32,
      159.44,
      170.57,
      185.4,
      196.52,
      207.65,
      222.48,
      237.31,
      252.14,
      266.98,
      281.81,
      296.64,
      315.18,
      333.72,
      352.26
    ],
    "skill": [
      109.19,
      117.38,
      125.57,
      136.49,
      144.68,
      152.87,
      163.79,
      174.7,
      185.62,
      196.54,
      207.46,
      218.38,
      232.03,
      245.68,
      259.33
    ],
    "burst": [
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ],
    "20+": {
      "baseHP": 3619,
      "baseATK": 63,
      "baseDEF": 177,
      "value": 0,
      "name": "Elemental%"
    },
    "40+": {
      "baseHP": 6055,
      "baseATK": 105,
      "baseDEF": 295,
      "value": 7.2,
      "name": "Elemental%"
    },
    "50+": {
      "baseHP": 7818,
      "baseATK": 136,
      "baseDEF": 381,
      "value": 14.4,
      "name": "Elemental%"
    },
    "60+": {
      "baseHP": 9377,
      "baseATK": 163,
      "baseDEF": 457,
      "value": 14.4,
      "name": "Elemental%"
    },
    "70+": {
      "baseHP": 10945,
      "baseATK": 190,
      "baseDEF": 534,
      "value": 21.6,
      "name": "Elemental%"
    },
    "80+": {
      "baseHP": 12524,
      "baseATK": 218,
      "baseDEF": 611,
      "value": 28.8,
      "name": "Elemental%"
    }
  },
  "Thoma": {
    "1": {
      "baseHP": 866,
      "baseATK": 17,
      "baseDEF": 63,
      "value": 0,
      "name": "ATK%"
    },
    "20": {
      "baseHP": 2225,
      "baseATK": 43,
      "baseDEF": 162,
      "value": 0,
      "name": "ATK%"
    },
    "40": {
      "baseHP": 4302,
      "baseATK": 84,
      "baseDEF": 313,
      "value": 0,
      "name": "ATK%"
    },
    "50": {
      "baseHP": 5478,
      "baseATK": 107,
      "baseDEF": 398,
      "value": 6,
      "name": "ATK%"
    },
    "60": {
      "baseHP": 6806,
      "baseATK": 133,
      "baseDEF": 495,
      "value": 12,
      "name": "ATK%"
    },
    "70": {
      "baseHP": 7981,
      "baseATK": 156,
      "baseDEF": 580,
      "value": 12,
      "name": "ATK%"
    },
    "80": {
      "baseHP": 9156,
      "baseATK": 179,
      "baseDEF": 665,
      "value": 18,
      "name": "ATK%"
    },
    "90": {
      "baseHP": 10331,
      "baseATK": 202,
      "baseDEF": 751,
      "value": 24,
      "name": "ATK%"
    },
    "normal": [
      44.39,
      48.01,
      51.62,
      56.78,
      60.4,
      64.53,
      70.2,
      75.88,
      81.56,
      87.75,
      93.95,
      100.14,
      106.34,
      112.53,
      118.73
    ],
    "charged": [
      112.75,
      121.92,
      131.1,
      144.21,
      153.39,
      163.88,
      178.3,
      192.72,
      207.14,
      222.87,
      238.6,
      254.33,
      270.07,
      285.8,
      301.53
    ],
    "skill": [
      146.4,
      157.38,
      168.36,
      183,
      193.98,
      204.96,
      219.6,
      234.24,
      248.88,
      263.52,
      278.16,
      292.8,
      311.1,
      329.4,
      347.7
    ],
    "burst": [
      88,
      94.6,
      101.2,
      110,
      116.6,
      123.2,
      132,
      140.8,
      149.6,
      158.4,
      167.2,
      176,
      187,
      198,
      209
    ],
    "20+": {
      "baseHP": 2872,
      "baseATK": 56,
      "baseDEF": 209,
      "value": 0,
      "name": "ATK%"
    },
    "40+": {
      "baseHP": 4762,
      "baseATK": 93,
      "baseDEF": 346,
      "value": 6,
      "name": "ATK%"
    },
    "50+": {
      "baseHP": 6091,
      "baseATK": 119,
      "baseDEF": 443,
      "value": 12,
      "name": "ATK%"
    },
    "60+": {
      "baseHP": 7266,
      "baseATK": 142,
      "baseDEF": 528,
      "value": 12,
      "name": "ATK%"
    },
    "70+": {
      "baseHP": 8440,
      "baseATK": 165,
      "baseDEF": 613,
      "value": 18,
      "name": "ATK%"
    },
    "80+": {
      "baseHP": 9616,
      "baseATK": 188,
      "baseDEF": 699,
      "value": 24,
      "name": "ATK%"
    }
  }
}

