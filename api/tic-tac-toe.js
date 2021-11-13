const fs = require('fs')
const bodyParser = require("body-parser");
const express = require("express");
const { error } = require('console');

// TODO utilize lastMove function...
function read() {
    let data = fs.readFileSync('api/assets/tic-tac-toe.json');
    let json = JSON.parse(data);
    return json;
}

function write(data) {
    fs.writeFileSync('api/assets/tic-tac-toe.json', JSON.stringify(data));
}

function getToken(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Endpoints
module.exports = function (app) {

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Get player token endpoint
    app.get('/api/tic-tac-toe/auth/:id', function (req, res) {
        id = req.params.id;

        try {
            gameData = read();
            gameData[id] // check if game exists, will throw err if not

            token = getToken(8);

            if (gameData[id].xPlayer && gameData[id].oPlayer) {
                throw error();
            }

            // Delegate token to appropriate player
            if (gameData[id].xPlayer) {
                gameData[id].oPlayer = token;
                player = "O";
            }
            else {
                gameData[id].xPlayer = token;
                player = "X";
            }

            write(gameData);
            res.send({ message: "Created player!", token: token, player: player });
        }
        catch (err) {
            res.status(404);
            res.send({ message: "Error adding player!" });
        }
    });

    // Send move endpoint
    app.post('/api/tic-tac-toe/play', function (req, res) {
        data = req.body

        // Getting necessary data points
        token = data.token;
        id = data.id;
        row = data['spotClaimed[]'][0];
        col = data['spotClaimed[]'][1];

        try {
            gameData = read();
            game = gameData[id];

            // If timestamp too old
            now = Math.round(new Date().getTime() / 1000);
            if (now - game.lastMove > 200000) {
                throw error();
            }

            // If you're X and it is your turn
            if (token === game.xPlayer && game.xTurn && !game.board[row][col]) {
                game.board[row][col] = "X";
            }
            // If your're O and it is your turn
            else if (token === game.oPlayer && !game.xTurn && !game.board[row][col]) {
                game.board[row][col] = "O";
            }
            // If you're not a player or it isn't your turn or filled space
            else {
                throw error();
            }

            // Safely update main dataset and write to db
            game.xTurn = !game.xTurn;
            gameData[id] = game;
            write(gameData);

            res.send({ message: "Moved successfully!" });
        }

        catch (err) {
            res.status(404);
            res.send({ message: "Unknown Error!" });
        }
    });

    // Get board endpoint
    app.get('/api/tic-tac-toe/view/:id/:token', function (req, res) {
        token = req.params.token;
        id = req.params.id;

        try {
            gameData = read();

            if (token === gameData[id].xPlayer || token === gameData[id].oPlayer) {
                res.send({ message: "Found board successfully!", board: gameData[id].board, xTurn: gameData[id].xTurn });
            }

            else {
                throw error()
            }
        }
        catch (err) {
            res.status(404);
            res.send({ message: "Error finding board!" });
        }
    });

    // Reset game endpoint
    app.get('/api/tic-tac-toe/reset/:id/:token', function (req, res) {
        token = req.params.token;
        id = req.params.id;

        try {
            gameData = read();
            if (token === gameData[id].xPlayer || token === gameData[id].oPlayer) {
                gameData[id].board = [
                    [null, null, null],
                    [null, null, null],
                    [null, null, null]
                ];
                gameData[id].xTurn = true;
                write(gameData);
                res.send({ message: "Reset board successfully!" });
            }

            else {
                throw error()
            }
        }
        catch (err) {
            res.status(404);
            res.send({ message: "Error finding board!" });
        }
    });

    // Create game endpoint
    app.get('/api/tic-tac-toe/create', function (req, res) {
        id = getToken(12);
        meta = {
            "xPlayer": null,
            "oPlayer": null,
            "xTurn": true,
            "board": [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ],
            "lastMove": Math.round(new Date().getTime() / 1000)
        }

        gameData = read();
        gameData[id] = meta;
        write(gameData);

        res.send({ message: "Successfully created game!", id: id });
    });
}