
/* ===================================
   OUR STORY CAROUSEL 2.0
=================================== */

const storyTrack = document.querySelector(".brand-story .carousel-track");
const storySlides = document.querySelectorAll(".brand-story .carousel-slide");
const storyPrevBtn = document.querySelector(".brand-story .carousel-btn.prev");
const storyNextBtn = document.querySelector(".brand-story .carousel-btn.next");
const storyDots = document.querySelectorAll(".brand-story .carousel-dot");

let currentStorySlide = 0;

function updateStoryDots(index) {
  storyDots.forEach((dot, i) => {
    const isActive = i === index;
    dot.classList.toggle("active", isActive);
    dot.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

function showStorySlide(index) {
  const isMobile = window.innerWidth <= 768;
  const lastPosition = isMobile ? storySlides.length - 1 : 1;

  currentStorySlide = Math.max(0, Math.min(index, lastPosition));

  if (isMobile) {
    storyTrack.classList.remove("story-page-two");

    const scrollPosition =
      storySlides[currentStorySlide].offsetLeft -
      storySlides[0].offsetLeft;

    storyTrack.scrollTo({
      left: scrollPosition,
      behavior: "smooth"
    });

    updateStoryDots(currentStorySlide);
  } else {
    const pageTwo = currentStorySlide === 1;

    storyTrack.classList.toggle("story-page-two", pageTwo);

    if (!pageTwo) {
      storyTrack.scrollTo({
        left: 0,
        behavior: "smooth"
      });
    } else {
      const spacer = getComputedStyle(storyTrack, "::before");
      const transitionDuration =
        parseFloat(spacer.transitionDuration) * 1000;

      setTimeout(() => {
        const scrollPosition =
          storySlides[2].offsetLeft -
          storySlides[0].offsetLeft;

        storyTrack.scrollTo({
          left: scrollPosition,
          behavior: "smooth"
        });
      }, transitionDuration);
    }
  }
}

if (
  storyTrack &&
  storyPrevBtn &&
  storyNextBtn &&
  storySlides.length
) {
  storyNextBtn.addEventListener("click", () => {
    showStorySlide(currentStorySlide + 1);
  });

  storyPrevBtn.addEventListener("click", () => {
    showStorySlide(currentStorySlide - 1);
  });

  storyDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showStorySlide(index);
    });
  });

  storyTrack.addEventListener("scroll", () => {
    if (window.innerWidth > 768) return;

    let nearestIndex = 0;
    let nearestDistance = Infinity;

    storySlides.forEach((slide, index) => {
      const distance = Math.abs(
        slide.getBoundingClientRect().left -
        storyTrack.getBoundingClientRect().left -
        16
      );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    currentStorySlide = nearestIndex;
    updateStoryDots(nearestIndex);
  });

  window.addEventListener("resize", () => {
    currentStorySlide = 0;
    storyTrack.classList.remove("story-page-two");

    storyTrack.scrollTo({
      left: 0,
      behavior: "instant"
    });

    updateStoryDots(0);
  });

  updateStoryDots(0);
}

/* PRODUCT COMPARISON 3.0 */

const images = [
    "images/product-selector-main.webp",
    "images/product-image-02.webp",
    "images/product-image-03.webp",
    "images/product-image-04.webp"
    ];

    const products = {
      25: {
        title: "25 Set — 32 oz Deli Containers",
        price: "$14.16",
        eyebrow: "Best for Weekly Meal Prep",
        description:
          "A practical starter option for everyday meals, leftovers, and smaller households.",
        benefits: [
          "25 reusable 32 oz containers",
          "28 waterproof labels",
          "Easy everyday storage",
          "Ideal for smaller households"
        ],
        included: "25 containers and 28 waterproof labels.",
        amazonUrl:
          "https://www.amazon.com/dp/B0D96RF93M?maas=maas_adg_4EDBFC688FF0E85F17769658A200C814_afap_abs&ref_=aa_maas&tag=maas",
        reviewsUrl:
          "https://www.amazon.com/product-reviews/B0D96RF93M"
      },
      50: {
        title: "50 Set — 32 oz Deli Containers",
        price: "$23.99",
        eyebrow: "Best for Families & Bulk Storage",
        description:
          "A larger option for families, restaurants, bulk storage, and high-volume kitchen use.",
        benefits: [
          "50 reusable 32 oz containers",
          "56 waterproof labels",
          "Great for bulk food storage",
          "Best value per container"
        ],
        included: "50 containers and 56 waterproof labels.",
        amazonUrl:
          "https://www.amazon.com/dp/B0CK5H19VG?maas=maas_adg_9DBB0D6C2F54A756518C25DAF8F27591_afap_abs&ref_=aa_maas&tag=maas",
        reviewsUrl:
          "https://www.amazon.com/product-reviews/B0CK5H19VG"
      }
    };

    let selectedSet = 25;
    let currentImage = 0;

    const mainImage = document.getElementById("mainProductImage");
    const thumbnailContainer = document.getElementById("thumbnails");

    function showImage(index) {
      currentImage = (index + images.length) % images.length;
      mainImage.src = images[currentImage];
      mainImage.alt =
        "Trusted All Goods deli containers — product image " +
        (currentImage + 1);

      document.querySelectorAll(".thumbnail").forEach((button, i) => {
        button.classList.toggle("active", i === currentImage);
        button.setAttribute("aria-pressed", String(i === currentImage));
      });
    }

    images.forEach((src, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "thumbnail";
      button.setAttribute("aria-label", "View product image " + (index + 1));

      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.loading = "lazy";

      button.appendChild(img);
      button.addEventListener("click", () => showImage(index));
      thumbnailContainer.appendChild(button);
    });

    function selectSet(set) {
      selectedSet = set;
      const product = products[set];

    document.getElementById("productPrice").textContent = product.price;

    document.getElementById("button25")
        .classList.toggle("active", set === 25);

    document.getElementById("button50")
        .classList.toggle("active", set === 50);

      document.getElementById("button25")
        .setAttribute("aria-pressed", String(set === 25));
      document.getElementById("button50")
        .setAttribute("aria-pressed", String(set === 50));

      document.getElementById("productTitle").textContent = product.title;
      document.getElementById("productEyebrow").textContent = product.eyebrow;
      document.getElementById("productDescription").textContent =
        product.description;
      document.getElementById("includedContent").textContent =
        product.included;

      const benefits = document.getElementById("productBenefits");
      benefits.replaceChildren();

      product.benefits.forEach(text => {
        const li = document.createElement("li");
        li.textContent = text;
        benefits.appendChild(li);
      });

      const amazonButton = document.getElementById("amazonButton");
      amazonButton.href = product.amazonUrl;
      amazonButton.textContent = "Shop " + set + " Set on Amazon";

      document.getElementById("reviewsLink").href = product.reviewsUrl;
      document.getElementById("accordionReviewsLink").href =
        product.reviewsUrl;
    }

    function selectSetAndScroll(set) {
  selectSet(set);

  const eyebrow = document.getElementById("productEyebrow");

  if (!eyebrow) return;

  const header = document.querySelector(".site-header");
  const headerHeight = header ? header.getBoundingClientRect().height : 0;

  const targetPosition =
    eyebrow.getBoundingClientRect().top +
    window.scrollY -
    headerHeight -
    20;

  window.scrollTo({
    top: Math.max(0, targetPosition),
    behavior: "smooth"
  });
}

document.getElementById("button25")
  .addEventListener("click", () => selectSetAndScroll(25));

document.getElementById("button50")
  .addEventListener("click", () => selectSetAndScroll(50));

    document.getElementById("prevImage")
      .addEventListener("click", () => showImage(currentImage - 1));
    document.getElementById("nextImage")
      .addEventListener("click", () => showImage(currentImage + 1));

    let touchStartX = 0;
    let touchStartY = 0;

    document.getElementById("galleryTouchArea")
      .addEventListener("touchstart", event => {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
      }, { passive: true });

    document.getElementById("galleryTouchArea")
      .addEventListener("touchend", event => {
        const deltaX = touchStartX - event.changedTouches[0].screenX;
        const deltaY = touchStartY - event.changedTouches[0].screenY;

        if (Math.abs(deltaX) > 50 &&
            Math.abs(deltaX) > Math.abs(deltaY)) {
          showImage(currentImage + (deltaX > 0 ? 1 : -1));
        }
      }, { passive: true });

    selectSet(25);
    showImage(0);
