var game = {
  grid: new Array(9).fill([]),
  state: "ready",
  player: "X",
  turn: 1,
  reset() {
    this.player = "X"
    this.turn = 1
    for (const i in this.grid)
      this.grid[i] = []
  },
  play(index) {
    const value = this.grid[index]
    const token = this.player + this.turn
    if (typeof(value) == "string") return
    switch(this.state) {
      case "ready":
        value.push(token)
        this.state = "second-move"
        return
      case "second-move":
        if (value.includes(token)) return
        value.push(token)
        // TODO check if entangled
        this.state = "ready"
        this.player = this.player == "X" ? "O" : "X"
        if (this.player == "X") this.turn += 1
        return;
      case "entangled":
        // TODO
        return;
    }
  },
  winner() {
    const [a, b, c, d, e, f, g, h, i] = this.grid.map(e => {
      if (typeof(e) == "string") return e
    })
    
    if (a && (a == b && b == c || a == d && d == g || a == e && e == i))
      return a
    else if (e && (e == c && c == g || e == b && b == h || e == f && f == d))
      return e
    else if (i && (i == h && h == g || i == f && f == c))
      return i
  },
  full() {
    return this.grid.some(e => typeof(e) != "string")
  },

}

function setupBoard() {
  var gridElement = document.getElementById("qttt")
  var statusBox = document.getElementById("status")
  gridElement.innerHTML = ""
  // TODO: Clear all html inside gridElement and make from scratch
  const gsize = 3
  const bsize = 1
  for (let i = 0; i < gsize; i += 1) {
    for (let j = 0; j < gsize; j += 1) {
      const index = gsize * i + j
      const div = document.createElement("div")
      div.classList.add("square")
      if (i % bsize == 0) div.classList.add("top");
      if (j % bsize == 0) div.classList.add("left");
      if (j == gsize - 1) div.classList.add("right");
      if (i == gsize - 1) div.classList.add("bottom");
  
      div.onclick = () => registerInput(index)
      gridElement.appendChild(div)
    }
  }
  statusBox.innerText = `Player ${game.player}'s Turn`
}

function drawBoard() {
  const divs = document.getElementsByClassName("square")
  for (const index in game.grid) {
    const value = game.grid[index]
    if (typeof(value) == "string") {
      divs[index].innerText = value
      divs[index].classList.add("collapsed")
    }
    else {
      divs[index].innerText = value.join(",")
    }
  }
}

function registerInput(index) {
  game.play(index)
  drawBoard()
  const winner = game.winner()
  if (game.full() && !winner) {
    statusBox.innerText = "Draw. Adios"
    game.status = "end"
  }
  else if (winner) {
    statusBox.innerText = `Winner is ${game.player}`
    game.status = "end"
  }
}

window.onload = () => {
  game.reset();
  setupBoard();
}