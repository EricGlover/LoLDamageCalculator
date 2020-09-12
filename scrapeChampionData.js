const puppeteer = require('puppeteer');
const fs = require('fs');
const Champion = require("./Champion.js");


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

// get the detailed files from data dragon
// pass a puppeteer browser
async function getDataForChampion(browser, name) {
    try {
        const page = await browser.newPage();
        console.log(`fetching data for ${name}`);
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


// save the data to an output file
async function printToFile(fileName, data) {
    return new Promise(resolve => {
        fs.writeFile(`./data/champions/${fileName}.json`, data, function() {
            resolve();
        });
    })
}


//
async function main() {
    // get champion name list
    let championNames = await loadChampionNames();
    console.log(championNames);


    // due to inconsistent naming of their files we need to manually check for
    // some exceptions
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
    exceptionMap.set("Wukong", "MonkeyKing");

    // for each champ , fetch their data file and pretty print out some JSON to
    // an output file
    championNames = championNames.map(name => {
        // console.log(data.name);
         name = name.trim();
        if(exceptionMap.has(name)) return exceptionMap.get(name);
        return name.replace(" ", "");
    });

    // use the same browser for each page or puppeteer your computer
    // will explode ... well my toaster will explode
    const browser = await puppeteer.launch();

    for(let i = 0; i < championNames.length; i++) {
        let name = championNames[i];
        let data = await getDataForChampion(browser, name);
        await printToFile(name, JSON.stringify(data, null, 2));
    }

    await browser.close();
}
main();