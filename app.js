// Setting up Express
const express = require('express');
const fs = require('fs');

// Creating server and setting port, resource path
var app = express();
var port = process.env.PORT || 8080;
app.use(express.static(__dirname));

// API middleware config
require('./api/pypi-downloads')(app)
require('./api/madlibz')(app)
require('./api/tic-tac-toe')(app)

/*
    Defining routes
*/

// homepage
app.get('/', function (req, res) {
    res.sendFile('public/_root.html', { root: __dirname });
});

// Tic Tac Toe
app.get('/ttt', function (req, res) {
    res.sendFile('./static/ttt.html', { root: __dirname });
});

// Math 241
app.get('/math241', function (req, res) {
    res.sendFile('./static/math241.html', { root: __dirname });
});

app.get('/math241.pdf', function (req, res) {
    res.sendFile('./static/math241.pdf', { root: __dirname });
});

// any other page
app.get('/:route*', function (req, res) {
    filePath = './public' + req.url;
    altFilePath = './public' + req.url.toLowerCase();
    if (fs.existsSync(filePath + '.html'))
        res.sendFile(filePath + '.html', { root: __dirname });
    else if (fs.existsSync(altFilePath + 'html')) {
        res.sendFile(altFilePath + '.html', { root: __dirname });
    }
    else {
        try {
            fs.accessSync(filePath);
            res.sendFile(filePath + '/_root.html', { root: __dirname });
        } catch (err) {
            res.sendFile('templates/404.html', { root: __dirname });
        }
    }
});

// google site verification
app.get('/google8eaa6c0f88ac5211.html', function (req, res) {
    res.sendFile('google_verification.html', { root: __dirname });
});

// starting server
app.listen(port, function () {
    console.log(`running server on port ${port}`);
});