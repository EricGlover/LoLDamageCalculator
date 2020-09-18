const puppeteer = require('puppeteer');
const fs = require('fs');
const Ability = require('./Ability.js');
const Champion = require('./Champion.js');
const WikiScraper = require('./WikiScraper.js');
const Exporter = require('./Exporter.js');
const Importer = require('./Importer.js');


async function sleep(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    })

}

// save the data to an output file
async function printToFile(fileName, data) {
    return new Promise(resolve => {
        fs.writeFile(`./data/wikiData/${fileName}.json`, data, function() {
            resolve();
        });
    })
}
async function printToFilePath(filePath, data) {
    return new Promise(resolve => {
        fs.writeFile(filePath, data, function() {
            resolve();
        });
    })
}

async function main() {
    let browser;
    try {
        const importer = new Importer();
        const scraper = new WikiScraper(importer);
        const exporter = new Exporter();

        // console.log(await importer.loadChampionNames());
        // todo:: redo that formatting champion stuff 
        // todo:: find all the errors
        const championNames = await importer.loadChampionNames();
        const abilities = await scraper.scrapeChampionsAbilities(championNames);
        console.log(abilities);
        await scraper.cleanUp();
        return;


        const championName = "Caitlyn";
        // const names = await scraper.scrapeChampionAbilityNames(championName);

        const abs = await scraper.scrapeChampionAbilities(championName);
        console.log(abs);
        await scraper.cleanUp();
        exporter.saveWikiChampionAbilities(abs, championName);


        // save template
        // const template = await scraper.scrapeTemplate();
        // console.log(template);
        await scraper.cleanUp();
        // await exporter.saveWikiAbilityTemplate(template);

        //
        // const championMap = await loadFullChampionDetails();
        // for(const [name, champion] of championMap.entries()) {
        //     if(!champion) {
        //         console.log(name, champion);
        //     } else {
        //         try {
        //             champion.abilities = await loadAbilities(name);
        //         } catch(e) {
        //             console.error(e);
        //             console.error(`no ability file for ${name}`);
        //             champion.abilities = null;
        //         }
        //
        //         let fileName = name.trim().split(" ").join("_");
        //         await printToFilePath(`./data/championFormatted/${fileName}.json`, JSON.stringify(champion, null, 2))
        //     }
        // }

        // const championNames = await getChampionNames();
        // console.log("champion names loaded");
        // for(const [_, name] of Object.entries(championNames)) {
        //     try {
        //         await saveAbilityData(name);
        //     } catch(e) {
        //         console.error(`Error saving data for ${name}`)
        //     }
        // }



        // browser = await puppeteer.launch();
        // get templates and raw wiki data
        // await getTemplate(browser);
        // await scrapeAllChampions();
        // await browser.close();
        // format wiki data into useful entities

        // read from file
        // let data = fs.readFileSync(`./data/wikiData/${championName}.json`);
        // let abilityDataArr = JSON.parse(data);
        // let abilities = [];
        // abilityDataArr.forEach(abilityName => {
        //     let ability = Ability.makeFromWikiData(abilityName);
        //     abilities.push(ability);
        // })
        //
        // console.log(abilities);
        // abilities.forEach(ab => console.log(ab.leveling));
    } catch(e) {
        console.error(e);
    } finally {
        if(browser) {
            await browser.close();
        }
    }
}

main();