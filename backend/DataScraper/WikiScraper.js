const puppeteer = require('puppeteer');

class WikiScraperError {
    constructor(e, info) {
        this.e = e;
        this.info = info;
    }
}

/**
 *
 * example champion data url
 * https://leagueoflegends.fandom.com/wiki/Template:Data_Sylas
 *
 * example champion ability url
 * https://leagueoflegends.fandom.com/wiki/Template:Data_Sylas/Petricite_Burst
 *
 */


class WikiScraper {
    constructor() {
        this.browser = null;
        this.templatePage = "https://leagueoflegends.fandom.com/wiki/Template:Ability_data";
        this.errors = [];
    }
    async cleanUp() {
        if(this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }
    async scrapeTemplate() {
        console.log("Fetching template");
        const browser = await this._getBrowser();
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
    /**
     * Get champion abilities from the wiki data page on that champion
     * championUrl is to their data template page
     * @param championUrl
     * @returns {Promise<[]>}
     */
    async scrapeChampionAbilities(championUrl) {
        console.log(`fetching champion abilities for ${championUrl}`);
        let abilityUrls;
        try {
            abilityUrls = await this._scrapeChampionAbilityUrls(championUrl);
        } catch(e) {
            this.errors.push(new WikiScraperError(e, {fn: 'scrapeChampionAbilities', championUrl, info: 'error getting ability names'}))
            throw e;
        }
        const abilities = [];
        for (const [_, url] of Object.entries(abilityUrls)) {
            try {
                console.log(`Fetching ability ${url}`);
                let data = await this._scrapeAbility(url, championUrl);
                abilities.push(data);
            } catch (e) {
                console.error(`error scraping ${name} for ${championUrl}`)
                this.errors.push(new WikiScraperError(e, {fn: 'scrapeChampionAbilities', championUrl, name, info: 'error scraping Ability'}));
            }
        }
        return abilities;
    }

    async _scrapeAbility(url) {
        await this._getBrowser();
        const page = await this.browser.newPage();
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

    async _scrapeChampionsAbilities() {
        let championDataUrls = await this._scrapeChampionDataPageLinks();
        const allAbilities = [];
        for(const [_, url] of Object.entries(championDataUrls)) {
            try {
                let abilities = await this.scrapeChampionAbilities(url);
                const name = abilities[0].champion.value;
                allAbilities.push({name, abilities});
            } catch(e) {
                console.error(`Error scraping data for ${url}`);
                this.errors.push(new WikiScraperError(e, {fn: 'scrapeChampionsAbilities', url}));
            }
        }
        return allAbilities;
    }

    async _scrapeChampionDataPageLinks() {
        const browser = await this._getBrowser();
        const page = await browser.newPage();
        const url = `https://leagueoflegends.fandom.com/wiki/Category:Champion_data_templates`;
        await page.goto(url);
        const urls = await page.$$eval(".category-page__member-link", async aArr => {
            return aArr.map(a => a.href);
        });
        await page.close();
        return urls;
    }

    async _scrapeChampionAbilityUrls(championDataUrl) {
        const browser = await this._getBrowser();
        const page = await browser.newPage();
        await page.goto(championDataUrl);
        const urls = await page.$$eval("#mw-content-text > ul > li:nth-child(3) > ul li a", async aArr => {
            return aArr.map(a => a.href);
        });
        await page.close();
        return urls;
    }

    async _getBrowser() {
        if(this.browser === null) {
            this.browser = await puppeteer.launch();
        }
        return this.browser;
    }
}

module.exports = WikiScraper;


//
//
// class OldScraper {
//     constructor() {
//         this.browser = null;
//         this.templatePage = "https://leagueoflegends.fandom.com/wiki/Template:Ability_data";
//         this.errors = [];
//     }
//     async getBrowser() {
//         if(this.browser === null) {
//             this.browser = await puppeteer.launch();
//         }
//         return this.browser;
//     }
//     async cleanUp() {
//         if(this.browser) {
//             await this.browser.close();
//             this.browser = null;
//         }
//     }
//     async scrapeTemplate() {
//         console.log("Fetching template");
//         const browser = await this.getBrowser();
//         const page = await browser.newPage();
//         await page.goto(this.templatePage);
//         const table = await page.$("table.article-table.grid");
//         let data = await table.$$eval("tr", async trArr => {
//             return trArr.map(tr => {
//                 const row = [];
//                 const tdNodeList = tr.querySelectorAll("td");
//                 tdNodeList.forEach(td => {
//                     row.push(td.textContent.trim());
//                 })
//                 return row;
//             }).filter(row => row.length > 0);
//         });
//         await page.close();
//
//         const dataObj = {};
//         data.forEach(row => {
//             dataObj[row[0]] = {value: row[1], description: row[2]}
//         })
//         return dataObj;
//         // await printToFile('template', JSON.stringify(dataObj, null, 2));
//         // console.log("Template data written");
//     }
//
//     async scrapeChampionAbilitiesFromLinks(championUrl) {
//         console.log(`fetching champion abilities for ${championUrl}`);
//         // let abilityNames;
//         let abilityUrls;
//         try {
//             abilityUrls = await this.scrapeChampionAbilityLinksFromLinks(championUrl);
//             // abilityNames = await this.scrapeChampionAbilityNames(championName);
//         } catch(e) {
//             this.errors.push(new WikiScraperError(e, {fn: 'scrapeChampionAbilities', championUrl, info: 'error getting ability names'}))
//             throw e;
//         }
//         const abilities = [];
//         for (const [_, url] of Object.entries(abilityUrls)) {
//             try {
//                 // console.log(name);
//                 console.log(`Fetching ability ${url}`);
//                 let data = await this.scrapeAbility(url, championUrl);
//                 abilities.push(data);
//             } catch (e) {
//                 console.error(`error scraping ${name} for ${championUrl}`)
//                 this.errors.push(new WikiScraperError(e, {fn: 'scrapeChampionAbilities', championUrl, name, info: 'error scraping Ability'}));
//             }
//         }
//         return abilities;
//     }
//     async scrapeChampionAbilities(championName) {
//         console.log(`fetching champion abilities for ${championName}`);
//         // let abilityNames;
//         let abilityUrls;
//         try {
//             abilityUrls = await this.scrapeChampionAbilityLinks(championName);
//             // abilityNames = await this.scrapeChampionAbilityNames(championName);
//         } catch(e) {
//             this.errors.push(new WikiScraperError(e, {fn: 'scrapeChampionAbilities', championName, info: 'error getting ability names'}))
//             throw e;
//         }
//         const abilities = [];
//         for (const [_, url] of Object.entries(abilityUrls)) {
//             try {
//                 // console.log(name);
//                 console.log(`Fetching ability ${url}`);
//                 let data = await this.scrapeAbility(url, championName);
//                 abilities.push(data);
//             } catch (e) {
//                 console.error(`error scraping ${name} for ${championName}`)
//                 this.errors.push(new WikiScraperError(e, {fn: 'scrapeChampionAbilities', championName, name, info: 'error scraping Ability'}));
//             }
//         }
//         return abilities;
//     }
//     async scrapeAbility(url) {
//         await this.getBrowser();
//         const page = await this.browser.newPage();
//         await page.goto(url);
//         const table = await page.$("table.article-table.grid");
//         let data = await table.$$eval("tr", async trArr => {
//             return trArr.map(tr => {
//                 const row = [];
//                 const tdNodeList = tr.querySelectorAll("td");
//                 tdNodeList.forEach(td => {
//                     row.push(td.textContent.trim());
//                 })
//                 return row;
//             }).filter(row => row.length > 0);
//         });
//         const dataObj = {};
//         data.forEach(row => {
//             dataObj[row[0]] = {value: row[1], description: row[2]}
//         })
//         await page.close();
//         return dataObj;
//     }
//     //
//     // // https://leagueoflegends.fandom.com/wiki/Template:Data_Caitlyn/90_Caliber_Net
//     // async scrapeAbility(ability, championName) {
//     //     const page = await this.browser.newPage();
//     //     let spellName = ability.split(" ").join("_");
//     //     const url = `https://leagueoflegends.fandom.com/wiki/Template:Data_${encodeURIComponent(championName)}/${encodeURIComponent(spellName)}`;
//     //     // console.log(`going to ${url}`);
//     //     await page.goto(url);
//     //     const table = await page.$("table.article-table.grid");
//     //     let data = await table.$$eval("tr", async trArr => {
//     //         return trArr.map(tr => {
//     //             const row = [];
//     //             const tdNodeList = tr.querySelectorAll("td");
//     //             tdNodeList.forEach(td => {
//     //                 row.push(td.textContent.trim());
//     //             })
//     //             return row;
//     //         }).filter(row => row.length > 0);
//     //     });
//     //     const dataObj = {};
//     //     data.forEach(row => {
//     //         dataObj[row[0]] = {value: row[1], description: row[2]}
//     //     })
//     //     await page.close();
//     //     return dataObj;
//     // }
//     async scrapeChampionsAbilitiesFromLinks() {
//         let championDataUrls = await this.scrapeChampionDataPageLinks();
//         const allAbilities = [];
//         for(const [_, url] of Object.entries(championDataUrls)) {
//             try {
//                 let abilities = await this.scrapeChampionAbilitiesFromLinks(url);
//                 const name = abilities[0].champion.value;
//                 allAbilities.push({name, abilities});
//             } catch(e) {
//                 console.error(`Error scraping data for ${url}`);
//                 this.errors.push(new WikiScraperError(e, {fn: 'scrapeChampionsAbilities', url}));
//             }
//         }
//         return allAbilities;
//     }
//     async scrapeChampionsAbilities(championNames) {
//         const allAbilities = [];
//         for(const [_, name] of Object.entries(championNames)) {
//             try {
//                 let abilities = await this.scrapeChampionAbilities(name);
//                 // let abilities = await this.scrapeChampionsAbilitiesParallel(name);
//                 allAbilities.push({name, abilities});
//             } catch(e) {
//                 console.error(`Error scraping data for ${name}`);
//                 this.errors.push(new WikiScraperError(e, {fn: 'scrapeChampionsAbilities', name}));
//             }
//         }
//         return allAbilities;
//     }
//
//     async scrapeChampionDataPageLinks() {
//         const browser = await this.getBrowser();
//         const page = await browser.newPage();
//         const url = `https://leagueoflegends.fandom.com/wiki/Category:Champion_data_templates`;
//         await page.goto(url);
//         const urls = await page.$$eval(".category-page__member-link", async aArr => {
//             return aArr.map(a => a.href);
//         });
//         await page.close();
//         return urls;
//     }
//
//     async scrapeChampionAbilityLinksFromLinks(url) {
//         const browser = await this.getBrowser();
//         const page = await browser.newPage();
//         await page.goto(url);
//         const urls = await page.$$eval("#mw-content-text > ul > li:nth-child(3) > ul li a", async aArr => {
//             return aArr.map(a => a.href);
//         });
//         await page.close();
//         return urls;
//     }
//
//     async scrapeChampionAbilityLinks(champion) {
//         const browser = await this.getBrowser();
//         const page = await browser.newPage();
//         const url = `https://leagueoflegends.fandom.com/wiki/Template:Data_${encodeURIComponent(champion)}`;
//         await page.goto(url);
//         const urls = await page.$$eval("#mw-content-text > ul > li:nth-child(3) > ul li a", async aArr => {
//             return aArr.map(a => a.href);
//         });
//         await page.close();
//         return urls;
//     }
//
//     /**
//      *
//      * @param champion string
//      * @returns {Promise<[string]>}
//      */
//     async scrapeChampionAbilityNames(champion) {
//         const browser = await this.getBrowser();
//         const page = await browser.newPage();
//         const url = `https://leagueoflegends.fandom.com/wiki/Template:Data_${encodeURIComponent(champion)}`;
//         // console.log(`going to ${url}`);
//         await page.goto(url);
//         const table = await page.$("table.article-table");
//         const abilities = await table.$$eval("tr", async trArr => {
//             let abilityNames = [];
//             let keys = new Set(['skill_q', 'skill_w', 'skill_e', 'skill_r']);
//             trArr.forEach(tr => {
//                 let tdArr = tr.querySelectorAll("td");
//                 if(tdArr.length === 0) return;
//                 let key = tdArr[0].textContent.trim();
//                 if(keys.has(key)) {
//                     abilityNames.push(tdArr[1].textContent.trim());
//                 }
//             })
//             return abilityNames;
//         });
//         await page.close();
//         // console.log(`${champion} has ${abilities}`);
//         return abilities;
//     }
// }
