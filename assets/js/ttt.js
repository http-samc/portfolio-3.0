const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

function renderBoard() {
    token = localStorage.getItem(id);
    player = localStorage.getItem(id + ":whoami");

    $.getJSON(`/api/tic-tac-toe/view/${id}/${token}`, function (json) {
        board = json.board;

        $("#b1").attr('value', board[0][0]);
        $("#b2").attr('value', board[0][1]);
        $("#b3").attr('value', board[0][2]);

        $("#b4").attr('value', board[1][0]);
        $("#b5").attr('value', board[1][1]);
        $("#b6").attr('value', board[1][2]);

        $("#b7").attr('value', board[2][0]);
        $("#b8").attr('value', board[2][1]);
        $("#b9").attr('value', board[2][2]);

        // If its our turn, if not the status in sendMove() will still be valid
        if ((json.xTurn && player === "X") || (!json.xTurn && player === "O"))
            $("#status").text("Your turn 💯")
        else {
            $("#status").text("Waiting for opponent 🤧"); // only useful when other player calls reset & no lag
        }
    });
}

// Listen to grid click events to send the move to the server
function sendMove(position) {
    token = window.localStorage.getItem(id);
    $.ajax({
        type: "POST",
        url: `/api/tic-tac-toe/play`,
        data: { id: id, spotClaimed: position, token: token },
        success: () => {
            $.notify("Moved successfully 😈", "success");
            $("#status").text("Waiting for opponent 🤧");
        },
        error: () => { $.notify("Please wait for your turn 😤", "warn") }
    });
    renderBoard();
}

// Keep the same players, tokens, and links but just reset the game
function restartGame() {
    token = window.localStorage.getItem(id);
    $.ajax({
        type: "GET",
        url: `/api/tic-tac-toe/reset/${id}/${token}`,
    }).done(
        () => {
            $.notify("Reset game!", "info")
        }
    );
    renderBoard();
}

// Create a brand new game
function createGame() {
    $.getJSON(`/api/tic-tac-toe/create`, function (json) {
        window.location.href += `?id=${json.id}`;
    });
}

// Get your player token
function getToken() {
    $.ajax({
        type: "GET",
        url: `/api/tic-tac-toe/auth/${id}`,
        dataType: 'json',
        success: (json) => {
            localStorage.setItem(id, json.token);
            localStorage.setItem(id + ":whoami", json.player);
            renderBoard();
        },
        error: () => {
            $.notify("This game is full!", "error");
        }
    });
}

$(document).ready(() => {

    if (id) {
        // Get a token to play if we don't have one
        if (!localStorage.getItem(id)) {
            getToken();
        }
        else {
            renderBoard();
        }
    }
    else {
        createGame();
    }
    setInterval(renderBoard, 2000); // loop to keep board updated
})