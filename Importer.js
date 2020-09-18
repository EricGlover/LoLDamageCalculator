const puppeteer = require('puppeteer');
const fs = require('fs');
const Ability = require('./Ability.js');
const Champion = require('./Champion.js');


class Importer {
    constructor() {
        this.championNames = null;
    }

    async loadAbilities(championName) {
        let data = fs.readFileSync(`./data/formattedWikiData/${championName}.json`);
        return JSON.parse(data);
    }

    // we already have the basic champion file, use this for the names
    async loadChampionNames() {
        if(this.championNames) return this.championNames;

        return new Promise(async (resolve, reject) => {
            fs.readFile('./data/champions.json', 'utf8', (err, data) => {
                let obj = JSON.parse(data);
                if (err) {
                    console.error(err)
                    reject(err);
                }
                this.championNames = Object.keys(obj.data);
                resolve(this.championNames);
            });
        });
    }

    /**
     *
     * @returns {Promise<Map<string, Champion>>}
     */
    async loadFullChampionDetails() {
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
}

module.exports = Importer;