const puppeteer = require('puppeteer');
const fs = require('fs');
const Ability = require('../Entities/Ability.js');
const Champion = require('../Entities/Champion.js');
const path = require('path');


class Importer {
    constructor() {
        this.championNames = null;
        this.wikiAbilitiesRawDir = './data/wikiData/championAbilitiesRaw';
        this.wikiAbilitiesFormattedDir = './data/wikiData/championAbilitiesFormatted';
        this.formattedAbilitiesDir = './data/formattedWikiData';
        this.dataDragonChampions = `./data/champions.json`;
        this.dataDragonChampionDetailsDir = `./data/champions`;
    }

    importFormattedChampionData(name) {
        let obj = fs.readFileSync(`./data/championFormatted/${name}.json`);
        return JSON.parse(obj);
    }

    async importFormattedAbilityData() {
        const basePath = this.wikiAbilitiesFormattedDir;
        const dir = await fs.promises.opendir(basePath);
        const errors = [];
        const championMap = new Map();
        for await (const dirent of dir) {
            if(dirent.isFile()) {
                const path = `${basePath}/${dirent.name}`;
                console.log(`reading ${path}`);
                let data = fs.readFileSync(`${path}`);
                let obj = JSON.parse(data);
                if(!Array.isArray(obj) || obj.length === 0) {
                    console.error(`can not read ${path}`, data);
                    errors.push(`can not read ${path}`, data);
                    fs.unlinkSync(`${path}`)
                    console.log(`${path} deleted`);
                    continue;
                }
                championMap.set(dirent.name.replace('.json', ''), obj);
            }
        }
        if(errors.length > 0) {
            console.log('errors : ', errors);
        }

        return championMap;
    }

    async importRawAbilityData() {
        const basePath = this.wikiAbilitiesRawDir;
        const dir = await fs.promises.opendir(basePath);
        const errors = [];
        const championMap = new Map();
        for await (const dirent of dir) {
            if(dirent.isFile()) {
                const path = `${basePath}/${dirent.name}`;
                console.log(`reading ${path}`);
                let data = fs.readFileSync(`${path}`);
                let obj = JSON.parse(data);
                if(!Array.isArray(obj) || obj.length === 0) {
                    console.error(`can not read ${path}`, data);
                    errors.push(`can not read ${path}`, data);
                    fs.unlinkSync(`${path}`)
                    console.log(`${path} deleted`);
                    continue;
                }
                const name = obj[0].champion.value;
                championMap.set(name, obj);
            }
        }
        if(errors.length > 0) {
            console.log('errors : ', errors);
        }

        return championMap;
    }

    async loadAbilities(championName) {
        let data = fs.readFileSync(`${this.formattedAbilitiesDir}/${championName}.json`);
        return JSON.parse(data);
    }

    // we already have the basic champion file, use this for the names
    async loadChampionNames() {
        if(this.championNames) return this.championNames;

        return new Promise(async (resolve, reject) => {
            fs.readFile(this.dataDragonChampions, 'utf8', (err, data) => {
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
        const basePath = this.dataDragonChampionDetailsDir;
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