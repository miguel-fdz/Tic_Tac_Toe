/////// PLAYER FACTORY ///////
const addPlayer = (name) => {
  let symbol;
  (gameboard.players.length > 0) ? symbol = 'O' : symbol = 'X';
  const toggleTurn = () => {};
  const playerWin = () => {};
  return {name, symbol};
};


/////// GAMEBOARD ///////
let gameboard = {
    board: ['','','','','','','','',''],
    players: [],
    turn: 0,
    render: () => {
      const board = document.getElementById("gameboard");
      while (board.firstChild) {
        board.removeChild(board.lastChild);
      }
      for (let i = 0; i < gameboard.board.length; i++) {
        const newTile = document.createElement("div");
        newTile.classList.add("gameboard__tile");
        newTile.setAttribute("data-index", `${i}`);
        newTile.innerHTML = gameboard.board[i];
        board.appendChild(newTile);
        newTile.addEventListener("click", (e) => {
          gameModule.makeMove(e.target.dataset.index);
          gameboard.render();
        })
      }
    }
  }


/////// GAME FLOW ///////
const gameModule = (() => {

  /** Game settings selection */
  let settings = {
    mode: ''
  }

  document.querySelectorAll(".settings__button").forEach(button => {
    let players = gameboard.players;
    let playerOneName = document.getElementById("playerOneName");
    let playerTwoName = document.getElementById("playerTwoName");
    button.addEventListener("click", (e) => {
      //insert newGame button functionality
      if (e.target.id === "newGame") {
        document.getElementById("settingsModal").classList.toggle("modal")
      };
      if (e.target.classList.contains("mode__button")) {
        gameModule.settings.mode = e.target.id;
      };
      if (e.target.id === "submitPlayers") {
        if (gameModule.settings.mode === "PvP") {
          (playerOneName.value === '') ? players.push(addPlayer(playerOneName.placeholder)) : players.push(addPlayer(playerOneName.value));
          (playerTwoName.value === '') ? players.push(addPlayer(playerTwoName.placeholder)) : players.push(addPlayer(playerTwoName.value));
          playerOneName.value = '';
          playerTwoName.value = '';
        } else if (gameModule.settings.mode === "PvAI") {
        //If PvAI selection, allow input of only one player
        }
        document.getElementById("gameboard").classList.toggle("gameboard")
      }
    })
  })

  /** Gameplay logic */
  function makeMove(tile) {
    if (gameboard.board[tile] === '') {
      gameboard.board[tile] = gameboard.players[gameboard.turn].symbol;
      (gameboard.turn == 0) ? gameboard.turn = 1 : gameboard.turn = 0;
    }
  }

  return {settings, makeMove}
})();


gameboard.render();