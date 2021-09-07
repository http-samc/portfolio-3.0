const request = require('request');
const { makeBadge, ValidationError } = require('badge-maker')
const ERROR = { message : "Unknown Error!" };

// Compiles raw data from PyPi stats into # of downloads and # of days
function getTotalDownloads(json) {
    var count = 0;

    try {
        json = json["data"];
        json.forEach(element => {
            count += element["downloads"];
        });
        return {
            downloads: count,
            days: json.length
        };
    }
    catch (e) {
        return ERROR;
    }
}

// Adds commas to numbers
function numWComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Uses json from getTotalDownloads + styling params to gen a badge with badge-maker
function makeLabel(json, labelColor, messageColor, style, label) {
    if (json == ERROR) { return ERROR }

    format = {
        label: label,
        message: numWComma(json["downloads"]),
        labelColor: labelColor,
        color: messageColor,
        style: style
    }

    try {
        return makeBadge(format)
    }
    catch (e) {
        return ERROR
    }
}

// Endpoints
module.exports = function(app) {

    // Documentation endpoint
    app.get('/api/pypi-downloads', function(req, res) {
        res.sendFile('assets/pypi-downloads.html', {root: __dirname});
    })
    // Pure JSON endpoint
    app.get('/api/pypi-downloads/:packageName', function(req, res) {
        request(`https://pypistats.org/api/packages/${req.params.packageName}/overall`,
        function(err, _, body) {
            if (!err)
                res.json(getTotalDownloads(JSON.parse(body)));
            else
                res.json(ERROR).status(500);
        });
    });

    // SVG badge endpoint
    app.get('/api/pypi-downloads/badge/:packageName', function(req, res) {

        if (req.query.labelColor != undefined) { var labelColor = req.query.labelColor }
        else { var labelColor = "#555" }

        if (req.query.messageColor != undefined) { var messageColor = req.query.messageColor }
        else { var messageColor = "#4c1" }

        if (req.query.style != undefined) { var style = req.query.style }
        else { var style = "flat" }

        if (req.query.label != undefined) { var label = req.query.label }
        else { var label = "PyPi Downloads" }

        request(`https://pypistats.org/api/packages/${req.params.packageName}/overall`,
        function(err, _, body) {
            if (!err) {
                res.set('Content-Type', 'image/svg+xml');
                res.send(makeLabel(
                    getTotalDownloads(JSON.parse(body)),
                    labelColor,
                    messageColor,
                    style,
                    label
                ));
            }
            else
                res.json(ERROR).status(500);
        });
    });
}