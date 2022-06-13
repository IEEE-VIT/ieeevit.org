const changeTheme = (theme) => {
  if (!(theme === "dark" || theme === "light")) {
    const dark_theme = window.matchMedia("(prefers-color-scheme: dark)");
    theme = dark_theme.matches ? "dark" : "light";
  }
  localStorage.setItem("theme", theme);
  theme === "dark"
    ? document.body.classList.add(theme)
    : document.body.classList.remove("dark");
};

document.getElementById("change-theme").addEventListener("click", () => {
  let theme = localStorage.getItem("theme");
  theme = theme === "dark" ? "light" : "dark";
  changeTheme(theme);
});

const removeLoader = () => {
  document.getElementById("loader").style.display = "none";
  document.getElementById("main-content").style.display = "block";
};

window.onload = () => {
  let theme = localStorage.getItem("theme");
  changeTheme(theme);
  setTimeout(() => {
    removeLoader();
  }, 0); // simulating load time
};