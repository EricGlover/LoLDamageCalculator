const Ratio = require('../Entities/Ratio.js');


class Formatter {
    /**
     * @param {string} str
     */
    stripTags(str) {
        let reg = /(<([^>]+)>)/ig;
        return str.replace(reg, '');
    }

    makeRatioFromLevelingDescription(leveling) {
        if(!leveling || typeof leveling !== "string" || leveling.trim().length === 0) {
            return null;
        }
        let numberRgx = /\d+\.?\d*/g;
        let ratioRegex = /\([^\)]+\)/g;

        let adReg = /ad/i;
        let bonusAdReg = /bonus ad/i;
        let apReg = /ap/i;
        let bonusApReg = /bonus ap/i;
        let armorReg = /armor/i;
        let bonusArmorReg = /bonus armor/i;
        let mrReg = /magic resistance/i;
        let bonusMrReg = /bonus magic resistance/i;
        let maxHealthReg = /maximum health/i;

        if(!ratioRegex.test(leveling)) return [];

        // allow for multiple ratio types
        // each ratio type has an array of value
        let ratios = [];
        for(let ratioStr of leveling.match(ratioRegex)) {
            // determine type of ratio
            let ratioType = '';
            if(bonusAdReg.test(ratioStr)) {
                ratioType = 'bonus ad';
            } else if (adReg.test(ratioStr)) {
                ratioType = 'ad';
            } else if (bonusApReg.test(ratioStr)) {
                ratioType = 'bonus ap';
            } else if (apReg.test(ratioStr)) {
                ratioType = 'ap';
            } else if (bonusArmorReg.test(ratioStr)) {
                ratioType = 'bonus armor';
            } else if (armorReg.test(ratioStr)) {
                ratioType = 'armor';
            } else if (bonusMrReg.test(ratioStr)) {
                ratioType = 'bonus magic resistance';
            } else if (mrReg.test(ratioStr)) {
                ratioType = 'magic resistance';
            } else if (maxHealthReg.test(ratioStr)) {
                ratioType = 'maximum health';
            }

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