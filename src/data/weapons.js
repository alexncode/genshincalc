export function getWeaponData(name) {
  return {
    weaponName: name,
    baseATK: baseATK[weaponList[name].dmg][13],
    name: weaponList[name].name,
    value: bonus[weaponList[name].value][7],
    additional: weaponList[name].additional,
    refinement: 1,
  }
}

export const baseATK = {
  48: [48, 133, 164, 261, 292, 341, 373, 423, 455, 506, 537, 590, 621, 674], // 1 20 20+ 40 40+ 50 50+ 60 60+ 70 70+ 80 80+ 90
  46: [46, 122, 153, 235, 266, 308, 340, 382, 414, 457, 488, 532, 563, 608],
  44: [44, 119, 144, 226, 252, 293, 319, 361, 387, 429, 455, 497, 523, 565],
  42: [42, 109, 135, 205, 231, 266, 292, 327, 353, 388, 414, 449, 475, 510],
  41: [41, 99, 125, 184, 210, 238, 264, 293, 319, 347, 373, 401, 427, 454],
  40: [40, 102, 121, 187, 207, 239, 259, 292, 311, 344, 363, 396, 415, 448],
  39: [39, 94, 113, 169, 189, 216, 236, 263, 282, 309, 329, 355, 375, 401],
  38: [38, 86, 105, 151, 171, 193, 212, 234, 253, 274, 294, 314, 334, 334],
}

export const bonus = {
  3.4: [3.4, 6, 8.8, 10.1, 11.5, 12.9, 14.2, 15.6],
  4: [4, 7.1, 10.3, 11.9, 13.6, 15.2, 16.8, 18.4],
  4.8: [4.8, 8.5, 12.4, 14.3, 16.2, 18.2, 20.1, 22.1],
  5.1: [5.1, 9, 13.1, 15.2, 17.3, 19.3, 21.4, 23.4],
  6: [6, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.5],
  6.4: [6.4, 11.3, 16.4, 19, 21.6, 24.1, 26.7, 29.3],
  6.7: [6.7, 11.8, 17.2, 19.9, 22.6, 25.2, 27.9, 30.6],
  6.8: [6.8, 12, 17.5, 20.3, 23, 25.7, 28.5, 31.2],
  7.2: [7.2, 12.7, 18.5, 21.4, 24.4, 27.3, 30.2, 33.1],
  7.5: [7.5, 13.3, 19.3, 22.4, 25.4, 28.4, 31.5, 34.5],
  7.7: [7.7, 13.5, 19.7, 22.8, 25.9, 29, 32.1, 35.2],
  8: [8, 14.1, 20.6, 23.8, 27.1, 30, 33.5, 36.8],
  8.5: [8.5, 15, 21.9, 25.3, 28.8, 32.2, 35.6, 39],
  9: [9, 15.9, 23.2, 26.8, 30.4, 34.1, 37.7, 41.3],
  9.6: [9.6, 16.9, 24.6, 28.5, 32.3, 36.2, 40.1, 43.9],
  10: [10, 17.7, 25.8, 29.8, 33.8, 40.9, 41.9, 45.9],
  10.2: [10.2, 18, 26.3, 30.4, 34.5, 38.6, 42.7, 46.9],
  10.8: [10.8, 19.1, 27.8, 32.2, 36.5, 40.9, 45.3, 49.6],
  11.3: [11.3, 19.9, 29, 33.5, 38.1, 42.6, 47.2, 51.7],
  12: [12, 21.2, 30.9, 35.7, 40.6, 45.4, 50.3, 55.1],
  13.3: [13.3, 23.6, 34.3, 39.7, 45.1, 50.5, 55.9, 61.3],
  15: [15, 26.5, 38.7, 44.7, 50.8, 56.8, 62.9, 69],
  16: [16, 28.3, 41.2, 47.7, 54.1, 60.6, 67.1, 73.6],

  20: [20, 36, 53, 61, 69, 77, 85, 94],
  24: [24, 42, 62, 71, 81, 91, 101, 110],
  31: [31, 54, 79, 91, 104, 116, 128, 141],
  36: [36, 64, 93, 107, 122, 136, 151, 165],
  41: [41, 72, 105, 122, 138, 154, 171, 187],
  48: [48, 85, 124, 143, 162, 182, 201, 221],

}

export const weaponList = {
  "Messenger": {
    "type": "Bow",
    "dmg": 40,
    "name": "CDmg%",
    "value": 6.8,
    "additional": [],
    "rarity": 3,
    refinement: 1,
    "description": "Aimed Shot hits on weak spots deal an additional 100/125/150/175/200% ATK DMG as CRIT DMG. Can only occur once every 10s."
  },
  "Raven Bow": {
    "type": "Bow",
    "dmg": 40,
    "name": "EM",
    "value": 20,
    "additional": [{ name: "AllDMG%", value: 12, inc: 3, active: false }],
    "rarity": 3,
    refinement: 1,
    "description": "Increases DMG against enemies affected by Hydro or Pyro by $eff1%."
  },
  "Recurve Bow": {
    "type": "Bow",
    "dmg": 38,
    "name": "HP%",
    "value": 10.2,
    "additional": [],
    "rarity": 3,
    refinement: 1,
    "description": "Defeating an opponent restores 8/10/12/14/16% HP."
  },
  "Sharpshooters Oath": {
    "type": "Bow",
    "dmg": 39,
    "name": "CDmg%",
    "value": 10.2,
    "additional": [{ name: "AllDMG%", value: 24, inc: 6, active: false }],
    "rarity": 3,
    refinement: 1,
    "description": "Increases DMG against weak spots by $eff1%."
  },
  "Slingshot": {
    "type": "Bow",
    "dmg": 38,
    "name": "CRate%",
    "value": 6.8,
    "additional": [{ name: "AllDMG%", value: 36, inc: 6, active: false }],
    "rarity": 3,
    refinement: 1,
    "description": "If a Normal Attack or Aimed Shot hits a target within 0.3s of being fired, increases DMG by $eff1%; otherwise, it decreases DMG by 10%."
  },
  "Emerald Orb": {
    "type": "Catalyst",
    "dmg": 40,
    "name": "EM",
    "value": 20,
    "additional": [{ name: "ATK%", value: 20, inc: 5, active: false }],
    "rarity": 3,
    refinement: 1,
    "description": "Upon causing a Vaporize, Electro-Charged, Frozen, or a Hydro-infused Swirl reaction, increases ATK by $eff1% for 12s."
  },
  "Magic Guide": {
    "type": "Catalyst",
    "dmg": 38,
    "name": "EM",
    "value": 41,
    "additional": [{ name: "AllDMG%", value: 12, inc: 3, active: false }],
    "rarity": 3,
    refinement: 1,
    "description": "Increases DMG against enemies affected by Hydro or Electro by $eff1%."
  },
  "Otherworldly Story": {
    "type": "Catalyst",
    "dmg": 39,
    "name": "EnRe%",
    "value": 8.5,
    "additional": [],
    "rarity": 3,
    refinement: 1,
    "description": "Each Elemental Orb or Particle collected restores 1/1.25/1.5/1.75/2% HP."
  },
  "Thrilling Tales of Dragon Slayers": {
    "type": "Catalyst",
    "dmg": 39,
    "name": "HP%",
    "value": 7.7,
    "additional": [],
    "rarity": 3,
    refinement: 1,
    "description": "When switching characters, the new character taking the field has their ATK increased by 24/30/36/42/48% for 10s. This effect can only occur once every 20s."
  },
  "Twin Nephrite": {
    "type": "Catalyst",
    "dmg": 40,
    "name": "CRate%",
    "value": 3.4,
    "additional": [{ name: "ATK%", value: 12, inc: 2, active: false }],
    "rarity": 3,
    refinement: 1,
    "description": "Defeating an enemy increases Movement SPD and ATK by $eff1% for 15s."
  },
  "Bloodtainted Greatsword": {
    "type": "Claymore",
    "dmg": 38,
    "name": "EM",
    "value": 41,
    "additional": [{ name: "AllDMG%", value: 12, inc: 3, active: false }],
    "rarity": 3,
    refinement: 1,
    "description": "Increases DMG against enemies affected by Pyro or Electro by $eff1%."
  },
  "Debate Club": {
    "type": "Claymore",
    "dmg": 39,
    "name": "ATK%",
    "value": 7.7,
    "additional": [],
    "rarity": 3,
    refinement: 1,
    "description": "After using an Elemental Skill, Normal or Charged Attacks, on hit, deal an additional 60/75/90/105/120% ATK DMG in a small area. Effect lasts 15s. DMG can only occur once every 3s."
  },
  "Ferrous Shadow": {
    "type": "Claymore",
    "dmg": 39,
    "name": "HP%",
    "value": 7.7,
    "additional": [{ name: "Charged%", value: 30, inc: 5, active: false }],
    "rarity": 3,
    refinement: 1,
    "description": "When HP falls below 70/75/80/85/90%, increases Charged Attack DMG by $eff1%, and Charged Attacks become much harder to interrupt."
  },
  "Skyrider Greatsword": {
    "type": "Claymore",
    "dmg": 39,
    "name": "Physical%",
    "value": 9.6,
    "additional": [{ name: "ATK%", value: 24, inc: 4, active: false }],
    "rarity": 3,
    refinement: 1,
    "description": "On hit, Normal or Charged Attacks increase ATK by $eff1% for 6s. Max 4 stacks. Can only occur once every 0.5s."
  },
  "White Iron Greatsword": {
    "type": "Claymore",
    "dmg": 39,
    "name": "DEF%",
    "value": 9.6,
    "additional": [],
    "rarity": 3,
    refinement: 1,
    "description": "Defeating an opponent restores 8/10/12/14/16% HP."
  },
  "Black Tassel": {
    "type": "Polearm",
    "dmg": 38,
    "name": "HP%",
    "value": 10.2,
    "additional": [{ name: "SlimeDMG%", value: 40, inc: 10, active: true }],
    "rarity": 3,
    refinement: 1,
    "description": "Increases DMG against slimes by $eff1%."
  },
  "Halberd": {
    "type": "Polearm",
    "dmg": 40,
    "name": "ATK%",
    "value": 5.1,
    "additional": [],
    "rarity": 3,
    refinement: 1,
    "description": "Normal Attacks deal an additional 160/200/240/280/320% DMG. Can only occur once every 10s."
  },
  "White Tassel": {
    "type": "Polearm",
    "dmg": 39,
    "name": "CRate%",
    "value": 5.1,
    "additional": [{ name: "NormalATK%", value: 24, inc: 4, active: true }],
    "rarity": 3,
    refinement: 1,
    "description": "Increases Normal Attack DMG by $eff1%."
  },
  "Cool Steel": {
    "type": "Sword",
    "dmg": 39,
    "name": "ATK%",
    "value": 7.7,
    "additional": [{ name: "AllDMG%", value: 12, inc: 3, active: false }],
    "rarity": 3,
    refinement: 1,
    "description": "Increases DMG against enemies affected by Hydro or Cryo by $eff1%."
  },
  "Dark Iron Sword": {
    "type": "Sword",
    "dmg": 40,
    "name": "EM",
    "value": 31,
    "additional": [{ name: "ATK%", value: 20, inc: 5, active: false }],
    "rarity": 3,
    refinement: 1,
    "description": "Upon causing an Overloaded, Superconduct, Electro-Charged, or an Electro-infused Swirl reaction, increases ATK by $eff1% for 12s."
  },
  "Fillet Blade": {
    "type": "Sword",
    "dmg": 39,
    "name": "ATK%",
    "value": 7.7,
    "additional": [],
    "rarity": 3,
    refinement: 1,
    "description": "On hit, has 50% chance to deal $eff1% ATK DMG to a single enemy. Can only occur once every 15/14/13/12/11s."
  },
  "Harbinger of Dawn": {
    "type": "Sword",
    "dmg": 39,
    "name": "CDmg%",
    "value": 10.2,
    "additional": [{ name: "CRate%", value: 14, inc: 4, active: false }],
    "rarity": 3,
    refinement: 1,
    "description": "When HP is above 90%, increases CRIT Rate by $eff1%."
  },
  "Skyrider Sword": {
    "type": "Sword",
    "dmg": 38,
    "name": "EnRe%",
    "value": 11.3,
    "additional": [{ name: "ATK%", value: 12, inc: 3, active: false }],
    "rarity": 3,
    refinement: 1,
    "description": "Using an Elemental Burst grants a $eff1% increase in ATK and Movement SPD for 12s."
  },
  "Travelers Handy Sword": {
    "type": "Sword",
    "dmg": 40,
    "name": "DEF%",
    "value": 6.4,
    "additional": [],
    "rarity": 3,
    refinement: 1,
    "description": "Each Elemental Orb or Particle collected restores 1/1.25/1.5/1.75/2% HP."
  },
  "Alley Hunter": {
    "type": "Bow",
    "dmg": 41,
    "name": "CRate%",
    "value": 8,
    "additional": [{ name: "ATK%", value: 20, inc: 5, active: false }, { name: "CDmg%", value: 20, inc: 5, active: false }],
    "rarity": 3,
    refinement: 1,
    "description": "Every 4s a character is on the field, their ATK increases by $eff1% and their CRIT DMG increases by $eff2%. This effect has a maximum of 5 stacks and will not be reset if the character leaves the field, but will be cleared when the character takes DMG."
  },
  "Blackcliff Warbow": {
    "type": "Bow",
    "dmg": 44,
    "name": "CDmg%",
    "value": 6,
    "additional": [{ name: "ATK%", value: 36, inc: 9, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "After defeating an enemy, ATK is increased by $eff1% for 30s. This effect has a maximum of 3 stacks, and the duration of each stack is independent of the others."
  },
  "Compound Bow": {
    "type": "Bow",
    "dmg": 41,
    "name": "Physical%",
    "value": 15,
    "additional": [{ name: "NCATK%", value: 16, inc: 4, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "Normal Attack and Aimed Shot hits increase ATK by $eff1% and Normal Attack SPD by 1.2/1.5/1.8/2.1/2.4% for 6s. Max 4 stacks. Can only occur once every 0.3s."
  },
  "Favonius Warbow": {
    "type": "Bow",
    "dmg": 41,
    "name": "EnRe%",
    "value": 13.3,
    "additional": [],
    "rarity": 4,
    refinement: 1,
    "description": "CRIT hits have a 60/70/80/90/100% chance to generate 1 Elemental Orb, which will regenerate 6 Energy for the character. Can only occur once every 12/10.5/9/7.5/6s."
  },
  "Prototype Crescent": {
    "type": "Bow",
    "dmg": 42,
    "name": "ATK%",
    "value": 9,
    "additional": [{ name: "ATK%", value: 36, inc: 9, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "Aimed Shot hits on weak points increase Movement SPD by 10% and ATK by $eff1% for 10s."
  },
  "Royal Bow": {
    "type": "Bow",
    "dmg": 42,
    "name": "ATK%",
    "value": 9,
    "additional": [{ name: "CRate%", value: 40, inc: 10, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "Upon damaging an enemy, increases CRIT Rate by $eff1%. Max 5 stacks. A CRIT hit removes all stacks."
  },
  "Rust": {
    "type": "Bow",
    "dmg": 42,
    "name": "ATK%",
    "value": 9,
    "additional": [{ name: "NormalATK%", value: 40, inc: 10, active: true }, { name: "Charged%", value: -8, inc: -1, active: true }],
    "rarity": 4,
    refinement: 1,
    "description": "Increases Normal Attack DMG by $eff1% but decreases Aimed Shot DMG by $eff2%"
  },
  "Sacrificial Bow": {
    "type": "Bow",
    "dmg": 44,
    "name": "EnRe%",
    "value": 6.7,
    "additional": [],
    "rarity": 4,
    refinement: 1,
    "description": "After damaging an opponent with an Elemental Skill, the skill has a 40/50/60/70/80% chance to end its own CD. Can only occur once every 30/26/22/18/14s."
  },
  "The Stringless": {
    "type": "Bow",
    "dmg": 42,
    "name": "EM",
    "value": 36,
    "additional": [{ name: "SkillDMG%", value: 24, inc: 6, active: true }, { name: "Burst%", value: 24, inc: 6, active: true }],
    "rarity": 4,
    refinement: 1,
    "description": "Increases Elemental Skill and Elemental Burst DMG by $eff1%."
  },
  "The Viridescent Hunt": {
    "type": "Bow",
    "dmg": 42,
    "name": "CRate%",
    "value": 6,
    "additional": [],
    "rarity": 4,
    refinement: 1,
    "description": "Upon hit, Normal and Aimed Shot Attacks have a 50% chance to generate a Cyclone, which will continuously attract surrounding enemies, dealing 40/50/60/70/80% of ATK as DMG to these enemies every 0.5s for 4s. This effect can only occur once every 14/13/12/11/10s."
  },
  "Blackcliff Amulet": {
    "type": "Catalyst",
    "dmg": 42,
    "name": "CDmg%",
    "value": 12,
    "additional": [{ name: "ATK%", value: 36, inc: 9, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "After defeating an enemy, ATK is increased by $eff1% for 30s. This effect has a maximum of 3 stacks, and the duration of each stack is independent of the others."
  },
  "Eye of Perception": {
    "type": "Catalyst",
    "dmg": 41,
    "name": "ATK%",
    "value": 12,
    "additional": [],
    "rarity": 4,
    refinement: 1,
    "description": "Normal and Charged Attacks have a 50% chance to fire a Bolt of Perception, dealing 240/270/300/330/360% ATK as DMG. This bolt can bounce between enemies a maximum of 4 times. This effect can occur once every 12/11/10/9/8s."
  },
  "Favonius Codex": {
    "type": "Catalyst",
    "dmg": 42,
    "name": "EnRe%",
    "value": 10,
    "additional": [],
    "rarity": 4,
    refinement: 1,
    "description": "CRIT hits have a 60/70/80/90/100% chance to generate 1 Elemental Orb, which will regenerate 6 Energy for the character. Can only occur once every 12/10.5/9/7.5/6s."
  },
  "Mappa Mare": {
    "type": "Catalyst",
    "dmg": 44,
    "name": "EM",
    "value": 24,
    "additional": [{ name: "Elemental%", value: 16, inc: 4, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "Triggering an Elemental reaction grants a $eff1% Elemental DMG Bonus for 10s. Max 2 stacks."
  },
  "Prototype Amber": {
    "type": "Catalyst",
    "dmg": 42,
    "name": "HP%",
    "value": 9,
    "additional": [],
    "rarity": 4,
    refinement: 1,
    "description": "Using an Elemental Burst regenerates 4/4.5/5/5.5/6 Energy every 2s for 6s. Additionally, all party members will regenerate 4/4.5/5/5.5/6% HP every 2s for this duration."
  },
  "Royal Grimoire": {
    "type": "Catalyst",
    "dmg": 44,
    "name": "ATK%",
    "value": 6,
    "additional": [{ name: "CRate%", value: 40, inc: 10, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "Upon damaging an enemy, increases CRIT Rate by $eff1%. Max 5 stacks. A CRIT hit removes all stacks."
  },
  "Sacrificial Fragments": {
    "type": "Catalyst",
    "dmg": 41,
    "name": "EM",
    "value": 48,
    "additional": [],
    "rarity": 4,
    refinement: 1,
    "description": "After damaging an opponent with an Elemental Skill, the skill has a 40/50/60/70/80% chance to end its own CD. Can only occur once every 30/26/22/18/14s."
  },
  "Solar Pearl": {
    "type": "Catalyst",
    "dmg": 42,
    "name": "CRate%",
    "value": 6,
    "additional": [{ name: "Burst%", value: 20, inc: 5, active: false }, { name: "SkillDMG%", value: 20, inc: 5, active: false }, { name: "NormalATK%", value: 20, inc: 5, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "Normal Attack hits increase Elemental Skill and Elemental Burst DMG by $eff1% for 6s. Likewise, Elemental Skill or Elemental Burst hits increase Normal Attack DMG by $eff3% for 6s."
  },
  "The Widsith": {
    "type": "Catalyst",
    "dmg": 42,
    "name": "CDmg%",
    "value": 12,
    "additional": [{ name: "ATK%", value: 60, inc: 15, active: false }, { name: "EM", value: 240, inc: 60, active: false }, { name: "Elemental%", value: 48, inc: 12, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "When a character takes the field, they gain a random theme song for 10s: Recitative: Increases ATK by $eff1%. Interlude: Elemental Mastery is increased by $eff2. Aria: Increases all Elemental DMG by $eff3%. Can only occur once every 30s."
  },
  "Wine and Song": {
    "type": "Catalyst",
    "dmg": 42,
    "name": "EnRe%",
    "value": 10,
    "additional": [{ name: "ATK%", value: 32, inc: 8, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "For every character in the party who hails from Mondstadt, the character who equips this weapon gains $eff1% ATK increase and 3/3.5/4/4.5/5% Movement SPD increase."
  },
  "Frostbearer": {
    "type": "Catalyst",
    "dmg": 42,
    "name": "ATK%",
    "value": 9,
    "additional": [],
    "rarity": 4,
    refinement: 1,
    "description": `Hitting an opponent with Normal and Charged Attacks has a 60/70/80/90/100% chance of forming and dropping an Everfrost Icicle above them, dealing 80/95/110/125/140% AoE ATK DMG.
    Opponents affected by Cryo are dealt 200/240/280/320/360% ATK DMG. Can only occur once every 10s`
  },
  "Blackcliff Slasher": {
    "type": "Claymore",
    "dmg": 42,
    "name": "CDmg%",
    "value": 12,
    "additional": [{ name: "ATK%", value: 36, inc: 9, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "After defeating an enemy, ATK is increased by $eff1% for 30s. This effect has a maximum of 3 stacks, and the duration of each stack is independent of the others."
  },
  "Favonius Greatsword": {
    "type": "Claymore",
    "dmg": 41,
    "name": "EnRe%",
    "value": 13.3,
    "additional": [],
    "rarity": 4,
    refinement: 1,
    "description": "CRIT hits have a 60/70/80/90/100% chance to generate 1 Elemental Orb, which will regenerate 6 Energy for the character. Can only occur once every 12/10.5/9/7.5/6s."
  },
  "Lithic Blade": {
    "type": "Claymore",
    "dmg": 41,
    "name": "CDmg%",
    "value": 16,
    "additional": [{ name: "ATK%", value: 24, inc: 4, active: false }, { name: "CRate%", value: 8, inc: 4, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "For every character in the party who hails from Liyue, the character who equips this weapon gains $eff1% ATK increase and $eff2% CRIT Rate increase."
  },
  "Prototype Archaic": {
    "type": "Claymore",
    "dmg": 44,
    "name": "ATK%",
    "value": 6,
    "additional": [],
    "rarity": 4,
    refinement: 1,
    "description": "On hit, Normal or Charged Attacks have a 50% chance to deal an additional 240/300/360/420/480% ATK DMG to enemies within a small radius. Can only occur once every 15s."
  },
  "Rainslasher": {
    "type": "Claymore",
    "dmg": 42,
    "name": "EM",
    "value": 36,
    "additional": [{ name: "AllDMG%", value: 20, inc: 5, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "Increases DMG against enemies affected by Hydro or Electro by $eff1%."
  },
  "Royal Greatsword": {
    "type": "Claymore",
    "dmg": 44,
    "name": "ATK%",
    "value": 6,
    "additional": [{ name: "CRate%", value: 40, inc: 10, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "Upon damaging an enemy, increases CRIT Rate by $eff1%. Max 5 stacks. A CRIT hit removes all stacks."
  },
  "Sacrificial Greatsword": {
    "type": "Claymore",
    "dmg": 44,
    "name": "EnRe%",
    "value": 6.7,
    "additional": [],
    "rarity": 4,
    refinement: 1,
    "description": "After damaging an opponent with an Elemental Skill, the skill has a 40/50/60/70/80% chance to end its own CD. Can only occur once every 30/26/22/18/14s."
  },
  "Serpent Spine": {
    "type": "Claymore",
    "dmg": 42,
    "name": "CRate%",
    "value": 6,
    "additional": [{ name: "AllDMG%", value: 30, inc: 5, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "Every 4s a character is on the field, they will deal $eff1% more DMG and take 3/2.7/2.4/2.1/1.8% more DMG. This effect has a maximum of 5 stacks and will not be reset if the character leaves the field, but will be cleared when the character takes DMG."
  },
  "The Bell": {
    "type": "Claymore",
    "dmg": 42,
    "name": "HP%",
    "value": 9,
    "additional": [{ name: "AllDMG%", value: 12, inc: 3, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "Taking DMG generates a shield which absorbs DMG up to 20/23/26/29/32% of Max HP. This shield lasts for 10s or until broken, and can only be triggered once every 45s. While protected by the shield, the character gains $eff1% increased DMG."
  },
  "Whiteblind": {
    "type": "Claymore",
    "dmg": 42,
    "name": "DEF%",
    "value": 11.3,
    "additional": [{ name: "ATK%", value: 24, inc: 6, active: false }, { name: "DEF%", value: 24, inc: 6, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "On hit, Normal or Charged Attacks increase ATK and DEF by $eff1% for 6s. Max 4 stacks. Can only occur once every 0.5s."
  },
  "Snow-Tombed Starsilver": {
    "type": "Claymore",
    "dmg": 44,
    "name": "Physical%",
    "value": 7.5,
    "additional": [],
    "rarity": 4,
    refinement: 1,
    "description": `Hitting an opponent with Normal and Charged Attacks has a 60/70/80/90/100% chance of forming and dropping an Everfrost Icicle above them, dealing 80/95/110/125/140% AoE ATK DMG.
    Opponents affected by Cryo are dealt 200/240/280/320/360% ATK DMG. Can only occur once every 10s`
  },
  "Blackcliff Pole": {
    "type": "Polearm",
    "dmg": 42,
    "name": "CDmg%",
    "value": 12,
    "additional": [{ name: "ATK%", value: 36, inc: 9, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "After defeating an enemy, ATK is increased by $eff1% for 30s. This effect has a maximum of 3 stacks, and the duration of each stack is independent of the others."
  },
  "Crescent Pike": {
    "type": "Polearm",
    "dmg": 44,
    "name": "Physical%",
    "value": 7.5,
    "additional": [{ name: "NCATK%", value: 20, inc: 5, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "After picking up an Elemental Orb/Particle, Normal and Charged Attacks deal an additional $eff1% ATK as DMG for 5s."
  },
  "Deathmatch": {
    "type": "Polearm",
    "dmg": 41,
    "name": "CRate%",
    "value": 8,
    "additional": [{ name: "ATK%", value: 16, inc: 4, active: false }, { name: "DEF%", value: 16, inc: 4, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "If there are at least 2 opponents nearby, ATK and DEF is increased by $eff1%. If there are less than 2 enemies nearby, ATK is increased by 24%."
  },
  "Dragons Bane": {
    "type": "Polearm",
    "dmg": 41,
    "name": "EM",
    "value": 48,
    "additional": [{ name: "AllDMG%", value: 20, inc: 4, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "Increases DMG against enemies affected by Hydro or Pyro by $eff1%."
  },
  "Favonius Lance": {
    "type": "Polearm",
    "dmg": 44,
    "name": "EnRe%",
    "value": 6.7,
    "additional": [],
    "rarity": 4,
    refinement: 1,
    "description": "CRIT hits have a 60/70/80/90/100% chance to generate 1 Elemental Orb, which will regenerate 6 Energy for the character. Can only occur once every 12/10.5/9/7.5/6s."
  },
  "Lithic Spear": {
    "type": "Polearm",
    "dmg": 42,
    "name": "Physical%",
    "value": 9,
    "additional": [],
    "rarity": 4,
    refinement: 1,
    "description": "Unknown"
  },
  "Prototype Grudge": {
    "type": "Polearm",
    "dmg": 42,
    "name": "EnRe%",
    "value": 10,
    "additional": [{ name: "NCATK%", value: 16, inc: 4, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "After using an Elemental Skill, increases Normal and Charged Attack DMG by $eff1% for 12s. Max 2 stacks."
  },
  "Royal Spear": {
    "type": "Polearm",
    "dmg": 44,
    "name": "ATK%",
    "value": 6,
    "additional": [{ name: "CRate%", value: 40, inc: 10, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "Upon damaging an enemy, increases CRIT Rate by $eff1%. Max 5 stacks. A CRIT hit removes all stacks."
  },
  "Dragonspine Spear": {
    "type": "Polearm",
    "dmg": 41,
    "name": "Physical%",
    "value": 15,
    "additional": [],
    "rarity": 4,
    refinement: 1,
    "description": `Hitting an opponent with Normal and Charged Attacks has a 60/70/80/90/100% chance of forming and dropping an Everfrost Icicle above them, dealing 80/95/110/125/140% AoE ATK DMG.
    Opponents affected by Cryo are dealt 200/240/280/320/360% ATK DMG. Can only occur once every 10s`
  },
  "Blackcliff Longsword": {
    "type": "Sword",
    "dmg": 44,
    "name": "CDmg%",
    "value": 12,
    "additional": [{ name: "ATK%", value: 36, inc: 9, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "After defeating an enemy, ATK is increased by $eff1% for 30s. This effect has a maximum of 3 stacks, and the duration of each stack is independent of the others."
  },
  "Favonius Sword": {
    "type": "Sword",
    "dmg": 41,
    "name": "EnRe%",
    "value": 13.3,
    "additional": [],
    "rarity": 4,
    refinement: 1,
    "description": "CRIT hits have a 60/70/80/90/100% chance to generate 1 Elemental Orb, which will regenerate 6 Energy for the character. Can only occur once every 12/10.5/9/7.5/6s."
  },
  "Iron Sting": {
    "type": "Sword",
    "dmg": 42,
    "name": "EM",
    "value": 36,
    "additional": [{ name: "AllDMG%", value: 12, inc: 3, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "Dealing Elemental DMG increases all DMG by $eff1% for 6s. Max 2 stacks. Can only occur once every 1s."
  },
  "Lions Roar": {
    "type": "Sword",
    "dmg": 42,
    "name": "ATK%",
    "value": 9,
    "additional": [{ name: "AllDMG%", value: 20, inc: 4, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "Increases DMG against enemies affected by Pyro or Electro by $eff1%."
  },
  "Prototype Rancour": {
    "type": "Sword",
    "dmg": 44,
    "name": "Physical%",
    "value": 7.5,
    "additional": [{ name: "ATK%", value: 16, inc: 4, active: false }, { name: "DEF%", value: 16, inc: 4, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "On hit, Normal or Charged Attacks increase ATK and DEF by $eff1% for 6s. Max 4 stacks. Can only occur once every 0.3s."
  },
  "Royal Longsword": {
    "type": "Sword",
    "dmg": 42,
    "name": "ATK%",
    "value": 9,
    "additional": [{ name: "CRate%", value: 40, inc: 10, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "Upon damaging an enemy, increases CRIT Rate by $eff1%. Max 5 stacks. A CRIT hit removes all stacks."
  },
  "Sacrificial Sword": {
    "type": "Sword",
    "dmg": 41,
    "name": "EnRe%",
    "value": 13.3,
    "additional": [],
    "rarity": 4,
    refinement: 1,
    "description": "After damaging an opponent with an Elemental Skill, the skill has a 40/50/60/70/80% chance to end its own CD. Can only occur once every 30/26/22/18/14s."
  },
  "The Alley Flash": {
    "type": "Sword",
    "dmg": 44,
    "name": "CRate%",
    "value": 4,
    "additional": [{ name: "ATK%", value: 28, inc: 6, active: false }],
    "rarity": 4,
    refinement: 1,
    "description": "Continuosly sprinting for at least 1s increases ATK by $eff1% for 6s. This effect cannot stack."
  },
  "The Black Sword": {
    "type": "Sword",
    "dmg": 42,
    "name": "CRate%",
    "value": 6,
    "additional": [{ name: "NCATK%", value: 20, inc: 5, active: true }],
    "rarity": 4,
    refinement: 1,
    "description": "Increases DMG dealt by Normal and Charged Attacks by $eff1%. Additionally, regenerates 60% of ATK as HP when Normal and Charged Attacks score a CRIT Hit. This effect can occur once every 5s."
  },
  "The Flute": {
    "type": "Sword",
    "dmg": 42,
    "name": "ATK%",
    "value": 9,
    "additional": [],
    "rarity": 4,
    refinement: 1,
    "description": "Normal or Charged Attacks grant Harmonic on hits. Gaining 5 Harmonics triggers the power of music and deals 100/125/150/175/200% ATK DMG to surrounding enemies. Harmonics last up to 30s, and a maximum of 1 can be gained every 0.5s."
  },
  "Festering Desire": {
    "type": "Sword",
    "dmg": 42,
    "name": "EnRe%",
    "value": 10,
    "additional": [{ name: "SkillDMG%", value: 16, inc: 4, active: true }],
    "rarity": 4,
    refinement: 1,
    "description": "Increases Elemental Skill DMG by $eff1% and Elemental Skill crit rate by 6/7.5/9/10.5/12%"
  },
  "Amos Bow": {
    "type": "Bow",
    "dmg": 46,
    "name": "ATK%",
    "value": 10.8,
    "additional": [{ name: "NCATK%", value: 12, inc: 3, active: true }, { name: "Charged%", value: 40, inc: 10, active: false }],
    "rarity": 5,
    refinement: 1,
    "description": "Increases Normal Attack and Aimed Shot DMG by $eff1%. Increases DMG from arrows shot by a further $eff2% for every 0.1s that the arrow is in flight, up to 0.5s. Stacks up to 5 times on each arrow."
  },
  "Skyward Harp": {
    "type": "Bow",
    "dmg": 48,
    "name": "CRate%",
    "value": 4.8,
    "additional": [{ name: "CDmg%", value: 20, inc: 5, active: true }],
    "rarity": 5,
    refinement: 1,
    "description": "Increases CRIT DMG by $eff1%. Hits have a 60/70/80/90/100% chance to inflict a small AoE attack, dealing 100% Physical ATK DMG. Can only occur once every 4s."
  },
  "Dreams of Dragonfell": {
    "type": "Bow",
    "dmg": 46,
    "name": "ATK%",
    "value": 10.8,
    "additional": [{ name: "ATK%", value: 40, inc: 10, active: false }],
    "rarity": 5,
    refinement: 1,
    "description": "Increases Shield Strength by 20/25/30/35/40%. Scoring hits on opponents increases ATK by $eff1% for 8s. Max 5 stacks. Can only occur once every 0.3s. While protected by a shield, this ATK increase effect is increased by 100%."
  },
  "Lost Prayer to the Sacred Winds": {
    "type": "Catalyst",
    "dmg": 46,
    "name": "CRate%",
    "value": 7.2,
    "additional": [{ name: "Elemental%", value: 32, inc: 8, active: false }],
    "rarity": 5,
    refinement: 1,
    "description": "Increases Movement SPD by 10%. When in battle, earn a $eff1% Elemental DMG Bonus every 4s. Max 4 stacks. Lasts until the character falls or leaves combat."
  },
  "Skyward Atlas": {
    "type": "Catalyst",
    "dmg": 48,
    "name": "ATK%",
    "value": 7.2,
    "additional": [{ name: "Elemental%", value: 12, inc: 3, active: true }],
    "rarity": 5,
    refinement: 1,
    "description": "Increases Elemental DMG Bonus by $eff1%. Normal Attack hits have a 50% chance to earn the favor of the clouds. which actively seek out nearby enemies to attack for 15s, dealing 160/200/240/280/320% ATK DMG. Can only occur once every 30s."
  },
  "Memory of Dust": {
    "type": "Catalyst",
    "dmg": 46,
    "name": "ATK%",
    "value": 10.8,
    "additional": [{ name: "ATK%", value: 40, inc: 10, active: false }],
    "rarity": 5,
    refinement: 1,
    "description": "Increases Shield Strength by 20/25/30/35/40%. Scoring hits on opponents increases ATK by $eff1% for 8s. Max 5 stacks. Can only occur once every 0.3s. While protected by a shield, this ATK increase effect is increased by 100%."
  },
  "Skyward Pride": {
    "type": "Claymore",
    "dmg": 48,
    "name": "EnRe%",
    "value": 8,
    "additional": [{ name: "AllDMG%", value: 8, inc: 2, active: true }],
    "rarity": 5,
    refinement: 1,
    "description": "Increases all DMG by $eff1%. After using an Elemental Burst, Normal or Charged Attack, on hit, creates a vacuum blade that does 80/100/120/140/160% Physical DMG to enemies along its path. Lasts for 20s or 8 vacuum blades."
  },
  "Wolfs Gravestone": {
    "type": "Claymore",
    "dmg": 46,
    "name": "ATK%",
    "value": 10.8,
    "additional": [{ name: "ATK%", value: 20, inc: 5, active: true }, { name: "ATK%", value: 40, inc: 10, active: false }],
    "rarity": 5,
    refinement: 1,
    "description": "Increases ATK by $eff1%. On hit, attacks against enemies with less than 30% HP increase all party members ATK by $eff2% for 12s. Can only occur once every 30s."
  },
  "The Unforged": {
    "type": "Claymore",
    "dmg": 46,
    "name": "ATK%",
    "value": 10.8,
    "additional": [{ name: "ATK%", value: 40, inc: 10, active: false }],
    "rarity": 5,
    refinement: 1,
    "description": "Increases Shield Strength by 20/25/30/35/40%. Scoring hits on opponents increases ATK by $eff1% for 8s. Max 5 stacks. Can only occur once every 0.3s. While protected by a shield, this ATK increase effect is increased by 100%."
  },
  "Kunwus Iris Rift": {
    "type": "Polearm",
    "dmg": 46,
    "name": "ATK%",
    "value": 10.8,
    "additional": [{ name: "AllDMG%", value: 24, inc: 6, active: true }],
    "rarity": 5,
    refinement: 1,
    "description": "Increases Normal Attack SPD by 10/12/14/16/18%. Increases DMG against enemies affected by any element by $eff1%."
  },
  "Primordial Jade Winged-Spear": {
    "type": "Polearm",
    "dmg": 48,
    "name": "CRate%",
    "value": 4.8,
    "additional": [{ name: "ATK%", value: 7 * 3.2, inc: 0.7 * 7, active: false }],
    "rarity": 5,
    refinement: 1,
    "description": "On hit, increases ATK by $eff1% for 6s. Max 7 stacks. Can only occur once every 0.3s. Full stacks increase DMG dealt by 12/15/18/21/24%."
  },
  "Skyward Spine": {
    "type": "Polearm",
    "dmg": 48,
    "name": "EnRe%",
    "value": 8,
    "additional": [{ name: "CRate%", value: 8, inc: 2, active: true }],
    "rarity": 5,
    refinement: 1,
    "description": "Increases CRIT Rate by $eff1% and increases Normal ATK SPD by 12%. Additionally, Normal and Charged Attacks hits on enemies have a 50% chance to trigger a vacuum blade that deals 40/55/70/85/100% of ATK as DMG in a small AoE. This effect can occur no more than once every 2s."
  },
  "Vortex Vanquisher": {
    "type": "Polearm",
    "dmg": 46,
    "name": "ATK%",
    "value": 10.8,
    "additional": [{ name: "ATK%", value: 40, inc: 10, active: false }],
    "rarity": 5,
    refinement: 1,
    "description": "Increases Shield Strength by 20/25/30/35/40%. Scoring hits on opponents increases ATK by $eff1% for 8s. Max 5 stacks. Can only occur once every 0.3s. While protected by a shield, this ATK increase effect is increased by 100%."
  },
  "Aquila Favonia": {
    "type": "Sword",
    "dmg": 48,
    "name": "Physical%",
    "value": 9,
    "additional": [{ name: "ATK%", value: 20, inc: 5, active: true }],
    "rarity": 5,
    refinement: 1,
    "description": "ATK is increased by $eff1%. Triggers on taking DMG: the soul of the Falcon of the West awakens, holding the banner of the resistance aloft, regenerating HP equal to 100/115/130/145/160% of ATK and dealing 200/230/260/290/320% of ATK as DMG to surrounding enemies. This effect can only occur once every 15s."
  },
  "Summit Shaper": {
    "type": "Sword",
    "dmg": 46,
    "name": "ATK%",
    "value": 10.8,
    "additional": [{ name: "ATK%", value: 40, inc: 10, active: false }],
    "rarity": 5,
    refinement: 1,
    "description": "Increases Shield Strength by 20/25/30/35/40%. Scoring hits on opponents increases ATK by $eff1% for 8s. Max 5 stacks. Can only occur once every 0.3s. While protected by a shield, this ATK increase effect is increased by 100%."
  },
  "Skyward Blade": {
    "type": "Sword",
    "dmg": 44,
    "name": "EnRe%",
    "value": 12,
    "additional": [{ name: "CRate%", value: 4, inc: 1, active: true }, { name: "NCATK%", value: 20, inc: 5, active: false }],
    "rarity": 5,
    refinement: 1,
    "description": "CRIT Rate increased by $eff1%. Gains Skypiercing Might upon using an Elemental Burst: Increases Movement SPD by 10%, increases ATK SPD by 10%, and increases the DMG of Normal and Charged Attack hits by $eff2% for 12s."
  }
}