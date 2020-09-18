const puppeteer = require('puppeteer');
const fs = require('fs');


async function getTemplate(browser) {
    console.log("Fetching template");
    const page = await browser.newPage();
    await page.goto("https://leagueoflegends.fandom.com/wiki/Template:Ability_data");
    const table = await page.$("table.article-table.grid");
    let data = await table.$$eval("tr", async trArr => {
        return trArr.map(tr => {
            const row = [];
            const tdNodeList = tr.querySelectorAll("td");
            tdNodeList.forEach(td => {
                row.push(td.textContent.trim());
            })
            return row;
        }).filter(row => row.length > 0);
    });
    await page.close();

    const dataObj = {};
    data.forEach(row => {
        dataObj[row[0]] = {value: row[1], description: row[2]}
    })
    await printToFile('template', JSON.stringify(dataObj, null, 2));
    console.log("Template data written");
}

async function sleep(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    })

}

async function getChampionAbilityNames(champion, browser) {
    const page = await browser.newPage();
    const url = `https://leagueoflegends.fandom.com/wiki/Template:Data_${encodeURIComponent(champion)}`;
    console.log(`going to ${url}`);
    await page.goto(url);
    const table = await page.$("table.article-table");
    const abilities = await table.$$eval("tr", async trArr => {
        let abilityNames = [];
        let keys = new Set(['skill_q', 'skill_w', 'skill_e', 'skill_r']);
        trArr.forEach(tr => {
            let tdArr = tr.querySelectorAll("td");
            if(tdArr.length === 0) return;
            let key = tdArr[0].textContent.trim();
            if(keys.has(key)) {
                abilityNames.push(tdArr[1].textContent.trim());
            }
        })
        return abilityNames;
    });
    await page.close();
    console.log(`${champion} has ${abilities}`);
    return abilities;
}

// https://leagueoflegends.fandom.com/wiki/Template:Data_Caitlyn/90_Caliber_Net
async function getAbility(ability, champion, browser) {
    const page = await browser.newPage();
    let spell = ability.split(" ").join("_");
    const url = `https://leagueoflegends.fandom.com/wiki/Template:Data_${encodeURIComponent(champion)}/${encodeURIComponent(spell)}`;
    console.log(`going to ${url}`);
    await page.goto(url);
    // await sleep(2000);
    const table = await page.$("table.article-table.grid");
    let data = await table.$$eval("tr", async trArr => {
        return trArr.map(tr => {
            const row = [];
            const tdNodeList = tr.querySelectorAll("td");
            tdNodeList.forEach(td => {
                row.push(td.textContent.trim());
            })
            return row;
        }).filter(row => row.length > 0);
    });
    const dataObj = {};
    data.forEach(row => {
        dataObj[row[0]] = {value: row[1], description: row[2]}
    })
    console.log(dataObj);
    await page.close();
    return dataObj;
}


// save the data to an output file
async function printToFile(fileName, data) {
    return new Promise(resolve => {
        fs.writeFile(`./data/wikiData/${fileName}.json`, data, function() {
            resolve();
        });
    })
}

// we already have the basic champion file, use this for the names
async function loadChampionNames() {
    return new Promise(async (resolve, reject) => {
        fs.readFile('./data/champions.json', 'utf8', (err, data) => {
            let obj = JSON.parse(data);
            if (err) {
                console.error(err)
                reject(err);
            }
            resolve(Object.keys(obj.data));
        });
    });
}

async function scrapeChampion(championName, browser) {
    console.log(`fetching champion abilities for ${championName}`);
    const abilityNames = await getChampionAbilityNames(championName, browser);

    const abilities = [];

    for (const [_, name] of Object.entries(abilityNames)) {
        console.log(name);
        console.log(`Fetching ability ${name}`);
        let data = await getAbility(name, championName, browser);
        abilities.push(data);
    }
    console.log(`writing data to file`);
    await printToFile(championName, JSON.stringify(abilities, null, 2));
}

/**
 * Error to fix
 Summon Tibbers,Command Tibbers
 going to https://leagueoflegends.fandom.com/wiki/Template:Data_Annie/Summon_Tibbers%2CCommand_Tibbers
 (node:81459) UnhandledPromiseRejectionWarning: TypeError: Cannot read property '$$eval' of null
 at getAbility (/Users/ericglover/Desktop/Programming/LoLDamageCalculator/scrapeWiki.js:68:28)
 at runMicrotasks (<anonymous>)
 at processTicksAndRejections (internal/process/task_queues.js:97:5)
 at async scrapeChampion (/Users/ericglover/Desktop/Programming/LoLDamageCalculator/scrapeWiki.js:116:20)
 at async scrapeAllChampions (/Users/ericglover/Desktop/Programming/LoLDamageCalculator/scrapeWiki.js:127:9)
 at async main (/Users/ericglover/Desktop/Programming/LoLDamageCalculator/scrapeWiki.js:134:5)
 (node:81459) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
 (node:81459) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
 */
async function scrapeAllChampions() {
    const browser = await puppeteer.launch();
    let championNames = null;
    try {
        championNames = await loadChampionNames();
    } catch(e) {
        console.error("Error fetching champion names");
        throw e;
    }

    for(const [_, name] of Object.entries(championNames)) {
        try {
            await scrapeChampion(name, browser);
        } catch(e) {
            console.error(`Error scraping data for ${name}`)
        }
    }
    await browser.close();
}



async function main() {
    try {
        // const browser = await puppeteer.launch();
        // get templates and raw wiki data
        // await getTemplate(browser);
        // await scrapeAllChampions();
        // await browser.close();
        // format wiki data into useful entities

        // read from file
        const championName = "Caitlyn";
        let data = fs.readFileSync(`./data/wikiData/${championName}`);
        let abilityDataArr = JSON.parse(data);
        // start with Q
        let ability = Ability.makeFromObj(abilityDataArr[0]);
        console.log(ability);
    } catch(e) {
        console.error(e);
    } finally {
        if(browser) {
            await browser.close();
        }
    }
}

main();