const Util = require('./Util.js');

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
    constructor(name, cost, costType, coolDown, description, leveling, skill, damageType, isProjectile, flatDamage, ratios, castTime) {
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
    }

    static makeFromWikiData(obj) {
        // extracting damage
        // console.log(obj);

        const v = {};
        Object.entries(obj).forEach(([key, val]) => {
            v[key] = val.value;
        });

        let leveling = null;
        if(v.leveling5) leveling = v.leveling5;
        if(v.leveling4) leveling = v.leveling4;
        if(v.leveling3) leveling = v.leveling3;
        if(v.leveling2) leveling = v.leveling2;
        if(v.leveling) leveling = v.leveling;

        // extract leveling data
        // let s = "Physical Damage:»50 / 90 / 130 / 170 / 210 (+ 130 / 140 / 150 / 160 / 170% AD)";
        let numberRgx = /\d+\.?\d*/g;
        let ratioRegex = /\([^\)]+\)/g;
        let ratioStr = null;
        let ratioType = null;
        if(ratioRegex.test(leveling)) {
            ratioStr = leveling.match(ratioRegex)[0];
            if (/bonus ad/) {
                ratioType = 'bonus ad';
            }else if(/ad/i.test(ratioStr)) {
                ratioType = 'ad';
            } else if (/ap/i.test(ratioStr)) {
                ratioType = 'ap';
            }
        }
        let ratios = [];
        if(ratioStr) {
            ratios = ratioStr.match(numberRgx).map(n => new Ratio(Number.parseFloat(n), ratioType));
        }
        let flatDamage = leveling.match(numberRgx).slice(0, 5).map(n => Number.parseFloat(n));
        let castTime = Number.parseFloat(v['cast time']);

        return new Ability(
            v[1],
            Util.toNumberArr(v.cost),
            v.costtype,
            Util.toNumberArr(v.cooldown),
            v.description,
            leveling,
            v.skill,
            v.damagetype,
            v.projectile,
            flatDamage,
            ratios,
            castTime
        )
    }
}

module.exports = Ability;