const puppeteer = require('puppeteer');
const fs = require('fs');
const Ability = require('./backend/Entities/Ability.js');
const Champion = require('./backend/Entities/Champion.js');
const WikiScraper = require('./backend/DataScraper/WikiScraper.js');
const Exporter = require('./backend/DataScraper/Exporter.js');
const Importer = require('./backend/DataScraper/Importer.js');

class DataService {
    async formatChampions() {
        // if data dragon champion data is ready
        // and ability data from wiki is already formatted
        // then load champion data, and load abilities
        // then combine them and save them in championsFormatted
        const importer = new Importer();
        const exporter = new Exporter();

        /** @var abilityMap Map **/
        const abilityMap = await importer.importFormattedAbilityData();
        /** @var championMap Map **/
        const championMap = await importer.loadFullChampionDetails();
        // console.log('ability names, ', abilityMap.keys());
        // console.log('champion names, ', championMap.keys());
        // return;
        for(let [name, champion] of championMap.entries()) {
            if(name === 'Nunu & Willump') name = 'Nunu';
            if(!abilityMap.has(name)) {
                console.error(`Missing ${name}`);
            } else {
                const abilities = abilityMap.get(name);
                champion.abilities = abilities;
                await exporter.saveFormattedChampion(name, champion);
            }
        }
        console.log("formatted champions saved.");

    }
    async formatAbilityData() {
        // read /data/wikiData/championAbilities
        try {
            const importer = new Importer();
            console.log("reading raw ability data");
            const map = await importer.importRawAbilityData();

            const exporter = new Exporter();

            for (let [name, abilityData] of map.entries()) {
                // abilityData =map.get('Nasus');
                const formatted = [];
                try {
                    console.log(name);
                    abilityData.forEach(data => {
                        formatted.push(Ability.makeFromWikiData(data));
                    })
                } catch (e) {
                    console.error(`error formatting ${name}`, e);
                    continue;
                }
                await exporter.saveFormattedAbilityData(name, formatted);
                // return;
            }
            console.log("formatted ability data saved.");
        } catch(e) {
            console.error(e);
        }
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
        const service = new DataService();
        // await service.formatAbilityData();
        await service.formatChampions();
        //
        // const scraper = new WikiScraper();
        // const exporter = new Exporter();
        //
        // const service = new DataService();
        // await service.scrapeAndSaveRawWikiData();
    } catch(e) {
        console.error(e);
    }
}

main();