var gameModule = (function () {
  let gameboard = {
    board: ['','','','','','','','',''],
    players: []
  }

  const Player = (name) => {
    let symbol;
    if (gameboard.players.length < 1) {
      symbol = 'x'
    } else {
      symbol = 'o'
    }
    return {name, symbol};
  };

  document.addEventListener("click", (e) => {
    let players = gameboard.players;
    let nameInput = document.getElementById("playerName");
    if (e.target.id === "submitPlayer" && players.length< 2) {
      (nameInput.value === '') ? players.push(Player(nameInput.placeholder)) : players.push(Player(nameInput.value));
      nameInput.value = '';
      (players.length > 0) ? nameInput.placeholder = "Player Two" : nameInput.placeholder = "Player One";
    }
    if (e.target.classList.value === "gameboard__tile") {
      console.log(e.target.dataset.index)
      renderBoard();
    }
    // console.log(e.target.classList.value)
  })

  function renderBoard () {
    const board = document.getElementById("gameboard");
    for (let i = 0; i < gameboard.board.length; i++) {
      const newTile = document.createElement("div");
      newTile.classList.add("gameboard__tile");
      newTile.setAttribute("data-index", `${i}`);
      // newTile.innerHTML = 'x';
      board.appendChild(newTile);
    }
  }
  renderBoard();
})();