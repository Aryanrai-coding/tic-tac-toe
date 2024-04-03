// make an gameboard array inside the gameboard object
// players are going to be stored in objects
// one object to control the flow of the game





function Gameboard() {

    // gameboard array
    const grid = 3;
    const board = [];

    for (let i = 0; i < grid; i++) {
        board[i] = [];
        for (let j = 0; j < grid; j++) {
            board[i].push(Cell());
        }
    }

    // to get the board
    const getBoard = () => board;


    // adding player symbol to board on selected cell
    const addSymbol = (row, column, player) => {
        if ((board[row][column].getValue() !== ' ')) {
            return;
        } else {
            board[row][column].addValue(player);
        }
    };

    //function to print the board to console

    const printBoard = () => {
        const cellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(cellValues);
    }



    return {
        getBoard,
        addSymbol,
        printBoard,
        grid
    };
}

function Cell() {
    let value = ' ';

    const addValue = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        addValue,
        getValue
    }
}

function Game() {

    const board = Gameboard();

    // players object 
    const players = [
        {
            name: 'Player One',
            value: 'X'
        },
        {
            name: 'Player Two',
            value: 'O'
        }
    ];

    let activePlayer = players[0];

    // switching active players

    const switchPlayersTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    // getting the active player

    const getActivePlayer = () => activePlayer;

    // printing new round`

    const printNewRound = () => {
        board.printBoard();

        console.log(`${getActivePlayer().name}'s turn.`)
    };

    // function to play the round
    const playRound = (row, column) => {

        // adding the player symbol to board's cell
        board.addSymbol(row, column, getActivePlayer().value);

        // winning logic

        const rowsMatching = () => board.getBoard().some(row => row.every(cell => cell.getValue() === getActivePlayer().value));


        const colMatching = () => board.getBoard().every(row => row[column].getValue() === getActivePlayer().value);


        const hasDiagonalWin = () => {
            const boardData = board.getBoard();
            const { grid } = board;
            const activePlayerValue = getActivePlayer().value;

            let diagonal1 = true;
            let diagonal2 = true;

            for (let i = 0; i < grid; i++) {
                diagonal1 = diagonal1 && (boardData[i][i].getValue() === activePlayerValue);
                diagonal2 = diagonal2 && (boardData[i][grid - 1 - i].getValue() === activePlayerValue);
            }
            if (diagonal1 || diagonal2) {
                return true;
            }

            return false;
        }


        // const checkWin = () => {
        //     if (rowsMatching()) {
        //         return true;
        //     } else if (colMatching()) {
        //         return true;
        //     } else if (hasDiagonalWin()) {
        //         return true;
        //     } else {
        //         const isBoardFull = board.getBoard().every(row => row.every(cell => cell.getValue() !== ' '))
        //         if (isBoardFull) {
        //             console.log('It\'s a tie')
        //             return true;
        //         }

        //     }
        //     return false;
        // };

        const checkWin = () => {
            if (rowsMatching() || colMatching() || hasDiagonalWin()) {
                return true;
            } else {
                const isBoardFull = board.getBoard().every(row => row.every(cell => cell.getValue() !== ' '));
                if (isBoardFull) {
                    console.log("It's a tie!");
                    return false;
                }
            }
            return false;
        };

        const winner = checkWin();
        if (winner) {
            console.log(`${getActivePlayer().name} won!`);
        } else {
            switchPlayersTurn();
            printNewRound();
        }


    }


    return {
        getActivePlayer,
        playRound,
    }
}
const game = Game();