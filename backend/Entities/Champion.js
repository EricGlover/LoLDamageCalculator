class Image {
    constructor(full, sprite, group, x, y, w, h, name) {
        this.smallSquareSprite = `http://ddragon.leagueoflegends.com/cdn/10.19.1/img/champion/${encodeURIComponent(name)}.png`
        this.full = full;
        this.sprite = sprite;
        this.group = group;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    static makeFromObj(obj, championName) {
        return new Image(obj.full, obj.sprite, obj.group, obj.x, obj.y, obj.w, obj.h, championName);
    }
}
//
// class Ability {
//     /**
//      *
//      * @param id string
//      * @param name string
//      * @param description string
//      * @param tooltip string
//      * @param cooldown array<float>
//      * @param cost array<float?>
//      * @param range array<int>
//      * @param image Image
//      */
//     constructor(id, name, description, tooltip, cooldown, cost, range, image) {
//         this.id = id;
//         this.name = name;
//         this.description = description;
//         this.tooltip = tooltip;
//         this.cooldown = cooldown;
//         this.cost = cost;
//         this.range = range;
//         this.image = image;
//     }
//
//     static makeFromObj(obj) {
//         return new Ability(obj.id, obj.name, obj.description, obj.tooltip, obj.cooldown, obj.cost, obj.range, obj.image);
//     }
// }


class Champion {
    static makeFromObj(obj) {
        let image = Image.makeFromObj(obj.image, obj.id);
        // let abilities = obj.spells.map(abilityData => Ability.makeFromObj(abilityData));
        return new Champion(obj.stats, [], obj.id, obj.key, obj.name, obj.title, obj.blurb, obj.info, image, obj.tags, obj.partype);
    }
    constructor(stats, abilities, id, key, name, title, blurb, info, image, tags, partype) {
        this.abilities = abilities;
        // use random info they give us because why not
        this.id = id;
        this.key = key;
        this.name = name;
        this.title = title;
        this.blurb = blurb;
        this.info = info;
        this.image = image;
        this.tags = tags;
        this.partype = partype; // ???

        this.inventoryItemLimit = 6;
        this._items = [];

        // set all the base stat info

        let {hp,hpperlevel,mp,mpperlevel,movespeed,armor,armorperlevel,spellblock,spellblockperlevel,attackrange,hpregen,hpregenperlevel,mpregen,mpregenperlevel,crit,critperlevel,attackdamage,attackdamageperlevel,attackspeedperlevel,attackspeed } = stats;
        this.baseStats = {};
        this.baseStats.hp = hp;
        this.baseStats.hpPerLevel = hpperlevel;
        this.baseStats.mp = mp;
        this.baseStats.mpPerLevel = mpperlevel;
        this.baseStats.moveSpeed = movespeed;
        this.baseStats.armor = armor;
        this.baseStats.armorPerLevel = armorperlevel;
        this.baseStats.spellBlock = spellblock;
        this.baseStats.spellBlockPerLevel = spellblockperlevel;
        this.baseStats.attackRange = attackrange;
        this.baseStats.hpRegen = hpregen;
        this.baseStats.hpRegenPerLevel = hpregenperlevel;
        this.baseStats.mpRegen = mpregen;
        this.baseStats.mpRegenPerLevel = mpregenperlevel;
        this.baseStats.crit = crit;
        this.baseStats.critPerLevel = critperlevel;
        this.baseStats.attackDamage = attackdamage;
        this.baseStats.attackDamagePerLevel = attackdamageperlevel;
        this.baseStats.attackSpeedPerLevel = attackspeedperlevel;
        this.baseStats.attackSpeed = attackspeed;

        // calculate stats
        this.level = 1;
    }
    setStatsForLevel() {
        // conspicously missing is ability power ...
        this.attackRange = this.baseStats.attackRange;
        this.moveSpeed = this.baseStats.moveSpeed;

        let diff = this.level - 1;
        this.hp = this.baseStats.hp + (this.baseStats.hpPerLevel * diff);
        this.mp = this.baseStats.mp + (this.baseStats.mpPerLevel * diff);

        this.hpRegen = this.baseStats.hpRegen + (this.baseStats.hpRegenPerLevel * diff);
        this.mpRegen = this.baseStats.mpRegen + (this.baseStats.mpRegenPerLevel * diff);


        this.crit = this.baseStats.crit + (this.baseStats.critPerLevel * diff);
        this.attackDamage = this.baseStats.attackDamage + (this.baseStats.attackDamagePerLevel * diff);
        this.attackSpeed = this.baseStats.attackSpeed + (this.baseStats.attackSpeedPerLevel * diff);


        this.armor = this.baseStats.armor + (this.baseStats.armorPerLevel * diff);
        this.spellBlock = this.baseStats.spellBlock + (this.baseStats.spellBlockPerLevel * diff);
    }
    get level() {
        return this._level;
    }
    set level(level) {
        if(level < 1) level = 1;
        if (level > 18) level = 18;
        this._level = level;
        this.setStatsForLevel();
    }

    get items() {
        return this._items;
    }

    addItem(item) {
        // todo:: check for boots ???
        if (this._items.length > this.inventoryItemLimit) throw new Error(`can only hold ${this.inventoryItemLimit} items`);
        if (!(item instanceof Item)) throw new Error(`Can only add items to item list, ${item} is not an item`);
        this._items.push(item);
    }
    removeItem(name) {
        // todo:: implement
    }
    /**
     * if armor >= 0 then 100 / ( 100 + armor )
     * else 2 - ( 100 / ( 100 - armor) )
     *
     * same for MR
     *
     * **/
    takePhysicalDamage(damage) {
        let multiplier  = 100 / (100 + this.armor)
        if(this.armor < 0) {
            multiplier = 2 - (100 / (100 - this.armor));
        }
        this.hp -= damage * multiplier;
    }
    takeMagicDamage(damage) {
        let multiplier  = 100 / (100 + this.spellBlock)
        if(this.spellBlock < 0) {
            multiplier = 2 - (100 / (100 - this.spellBlock));
        }
        this.hp -= damage * multiplier;
    }
}

module.exports = Champion;