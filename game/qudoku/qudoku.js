const [gsize, bsize] = [9, 3]
var grid
var gridElements
var statusMessage
const configurations = [
  ".................................................................................",
  "86.....13.9.......2..1.96.......14...379.......2..75.8.2.71...5.....3726..45.....",
  ".43..5.2..7.96234...24.7.91.3..5.4....7.9....8.57..16...4..691.51932...7..6.7...4",
  ".43815726178962345652437891231658479467291538895743162724586913519324687386179254",
]

const puzzle = pullConfiguration(2)
function pullConfiguration(index) {
  return configurations[index].split("").map(a => a === "." ? "" : a)
}

function checkRegion(region) {
  return region.sort((a, b) => a - b)
  .map((e, j) => e == j + 1)
  .filter(e => !e)
  .length > 0
}

function checkWin() {
  const cells = new Array(gsize).fill(null)
  const cols = []
  const rows = []
  const boxs = []

  for (let i = 0; i < gsize; i += 1) {
    // Box coords
    const x = (i % bsize) * bsize
    const y = i - (i % bsize)

    const col = cells.map((_, j) => gridElements[j * gsize + i].value)
    const row = cells.map((_, j) => gridElements[i * gsize + j].value)
    const box = cells.map((_, j) => gridElements[x  + (j % bsize) + (y + ~~(j / bsize)) * gsize].value)

    // Check Empty
    if (col.filter(e => !e).length > 0 || row.filter(e => !e).length > 0 || box.filter(e => !e).length > 0) {
      return undefined
    }

    cols.push(col)
    rows.push(row)
    boxs.push(box)
  }

  for (let i = 0; i < gsize; i += 1) {
    if (checkRegion(cols[i]) || checkRegion(rows[i]) || checkRegion(boxs[i])) { 
      return false
    }
  }

  return true
}

function registerInput(e, index) {
  /**
   * Handleable Keys
   * 
   * - Digits 1-9: Clear cell if same, clear otherwise.
   * - Arrow Keys and WASD: Switch to other cell
   * - Delete or Space: Clear cell
   */

  const numValue = parseInt(e.key)
  if (numValue >= 1 && numValue <= 9 && !puzzle[index]) {
    e.target.value = numValue == e.target.value ? "" : numValue

    const win = checkWin()
    if (win === undefined) {
      statusMessage.innerText = ""
      statusMessage.classList.remove("lose")
      statusMessage.classList.remove("win")  
    }
    else if (win) {
      statusMessage.innerText = "You win!"
      statusMessage.classList.remove("lose")
      statusMessage.classList.add("win")
    }
    else {
      statusMessage.innerText = "You lose."
      statusMessage.classList.remove("win")
      statusMessage.classList.add("lose")
    }
    return
  }

  let newIndex = index
  switch (e.key.toLowerCase()) {
    case "w": case "arrowup": newIndex -= gsize; break;
    case "a": case "arrowleft": newIndex -= 1; break;
    case "s": case "arrowdown": newIndex += gsize; break;
    case "d": case "arrowright": newIndex += 1 ; break;
    case " ": case "space": case "0": e.value = ""; return;
    case "delete":
    for (let i = 0; i < puzzle.length; i += 1) {
      if (!puzzle[i]) {
        gridElements[i].value = ""
      }
    }

    default: return;                  
  }

  if (newIndex >= 0 && newIndex < gsize * gsize) {
    gridElements[newIndex].focus()
  }

}

function renderGrid() {
  const items = []
  for (let i = 0; i < gsize; i += 1) {
    for (let j = 0; j < gsize; j += 1) {
      const index = 9 * i + j
      const top = i % bsize == 0 ? " top" : ""
      const left = j % bsize == 0 ? " left" : ""
      const right = j == gsize - 1 ? " right" : ""
      const bottom = i == gsize - 1 ? " bottom" : ""
      const editable = !puzzle[index] ? " editable" : ""

      items.push(
        `<input
          readonly
          class="square${top}${left}${right}${bottom}${editable}"
          value="${puzzle[index]}"
          onkeydown="registerInput(event,${index})"
          maxLength="1" 
          autoComplete="off" 
          inputMode="numeric"
        />`
      )
    }
    items.push(`<br/>`)
  }
  grid.innerHTML = items.join("")
  gridElements = grid.getElementsByClassName("square")
}

window.onload = () => {
  grid = document.getElementById("qudoku");
  statusMessage = document.getElementById("status");
  renderGrid()
}