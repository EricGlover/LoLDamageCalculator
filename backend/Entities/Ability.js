const Util = require('../Util.js');
const Formatter = require('./../DataScraper/Formatter.js');
const formatter = new Formatter();

const isInts = arr => arr.forEach(n => {
    if(Number.isNaN(Number.parseInt(n))) {
        console.error(`${n} is not an int`);
    }
    // Number.isNaN(Number.parseInt(n)) ? throw new Error(`${n} is not an int`) : null
    return Number.parseInt(n);
});

const isFloats = arr => arr.forEach(n => {
    if(Number.isNaN(Number.parseFloat(n))) {
        console.error(`${n} is not an int`);
    }
    // Number.isNaN(Number.parseInt(n)) ? throw new Error(`${n} is not an int`) : null
    return Number.parseInt(n);
});


class Ratio {
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

class Ability {
    constructor(name, cost, costType, coolDown, description,
                leveling, skill, damageType, isProjectile, flatDamage, ratios, castTime, icon,
                icons, levelings, descriptions, damageEffects) {
        this.name = name;
        this.cost = cost;
        this.costType = costType;
        this.coolDown = coolDown;
        this.description = description;
        this.leveling = leveling;
        this.skill = skill;
        this.damageType = damageType;
        this.isProjectile = isProjectile;
        isFloats(flatDamage);
        this.flatDamage = flatDamage;   // ints
        this.ratios = ratios;
        this.castTime = castTime;
        this.icon = icon;
        this.icons = icons;
        this.levelings = levelings;
        this.descriptions = descriptions;
        this.damageEffects = damageEffects;
    }

    static makeFromWikiData(obj) {
        // extracting damage
        // console.log(obj);

        const v = {};
        Object.entries(obj).forEach(([key, val]) => {
            v[key] = val.value;
        });

        // todo:: abilities can have 5 levelings , icons, and descriptions

        let leveling = null;
        if(v.leveling5) leveling = v.leveling5;
        if(v.leveling4) leveling = v.leveling4;
        if(v.leveling3) leveling = v.leveling3;
        if(v.leveling2) leveling = v.leveling2;
        if(v.leveling) leveling = v.leveling;
        let ratios = [];
        let flatDamage = [];
        let damageEffects = [];
        if(!leveling) {
            // console.error("leveling null ? ", v);
            console.error("leveling null ? ");
        } else {
            damageEffects = formatter.fuckingLevelDescription(leveling);
            let numberRgx = /\d+\.?\d*/g;
            // extract leveling data
            ratios = formatter.makeRatioFromLevelingDescription(leveling);
            flatDamage = leveling.match(numberRgx).slice(0, 5).map(n => Number.parseFloat(n));
        }
        let castTime = Number.parseFloat(v['cast time']);
        let levelings = [];
        ['leveling', 'leveling2', 'leveling3', 'leveling4', 'leveling5'].forEach(prop => {
            if(v[prop] ) {
                levelings.push(formatter.stripTags(v[prop]));
            }
        })
        let icons = [];
        ['icon', 'icon2', 'icon3', 'icon4', 'icon5'].forEach(prop => {
            if(v[prop] ) {
                icons.push(v[prop]);
            }
        })
        let descriptions = [];
        ['description', 'description2', 'description3', 'description4', 'description5'].forEach(prop => {
            if(v[prop] ) {
                descriptions.push(formatter.stripTags(v[prop]));
            }
        })

        return new Ability(
            v[1],
            Util.toNumberArr(v.cost),
            v.costtype,
            Util.toNumberArr(v.cooldown),
            formatter.stripTags(v.description),
            leveling,
            v.skill,
            v.damagetype,
            v.projectile,
            flatDamage,
            ratios,
            castTime,
            v.icon,
            icons,
            levelings,
            descriptions,
            damageEffects
        )
    }
}

module.exports = Ability;