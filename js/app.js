const changeTheme = (theme) => {
  if (!(theme === "dark" || theme === "light")) {
    const dark_theme = window.matchMedia("(prefers-color-scheme: dark)");
    theme = dark_theme.matches ? "dark" : "light";
  }
  localStorage.setItem("theme", theme);
  theme === "dark"
    ? document.body.classList.add(theme)
    : document.body.classList.remove("dark");
  changeImages(theme);
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
  }, 1); // simulating load time
};

const changeImages = (theme) => {
  const shapes = document.getElementsByClassName("shape");
  const to_replace = theme == "dark" ? "light" : "dark";

  Array.from(shapes).forEach((shape) => {
    shape.src = shape.src.replace(to_replace, theme);
  });
};