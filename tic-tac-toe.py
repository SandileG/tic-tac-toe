def initialize_board():
    """
    Initializes a 3x3 game board.
    
    Returns:
        list: A 3x3 list of lists initialized with empty spaces.
    """
    return [[" " for _ in range(3)] for _ in range(3)]

def print_board(board):
    """
    Prints the current state of the game board.
    
    Args:
        board (list): The current game board.
    """
    for row in board:
        print("|".join(row))
        print("-" * 5)

def check_win(board, player):
    """
    Checks if the given player has won the game.
    
    Args:
        board (list): The current game board.
        player (str): The player to check ('X' or 'O').
        
    Returns:
        bool: True if the player has won, False otherwise.
    """
    # Check rows
    for row in board:
        if all(cell == player for cell in row):
            return True
    # Check columns
    for col in range(3):
        if all(row[col] == player for row in board):
            return True
    # Check diagonals
    if all(board[i][i] == player for i in range(3)) or all(board[i][2 - i] == player for i in range(3)):
        return True
    return False

def check_draw(board):
    """
    Checks if the game is a draw.
    
    Args:
        board (list): The current game board.
        
    Returns:
        bool: True if the game is a draw, False otherwise.
    """
    return all(cell != " " for row in board for cell in row)

def player_move(board, player):
    """
    Handles a player's move.
    
    Args:
        board (list): The current game board.
        player (str): The player making the move ('X' or 'O').
    """
    while True:
        try:
            move = input(f"Player {player}, enter your move (row and column): ").split()
            if len(move) != 2:
                print("Enter two numbers separated by space.")
                continue
            row, col = map(int, move)
            if row not in range(3) or col not in range(3):
                print("Row and column numbers must be between 0 and 2.")
                continue
            if board[row][col] != " ":
                print("This cell is already occupied. Try again.")
                continue
            board[row][col] = player
            break
        except ValueError:
            print("Invalid input. Enter row and column numbers between 0 and 2.")

def minimax(board, depth, is_maximizing, player):
    """
    Implements the Minimax algorithm for the AI to determine the best move.
    
    Args:
        board (list): The current game board.
        depth (int): The current depth in the game tree.
        is_maximizing (bool): True if the current move is for maximizing player, False if minimizing.
        player (str): The AI player ('X' or 'O').
        
    Returns:
        int: The score of the board.
    """
    opponent = "O" if player == "X" else "X"
    
    if check_win(board, player):
        return 1
    if check_win(board, opponent):
        return -1
    if check_draw(board):
        return 0

    if is_maximizing:
        best_score = -float('inf')
        for i in range(3):
            for j in range(3):
                if board[i][j] == " ":
                    board[i][j] = player
                    score = minimax(board, depth + 1, False, player)
                    board[i][j] = " "
                    best_score = max(score, best_score)
        return best_score
    else:
        best_score = float('inf')
        for i in range(3):
            for j in range(3):
                if board[i][j] == " ":
                    board[i][j] = opponent
                    score = minimax(board, depth + 1, True, player)
                    board[i][j] = " "
                    best_score = min(score, best_score)
        return best_score

def ai_move(board, player):
    """
    Determines the best move for the AI player using the Minimax algorithm.
    
    Args:
        board (list): The current game board.
        player (str): The AI player ('X' or 'O').
    """
    best_score = -float('inf')
    best_move = None
    for i in range(3):
        for j in range(3):
            if board[i][j] == " ":
                board[i][j] = player
                score = minimax(board, 0, False, player)
                board[i][j] = " "
                if score > best_score:
                    best_score = score
                    best_move = (i, j)
    if best_move:
        board[best_move[0]][best_move[1]] = player

def main():
    """
    The main function to run the Tic-Tac-Toe game.
    """
    board = initialize_board()
    print("Welcome to Tic-Tac-Toe!")
    mode = input("Enter '1' to play against another person or '2' to play against AI: ")

    player1 = "X"
    player2 = "O"
    current_player = player1

    while True:
        print_board(board)
        if mode == "1" or (mode == "2" and current_player == player1):
            player_move(board, current_player)
        else:
            ai_move(board, current_player)

        if check_win(board, current_player):
            print_board(board)
            print(f"Player {current_player} wins!")
            break

        if check_draw(board):
            print_board(board)
            print("It's a draw!")
            break

        current_player = player2 if current_player == player1 else player1

if __name__ == "__main__":
    main()
