// Function to update the game board UI
// This function updates the visual board based on the current state of the 'board' array.
function updateBoardDisplay(board, boardElement) {
    board.forEach((value, index) => {
        boardElement.children[index].textContent = value; // Update each board cell with 'X', 'O', or ''
    });
}

// Initialize the game variables
let board = Array(9).fill('');  // Represents the 3x3 grid with 9 cells
let currentPlayer = 'X';  // Starts with player 'X'
let gameActive = true;    // Boolean to track if the game is ongoing

const statusElement = document.getElementById('status');  // Game status display
const boardElement = document.getElementById('board');    // Tic-tac-toe grid element

// Function to handle player moves
function makeMove(index) {
    if (board[index] === '' && gameActive) {  // Check if the cell is empty and the game is active
        board[index] = currentPlayer;  // Mark the current player's symbol in the selected cell
        updateBoardDisplay(board, boardElement);  // Update the board display
        checkWinner();  // Check if the current move resulted in a win
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';  // Switch the turn to the next player
    }
}

// Function to check for a winner or draw
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Horizontal lines
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Vertical lines
        [0, 4, 8], [2, 4, 6]              // Diagonal lines
    ];

    // Loop through the winning combinations and check if any are met
    winningCombinations.forEach(combo => {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusElement.textContent = `${board[a]} wins!`;  // Display the winner
            gameActive = false;  // End the game
        }
    });

    // Check for a draw if all cells are filled
    if (!board.includes('') && gameActive) {
        statusElement.textContent = "It's a draw!";  // Display draw message
        gameActive = false;  // End the game
    }
}

// Function to reset the game state
function resetGame() {
    board.fill('');  // Clear the board array
    currentPlayer = 'X';  // Reset to 'X'
    gameActive = true;  // Make the game active again
    updateBoardDisplay(board, boardElement);  // Update the board UI
    statusElement.textContent = "Game On!";  // Reset the status message
}

// Event listener for player clicks on the board
boardElement.addEventListener('click', (event) => {
    const index = Array.from(boardElement.children).indexOf(event.target);  // Get index of clicked cell
    if (index !== -1) makeMove(index);  // Call makeMove if the click was valid
});

// Event listener for the reset button
document.getElementById('reset-button').addEventListener('click', resetGame);  // Resets the game when clicked
