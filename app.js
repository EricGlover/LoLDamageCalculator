const fs = require('fs');
console.log("hello world");

class Item {}

class Champion {
    static makeFromObj(obj) {
        return new Champion(obj.stats, obj.id, obj.key, obj.name, obj.title, obj.blurb, obj.info, obj.image, obj.tags, obj.partype);
    }
    constructor(stats, id, key, name, title, blurb, info, image, tags, partype) {
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

async function findAllPartypes() {
    let parTypeValues = await new Promise(async (resolve, reject) => {
        fs.readFile('./champions.json', 'utf8', (err, data) => {
            let obj = JSON.parse(data);
            if (err) {
                console.error(err)
                reject(err);
            }
            let parTypes = new Set();
            Object.entries(obj.data).forEach((entryArray) => parTypes.add(entryArray[1].partype));
            resolve(parTypes.values());
        });
    });
    console.log(parTypeValues);
}

// findAllPartypes();
// par types
// 'Blood Well',
//     'Mana',
//     'Energy',
//     'None',
//     'Rage',
//     'Courage',
//     'Shield',
//     'Fury',
//     'Ferocity',
//     'Heat',
//     'Grit',
//     'Crimson Rush',
//     'Flow'


async function loadChampions() {
    let championData = await new Promise(async (resolve, reject) => {
        fs.readFile('./data/champions.json', 'utf8', (err, data) => {
            let obj = JSON.parse(data);
            if (err) {
                console.error(err)
                reject(err);
            }
            // console.log(data);
            // console.log(obj);
            // console.log(obj.data.Zyra);
            resolve(obj.data)
        });
    });

    // make champion dictionary
    let championMap = new Map();
    Object.entries(championData).forEach(([name, data]) => championMap.set(name, Champion.makeFromObj(data)));
    // console.log(championMap);
    return championMap;
}

/**
 * if armor >= 0 then 100 / ( 100 + armor )
 * else 2 - ( 100 / ( 100 - armor) )
 *
 * same for MR
 *
 *
 *
 * @param attacker
 * @param defender
 * @returns {number}
 */
function howManyAutosToKill(attacker, defender) {
    let autos = 0;
    while(defender.hp > 0) {
        defender.takePhysicalDamage(attacker.attackDamage);
        autos++;
    }
    return autos;
}

async function main() {
    let championMap = await loadChampions();
    // get stats for Zoe at Level 10
    let zoe = championMap.get("Zoe");
    let ashe = championMap.get("Ashe");
    let braum = championMap.get("Braum");

    // console.log(ashe);
    // console.log(braum);
    for (let i = 1; i <= 18; i++) {
        braum.level = i;
        console.log(`${howManyAutosToKill(ashe, braum)} autos for lvl ${ashe.level} ashe to kill level ${braum.level} braum`);
    }

    return;


    zoe.level = 10;
    zoe.setStatsForLevel();
    console.log(zoe);
}
main();



/**
 "Aatrox": {
      "version": "10.18.1",
      "id": "Aatrox",
      "key": "266",
      "name": "Aatrox",
      "title": "the Darkin Blade",
      "blurb": "Once honored defenders of Shurima against the Void, Aatrox and his brethren would eventually become an even greater threat to Runeterra, and were defeated only by cunning mortal sorcery. But after centuries of imprisonment, Aatrox was the first to find...",
      "info": {
        "attack": 8,
        "defense": 4,
        "magic": 3,
        "difficulty": 4
      },
      "image": {
        "full": "Aatrox.png",
        "sprite": "champion0.png",
        "group": "champion",
        "x": 0,
        "y": 0,
        "w": 48,
        "h": 48
      },
      "tags": [
        "Fighter",
        "Tank"
      ],
      "partype": "Blood Well",
      "stats": {
        "hp": 580,
        "hpperlevel": 90,
        "mp": 0,
        "mpperlevel": 0,
        "movespeed": 345,
        "armor": 38,
        "armorperlevel": 3.25,
        "spellblock": 32.1,
        "spellblockperlevel": 1.25,
        "attackrange": 175,
        "hpregen": 3,
        "hpregenperlevel": 1,
        "mpregen": 0,
        "mpregenperlevel": 0,
        "crit": 0,
        "critperlevel": 0,
        "attackdamage": 60,
        "attackdamageperlevel": 5,
        "attackspeedperlevel": 2.5,
        "attackspeed": 0.651
      }
    },
 */




// make enum for partype
