function toggleTheme() {
  const dark = document.body.classList.toggle("dark")
  localStorage.setItem("theme", dark ? "dark" : "light")
}

function loadTheme() {
  const theme = localStorage.getItem("theme")
  if (theme === "dark") {
    document.body.classList.add("dark")
  }
}
