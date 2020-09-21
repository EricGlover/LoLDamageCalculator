const Ratio = require('../Entities/Ratio.js');
const DamageEffect = require('../Entities/DamageEffect.js');


class Formatter {
    /**
     * @param {string} str
     */
    stripTags(str) {
        let reg = /(<([^>]+)>)/ig;
        return str.replace(reg, '');
    }

    fuckingLevelDescription(levelDescription) {
        // remove cruft
        let cruftRegex = /[»«]/gi;
        let str = levelDescription.replace(cruftRegex, '');


        const numberRgx = () => /\d+\.?\d*/g;
        const ratioRegex = () => /\([^\)]+\)/i;
        const regex1 = () => /[^\d\s\/%]/i;
        const physicalDamageRegex = () => /physical\s+damage\s*:/i;
        const magicDamageRegex = () => /magic\s+damage\s*:/i;

        // don't matchAll with g flag in Node
        // don't test then matchAll with regex in Node
        const damageDescriptorRegex = () => /physical\s+damage\s*:|magic\s+damage\s*|reduced\s+damage\s*:/ig;

        if(!damageDescriptorRegex().test(str)) {
            return null;
        }
        const damageEffects = [];
        for(const match of str.matchAll(damageDescriptorRegex())) {
            // find first instance of some damage descriptor
            // , slice of previous parts
            let subStr = str.substr(match.index);
            // get and remove the damage type
            // find end of number string
            let damageRemovedSubString = '';
            let damageType = '';
            if(physicalDamageRegex().test(subStr)) {
                damageRemovedSubString = subStr.replace(physicalDamageRegex(), '');
                damageType = 'physical';
            } else if(magicDamageRegex().test(subStr)) {
                damageRemovedSubString = subStr.replace(magicDamageRegex(), '');
                damageType = 'magic';
            }
            console.log('damage removed', damageRemovedSubString);
            // check if flat or percent
            let isFlat = !damageRemovedSubString.includes('%');
            let damageNumbers = [];
            if(regex1().test(damageRemovedSubString)) {
                console.log('match');
                let m = damageRemovedSubString.match(regex1());
                console.log(m);
                let numberString = damageRemovedSubString.substr(0, m.index);
                console.log(numberString);
                damageNumbers = numberString.match(numberRgx()).map(str => Number.parseFloat(str));
                console.log(damageNumbers);
            }

            // get parenthesis



            // remove parentheses
            let ratios = [];
            if(ratioRegex().test(damageRemovedSubString)) {
                let parenthesisStr = damageRemovedSubString.match(ratioRegex())[0];
                let numbers = parenthesisStr.match(numberRgx()).map(str => Number.parseFloat(str));
                let isRatio = parenthesisStr.includes('%');
                let damageType = this.getRatioType(parenthesisStr);
                console.log(damageType);
                ratios = numbers.map(n => new Ratio(n, damageType));
                console.log(parenthesisStr, numbers, isRatio, damageType);
                // console.log(numbers);
            }
            // grab numbers
            // determine if flat or percent
            // look for optional ()'s

            let damageEffect = new DamageEffect(damageType, damageNumbers, ratios);
            console.log(damageEffect);
            damageEffects.push(damageEffect);
        }
        return damageEffects;
    }

    getRatioType(str) {
        let adReg = /ad/i;
        let bonusAdReg = /bonus ad/i;
        let apReg = /ap/i;
        let bonusApReg = /bonus ap/i;
        let armorReg = /armor/i;
        let bonusArmorReg = /bonus armor/i;
        let mrReg = /magic resistance/i;
        let bonusMrReg = /bonus magic resistance/i;
        let maxHealthReg = /maximum health/i;

        // allow for multiple ratio types
        // each ratio type has an array of value
        // determine type of ratio
        if (bonusAdReg.test(str)) {
            return Ratio.bonusAd;
        } else if (adReg.test(str)) {
            return Ratio.ad;
        } else if (bonusApReg.test(str)) {
            return Ratio.bonusAp;
        } else if (apReg.test(str)) {
            return Ratio.ap;
        } else if (bonusArmorReg.test(str)) {
            return Ratio.bonusArmor;
        } else if (armorReg.test(str)) {
            return Ratio.armor;
        } else if (bonusMrReg.test(str)) {
            return Ratio.bonusMr;
        } else if (mrReg.test(str)) {
            return Ratio.mr;
        } else if (maxHealthReg.test(str)) {
            return Ratio.maxHealth;
        }
        return null;
    }


    makeRatioFromLevelingDescription(leveling) {
        if(!leveling || typeof leveling !== "string" || leveling.trim().length === 0) {
            return null;
        }
        let numberRgx = /\d+\.?\d*/g;
        let ratioRegex = /\([^\)]+\)/g;

        if(!ratioRegex.test(leveling)) return [];

        // allow for multiple ratio types
        // each ratio type has an array of value
        let ratios = [];
        for(let ratioStr of leveling.match(ratioRegex)) {
            // determine type of ratio
            let ratioType = this.getRatioType(ratioStr);

            // determine values
            let values = [];
            if(ratioStr && numberRgx.test(ratioStr)) {
                try {
                    values = ratioStr.match(numberRgx).map(n => Number.parseFloat(n));
                } catch(e) {
                    values = [];
                    console.error(`${e}\n\n ${ratioStr} ${leveling}`);
                    console.error(ratioStr.match(numberRgx), numberRgx.test(ratioStr));
                }

            }
            ratios.push(new Ratio(values, ratioType));
        }
        return ratios;
    }
}

module.exports = Formatter;