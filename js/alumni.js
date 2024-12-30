function changeImage() {
  var dropdown = document.getElementById("dropdown-container");
  var selectedValue = dropdown.options[dropdown.selectedIndex].value;
  let theme = localStorage.getItem("theme");
  if (theme==='light') {
    selectedValue += '-light';
  }


  var imageGrids = document.querySelectorAll(".image-grid");
  for (var i = 0; i < imageGrids.length; i++) {
      if (imageGrids[i].classList.contains(selectedValue)) {
        imageGrids[i].classList.add("show");
      } else {
        imageGrids[i].classList.remove("show");
      }
  }

  var textContainer = document.getElementById("text-container");
  var text = "Executive board 2021 - 22";
  if (selectedValue === "image-grid1") {
    text = "Executive board 2019 - 20";
  } else if (selectedValue === "image-grid2") {
    text = "Executive board 2020 - 21";
  } else if (selectedValue === "image-grid3") {
    text = "Executive board 2021 - 22";
  } else if (selectedValue === "image-grid4") {
    text = "Executive board 2022 - 23";
  } else if (selectedValue === "image-grid5") {
    text = "Executive board 2023 - 24";
  }
  textContainer.textContent = text;
}

document.getElementById("change-theme").addEventListener("click", () => {
  changeImage();
});
