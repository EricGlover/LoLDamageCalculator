class DamageEffect {
    static physical = 'physical';
    static magic = 'magic';
    static true = 'true';

    constructor(type, flatValues, ratios) {
        this.type = type;
        this.abilityRanks = [];
        let max = Math.max(flatValues.length, ratios.length);
        this.flatValues = flatValues;
        this.ratios = ratios;
        for(let i = 0; i < max; i++) {
            let obj = {};
            let flatIndex = Math.min(flatValues.length - 1, i);
            let ratioIndex = Math.min(ratios.length - 1, i);
            obj.base = this.flatValues[flatIndex];
            let ratio = this.ratios[ratioIndex];
            obj.ratio = ratio.value;
            obj.ratioType = ratio.type;
            this.abilityRanks.push(obj);
        }
    }
}
module.exports = DamageEffect;