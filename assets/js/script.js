"use strict";

// ... (keep all your existing code until the countdown section)

/**
 * Countdown Timer - Fixed Version
 */
function startCountdown() {
  // First, make sure all countdown elements exist
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
    console.error("Countdown elements not found!");
    return;
  }

  // Set end date to 17 days from now
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 17);

  function updateCountdown() {
    const now = new Date();
    const diff = endDate - now;

    if (diff <= 0) {
      // If countdown finished, restart it
      startCountdown();
      return;
    }

    // Calculate time remaining
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Update display
    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  // Run immediately to avoid delay
  updateCountdown();

  // Update every second
  const timer = setInterval(updateCountdown, 1000);

  // Cleanup function if needed
  return () => clearInterval(timer);
}

/**
 * Swiper - Fixed Version
 */
function initSwiper() {
  const swiperWrapper = document.querySelector(".swiper-wrapper");

  if (!swiperWrapper) {
    console.error("Swiper wrapper not found!");
    return;
  }

  // Sample user data
  const users = [
    {
      username: "BGUSER-7Y91RPEA",
      avatar: "./assets/images/default-avatar.png",
    },
    { username: "laswordtv", avatar: "./assets/images/default-avatar.png" },
    {
      username: "BGUSER-JPFM1C60",
      avatar: "./assets/images/default-avatar.png",
    },
    // ... (keep your existing user data)
  ];

  // Clear existing content
  swiperWrapper.innerHTML = "";

  // Create slides
  users.forEach((user) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.innerHTML = `
      <div class="swiper-slide-content">
        <img src="${user.avatar}" alt="${user.username}" loading="lazy">
        <div class="swiper-slide-text">
          <span>${user.username}</span>
          <span>joined the promotion.</span>
        </div>
      </div>
    `;
    swiperWrapper.appendChild(slide);
  });

  // Duplicate slides for infinite effect
  const slides = Array.from(document.querySelectorAll(".swiper-slide"));
  slides.forEach((slide) => {
    swiperWrapper.appendChild(slide.cloneNode(true));
  });

  // Animation variables
  let animationId;
  let position = 0;
  const speed = 1; // pixels per frame

  function animate() {
    position -= speed;

    // Reset position when we've scrolled all slides
    const wrapperWidth = swiperWrapper.scrollWidth / 2;
    if (-position >= wrapperWidth) {
      position = 0;
    }

    swiperWrapper.style.transform = `translateX(${position}px)`;
    animationId = requestAnimationFrame(animate);
  }

  // Start animation
  animate();

  // Pause on hover
  swiperWrapper.addEventListener("mouseenter", () => {
    cancelAnimationFrame(animationId);
  });

  swiperWrapper.addEventListener("mouseleave", () => {
    animate();
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  startCountdown();
  initSwiper();
});

/**
 * add event on element
 */
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * navbar toggle
 */
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
  document.body.classList.toggle("active");
};

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
  document.body.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);

/**
 * header active
 */
const header = document.querySelector("[data-header]");

const activeHeader = function () {
  if (window.scrollY > 300) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
};

addEventOnElem(window, "scroll", activeHeader);

/**
 * toggle active on add to fav
 */
const addToFavBtns = document.querySelectorAll("[data-add-to-fav]");

const toggleActive = function () {
  this.classList.toggle("active");
};

addEventOnElem(addToFavBtns, "click", toggleActive);
