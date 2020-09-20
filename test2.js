const fs = require('fs');
const Champion = require('./backend/Entities/Champion.js');
const Importer = require('./backend/DataScraper/Importer.js');

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
    // const scraper = new DataDragonScraper();
    // let championMap = await scraper.loadChampionNames();
    const importer = new Importer();
    const championMap = await importer.loadFullChampionDetails();

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