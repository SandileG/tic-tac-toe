// Game board and state initialization
let board = [
    ["", "", ""],  // Row 1
    ["", "", ""],  // Row 2
    ["", "", ""]   // Row 3
];
let gameOver = false;  // Tracks if the game has ended
let currentPlayer = "X";  // Player "X" starts the game

// Function to check for a win or a draw
function checkWin() {
    // Check each row for a win
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "") {
            return board[i][0];  // Return the winner (X or O)
        }
        // Check each column for a win
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== "") {
            return board[0][i];  // Return the winner (X or O)
        }
    }

    // Check diagonals for a win
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") {
        return board[0][0];  // Return the winner (X or O)
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "") {
        return board[0][2];  // Return the winner (X or O)
    }

    // Check for a draw (if all cells are filled and no winner)
    if (board.flat().every(cell => cell !== "")) {
        return "Draw";  // No spaces left, game is a draw
    }

    return null;  // No winner yet, game continues
}

// AI move logic using a simple strategy
function aiMove() {
    if (gameOver) return;  // Don't make a move if the game is over

    // AI picks the first available empty cell (simple AI logic)
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === "") {
                // AI places "O" in the first empty cell
                board[i][j] = "O";
                document.getElementById(`cell-${i}-${j}`).textContent = "O";

                // Check if the AI's move results in a win or draw
                let result = checkWin();
                if (result) {
                    document.getElementById("status").textContent = result === "Draw" ? "It's a draw!" : `Player ${result} wins!`;
                    gameOver = true;  // End the game if there's a winner or a draw
                }
                return;  // AI makes only one move
            }
        }
    }
}

// Function to handle user moves
function handleMove(row, col) {
    if (board[row][col] === "" && !gameOver) {  // Ensure the clicked cell is empty and game isn't over
        board[row][col] = currentPlayer;  // Place current player's symbol in the cell
        document.getElementById(`cell-${row}-${col}`).textContent = currentPlayer;  // Update the cell on the UI

        // Check if the player won or if it's a draw
        let result = checkWin();
        if (result) {
            document.getElementById("status").textContent = result === "Draw" ? "It's a draw!" : `Player ${result} wins!`;
            gameOver = true;  // End the game if there's a winner or a draw
        } else {
            // Switch turns between player and AI
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            if (currentPlayer === "O") {
                aiMove();  // Trigger AI move
                currentPlayer = "X";  // Switch back to player after AI move
            }
        }
    }
}

// Function to reset the game
function resetGame() {
    // Reset the board state and game variables
    board = [
        ["", "", ""],  // Row 1
        ["", "", ""],  // Row 2
        ["", "", ""]   // Row 3
    ];
    gameOver = false;  // Reset gameOver flag
    currentPlayer = "X";  // Player "X" starts the game again

    // Clear the UI by resetting all the cell contents
    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
    });

    // Reset the status message
    document.getElementById("status").textContent = "";
}

// Add event listeners to all cells on the board
document.querySelectorAll(".cell").forEach((cell, index) => {
    let row = Math.floor(index / 3);  // Calculate the row number
    let col = index % 3;  // Calculate the column number
    cell.addEventListener("click", () => handleMove(row, col));  // Handle move when a cell is clicked
});

// Add event listener to the reset button
document.getElementById("reset-button").addEventListener("click", resetGame);  // Reset game when button is clicked
