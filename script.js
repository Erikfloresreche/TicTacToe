document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');
  
    const PLAYER_X = 'x';
    const PLAYER_O = 'o';
    let currentPlayer = PLAYER_X;
    let gameActive = true;
    const boardState = ['', '', '', '', '', '', '', '', ''];
    const WINNING_COMBINATIONS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    board.addEventListener('click', handleCellClick);
    resetButton.addEventListener('click', startGame);
  
    startGame();
  
    function handleCellClick(e) {
      const clickedCell = e.target;
      const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
  
      if (boardState[clickedCellIndex] !== '' || !gameActive) return;

    if (currentPlayer === PLAYER_O) return; 

    placeMark(clickedCell, clickedCellIndex);
    boardState[clickedCellIndex] = currentPlayer;

    if (checkWin(currentPlayer)) {
      endGame(currentPlayer);
    } else if (isDraw()) {
      endGame(null);
    } else {
      currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
      status.innerText = `Turno del jugador ${currentPlayer.toUpperCase()}`;

      if (currentPlayer === PLAYER_O) {
        setTimeout(() => {
          computerTurn();
        }, 500);
      }
    }
  }
  
    function placeMark(cell, index) {
      cell.classList.add(currentPlayer);
      cell.innerText = currentPlayer.toUpperCase();
    }
  
    function computerTurn() {
      let bestMove = getBestMove();
      if (bestMove === -1) {
        bestMove = getRandomMove();
      }
  
      const cellElement = document.querySelector(`[data-cell-index='${bestMove}']`);
      if (cellElement) {
        placeMark(cellElement, bestMove);
        boardState[bestMove] = currentPlayer;
  
        if (checkWin(currentPlayer)) {
          endGame(currentPlayer);
        } else if (isDraw()) {
          endGame(null);
        } else {
          currentPlayer = PLAYER_X;
          status.innerText = `Turno del jugador X`;
        }
      }
    }
  
    function getBestMove() {
      let bestScore = -Infinity;
      let move = -1;
  
      for (let i = 0; i < 9; i++) {
        if (boardState[i] === '') {
          boardState[i] = PLAYER_O;
          let score = minimax(boardState, 0, false);
          boardState[i] = '';
  
          if (score > bestScore) {
            bestScore = score;
            move = i;
          }
        }
      }
  
      return move;
    }
  
    function minimax(boardState, depth, isMaximizing) {
      const result = checkWinner();
      if (result !== null) {
        return result === PLAYER_O ? 10 - depth : depth - 10;
      }
  
      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
          if (boardState[i] === '') {
            boardState[i] = PLAYER_O;
            bestScore = Math.max(bestScore, minimax(boardState, depth + 1, !isMaximizing));
            boardState[i] = '';
          }
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
          if (boardState[i] === '') {
            boardState[i] = PLAYER_X;
            bestScore = Math.min(bestScore, minimax(boardState, depth + 1, !isMaximizing));
            boardState[i] = '';
          }
        }
        return bestScore;
      }
    }
  
    function getRandomMove() {
      const availableCells = boardState.reduce((acc, curr, index) => {
        if (curr === '') {
          acc.push(index);
        }
        return acc;
      }, []);
      return availableCells[Math.floor(Math.random() * availableCells.length)];
    }
  
    function checkWinner() {
      for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        const [a, b, c] = WINNING_COMBINATIONS[i];
        if (boardState[a] !== '' && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
          return boardState[a];
        }
      }
      return null;
    }
  
    function checkWin(player) {
      return checkWinner() === player;
    }
  
    function isDraw() {
      return !boardState.includes('');
    }
  
    function endGame(winner) {
      if (winner === null) {
        status.innerText = '¡Empate!';
      } else {
        status.innerText = `¡Jugador ${winner.toUpperCase()} gana!`;
      }
      gameActive = false;
    }
  
    function startGame() {
      boardState.fill('');
      gameActive = true;
      currentPlayer = PLAYER_X;
      status.innerText = `Turno del jugador X`;
  
      board.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove(PLAYER_X);
        cell.classList.remove(PLAYER_O);
        cell.innerText = '';
      });
    }
  });