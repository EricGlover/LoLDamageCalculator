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

// router.get("/champion")

router.get("/champion", async (req, res) => {
    let details = req.query.details === 'true';
    let champions = await importer.importAllFormattedChampions();
    let responseData = {};
    if(details) {
        [...champions.entries()].forEach(([name, val]) => responseData[name] = val);
    } else {
        responseData = [...champions.entries()].map(([name, val]) => {
            return {name, image: val.image};
        });
    }
    res.json(responseData);
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