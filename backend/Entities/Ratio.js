class Ratio {
    static ad = 'ad';
    static bonusAd = 'bonus ad';
    static ap = 'ap';
    static bonusAp = 'bonus ap';
    static armor = 'armor';
    static bonusArmor = 'bonus armor';
    static mr = 'magic resistance';
    static bonusMr = 'bonus magic resistance';
    static maxHealth = 'maximum health';
    constructor(value, type) {
        this.value = value;
        this.type = type;
    }
    isAp() {
        return this.type === 'ap';
    }
    isAd() {
        return this.type === 'ad';
    }
    isBonusAd() {
        return this.type === 'bonus ad';
    }
    toString() {
        return `${this.value}`;
    }
}
module.exports = Ratio;

// Set {
//     ' AD)',
//         ' bonus AD)',
//         ' AP)',
//         '(based on level)',
//         " of the target's current health)",
//         ' of health lost in the past 4 seconds)',
//         ' armor)',
//         " of Zac's maximum health)",
//         ' per 100 AP)',
//         ' (based on level)',
//         ' bonus health)',
//         ' maximum health)',
//         " of target's missing health)",
//         ' bonus armor)',
//         ' bonus magic resistance)',
//         ' per 100 bonus AD)',
//         " of target's current health)",
//         '(+ 7 / 14 / 21 / 28 / 35)',
//         ' of damage dealt)',
//         ' of his bonus health)',
//         ' of his missing health)',
//         " of target's maximum health)",
//         '(+ Siphoning Strike stacks)',
//         ' maximum mana)',
//         " of kicked target's bonus health)",
//         '(+ 0 −  8.2 (based on level)',
//         '(+ 0 −  10.25 (based on level)',
//         ' per  Mark)',
//         ' of her maximum health)',
//         ' per 100 AD)',
//         " of primary target's bonus health)",
//         '(+ 1.5 per  Mist collected)',
//         '(+ 75 / 95 / 115 / 135 / 155)',
//         '(+ 1 per  Soul collected)',
//         ' bonus mana)',
//         '(+ 50 / 80 / 110 / 140 / 170)',
//         '(+ 125 / 200 / 275 / 350 / 425)',
//         " of Braum's maximum health)",
//         ' missing health)',
//         '(+ 12 / 14 / 16 / 18 / 20)',
//         ' per 100 」bonus AD)',
//         ' per  Feast stack)',
//         ' total armor)',
//         ' total magic resistance)',
//         ' per 100 bonus magic resistance)'
// }
// Physical Damage:»15 / 35 / 55 / 75 / 95 (+ 45 / 50 / 55 / 60 / 65% AD)«Total Physical Damage:45 / 105 / 165 / 225 / 285 (+ 135 / 150 / 165 / 180 / 195% AD)
// Physical Damage:55 / 85 / 115 / 145 / 175 (+ 100% bonus AD)
// Magic Damage:60 / 100 / 140 / 180 / 220 (+ 30% AD) (+ 70% AP)
// Empowered Magic Damage:100 − 160 (based on level) + 60 / 100 / 140 / 180 / 220 (+ 60% AD) (+ 100% AP)
// Empowered Damage:45 / 85 / 125 / 165 / 205 / 245 (+ 40% AP) (+ 2 / 3.2 / 4.4 / 5.6 / 6.8 / 8% of the target's current health)
// Magic Damage:150 / 225 / 300 / 375 / 450 (+ 150% AP)Self-Heal:100 / 125 / 150 / 175 / 200 (+ 60% AP) (increased by 3% per 1% of health lost in the past 4 seconds)
// Bonus Physical Damage:»30 / 45 / 60 / 75 / 90 (+ 20% AP) (+ 15% armor)«Cone Damage:10 / 20 / 30 / 40 / 50 (+ 20% AP) (+ 10% armor)
// Magic Damage:»40 / 55 / 70 / 85 / 100 (+ 30% AP) (+ 2.5% of Zac's maximum health)«Total Magic Damage:80 / 110 / 140 / 170 / 200 (+ 60% AP) (+ 5% of Zac's maximum health)
// Magic Damage:»25 / 40 / 55 / 70 / 85 (+ 4 / 5 / 6 / 7 / 8% (+ 2% per 100 AP) of target's maximum health)«Capped Damage:225 / 240 / 255 / 270 / 285
// Magic Damage:55 / 85 / 115 / 145 / 175 (+ 50% AP) (+ 25 / 35% (based on level)  MS)
// Slow:24 / 28 / 32 / 36 / 40% (+ 6% per 100 AP)
// Magic Damage Per Half-Second:»20 / 33.75 / 47.5 / 61.25 / 75 (+ 2.5% bonus health)«Maximum Magic Damage:80 / 135 / 190 / 245 / 300 (+ 10% bonus health)
// Minimum Magic Damage:»30 / 45 / 60 / 75 / 90 (+ 1.5% maximum health) (+ 35% AP)«Maximum Magic Damage:60 / 90 / 120 / 150 / 180 (+ 6% maximum health) (+ 80% AP)
// Max. Physical Damage:»250 / 300 / 350 / 400 / 450 (+ 150% bonus AD) (+ 25 / 27.5 / 30 / 32.5 / 35% of target's missing health)«Min. Physical Damage:25 / 30 / 35 / 40 / 45 (+ 15% bonus AD) (+ 25 / 27.5 / 30 / 32.5 / 35% of target's missing health)
// Flat Damage Reduction:8 / 12 / 16 / 20 / 24
// Bonus Armor:20 / 25 / 30 / 35 / 40 (+ 20% bonus armor)
// Bonus Magic Resistance:20 / 25 / 30 / 35 / 40 (+ 20% bonus magic resistance)
// Flat Damage Reduction:8 / 12 / 16 / 20 / 24
// Bonus Armor:20 / 25 / 30 / 35 / 40 (+ 20% bonus armor)
// Bonus Magic Resistance:20 / 25 / 30 / 35 / 40 (+ 20% bonus magic resistance)
// Outer Cone Bonus Damage:»6 / 6.5 / 7 / 7.5 / 8% (+ 3.3% per 100 bonus AD) of target's maximum health«Bonus Non-Epic Monster Damage:3 / 3.25 / 3.5 / 3.75 / 4% (+ 1.6% per 100 bonus AD) of target's maximum health
// Bonus Magic Damage:5 / 10 / 15 (+ 4 / 6 / 8% of target's current health)
// Total Damage:16.8 −  168 (based on level) (+ 7 / 14 / 21 / 28 / 35) (+ 35% AP)
// Physical Damage:100% AD (+ 25 / 40 / 55% of damage dealt)
// Physical Damage:»10 / 35 / 60 / 85 / 110 (+ 100% AD) (+ 6% of his bonus health)«Increased Damage:15 / 52.5 / 90 / 127.5 / 165 (+ 150% AD) (+ 9% of his bonus health)
// Champion Heal:»20 / 35 / 50 / 65 / 80 (+ 8 / 10 / 12 / 14 / 16% of his missing health)«Non-Champion Heal:10 / 17.5 / 25 / 32.5 / 40 (+ 4 / 5 / 6 / 7 / 8% of his missing health)
// Magic Damage:»80 / 110 / 140 / 170 / 200 (+ 80% AP) (+ 11 / 12 / 13 / 14 / 15% of target's maximum health)«Capped Damage:150 / 250 / 350 / 450 / 550
// Bonus Physical Damage:30 / 50 / 70 / 90 / 110 (+ Siphoning Strike stacks)
// Magic Damage:80 / 90 / 100 / 110 / 120 (+ 40% AP) (+ 2% maximum mana)
// Collision Damage:175 / 287.5 / 400 / 512.5 / 625 (+ 200% bonus AD) (+ 12 / 13.5 / 15 / 16.5 / 18% of kicked target's bonus health)
// Physical Damage Per Spin:4 / 8 / 12 / 16 / 20 (+ 0 −  8.2 (based on level)) (+ 32 / 34 / 36 / 38 / 40% AD)
// Nearest Enemy Damage Per Spin:5 / 10 / 15 / 20 / 25 (+ 0 −  10.25 (based on level)) (+ 40 / 42.5 / 45 / 47.5 / 50% AD)
// Magic Damage:25 / 30 / 35 / 40 / 45 (+ 20% bonus AD) (+ 1.5% (+ 1% per  Mark) of target's current health)
// Physical Damage:20 / 25 / 30 / 35 / 40 (+ 20% AP) (+ 2% of her maximum health)
// Bonus Physical Damage:»10 / 20 / 30 / 40 / 50 (+ 1% (+ 1 / 1.5 / 2 / 2.5 / 3% per 100 AD) of target's maximum health)«Total Bonus Damage:20 / 40 / 60 / 80 / 100 (+ 2% (+ 2 / 3 / 4 / 5 / 6% per 100 AD) of target's maximum health)
// Physical Damage:»200 / 250 / 300 / 350 / 400 (+ 100% bonus AD) (+ 40 / 45 / 50 / 55 / 60% of primary target's bonus health)«Minimum Physical Damage:120 / 150 / 180 / 210 / 240 (+ 60% bonus AD) (+ 24 / 27 / 30 / 33 / 36% of primary target's bonus health)
// Shield:120 / 140 / 160 / 180 / 200 (+ 40% AP)(+ 1.5 per  Mist collected)
// Magic Damage:5 −  139 (based on level) (+ 75 / 95 / 115 / 135 / 155) (+ 60% AP)
// Damage Increase:»20 / 25 / 30 / 35 / 40%«Maximum Bonus Damage:90 / 118.75 / 149.5 / 182.25 / 217 (+ 72 / 75 / 78 / 81 / 84% AP)
// Shield Strength:60 / 100 / 140 / 180 / 220 (+ 1 per  Soul collected)
// Magic Damage:65 / 90 / 115 / 140 / 165 (+ 45% AP) (+ 3% bonus mana)
// Minimum Magic Damage:»7 − 50 (based on level) (+ 50 / 80 / 110 / 140 / 170) (+ 60% AP)«Maximum Magic Damage:17.5 − 125 (based on level) (+ 125 / 200 / 275 / 350 / 425) (+ 150% AP)
// Minimum Magic Damage:»7 − 50 (based on level) (+ 50 / 80 / 110 / 140 / 170) (+ 60% AP)«Maximum Magic Damage:17.5 − 125 (based on level) (+ 125 / 200 / 275 / 350 / 425) (+ 150% AP)
// Magic Damage:60 / 110 / 160 / 210 / 260 (+ 2.5% of Braum's maximum health)
// Heal:50 / 75 / 100 / 125 / 150 (+ 90% AP) (+ 15% missing health)
// Magic Damage:5 − 64.5 (based on level) (+ 12 / 14 / 16 / 18 / 20) (+ 40% bonus AD) (+ 20% AP)
// Bonus Physical Damage:4 / 5.5 / 7 / 8.5 / 10% (+「 1% per 35 」「 2.86% per 100 」bonus AD) of target's maximum health
// Magic Damage:»22 / 37 / 52 / 67 / 82 (+ 30% AP) (+ 3% (+ 0.5% per  Feast stack) of target's maximum health)«Maximum Damage:66 / 111 / 156 / 201 / 246 (+ 90% AP) (+ 9% (+ 1.5% per  Feast stack) of target's maximum health)Slow:30 / 35 / 40 / 45 / 50%
// Bonus Armor:30 (+ 60 / 70 / 80 / 90 / 100% total armor)
// Bonus Magic Resistance:10 (+ 30 / 35 / 40 / 45 / 50% total magic resistance)
// Bonus Armor:30 (+ 60 / 70 / 80 / 90 / 100% total armor)
// Bonus Magic Resistance:10 (+ 30 / 35 / 40 / 45 / 50% total magic resistance)
// Magic Damage Reduction:20 / 25 / 30 / 35 / 40% (+ 5% per 100 AP) (+ 8% per 100 bonus magic resistance)Physical Damage Reduction:10 / 12.5 / 15 / 17.5 / 20% (+ 2.5% per 100 AP) (+ 4% per 100 bonus magic resistance)
