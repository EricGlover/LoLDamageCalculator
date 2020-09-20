const puppeteer = require('puppeteer');
const fs = require('fs');
const Ability = require('./backend/Entities/Ability.js');
const Champion = require('./backend/Entities/Champion.js');
const WikiScraper = require('./backend/DataScraper/WikiScraper.js');
const Exporter = require('./backend/DataScraper/Exporter.js');
const Importer = require('./backend/DataScraper/Importer.js');
const Formatter = require('./backend/DataScraper/Formatter.js');
const DataService = require('./backend/DataScraper/DataService.js');

// todo:: format ability data

async function main() {
    try {
        const service = new DataService();
        await service.formatAbilityData();
        await service.formatChampions();
        return;
        // const formatter = new Formatter();
        // let s = "something<img />";
        // console.log(formatter.stripTags(s));
        // console.log(s);
        // return;

        await service.formatAbilityData();

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