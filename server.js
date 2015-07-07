var express        = require('express'),
    path           = require('path'),
    compression    = require("compression"),
    morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    fs             = require('fs'),
    http           = require('http'),
    strTools       = require(__dirname + '/lib/utils/string_tools.js'),
    mainApp,
    server;

mainApp = express();

mainApp.use(bodyParser.urlencoded({extended: true}));
mainApp.use(bodyParser.json());

mainApp.use(express.static(__dirname + '/assets'));

mainApp.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

mainApp.post('/workouts', function(req, res) {
    console.log("Got this");
    console.log(req.body);

    var fileName = strTools.generateBase62String(14) + '.json';
        wstream = fs.createWriteStream(__dirname + '/workout_files/' + fileName);

    wstream.end(req.body.data);
    wstream.on('finish', function () {
        res.status(200);
        res.json({
            message : "Workout saved"
        });
    });
});

mainApp.use(function handleNotFound(req, res, next) {
    res.status(404).send('Not found');
});

mainApp.use(function handleServerErrors(error, req, res, next) {
    console.log("\nServer catched error, ", error, error.stack);
    res.status(500);
    res.json({
        message : "Unknown error :("
    });
});

server = http.createServer(mainApp);

server.listen(3001);
console.log('Server ready and listening');

process.on('SIGTERM', function handleSigterm(e) {
    console.log('SIGTERM catched ', e);
    server.close();
});
