export let sets = {
  Berserker: {
    name: "Berserker",
    rarity: 4,
    "2pcs": { name: "CRate%", value: 12, bonusText: "CRIT Rate +12%" },
    "4pcs": { name: "CRate%", value: 24, bonusText: "When HP is below 70%, CRIT Rate increases by an additional 24%." },
  },
  Instructor: {
    name: "Instructor",
    rarity: 4,
    "2pcs": { name: "EM", value: 80, bonusText: "Increases Elemental Mastery by 80" },
    "4pcs": { name: "EM", value: 120, bonusText: "Upon triggering an Elemental Reaction, increases all party members' Elemental Mastery by 120 for 8s" },
  },
  Exile: {
    name: "Exile",
    rarity: 4,
    "2pcs": { name: "EnRe%", value: 12, bonusText: "Energy Recharge +20%" },
    "4pcs": { name: "Engen", value: 8, bonusText: "Using an Elemental Burst regenerates 2 Energy for all party members (excluding the wearer) every 2s for 6s. This effect cannot stack" },
  },
  "Resolution of Sojourner": {
    name: "Resolution of Sojourner",
    rarity: 4,
    "2pcs": { name: "ATK%", value: 18, bonusText: "ATK +18%" },
    "4pcs": { name: "ChargeCRate%", value: 30, bonusText: "Increases Charged Attack CRIT Rate by 30%" },
  },
  "Martial Artist": {
    name: "Martial Artist",
    rarity: 4,
    "2pcs": { name: "NCATK%", value: 15, bonusText: "Increases Normal Attack and Charged Attack DMG by 15%" },
    "4pcs": { name: "NCATK%", value: 25, bonusText: "After using Elemental Skill, increases Normal Attack and Charged Attack DMG by 25% for 8s" },
  },
  "Defender's Will": {
    name: "Defender's Will",
    rarity: 4,
    "2pcs": { name: "DEF%", value: 30, bonusText: "DEF +30%" },
    "4pcs": { name: "ElRES%", value: 30, bonusText: "For each different element present in your own party, the wearer's Elemental RES to that corresponding element is increased by 30%" },
  },
  "Tiny Miracle": {
    name: "Tiny Miracle",
    rarity: 4,
    "2pcs": { name: "ElRES%", value: 20, bonusText: "All Elemental RES increased by 20%" },
    "4pcs": { name: "ElRES%", value: 30, bonusText: "Incoming elemental DMG increases corresponding Elemental RES by 30% for 10s. Can only occur once every 10s" },
  },
  "Brave Heart": {
    name: "Brave Heart",
    rarity: 4,
    "2pcs": { name: "ATK%", value: 18, bonusText: "ATK +18%" },
    "4pcs": { name: "ATK%", value: 15, bonusText: "Increases DMG by 30% against enemies with more than 50% HP" },
  },
  Gambler: {
    name: "Gambler",
    rarity: 4,
    "2pcs": { name: "SkillDMG%", value: 20, bonusText: "Elemental Skill DMG increased by 20%" },
    "4pcs": { name: "SkillCD", value: 0, bonusText: "Defeating an enemy has 100% chance to remove Elemental Skill CD. Can only occur once every 15s" },
  },
  Scholar: {
    name: "Scholar",
    rarity: 4,
    "2pcs": { name: "EnRe%", value: 20, bonusText: "Energy Recharge +20%" },
    "4pcs": { name: "Engen", value: 3, bonusText: "Gaining Energy gives 3 Energy to all party members who have a bow or a catalyst equipped. Can only occur once every 3s" },
  },
  "Gladiator's Finale": {
    rarity: 5,
    name: "Gladiator's Finale",
    "2pcs": { name: "ATK%", value: 18, bonusText: "ATK +18%" },
    "4pcs": { name: "NormalATK%", value: 35, bonusText: "If the wielder of this artifact set uses a Sword, Claymore or Polearm, increases their Normal Attack DMG by 35%" },
  },
  "Maiden Beloved": {
    name: "Maiden Beloved",
    rarity: 5,
    "2pcs": { name: "Healing%", value: 15, bonusText: "Character Healing Effectiveness +15%" },
    "4pcs": { name: "Healing%", value: 20, bonusText: "Using an Elemental Skill or Burst increases healing received by all party members by 20% for 10s" },
  },
  "Noblesse Oblige": {
    name: "Noblesse Oblige",
    rarity: 5,
    "2pcs": { name: "Burst%", value: 20, bonusText: "Elemental Burst DMG +20%" },
    "4pcs": { name: "ATK%", value: 20, bonusText: "Using an Elemental Burst increases all party members' ATK by 20% for 12s. This effect cannot stack" },
  },
  "Bloodstained Chivalry": {
    name: "Bloodstained Chivalry",
    rarity: 5,
    "2pcs": { name: "Physical%", value: 25, bonusText: "Physical DMG +25%" },
    "4pcs": { name: "Charged%", value: 50, bonusText: "After defeating an opponent, increases Charged Attack DMG by 50%, and reduces its Stamina cost to 0 for 10s" },
  },
  "Wanderer's Troupe": {
    name: "Wanderer's Troupe",
    rarity: 5,
    "2pcs": { name: "EM", value: 80, bonusText: "Elemental Mastery +80" },
    "4pcs": { name: "Charged%", value: 35, bonusText: "Increases Charged Attack DMG by 35% if the character uses a Catalyst or Bow" },
  },
  "Viridescent Venerer": {
    name: "Viridescent Venerer",
    rarity: 5,
    "2pcs": { name: "Elemental%", value: 15, bonusText: "Anemo DMG Bonus +15%" },
    "4pcs": { name: "Swirl", value: 60, bonusText: "Increases Swirl DMG by 60%. Decreases opponent's Elemental RES to the element infused in the Swirl by 40% for 10s" },
  },
  "Thundering Fury": {
    name: "Thundering Fury",
    rarity: 5,
    "2pcs": { name: "Elemental%", value: 15, bonusText: "Electro DMG Bonus +15%" },
    "4pcs": {
      name: "ElectroReactions%", value: 40, substats: [
        { name: "Electro-charged", value: 40 },
        { name: "Overload", value: 40 },
        { name: "Superconduct", value: 40 },
      ],
      bonusText: "ncreases damage caused by Overloaded, Electro-Charged, and Superconduct DMG by 40%. Triggering such effects decreases Elemental Skill CD by 1s. Can only occur once every 0.8s"
    },
  },
  Thundersoother: {
    name: "Thundersoother",
    rarity: 5,
    "2pcs": { name: "ElectroRES%", value: 40, bonusText: "Electro RES increased by 40%" },
    "4pcs": { name: "AllDMG%", value: 35, bonusText: "Increases DMG against enemies affected by Electro by 35%" },
  },
  "Crimson Witch of Flames": {
    name: "Crimson Witch of Flames",
    rarity: 5,
    "2pcs": { name: "Elemental%", value: 15, bonusText: "Pyro DMG Bonus +15%" },
    "4pcs": {
      name: "FireReactions%", value: 40, bonusText: "Increases Overloaded and Burning DMG by 40%. Increases Vaporize and Melt DMG by 15%. Using an Elemental Skill increases 2-Piece Set effects by 50% for 10s. Max 3 stacks", substats: [
        { name: "Vaporize", value: 15 },
        { name: "Melt", value: 15 },
        { name: "Overload", value: 40 },
        { name: "Burn", value: 40 },
      ]
    },
  },
  Lavawalker: {
    name: "Lavawalker",
    rarity: 5,
    "2pcs": { name: "PyroRES%", value: 40, bonusText: "Pyro RES increased by 40%" },
    "4pcs": { name: "AllDMG%", value: 35, bonusText: "Increases DMG against enemies that are Burning or affected by Pyro by 35%" },
  },
  "Archaic Petra": {
    name: "Archaic Petra",
    rarity: 5,
    "2pcs": { name: "Elemental%", value: 15, bonusText: "Gain a 15% Geo DMG Bonus" },
    "4pcs": { name: "DMGEl%", value: 35, bonusText: "Upon obtaining a crystal created through a Geo Elemental Reaction, all party members gain 35% Elemental DMG Bonus to that particular element for 10s. Only one form of Elemental DMG Bonus can be gained in this manner" },
  },
  "Retracing Bolide": {
    name: "Retracing Bolide",
    rarity: 5,
    "2pcs": { name: "Shields%", value: 35, bonusText: "Increases the effectiveness of shields by 35%" },
    "4pcs": { name: "NCATK%", value: 40, bonusText: "Gain an additional 40% Normal and Charged Attack DMG while under the protection of a shield" },
  },
  "Ice Breaker": {
    name: "Icebreaker",
    rarity: 5,
    "2pcs": { name: "Elemental%", value: 15, bonusText: "Cryo DMG Bonus +15%" },
    "4pcs": { name: "CRate%", value: 20, bonusText: "When a character attacks an enemy affected by Cryo, their CRIT Rate is increased by 20%. If the enemy is Frozen, CRIT Rate is increased by an additional 20%" },
  },
  "Ocean Conqueror": {
    name: "Ocean Conqueror",
    rarity: 5,
    "2pcs": { name: "Elemental%", value: 15, bonusText: "Hydro DMG Bonus +15%" },
    "4pcs": { name: "NCATK%", value: 30, bonusText: "After using Elemental Skill, increases Normal Attack and Charged Attack DMG by 30% for 15s" },
  },
  none: {
    name: "none",
    "2pcs": { bonusText: "Nothing" },
    "4pcs": { bonusText: "Nothing" }
  },
};