const request = require('request');
const fs = require('fs');
const ERROR = { message : "Unknown Error!" };

function getRandomMadlib() {
    try {
        let rawdata = fs.readFileSync('api/assets/madlibz.json');
        let madlibz = JSON.parse(rawdata)["madlibz"];
        return madlibz[Math.floor(Math.random()*madlibz.length)];
    }
    catch (e) {
        console.log(e)
        return ERROR;
    }
}

// Endpoints
module.exports = function(app) {

    // Main endpoint
    app.get('/api/madlibz', function(req, res) {
        try {
            res.json(getRandomMadlib());
        }
        catch (e) {
            res.json(ERROR).status(500);
        }
    });
}