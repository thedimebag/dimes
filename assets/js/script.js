'use strict';



/**
 * add event on elements
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toogle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);



/**
 * active header & back top btn when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElemOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElemOnScroll);



/**
 * filter functionality
 */

const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter]");

let lastClickedBtn = filterBtn[0];

const filter = function () {
  lastClickedBtn.classList.remove("active");
  this.classList.add("active");
  lastClickedBtn = this;

  for (let i = 0; i < filterItems.length; i++) {
    if (filterItems[i].dataset.filter === this.dataset.filterBtn) {
      filterItems[i].style.display = "block";
    } else {
      filterItems[i].style.display = "none";
    }
  }
}

addEventOnElem(filterBtn, "click", filter);



/**
 * cARD tEST fUNCTIONALITY
 */

document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');
    
    // Clone the first and last card for seamless scrolling
    const firstCard = carousel.firstElementChild.cloneNode(true);
    const lastCard = carousel.lastElementChild.cloneNode(true);
    
    carousel.appendChild(firstCard);
    carousel.insertBefore(lastCard, carousel.firstChild);
    
    // Adjust the width of the carousel to fit all cards including the clones
    const cardWidth = carousel.querySelector('.card').offsetWidth;
    carousel.style.width = `${cardWidth * (carousel.children.length)}px`;
    
    // Listen to scroll event to ensure seamless loop
    carousel.addEventListener('scroll', function () {
        const scrollLeft = carousel.scrollLeft;
        const cardWidth = carousel.querySelector('.card').offsetWidth;
        const numberOfCards = carousel.children.length;
        const scrollPosition = (scrollLeft + cardWidth) % (cardWidth * numberOfCards);

        if (scrollPosition < cardWidth) {
            carousel.scrollLeft = scrollLeft + cardWidth;
        } else if (scrollPosition > cardWidth * (numberOfCards - 1)) {
            carousel.scrollLeft = scrollLeft - cardWidth;
        }
    });
});
