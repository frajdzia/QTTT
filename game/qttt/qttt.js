const [gsize, bsize] = [3, 1]
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

function checkWin() {
  const [a, b, c, d, e, f, g, h, i] = [...gridElements].map(e => e.value)
  if (a == b && b == c || a == d && d == g || a == e && e == i) {
    return a
  }
  else if (e == c && c == g || e == b && b == h || e == f && f == d) {
    return e
  }
  else if (i == h && h == g || i == f && f == c) {
    return i
  }
  return undefined
}

function registerInput(index) {
  if (!gridElements[index].value) {
    gridElements[index].value = turn
    turn = turn == "X" ? "O" : "X"
    const win = checkWin()
    if (!win) {
      showTurn()
    }
    else if (win == "X") {
      statusMessage.innerText = "Player X Wins!"
      statusMessage.classList.add("win")
    }
    else if (win == "O") {
      statusMessage.innerText = "Player O Wins!"
      statusMessage.classList.add("win")
    }
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
  const dark = document.body.classList.toggle("dark")
  localStorage.setItem("theme", dark ? "dark" : "light")
}

window.onload = () => {

  // Set dark theme on load if selected by user
  const theme = localStorage.getItem("theme")
  if (theme === "dark") {
    document.body.classList.add("dark")
  }

  grid = document.getElementById("qttt");
  statusMessage = document.getElementById("status");
  renderGrid()
  showTurn()
}