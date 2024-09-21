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

// AI move logic using a simple strategy
function aiMove() {
    if (gameOver) return;
    
    // AI picks the first available spot (simple AI logic)
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === "") {
                board[i][j] = "O";
                document.getElementById(`cell-${i}-${j}`).textContent = "O";
                
                // Check for win/draw after AI move
                let result = checkWin();
                if (result) {
                    document.getElementById("status").textContent = result === "Draw" ? "It's a draw!" : `Player ${result} wins!`;
                    gameOver = true;
                }
                return; // AI makes only one move
            }
        }
    }
}

// Function to handle user moves
function handleMove(row, col) {
    if (board[row][col] === "" && !gameOver) {
        board[row][col] = currentPlayer;
        document.getElementById(`cell-${row}-${col}`).textContent = currentPlayer;

        let result = checkWin();
        if (result) {
            document.getElementById("status").textContent = result === "Draw" ? "It's a draw!" : `Player ${result} wins!`;
            gameOver = true;
        } else {
            // Switch to AI's turn
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            if (currentPlayer === "O") {
                aiMove();
                currentPlayer = "X"; // Switch back to player after AI move
            }
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

