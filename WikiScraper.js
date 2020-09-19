const puppeteer = require('puppeteer');
const fs = require('fs');
const Ability = require('./Ability.js');
const Champion = require('./Champion.js');

class WikiScraperError {
    constructor(e, info) {
        this.e = e;
        this.info = info;
    }
}
class WikiScraper {
    constructor() {
        this.browser = null;
        this.templatePage = "https://leagueoflegends.fandom.com/wiki/Template:Ability_data";
        this.errors = [];
    }
    async getBrowser() {
        if(this.browser === null) {
            this.browser = await puppeteer.launch();
        }
        return this.browser;
    }
    async cleanUp() {
        if(this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }
    async scrapeTemplate() {
        console.log("Fetching template");
        const browser = await this.getBrowser();
        const page = await browser.newPage();
        await page.goto(this.templatePage);
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
        return dataObj;
        // await printToFile('template', JSON.stringify(dataObj, null, 2));
        // console.log("Template data written");
    }

    async scrapeChampionAbilities(championName) {
        console.log(`fetching champion abilities for ${championName}`);
        let abilityNames;
        try {
            abilityNames = await this.scrapeChampionAbilityNames(championName);
        } catch(e) {
            this.errors.push(new WikiScraperError(e, {fn: 'scrapeChampionAbilities', championName, info: 'error getting ability names'}))
            throw e;
        }
        const abilities = [];
        for (const [_, name] of Object.entries(abilityNames)) {
            try {
                // console.log(name);
                console.log(`Fetching ability ${name}`);
                let data = await this.scrapeAbility(name, championName);
                abilities.push(data);
            } catch (e) {
                console.error(`error scraping ${name} for ${championName}`)
                this.errors.push(new WikiScraperError(e, {fn: 'scrapeChampionAbilities', championName, name, info: 'error scraping Ability'}));
            }
        }
        return abilities;
    }

    // https://leagueoflegends.fandom.com/wiki/Template:Data_Caitlyn/90_Caliber_Net
    async scrapeAbility(ability, championName) {
        const page = await this.browser.newPage();
        let spellName = ability.split(" ").join("_");
        const url = `https://leagueoflegends.fandom.com/wiki/Template:Data_${encodeURIComponent(championName)}/${encodeURIComponent(spellName)}`;
        // console.log(`going to ${url}`);
        await page.goto(url);
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
        await page.close();
        return dataObj;
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
    async scrapeChampionsAbilities(championNames) {
        const allAbilities = [];
        const browser = await this.getBrowser();
        for(const [_, name] of Object.entries(championNames)) {
            try {
                let abilities = await this.scrapeChampionAbilities(name, browser);
                allAbilities.push(abilities);
            } catch(e) {
                console.error(`Error scraping data for ${name}`);
                this.errors.push(new WikiScraperError(e, {fn: 'scrapeChampionsAbilities', name}));
            }
        }
        return allAbilities;
    }
    async scrapeChampionsAbilitiesParallel(championNames) {
        const allAbilities = [];
        const browser = await this.getBrowser();
        const calls = [];
        for(const [_, name] of Object.entries(championNames)) {
            calls.push(this.scrapeChampionAbilities(name, browser));
            // try {
            //     let abilities = await
            //     allAbilities.push(abilities);
            // } catch(e) {
            //     console.error(`Error scraping data for ${name}`);
            //     this.errors.push(e);
            // }
        }
        const results = await Promise.allSettled(calls);
        console.log(results[0]);
        return allAbilities;
    }

    // todo::
    async scrapeChampionNames() {
        throw new Error("not implemented");
        //
        // let championNames = null;
        // try {
        //     championNames = await loadChampionNames();
        //     return championNames;
        // } catch(e) {
        //     console.error("Error fetching champion names");
        //     throw e;
        // } finally {
        //     browser.close();
        // }
    }

    // todo::
    async saveAbilityData(championName) {
        try {
            // read from file
            console.log(`looking for ./data/wikiData/${championName}.json`);
            let data = fs.readFileSync(`./data/wikiData/${championName}.json`);
            let abilityDataArr = JSON.parse(data);
            let abilities = [];
            abilityDataArr.forEach(abilityName => {
                let ability = Ability.makeFromWikiData(abilityName);
                abilities.push(ability);
            })
            return await printToFilePath(`./data/formattedWikiData/${championName}.json`, JSON.stringify(abilities, null, 2));
        } catch(e) {
            console.error(e);
        }
    }

    //todo::
    async saveChampionAbilities() {
        const championNames = await getChampionNames();
        console.log("champion names loaded");
        for(const [_, name] of Object.entries(championNames)) {
            try {
                await saveAbilityData(name);
            } catch(e) {
                console.error(`Error saving data for ${name}`)
            }
        }
    }

    /**
     *
     * @param champion string
     * @returns {Promise<[string]>}
     */
    async scrapeChampionAbilityNames(champion) {
        const browser = await this.getBrowser();
        const page = await browser.newPage();
        const url = `https://leagueoflegends.fandom.com/wiki/Template:Data_${encodeURIComponent(champion)}`;
        // console.log(`going to ${url}`);
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
        // console.log(`${champion} has ${abilities}`);
        return abilities;
    }
}

module.exports = WikiScraper;