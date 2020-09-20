const puppeteer = require('puppeteer');
const fs = require('fs');
const Ability = require('../Entities/Ability.js');
const Champion = require('../Entities/Champion.js');

class Exporter {
    constructor() {
        this.wikiDataDir = './data/wikiData';
    }
    async saveFormattedChampion(name, data) {
        await this._printToFilePath(`./data/championFormatted/${name}.json`, JSON.stringify(data, null, 2));
        console.log(`Saved ${name} formatted champion data.`);
    }
    async saveWikiAbilityTemplate(data) {
        await this._printToFilePath(`${this.wikiDataDir}/abilityTemplate.json`, JSON.stringify(data, null, 2));
        console.log("Template data written");
    }

    async saveFormattedAbilityData(championName, data) {
        await this._printToFilePath(`${this.wikiDataDir}/championAbilitiesFormatted/${championName}.json`, JSON.stringify(data, null, 2))
        console.log(`${championName} formatted ability data saved.`);
    }

    async saveWikiChampionAbilities(data, championName) {
        const file = `${this.wikiDataDir}/${championName}.json`;
        await this._printToFilePath(file, JSON.stringify(data, null, 2));
        console.log(`${championName} abilities saved ${file}`);
    }

    async _printToFilePath(filePath, data) {
        return new Promise(resolve => {
            fs.writeFile(filePath, data, function() {
                resolve();
            });
        })
    }
}

module.exports = Exporter;