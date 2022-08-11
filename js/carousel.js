const makeSlide = (heading, desc, img_src) => {
  const h2 = document.createElement("h2");
  h2.appendChild(document.createTextNode(heading));

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
  slide.appendChild(content);
  slide.appendChild(img);
  return slide;
};

const fillCarousel = (data, carousel_name) => {
  const container = document.querySelector(
    `.${carousel_name} .carousel .container`
  );

  const slides = data[carousel_name];

  slides.forEach((slide) => {
    let { heading, desc, img } = slide;
    const slide_element = makeSlide(heading, desc, img);
    container.appendChild(slide_element);
  });
};

const parseData = async () => {
  const response = await fetch("../data.json");
  const data = await response.json();

  fillCarousel(data, "techloop");
  fillCarousel(data, "events");
};

parseData();

const previous = document.getElementsByClassName("previous");

Array.from(previous).forEach((element) => {
  element.addEventListener("click", (event) => {
    const container = event.target.nextElementSibling;
    container.scrollLeft -= container.children[0].offsetWidth;
  });
});

const next = document.getElementsByClassName("next");

Array.from(next).forEach((element) => {
  element.addEventListener("click", (event) => {
    const container = event.target.previousElementSibling;
    container.scrollLeft += container.children[0].offsetWidth;
  });
});
