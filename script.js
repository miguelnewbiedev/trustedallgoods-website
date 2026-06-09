const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const card25 = document.getElementById('card-25');
const card50 = document.getElementById('card-50');
const button25 = card25.querySelector('.comparison-button');
const button50 = card50.querySelector('.comparison-button');

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

card25.addEventListener('click', () => {
  window.location.href = 'https://www.amazon.com/dp/B0D96RF93M';
});

card50.addEventListener('click', () => {
  window.location.href = 'https://www.amazon.com/dp/B0CK5H19VG';
});

button25.addEventListener('click', (event) => {
  event.stopPropagation();
});

button50.addEventListener('click', (event) => {
  event.stopPropagation();
});