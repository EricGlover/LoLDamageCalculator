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
        // let obj = JSON.parse(str);
        // res.json(obj);
    } catch(e) {
        console.error(e);
        res.send("error");
    }
    // res.send(req.params.name);
});

router.get("/champion/:name", (req, res) => {
    // res.send(req.params.name);
    // return;
    let championName = req.params.name;
    let champion = importer.importFormattedChampionData(championName);

    res.json(champion);
});

app.use('/', router);

app.listen(port, (res, req) => {
    console.log(`Running on port ${port}`);
});