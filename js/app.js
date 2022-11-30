const changeImages = (theme) => {
  const shapes = document.querySelectorAll(".shape, .icon");
  const to_replace = theme == "dark" ? "light" : "dark";

  Array.from(shapes).forEach((shape) => {
    shape.src = shape.src.replace(to_replace, theme);
  });
};

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

const adjustBoardSection = () => {
  const board_members = document.querySelector(".board-members");
  let count = parseInt(document.querySelector("#board").clientWidth / 185);

  if (board_members.childElementCount % count !== 0) {
    count =
      board_members.childElementCount % (count - 1) === 0 ? count - 1 : count;
  }
  count = parseInt(Math.max(1, count));

  board_members.style.gridTemplateColumns = `repeat(${count}, 185px)`;
};

window.onload = () => {
  let theme = localStorage.getItem("theme");
  changeTheme(theme);

  setTimeout(() => {
    adjustBoardSection();
  }, 555);

  removeLoader();
};

Array.from(document.querySelectorAll(".hamburger-menu, .cross")).forEach(
  (element) => {
    element.addEventListener("click", (event) => {
      const menu = document.querySelector(".menu");
      menu.classList.toggle("open");
      menu.classList.toggle("close");
    });
  }
);

window.onresize = () => {
  adjustBoardSection();
};
