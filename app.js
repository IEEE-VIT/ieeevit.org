const enableDarkMode = () => {
  document.body.classList.add("dark");
  localStorage.setItem("theme", "dark");
};

const enableLightMode = () => {
  document.body.classList.remove("dark");
  localStorage.setItem("theme", "light");
};

const changeTheme = () => {
  let theme = localStorage.getItem("theme");
  if (!theme) {
    theme = "dark"; // because theme would be dark by default
  }
  if (theme === "dark") {
    enableLightMode();
  } else if (theme === "light") {
    enableDarkMode();
  } else {
    console.error(
      "Something went wrong - invalid value of theme in local storage"
    );
  }
};

document.getElementById("change-theme").addEventListener("click", () => {
  changeTheme();
});
