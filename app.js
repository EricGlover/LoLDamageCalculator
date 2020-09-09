const fs = require('fs');
console.log("hello world");


async function main() {
    let champions = await new Promise(async (resolve, reject) => {
        fs.readFile('./champions.json', 'utf8', (err, data) => {
            let obj = JSON.parse(data);
            if (err) {
                console.error(err)
                reject(err);
            }
            // console.log(data);
            // console.log(obj);
            // console.log(obj.data.Zyra);
            resolve(obj.data.Zyra)
        });
    });
    console.log(champions);
    // fs.readFile('./champions.json', 'utf8' , (err, data) => {
    //     let obj = JSON.parse(data);
    //     if (err) {
    //         console.error(err)
    //         return
    //     }
    //     console.log(data);
    //     console.log(obj);
    //     console.log(obj.data.Zyra);
    // })
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







class Champion {
    makeFromObj(obj) {
        return new Champion(obj.stats);
    }
    constructor(stats) {
        let {hp,hpperlevel,mp,mpperlevel,movespeed,armor,armorperlevel,spellblock,spellblockperlevel,attackrange,hpregen,hpregenperlevel,mpregen,mpregenperlevel,crit,critperlevel,attackdamage,attackdamageperlevel,attackspeedperlevel,attackspeed } = stats;
        this.hp = hp;
        this.hpperlevel = hpperlevel;
        this.mp = mp;
        this.mpperlevel = mpperlevel;
        this.movespeed = movespeed;
        this.armor = armor;
        this.armorperlevel = armorperlevel;
        this.spellblock = spellblock;
        this.spellblockperlevel = spellblockperlevel;
        this.attackrange = attackrange;
        this.hpregen = hpregen;
        this.hpregenperlevel = hpregenperlevel;
        this.mpregen = mpregen;
        this.mpregenperlevel = mpregenperlevel;
        this.crit = crit;
        this.critperlevel = critperlevel;
        this.attackdamage = attackdamage;
        this.attackdamageperlevel = attackdamageperlevel;
        this.attackspeedperlevel = attackspeedperlevel;
        this.attackspeed = attackspeed;
    }
}