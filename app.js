// Run any other pre-build compilations you need here...
const projects = require('./utils/gen-project-fragment');
projects.genFragment();

// Now, start off by building all html pages to ./public
const render = require('./utils/render-md');
render.render('/Users/sam/dev/smrth.dev/content', '/Users/sam/dev/smrth.dev/public', '/Users/sam/dev/smrth.dev/templates/base.html')

// Setting up Express
const express = require('express');
const fs = require('fs')

// Creating server and setting port, resource path
var app = express();
var port = process.env.PORT || 8080;
app.use(express.static(__dirname));
//require('./api/pypi-downloads')(app)
//require('./api/madlibz')(app)

/*
    Defining routes
*/

// homepage
app.get('/', function (req, res) {
    res.sendFile('public/_root.html', {root: __dirname});
});

// any other page
app.get('/:route*', function (req, res) {
    filePath = './public' + req.url;
    if (fs.existsSync(filePath+'.html'))
        res.sendFile(filePath+'.html', {root: __dirname});
    else {
        try {
            fs.accessSync(filePath);
            res.sendFile(filePath+'/_root.html', {root: __dirname});
        } catch (err) {
            res.sendFile('templates/404.html', {root: __dirname});
        }
    }
});

// google site verification
app.get('/google8eaa6c0f88ac5211.html', function (req, res) {
    res.sendFile('google_verification.html', {root: __dirname});
});

// starting server
app.listen(port, function() {
    console.log(`running server on port ${port}`)
});