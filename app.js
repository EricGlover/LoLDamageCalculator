const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
let router = express.Router();

router.get("/champion/:name", (req, res) => {
    let championName = req.params.name;

    res.send(req.params.name);
});

app.use('/', router);

app.listen(port, (res, req) => {
    console.log(`Running on port ${port}`);
});