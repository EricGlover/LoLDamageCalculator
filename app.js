const express = require("express");
const app = express();
const fs = require('fs');
const port = process.env.PORT || 8080;
let router = express.Router();
const Importer = require('./backend/DataScraper/Importer.js');
const importer = new Importer();


router.get("/champion/caitlyn", (req, res) => {
    let championName = "Caitlyn";
    try {
        let str = fs.readFileSync(`./data/championFormatted/${championName}.json`);
        res.send(str);
    } catch(e) {
        console.error(e);
        res.send("error");
    }
});

router.get("/champion", async (req, res) => {
    let champions = await importer.importAllFormattedChampions();
    let obj = {};
    [...champions.entries()].forEach(([name, val]) => obj[name] = val);
    // console.log(champions);
    res.json(obj);

    // let champions = await importer.importAllFormattedChampions();
    // res.json(champions);
});

router.get("/champion/:name", (req, res) => {
    let championName = req.params.name;
    let champion = importer.importFormattedChampionData(championName);
    res.json(champion);
});

app.use('/', router);

app.listen(port, (res, req) => {
    console.log(`Running on port ${port}`);
});