// create a gameboard function returning obj inside it
// create variables for the rows and columns of the board
// create an empty array for the board
// create a 2d array by looping rows and inside it looping columns
// 

function Gameboard() {
    let rows = 3;
    let columns = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    // get entire board 
    const getBoard = () => board;


    // adding symbol
    const dropSymbol = (row, column, player) => {
        if (board[row][column].getSymbol() === '') {
            board[row][column].addSymbol(player.symbol);
            return true; // Valid move
        }
        return false; // Invalid move, cell already occupied
    };

    // print the board
    const printBoard = () => {
        const boardWithCellSymbol =
            board.map((row) => row.map((cell) =>
                cell.getSymbol()))
        console.log(boardWithCellSymbol);
    };

    return { getBoard, dropSymbol, printBoard };

}


function Cell() {
    let symbol = '';

    const addSymbol = (player) => {
        symbol = player;
    };

    const getSymbol = () => symbol;

    return {
        addSymbol,
        getSymbol
    };
}
// player object for storing player name and symboln
function Player(name, symbol) {
    return {
        name, symbol,
    }
}

// check for win
function checkWin(board, playerSymbol) {
    for (let row = 0; row < board.length; row++) {
        if (board[row].every(cell => cell.getSymbol() === playerSymbol)) {
            return true;
        }
    }

    for (let col = 0; col < board[0].length; col++) {
        if (board.every(row => row[col].getSymbol() === playerSymbol)) {
            return true;
        }
    }

    if (
        (board[0][0].getSymbol() === playerSymbol && board[1][1].getSymbol() === playerSymbol && board[2][2].getSymbol() === playerSymbol) ||
        (board[0][2].getSymbol() === playerSymbol && board[1][1].getSymbol() === playerSymbol && board[2][0].getSymbol() === playerSymbol)
    ) {
        return true;
    }

    return false;
}
// check for tie

function checkTie(board) {
    for (let row of board) {
        for (let cell of row) {
            if (cell.getSymbol() === '') {
                return false; // If any cell is empty, the game is not tied
            }
        }
    }
    return true;
}


function Game(playerOneName = 'Player One', playerTwoName = 'Player Two') {

    const board = Gameboard();

    const players = [
        Player(playerOneName, 'X'),
        Player(playerTwoName, 'O')
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer ===
            players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();

        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const playRound = (row, column) => {
        console.log(
            `Dropping ${getActivePlayer().name}'s symbol into row ${row}, column ${column}...`
        )

        if (board.dropSymbol(row, column, getActivePlayer())) {

            if (checkWin(board.getBoard(), getActivePlayer().symbol)) {
                console.log(`Player ${getActivePlayer().name} wins!`);
                return;
            } else if (checkTie(board.getBoard())) {
                console.log('It\'s a tie!');
                return;
            } else {
                switchPlayerTurn();
                printNewRound();
            }

        } else {
            console.log('Invalid move. Cell already occupied.');
        }
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer,
    };
}

const game = Game();

