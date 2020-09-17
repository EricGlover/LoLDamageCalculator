class Ability {
    constructor(cost, costType, coolDown, description, leveling) {
        this.cost = cost;
        this.costType = costType;
        this.coolDown = coolDown;
        this.description = description;
        this.leveling = leveling;
    }

    static makeFromWikiData(obj) {
        return new Ability(
            Util.toNumberArr(obj.cost),
            obj.costtype,
            Util.toNumberArr(obj.cooldown),
            obj.description,
            obj.leveling
        )
    }
}