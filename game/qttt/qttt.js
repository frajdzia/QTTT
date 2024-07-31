
function QTTT(gridElement, status) {
  const [gsize, bsize] = [3, 1]

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
          onclick="qttt.registerInput(${index})"
          maxLength="1" 
          autoComplete="off" 
        />`
      )
    }
    items.push(`<br/>`)
  }
  gridElement.innerHTML = items.join("")
  const squares = gridElement.getElementsByClassName("square")

  status.innerText = "Player X's Turn"
  function showTurn(turn) {
    if (turn == "X") {
      status.innerText = "Player X's Turn"
    }
    else if (turn == "O") {
      status.innerText = "Player O's Turn"
    }
    else {
      status.innerText = ""
    }
  }

  return {
    turn: "X",
    grid: Array(9).fill(""),
    checkWin() {
      const [a, b, c, d, e, f, g, h, i] = [...squares].map(e => e.value)
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
    },
    
    checkFull() {
      const entries = [...squares].map(e => e.value)
      return !entries.some(e => !e)
    },
    
    registerInput(index) {
      if (!squares[index].value) {
        const win = this.checkWin()
        const full = this.checkFull()

        squares[index].value = this.turn
        this.turn = this.turn == "X" ? "O" : "X"
        
    
        if (!win && full) {
          status.innerText = "Draw."
          status.classList.add("lose")
          return
        }
        else if (!win) {
          showTurn(this.turn)
        }
        else if (win == "X") {
          status.innerText = "Player X Wins!"
          status.classList.add("win")
          return
        }
        else if (win == "O") {
          status.innerText = "Player O Wins!"
          status.classList.add("win")
          return
        }
        
        if (win || full) {
          document.getElementById("reset-game-button").style = "visibility: visible;"
        }
        else {
          document.getElementById("reset-game-button").style = "visibility: hidden;"
        }
      }
    },
    
    resetGrid() {
      for (const e of squares) {
        e.value = ""
      }
      showTurn("X")
      status.classList = ""
      document.getElementById("reset-game-button").style = "visibility: hidden;"
    },

  }
}

var qttt
window.onload = () => {
  qttt = QTTT(document.getElementById("qttt"), document.getElementById("status"))
}