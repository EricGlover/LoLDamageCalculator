const puppeteer = require('puppeteer');
const fs = require('fs');
const Ability = require('./backend/Entities/Ability.js');
const Champion = require('./backend/Entities/Champion.js');
const WikiScraper = require('./backend/DataScraper/WikiScraper.js');
const Exporter = require('./backend/DataScraper/Exporter.js');
const Importer = require('./backend/DataScraper/Importer.js');

class DataService {
    async formatAbilityData() {
        // read /data/wikiData/championAbilities
    }

    async scrapeAndSaveRawWikiData() {
        try {
            const scraper = new WikiScraper();
            const abilities = await scraper._scrapeChampionsAbilities();
            console.log(scraper.errors);
            await scraper.cleanUp();
            const exporter = new Exporter();
            for(const [_, result] of Object.entries(abilities)) {
                await exporter.saveWikiChampionAbilities(result.abilities, result.name);
            }
        } catch(e) {
            console.error(e);
        }
    }

    // async scrapeAndSaveRawWikiData__old() {
    //     try {
    //         const scraper = new WikiScraper();
    //         const exporter = new Exporter();
    //         let championNames = await importer.loadChampionNames();
    //         const abilities = await scraper.scrapeChampionsAbilities(championNames);
    //         console.log(scraper.errors);
    //         await scraper.cleanUp();
    //         for(const [_, result] of Object.entries(abilities)) {
    //             exporter.saveWikiChampionAbilities(result.abilities, result.name);
    //         }
    //     } catch(e) {
    //         console.error(e);
    //     }
    // }
}

// todo:: format ability data

async function main() {
    try {
        const importer = new Importer();
        const map = await importer.importRawAbilityData();

        for (const [name, abilityData] of map.entries()) {
            console.log(name);
        }
        // console.log(map);
        return;
        const scraper = new WikiScraper();
        const exporter = new Exporter();

        const service = new DataService();
        await service.scrapeAndSaveRawWikiData();
    } catch(e) {
        console.error(e);
    }
}

main();