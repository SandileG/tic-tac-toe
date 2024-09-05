import tkinter as tk
from tkinter import messagebox

def check_win():
    """
    Checks for a win or draw.
    """
    for row in range(3):
        if board[row][0] == board[row][1] == board[row][2] != "":
            return board[row][0]
    for col in range(3):
        if board[0][col] == board[1][col] == board[2][col] != "":
            return board[0][col]
    if board[0][0] == board[1][1] == board[2][2] != "":
        return board[0][0]
    if board[0][2] == board[1][1] == board[2][0] != "":
        return board[0][2]
    if all(board[row][col] != "" for row in range(3) for col in range(3)):
        return "Draw"
    return None

def ai_move():
    """
    Determines the best move for the AI player using the Minimax algorithm.
    """
    best_score = -float('inf')
    best_move = None
    for i in range(3):
        for j in range(3):
            if board[i][j] == "":
                board[i][j] = "O"
                score = minimax(board, 0, False)
                board[i][j] = ""
                if score > best_score:
                    best_score = score
                    best_move = (i, j)
    if best_move:
        board[best_move[0]][best_move[1]] = "O"
        buttons[best_move[0]][best_move[1]].config(text="O")

def minimax(board, depth, is_maximizing):
    opponent = "X" if is_maximizing else "O"

    result = check_win()
    if result == "X":
        return -1
    elif result == "O":
        return 1
    elif result == "Draw":
        return 0

    if is_maximizing:
        best_score = -float('inf')
        for i in range(3):
            for j in range(3):
                if board[i][j] == "":
                    board[i][j] = "O"
                    score = minimax(board, depth + 1, False)
                    board[i][j] = ""
                    best_score = max(score, best_score)
        return best_score
    else:
        best_score = float('inf')
        for i in range(3):
            for j in range(3):
                if board[i][j] == "":
                    board[i][j] = "X"
                    score = minimax(board, depth + 1, True)
                    board[i][j] = ""
                    best_score = min(score, best_score)
        return best_score

def on_button_click(row, col):
    """
    Handles the button click event.
    """
    global game_over
    if board[row][col] == "" and not game_over:
        board[row][col] = "X"
        buttons[row][col].config(text="X")

        result = check_win()
        if result:
            if result == "Draw":
                messagebox.showinfo("Result", "It's a draw!")
            else:
                messagebox.showinfo("Result", f"Player {result} wins!")
            game_over = True
            return

        # AI makes its move
        ai_move()
        result = check_win()
        if result:
            if result == "Draw":
                messagebox.showinfo("Result", "It's a draw!")
            else:
                messagebox.showinfo("Result", f"Player {result} wins!")
            game_over = True

def reset_game():
    """
    Resets the game board for a new game.
    """
    global game_over, board
    game_over = False
    board = [["" for _ in range(3)] for _ in range(3)]
    for row in range(3):
        for col in range(3):
            buttons[row][col].config(text="")

# Initialize the main window
root = tk.Tk()
root.title("Tic-Tac-Toe")

# Initialize the game state
game_over = False
board = [["" for _ in range(3)] for _ in range(3)]
buttons = [[None for _ in range(3)] for _ in range(3)]

# Create the buttons for the grid
for row in range(3):
    for col in range(3):
        buttons[row][col] = tk.Button(root, text="", font=("Arial", 36), width=5, height=2,
                                      command=lambda r=row, c=col: on_button_click(r, c))
        buttons[row][col].grid(row=row, column=col)

# Add a reset button
reset_button = tk.Button(root, text="Reset", font=("Arial", 20), command=reset_game)
reset_button.grid(row=3, column=0, columnspan=3)

# Start the Tkinter event loop
root.mainloop()

