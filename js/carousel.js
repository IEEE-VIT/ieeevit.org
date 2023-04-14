const makeSlide = (title, desc, img_src, link) => {
  const h2 = document.createElement("h2");
  h2.appendChild(document.createTextNode(title));

  const p = document.createElement("p");
  let paras = Array.from(desc.split("\n"));
  if (paras.length >= 1) {
    p.appendChild(document.createTextNode(paras[0]));
  }
  for (let count = 1; count < paras.length; count++) {
    const br = document.createElement("br");
    p.appendChild(br);
    p.append(document.createTextNode(paras[count]));
  }

  const content = document.createElement("div");
  content.classList.add("content");
  content.appendChild(h2);
  content.appendChild(p);

  const img = document.createElement("img");
  img.src = img_src;

  const slide = document.createElement("div");
  slide.classList.add("slide");
  slide.appendChild(img);
  slide.appendChild(content);

  if (link) {
    const read_more = document.createElement("a");
    read_more.href = link;
    read_more.target = "_blank";
    read_more.appendChild(document.createTextNode("read more"));
    read_more.classList.add("read-more");
    slide.appendChild(read_more);
  }
  return slide;
};

const fillCarousel = (data, carousel_name) => {
  const container = document.querySelector(
    `#${carousel_name} .carousel .container`
  );

  const slides = data[carousel_name];

  slides.forEach((slide) => {
    let { title, desc, image, link } = slide;
    const slide_element = makeSlide(title, desc, image, link);
    container.appendChild(slide_element);
  });
};

const parseData = async () => {
  const response = await fetch("../data.json");
  const data = await response.json();

  fillCarousel(data, "blogs");
  fillCarousel(data, "podcast");
  fillCarousel(data, "techloop");
  fillCarousel(data, "events");
};

parseData();

const previous = document.getElementsByClassName("previous");

Array.from(previous).forEach((previous_button) => {
  previous_button.addEventListener("click", (event) => {
    const container = event.target.nextElementSibling;
    const containerWidth = container.offsetWidth;
    const currentScroll = container.scrollLeft;
    const maxScroll = container.scrollWidth - containerWidth;
    const previousScroll = currentScroll - containerWidth;

    if (previousScroll < 0) {
      container.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      container.scrollTo({ left: previousScroll, behavior: "smooth" });
    }
  });
});

Array.from(document.querySelectorAll("#blogs, #podcast")).forEach((section) => {
  const container = section.querySelector(".carousel .container");
  const slides = container.querySelectorAll(".slide");
  let currentIndex = 0;

  Array.from(slides).forEach((slide, index) => {
    if (slide.classList.contains("current")) {
      currentIndex = index;
    }
  });

  const previous_button = container.previousElementSibling;
  const next_button = container.nextElementSibling;

  function handleButtons() {
    if (screen.width <= 655) {
      return;
    }

    if (currentIndex === 0) {
      previous_button.style.opacity = 0;
      previous_button.style.cursor = "default";
    } else {
      previous_button.style.opacity = 1;
      previous_button.style.cursor = "pointer";
    }

    if (currentIndex === slides.length - 1) {
      next_button.style.opacity = 0;
      next_button.style.cursor = "default";
    } else {
      next_button.style.opacity = 1;
      next_button.style.cursor = "pointer";
    }
  }

  handleButtons();

  container.addEventListener("scroll", () => {
    Array.from(slides).forEach((slide, index) => {
      if (slide.getBoundingClientRect().left >= 0 && slide.getBoundingClientRect().right <= window.innerWidth) {
        currentIndex = index;
      }
    });

    handleButtons();
  });

  previous_button.addEventListener("click", () => {
    if (currentIndex === 0) {
      return;
    }

    slides[currentIndex].classList.remove("current");
    slides[currentIndex - 1].classList.add("current");
    currentIndex--;

    container.scrollTo({
      left: slides[currentIndex].offsetLeft,
      behavior: "smooth",
    });

    handleButtons();
  });

  next_button.addEventListener("click", () => {
    if (currentIndex === slides.length - 1) {
      return;
    }

    slides[currentIndex].classList.remove("current");
    slides[currentIndex + 1].classList.add("current");
    currentIndex++;

    container.scrollTo({
      left: slides[currentIndex].offsetLeft,
      behavior: "smooth",
    });

    handleButtons();
  });
});


const next = document.getElementsByClassName("next");

Array.from(next).forEach((next_button) => {
  next_button.addEventListener("click", (event) => {
    const container = event.target.previousElementSibling;
    const containerWidth = container.offsetWidth;
    const currentScroll = container.scrollLeft;
    const maxScroll = container.scrollWidth; // - containerWidth
    const nextScroll = currentScroll + containerWidth;

    if (nextScroll >= maxScroll) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      container.scrollTo({ left: nextScroll, behavior: "smooth" });
    }

    const previous_button = event.target.parentElement.children[0];
    previous_button.style.opacity = 1;
  });
});

// const autoScroll = () => {
//   Array.from(next).forEach((next_button) => {
//     next_button.click();
//   });
// };

// const scroller = setInterval(() => {
//   autoScroll();
// }, 5525);

// setTimeout(() => {
//   clearInterval(scroller);
// }, 15325);
