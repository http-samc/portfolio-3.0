const request = require('request');
const fs = require('fs');
const ERROR = { message : "Unknown Error!" };

// Opens madlibs.json and returns random madlib
// CREDIT: https://github.com/HermanFassett/madlibz/blob/master/data/templates.json for the madlibs in JSON form
function getRandomMadlib() {
    try {
        let rawdata = fs.readFileSync('api/assets/madlibz.json');
        let madlibz = JSON.parse(rawdata)["madlibz"];
        return madlibz[Math.floor(Math.random()*madlibz.length)];
    }
    catch (e) {
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