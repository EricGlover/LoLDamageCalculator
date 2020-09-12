const puppeteer = require('puppeteer');
const fs = require('fs');
const Champion = require("./Champion.js");


async function loadChampions() {
    let championData = await new Promise(async (resolve, reject) => {
        fs.readFile('./datas/champions.json', 'utf8', (err, data) => {
            let obj = JSON.parse(data);
            if (err) {
                console.error(err)
                reject(err);
            }
            resolve(obj.data)
        });
    });

    // make champion dictionary
    let championMap = new Map();
    Object.entries(championData).forEach(([name, data]) => championMap.set(name, Champion.makeFromObj(data)));
    return championMap;
}

async function getDataForChampion(browser, name) {
    try {
        const page = await browser.newPage();
        await page.goto(`http://ddragon.leagueoflegends.com/cdn/10.18.1/data/en_US/champion/${name}.json`);
        let jsonStr = await page.$eval("pre", el => el.textContent);
        await page.close();
        return JSON.parse(jsonStr);
    } catch(e) {
        console.error(`Failed to get data for ${name}`)
        console.error(e);
        if(page) await page.close();
    }

}

async function printToFile(fileName, data) {
    return new Promise(resolve => {
        fs.writeFile(`./data/champions/${fileName}.json`, data, function() {
            console.log("resolving")
            resolve();
        });
    })

}

async function main() {
    // get champion name list
    let champions = await loadChampions();
    // Aurelion Sol => AurelionSol
    // Cho'Gath => Chogath
    // Rek'Sai => RekSai
    let exceptionMap = new Map();
    exceptionMap.set("Cho'Gath", "Chogath");
    exceptionMap.set("Dr. Mundo", "DrMundo");
    exceptionMap.set("Kai'Sa", "Kaisa");
    exceptionMap.set("Kha'Zix", "Khazix");
    exceptionMap.set("Kog'Maw", "KogMaw");
    exceptionMap.set("Nunu & Willump", "Nunu");
    exceptionMap.set("Rek'Sai", "RekSai");
    exceptionMap.set("Vel'Koz", "Velkoz");
    exceptionMap.set("LeBlanc", "Leblanc");
    let championNames = [...champions.values()].map(data => {
        console.log(data.name);
        let name = data.name.trim();
        if(exceptionMap.has(name)) return exceptionMap.get(name);
        let str = name.replace(" ", "")
        // console.log(str);
        return str;
    });
    // return;
    // return;
    const browser = await puppeteer.launch();
    // let championNames = ["Akali"];

    for(let i = 58; i < championNames.length; i++) {
        let name = championNames[i];
        if(name == 'Wukong') continue;
        let data = await getDataForChampion(browser, name);
        console.log("datas retrieved ", i);
        await printToFile(name, JSON.stringify(data, null, 2));
    }
    await browser.close();


    // championNames.forEach(async name => {
    //     let datas = await getDataForChampion(name);
    //     await printToFile(name, JSON.stringify(datas, null, 2));
    // });

    //
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.goto('http://ddragon.leagueoflegends.com/cdn/10.18.1/data/en_US/champion/Akali.json');
    // // await setTimeout(async function() {
    // //     page.$("a#rawdata-tab");
    // //     await page.click("#rawdata-tab");
    // //     await page.click("button.button.prettyprint");
    // //
    // //     let datas = await page.$('pre.datas').evaluate(el => el.textContent, el);
    // //     console.log(datas);
    // //     await browser.close();
    // // }, 2000);
    //
    // let pre = await page.$("pre");
    // let jsonStr = await page.$eval("pre", el => el.textContent);
    // console.log(jsonStr);
    // // console.log(pre.asElement().

    // let thing = await page.$("a#rawdata-tab");
    // page.content().then(content => console.log(content));
    // console.log(thing);
    // await page.click("#rawdata-tab");
    // await page.click("button.button.prettyprint");
    //
    // let datas = await page.$('pre.datas').evaluate(el => el.textContent, el);
    // console.log(datas);
    // await browser.close();


}
main();