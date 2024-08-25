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




// CARD tEST fUNCTIONALITY and SCROLL

document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');
    const cardWidth = carousel.querySelector('.card').offsetWidth;
    const scrollSpeed = 1; // Scroll speed in pixels per frame

    // Duplicate the carousel content for seamless loop
    const firstCard = carousel.firstElementChild.cloneNode(true);
    const lastCard = carousel.lastElementChild.cloneNode(true);

    carousel.appendChild(firstCard);
    carousel.insertBefore(lastCard, carousel.firstChild);

    // Adjust the width of the carousel to fit all cards including the duplicates
    const totalCards = carousel.children.length;
    carousel.style.width = `${cardWidth * totalCards}px`;

    let scrollPosition = 0;
    let isScrolling = false;

    // Smooth scrolling effect
    function scrollCarousel() {
        if (isScrolling) {
            scrollPosition += scrollSpeed;
            carousel.scrollLeft = scrollPosition;

            // Reset scroll position if it exceeds the width of the carousel
            if (scrollPosition >= cardWidth * (totalCards - 1)) {
                scrollPosition = 0;
                carousel.scrollLeft = scrollPosition;
            }

            requestAnimationFrame(scrollCarousel); // Continue scrolling
        }
    }

    // Start scrolling on user interaction
    carousel.addEventListener('mousedown', () => {
        isScrolling = true;
        scrollCarousel();
    });

    carousel.addEventListener('mouseup', () => {
        isScrolling = false;
    });

    carousel.addEventListener('mouseleave', () => {
        isScrolling = false;
    });

    // Handle touch events for mobile devices
    carousel.addEventListener('touchstart', () => {
        isScrolling = true;
        scrollCarousel();
    });

    carousel.addEventListener('touchend', () => {
        isScrolling = false;
    });
});



// ADDING THE ADD TTO CART BUTTON JAVASCRIPT ON CARDS

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseover', () => {
    card.querySelector('.add-to-cart-btn').style.display = 'block';
  });
  
  card.addEventListener('mouseout', () => {
    card.querySelector('.add-to-cart-btn').style.display = 'none';
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.card')) {
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.style.display = 'none';
    });
  }
});



