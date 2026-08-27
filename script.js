const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentSlide = 0;
let autoRotate;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  currentSlide = index;
}

function nextSlide() {
  const next = (currentSlide + 1) % slides.length;
  showSlide(next);
}

function previousSlide() {
  const prev = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(prev);
}

function startCarousel() {
  autoRotate = setInterval(nextSlide, 5000);
}

function stopCarousel() {
  clearInterval(autoRotate);
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
  });
});

prevBtn.addEventListener('click', () => {
  previousSlide();
});

nextBtn.addEventListener('click', () => {
  nextSlide();
});

carousel.addEventListener('mouseenter', stopCarousel);
carousel.addEventListener('mouseleave', startCarousel);

showSlide(0);
startCarousel();

/* Interactive Product Selector */

const button25 = document.getElementById("button25");
const button50 = document.getElementById("button50");

const hotspot25 = document.getElementById("hotspot25");
const hotspot50 = document.getElementById("hotspot50");

const leftPanel = document.getElementById("leftPanel");
const rightPanel = document.getElementById("rightPanel");

const mobile25 = document.getElementById("mobile25");
const mobile50 = document.getElementById("mobile50");

function clearProductSelector() {
  button25.classList.remove("active");
  button50.classList.remove("active");

  hotspot25.classList.remove("active");
  hotspot50.classList.remove("active");

  leftPanel.classList.remove("active");
  rightPanel.classList.remove("active");

  mobile25.classList.remove("active");
  mobile50.classList.remove("active");

  button25.setAttribute("aria-expanded", "false");
  button50.setAttribute("aria-expanded", "false");
}

function show25Set() {
  clearProductSelector();

  button25.classList.add("active");
  hotspot25.classList.add("active");

  leftPanel.classList.add("active");
  mobile25.classList.add("active");

  button25.setAttribute("aria-expanded", "true");
}

function show50Set() {
  clearProductSelector();

  button50.classList.add("active");
  hotspot50.classList.add("active");

  rightPanel.classList.add("active");
  mobile50.classList.add("active");

  button50.setAttribute("aria-expanded", "true");
}

if (
  button25 &&
  button50 &&
  hotspot25 &&
  hotspot50 &&
  leftPanel &&
  rightPanel &&
  mobile25 &&
  mobile50
) {
  button25.addEventListener("mouseenter", show25Set);
  button50.addEventListener("mouseenter", show50Set);

  button25.addEventListener("click", show25Set);
  button50.addEventListener("click", show50Set);

  hotspot25.addEventListener("mouseenter", show25Set);
  hotspot50.addEventListener("mouseenter", show50Set);

  hotspot25.addEventListener("click", show25Set);
  hotspot50.addEventListener("click", show50Set);
}