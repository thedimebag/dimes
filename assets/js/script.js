'use strict';

/**
 * Add event on elements
 */
const addEventOnElem = (elems, type, callback) => {
  if (elems) {
    if (elems.length > 1) {
      elems.forEach(elem => elem.addEventListener(type, callback));
    } else {
      elems.addEventListener(type, callback);
    }
  }
}

/**
 * Navbar toggle
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = () => {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

/**
 * Active header & back to top button when window scroll down to 100px
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElemOnScroll = () => {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

const debounce = (callback, delay = 100) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(callback, delay);
  }
}

addEventOnElem(window, "scroll", debounce(activeElemOnScroll));

/**
 * Filter functionality
 */
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter]");
let lastClickedBtn = filterBtn[0];

const filter = function () {
  lastClickedBtn.classList.remove("active");
  this.classList.add("active");
  lastClickedBtn = this;

  filterItems.forEach(item => {
    item.style.display = item.dataset.filter === this.dataset.filterBtn ? "block" : "none";
  });
}

addEventOnElem(filterBtn, "click", filter);

/**
 * Video popup functionality
 */
const playVideoBtn = document.getElementById("play-video-btn");
const videoPopup = document.getElementById("video-popup");
const closeBtn = document.getElementById("close-btn");
const overlayPopup = document.getElementById("overlay");

const showVideoPopup = () => videoPopup.classList.remove("hidden");
const hideVideoPopup = () => videoPopup.classList.add("hidden");

addEventOnElem(playVideoBtn, "click", showVideoPopup);
addEventOnElem(closeBtn, "click", hideVideoPopup);
addEventOnElem(overlayPopup, "click", hideVideoPopup);

/**
 * Back to top button functionality
 */
const backToTopBtn = document.getElementById("back-to-top");

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  
}

addEventOnElem(backToTopBtn, "click", scrollToTop);
