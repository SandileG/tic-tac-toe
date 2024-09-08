// Game board and state initialization
let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
let gameOver = false;
let currentPlayer = "X";

// Function to check for a win or a draw
function checkWin() {
    // Check rows, columns, and diagonals for a win
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "") {
            return board[i][0];
        }
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== "") {
            return board[0][i];
        }
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") {
        return board[0][0];
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "") {
        return board[0][2];
    }
    // Check for draw
    if (board.flat().every(cell => cell !== "")) {
        return "Draw";
    }
    return null;
}

// Function to handle user moves
function handleMove(row, col) {
    if (board[row][col] === "" && !gameOver) {
        board[row][col] = currentPlayer;
        document.getElementById(`cell-${row}-${col}`).textContent = currentPlayer;

        let result = checkWin();
        if (result) {
            document.getElementById("status").textContent = result === "Draw" ? "It's a draw!" : `${result} wins!`;
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

// Reset the game
function resetGame() {
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    gameOver = false;
    currentPlayer = "X";
    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
    });
    document.getElementById("status").textContent = "";
}

// Add event listeners to all cells
document.querySelectorAll(".cell").forEach((cell, index) => {
    let row = Math.floor(index / 3);
    let col = index % 3;
    cell.addEventListener("click", () => handleMove(row, col));
});

// Reset button event listener
document.getElementById("reset-button").addEventListener("click", resetGame);

