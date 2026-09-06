/* ===================================
   OUR STORY CAROUSEL
=================================== */

const storySlides = document.querySelectorAll(
  ".brand-story .carousel-slide"
);

const storyDots = document.querySelectorAll(
  ".brand-story .dot"
);

const storyCarousel = document.querySelector(
  ".brand-story .carousel"
);

const storyPrevBtn = document.querySelector(
  ".brand-story .prev"
);

const storyNextBtn = document.querySelector(
  ".brand-story .next"
);

let currentStorySlide = 0;
let storyAutoRotate;


function showStorySlide(index) {

  storySlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  storyDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  currentStorySlide = index;
}


function nextStorySlide() {

  const next =
    (currentStorySlide + 1) % storySlides.length;

  showStorySlide(next);
}


function previousStorySlide() {

  const previous =
    (currentStorySlide - 1 + storySlides.length) %
    storySlides.length;

  showStorySlide(previous);
}


function startStoryCarousel() {

  storyAutoRotate =
    setInterval(nextStorySlide, 5000);
}


function stopStoryCarousel() {

  clearInterval(storyAutoRotate);
}


if (
  storyCarousel &&
  storyPrevBtn &&
  storyNextBtn &&
  storySlides.length
) {

  storyDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {
      showStorySlide(index);
    });

  });


  storyPrevBtn.addEventListener(
    "click",
    previousStorySlide
  );


  storyNextBtn.addEventListener(
    "click",
    nextStorySlide
  );


  storyCarousel.addEventListener(
    "mouseenter",
    stopStoryCarousel
  );


  storyCarousel.addEventListener(
    "mouseleave",
    startStoryCarousel
  );


  showStorySlide(0);
  startStoryCarousel();
}



/* ===================================
   INTERACTIVE PRODUCT SELECTOR
=================================== */

const button25 =
  document.getElementById("button25");

const button50 =
  document.getElementById("button50");

const hotspot25 =
  document.getElementById("hotspot25");

const hotspot50 =
  document.getElementById("hotspot50");

const leftPanel =
  document.getElementById("leftPanel");

const rightPanel =
  document.getElementById("rightPanel");

const mobile25 =
  document.getElementById("mobile25");

const mobile50 =
  document.getElementById("mobile50");


function clearProductSelector() {

  button25.classList.remove("active");
  button50.classList.remove("active");

  hotspot25.classList.remove("active");
  hotspot50.classList.remove("active");

  leftPanel.classList.remove("active");
  rightPanel.classList.remove("active");

  mobile25.classList.remove("active");
  mobile50.classList.remove("active");

  button25.setAttribute(
    "aria-expanded",
    "false"
  );

  button50.setAttribute(
    "aria-expanded",
    "false"
  );
}


function show25Set() {

  clearProductSelector();

  button25.classList.add("active");
  hotspot25.classList.add("active");

  leftPanel.classList.add("active");
  mobile25.classList.add("active");

  button25.setAttribute(
    "aria-expanded",
    "true"
  );
}


function show50Set() {

  clearProductSelector();

  button50.classList.add("active");
  hotspot50.classList.add("active");

  rightPanel.classList.add("active");
  mobile50.classList.add("active");

  button50.setAttribute(
    "aria-expanded",
    "true"
  );
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

  button25.addEventListener(
    "mouseenter",
    show25Set
  );

  button50.addEventListener(
    "mouseenter",
    show50Set
  );


  button25.addEventListener(
  "click",
  () => {

    show25Set();

    setTimeout(() => {

      if (
        getComputedStyle(mobile25).display !== "none"
      ) {
        mobile25.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }

    }, 100);

  }
);

button50.addEventListener(
  "click",
  () => {

    show50Set();

    setTimeout(() => {

      if (
        getComputedStyle(mobile50).display !== "none"
      ) {
        mobile50.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }

    }, 100);

  }
);

  hotspot25.addEventListener(
    "mouseenter",
    show25Set
  );

  hotspot50.addEventListener(
    "mouseenter",
    show50Set
  );


  hotspot25.addEventListener(
    "click",
    show25Set
  );

  hotspot50.addEventListener(
    "click",
    show50Set
  );
}



/* ===================================
   PRODUCT IMAGE CAROUSEL
=================================== */

const productCarousel =
  document.getElementById("productCarousel");


if (productCarousel) {

  const productSlides =
    productCarousel.querySelectorAll(
      ".product-carousel-slide"
    );

  const productDots =
    productCarousel.querySelectorAll(
      ".carousel-dot"
    );

  const productPrevButton =
    document.getElementById("carouselPrev");

  const productNextButton =
    document.getElementById("carouselNext");

  let currentProductSlide = 0;


  function showProductSlide(index) {

  productSlides[
    currentProductSlide
  ].classList.remove("active");

  productDots[
    currentProductSlide
  ].classList.remove("active");


  currentProductSlide = index;


  productSlides[
    currentProductSlide
  ].classList.add("active");

  productDots[
    currentProductSlide
  ].classList.add("active");


  if (hotspot25 && hotspot50) {

    hotspot25.style.display =
      index === 0 ? "" : "none";

    hotspot50.style.display =
      index === 0 ? "" : "none";

  }
}


  function showNextProductSlide() {

    const nextSlide =
      (currentProductSlide + 1) %
      productSlides.length;

    showProductSlide(nextSlide);
  }


  function showPreviousProductSlide() {

    const previousSlide =
      (
        currentProductSlide -
        1 +
        productSlides.length
      ) %
      productSlides.length;

    showProductSlide(previousSlide);
  }


  if (
    productPrevButton &&
    productNextButton &&
    productSlides.length &&
    productDots.length
  ) {

    productNextButton.addEventListener(
      "click",
      showNextProductSlide
    );

    productPrevButton.addEventListener(
      "click",
      showPreviousProductSlide
    );


    productDots.forEach((dot) => {

  dot.addEventListener("click", () => {

    const slideIndex =
      Number(dot.dataset.slide);

    showProductSlide(slideIndex);
  });

});

}


/* MOBILE SWIPE GESTURE */

let touchStartX = 0;
let touchStartY = 0;

productCarousel.addEventListener("touchstart", (event) => {

  touchStartX =
    event.changedTouches[0].screenX;

  touchStartY =
    event.changedTouches[0].screenY;

});


productCarousel.addEventListener("touchend", (event) => {

  const touchEndX =
    event.changedTouches[0].screenX;

  const touchEndY =
    event.changedTouches[0].screenY;

  const horizontalDistance =
    touchStartX - touchEndX;

  const verticalDistance =
    touchStartY - touchEndY;

  const minimumSwipeDistance = 50;


  if (
    Math.abs(horizontalDistance) >
      Math.abs(verticalDistance) &&
    Math.abs(horizontalDistance) >
      minimumSwipeDistance
  ) {

    if (horizontalDistance > 0) {

      showNextProductSlide();

    } else {

      showPreviousProductSlide();

    }

  }

});

}
