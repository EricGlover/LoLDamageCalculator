const express = require("express");
const app = express();
const fs = require('fs');
const port = process.env.PORT || 8080;
let router = express.Router();



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
    let championName = req.params.name;

    res.send(req.params.name);
});

app.use('/', router);

app.listen(port, (res, req) => {
    console.log(`Running on port ${port}`);
});