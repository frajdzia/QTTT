const [gsize, bsize] = [3, 3]
var grid
var gridElements
var statusMessage
var turn = "X"

function showTurn() {
  if (turn == "X") {
    statusMessage.innerText = "Player X's Turn"
  }
  else if (turn == "O") {
    statusMessage.innerText = "Player O's Turn"
  }
  else {
    statusMessage.innerText = ""
  }
}

function registerInput(index) {
  if (!gridElements[index].value) {
    gridElements[index].value = turn
    turn = turn == "X" ? "O" : "X"
    showTurn()
  }
}

function renderGrid() {
  const items = []
  for (let i = 0; i < gsize; i += 1) {
    for (let j = 0; j < gsize; j += 1) {
      const index = gsize * i + j
      const top = i % bsize == 0 ? " top" : ""
      const left = j % bsize == 0 ? " left" : ""
      const right = j == gsize - 1 ? " right" : ""
      const bottom = i == gsize - 1 ? " bottom" : ""

      items.push(
        `<input
          readonly
          class="square${top}${left}${right}${bottom}"
          onclick="registerInput(${index})"
          maxLength="1" 
          autoComplete="off" 
        />`
      )
    }
    items.push(`<br/>`)
  }
  grid.innerHTML = items.join("")
  gridElements = grid.getElementsByClassName("square")
}

function toggleTheme() {
  document.body.classList.toggle("dark")
}

window.onload = () => {
  grid = document.getElementById("qttt");
  statusMessage = document.getElementById("status");
  renderGrid()
  showTurn()
}