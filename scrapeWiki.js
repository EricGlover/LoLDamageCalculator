const puppeteer = require('puppeteer');
const fs = require('fs');


async function getTemplate() {
    const browser = await puppeteer.launch();
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
    const dataObj = {};
    data.forEach(row => {
        dataObj[row[0]] = {value: row[1], description: row[2]}
    })
    console.log(dataObj);
    await browser.close();
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


async function main() {
    const browser = await puppeteer.launch();
    let championName = "Caitlyn";
    const abilityNames = await getChampionAbilityNames(championName, browser);
    const abilities = [];
    for (const [_, name] of Object.entries(abilityNames)) {
        console.log(name);
        let data = await getAbility(name, championName, browser);
        abilities.push(data);
    }
    await printToFile(championName, JSON.stringify(abilities, null, 2));

    // return;
    // abilityNames.forEach(async abilityName => {
    //     let data = await getAbility(abilityName, championName, browser);
    //     abilities.push(data);
    // })
    console.log(abilities);
    // getAbility( "90 Caliber Net", "Caitlyn");
    browser.close();
}

main();