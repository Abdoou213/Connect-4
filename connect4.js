var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var redScore = 0;
var yellowScore = 0;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = [];

window.onload = function() {
    setGame();
    resetGame();
}

// Set up the initial game board
function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

// Place a game piece on the board
function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c];

    if (r < 0) {
        return;
    }

    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    } else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    r -= 1;
    currColumns[c] = r;

    checkWinner();
}

// Check for a winning configuration
function checkWinner() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let player = board[r][c];
            if (player !== ' ') {
                // Check horizontally, vertically, diagonally right, and diagonally left
                if (checkLine(r, c, 0, 1) || checkLine(r, c, 1, 0) || checkLine(r, c, 1, 1) || checkLine(r, c, 1, -1)) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

// Check for a winning line of pieces
function checkLine(row, col, deltaRow, deltaCol) {
    for (let i = 0; i < 4; i++) {
        let r = row + i * deltaRow;
        let c = col + i * deltaCol;
        if (r < 0 || r >= rows || c < 0 || c >= columns || board[r][c] !== board[row][col]) {
            return false;
        }
    }
    return true;
}

// Set the winner and update the scores
function setWinner(r, c) {
    let winner;
    if (board[r][c] == playerRed) {
        winner = "Red";
        redScore++;
    } else {
        winner = "Yellow";
        yellowScore++;
    }
    
    document.getElementById("red-score").textContent = "Red: " + redScore;
    document.getElementById("yellow-score").textContent = "Yellow: " + yellowScore;
    
    alert(winner + " Wins!");
    
    gameOver = true;
    document.getElementById("play-again-button").style.display = "block";
}

// Reset the game
function resetGame() {
    gameOver = false;
    currPlayer = playerRed;
    board = [];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.classList.remove("red-piece", "yellow-piece");
        }
        board.push(row);
    }

    document.getElementById("winner").textContent = "";
    currColumns = [5, 5, 5, 5, 5, 5, 5];
    document.getElementById("play-again-button").style.display = "none";
}
