const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

function renderBoard() {
    $.getJSON(`/api/tic-tac-toe/view/${id}`, function (json) {
        board = json.board;
        b1.value = board[0][0];
        b2.value = board[0][1];
        b3.value = board[0][2];

        b4.value = board[1][0];
        b5.value = board[1][1];
        b6.value = board[1][2];

        b7.value = board[2][0];
        b8.value = board[2][1];
        b9.value = board[2][2];

    });
}

function sendMove(position) {
    $.ajax({
        type: "POST",
        url: `/api/tic-tac-toe/play`,
        data: { id: id, spotClaimed: position},
    });
    renderBoard();
}

function restartGame() {
    $.ajax({
        type: "GET",
        url: `/api/tic-tac-toe/reset/${id}`,
    });
    renderBoard();
}

function createGame() {
    $.getJSON(`/api/tic-tac-toe/create`, function (json) {
        window.location.href += `?id=${json.id}`;
    });
}

$(document).ready(() => {

    const b1 = document.getElementById("b1");
    const b2 = document.getElementById("b2");
    const b3 = document.getElementById("b3");

    const b4 = document.getElementById("b4");
    const b5 = document.getElementById("b5");
    const b6 = document.getElementById("b6");

    const b7 = document.getElementById("b7");
    const b8 = document.getElementById("b8");
    const b9 = document.getElementById("b9");

    if (id) { renderBoard() }
    else { createGame() }
    setInterval(renderBoard, 5000); // loop to keep board updated
})