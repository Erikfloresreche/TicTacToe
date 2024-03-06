document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById(board);
    const status = document.getElementById(status);
    const resetButton = document.getElementById(reset);


    const playerX = 'x';

    const playerO = 'o';

    let humanPlayer = playerX;

    let gameActive = true;

    const boardSpaces = ['','','','','','','','',''];

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 1, 8],
        [2, 4, 6],
    ];


    handleCellClick = (e) => {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    }
 


});

