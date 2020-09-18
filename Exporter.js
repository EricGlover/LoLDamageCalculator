const puppeteer = require('puppeteer');
const fs = require('fs');
const Ability = require('./Ability.js');
const Champion = require('./Champion.js');

class Exporter {
    constructor() {
        this.wikiDataDir = './data/wikiData';
    }
    async saveWikiAbilityTemplate(data) {
        await this._printToFilePath(`${this.wikiDataDir}/abilityTemplate.json`, JSON.stringify(data, null, 2));
        console.log("Template data written");
    }

    async saveWikiChampionAbilities(data, championName) {
        const file = `${this.wikiDataDir}/${championName}.json`;
        await this._printToFilePath(file, JSON.stringify(data, null, 2));
        console.log(`${championName} abilities saved ${file}`);
    }
    // save the data to an output file
    // async _printToFile(fileName, data) {
    //     return new Promise(resolve => {
    //         fs.writeFile(`./data/wikiData/${fileName}.json`, data, function() {
    //             resolve();
    //         });
    //     })
    // }
    async _printToFilePath(filePath, data) {
        return new Promise(resolve => {
            fs.writeFile(filePath, data, function() {
                resolve();
            });
        })
    }
}

module.exports = Exporter;