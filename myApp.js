let express = require('express');
let app = express();
require('dotenv').config();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", (req, res, next) => {
    console.log(req.method, req.path, "-", req.ip);
    next();
})

app.use("/public", express.static(__dirname + "/public"));

absolutePath = __dirname + '/views/index.html';

app.get("/", (req, res) => {
    res.sendFile(absolutePath);
    // res.send("Hello Express");
})

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({ time: req.time });
});

app.get("/json", (req, res) => {
    const message = process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json";
    res.json({ "message": message })
})

app.get("/:word/echo", (req, res) => {
    res.json({ echo: req.params.word });
})

app.get("/name", (req, res) => {
    const fullname = req.query.first + " " + req.query.last;
    res.json({ name: fullname });
})

app.post("/name", (req, res) => {
    const fullname = req.body.first + " " + req.body.last;
    res.json({ name: fullname });
})



































module.exports = app;
