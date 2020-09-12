const fs = require('fs');
const Champion = require('./Champion.js');
class Item {}

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

// todo:: abilities

async function loadFullChampionDetails() {
    const championData = [];
    const basePath = "./data/champions";
    const dir = await fs.promises.opendir(basePath);
    for await (const dirent of dir) {
        if(dirent.isFile()) {
            console.log(`reading ${dirent.name}`);
            let data = fs.readFileSync(basePath + `/${dirent.name}`);
            let obj = JSON.parse(data);
            championData.push(Object.values(obj.data)[0]);
        }
    }
    let championMap = new Map();
    championData.map(data => {
        let champion = Champion.makeFromObj(data);
        championMap.set(champion.name, champion);
    })
    return championMap;
}

loadFullChampionDetails().then(map =>console.log(map.get('Akali')));

return;

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
