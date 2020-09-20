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
//
// let s = 'Physical Damage:»20 / 25 / 30 / 35 / 40 (+ 50% bonus AD)«Total Damage:60 / 75 / 90 / 105 / 120 (+ 150% bonus AD)';
// //extract word terms
// let reg = /\w/i
// let r1 = /[a-z]+\s*[a-z]+\s*[a-z]+\s*[a-z]+\s*:/gi
// console.log(s.match(r1));
// return;

async function findLevelingsDescriptions() {
    // testing ratios
    // testing levelings

    const importer = new Importer();
    const champions = await importer.importAllFormattedChampions();
    let r1 = /[a-z]+\s*[a-z]+\s*[a-z]+\s*[a-z]+\s*[a-z]+\s*[a-z]+\s*[a-z]+\s*[a-z]+\s*[a-z]+\s*[a-z]+\s*[a-z]+\s*[a-z]+\s*:/gi;
    let ratioRegex = /\([^\)]+\)/g;
    let ratioWord = /[^%]+\)/gi
    const descriptions = new Set();
    const ratioWords = new Set();
    [...champions.entries()].forEach(([name, data]) => {
        data.abilities.forEach(ability => {
            ability.levelings.forEach(l => {
                if(l && ratioRegex.test(l)) {
                    let matches = l.match(ratioRegex);
                    matches.forEach(m => {
                        // console.log(m);
                        if(ratioWord.test(m)) {
                            let wordMatches = m.match(ratioWord);
                            wordMatches.forEach(word => {
                                if(!ratioWords.has(word)) {
                                    console.log(l);
                                    ratioWords.add(word);
                                }
                            })
                            // console.log(wordMatches);
                        }

                    });
                }
                // if(l && r1.test(l)) {
                //     let matches = l.match(r1);
                //     matches.forEach(m => {
                //         if(!descriptions.has(m)) {
                //             descriptions.add(m);
                //             console.log(l)
                //         }
                //     });
                //     // console.log(l.match(r1));
                // }
            })
            // console.log(ability.levelings);
        })

    })
    console.log(ratioWords);
    // console.log(descriptions);
    // console.log([...descriptions.values()].length);
}
// findLevelingsDescriptions();
// return;
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