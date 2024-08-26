'use strict';

/**
 * Add event on elements
 */
const addEventOnElem = function (elem, type, callback) {
  if (elem instanceof NodeList || elem instanceof HTMLCollection) {
    elem.forEach(e => {
      if (e instanceof HTMLElement) {
        e.addEventListener(type, callback);
      }
    });
  } else if (elem instanceof HTMLElement) {
    elem.addEventListener(type, callback);
  }
}

/**
 * Navbar toggle
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
 * Active header & back top btn when window scroll down to 100px
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
    if (item.dataset.filter === this.dataset.filterBtn) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

addEventOnElem(filterBtn, "click", filter);

/**
 * Carousel functionality
 */
document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

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

  function scrollCarousel() {
    if (isScrolling) {
      scrollPosition += scrollSpeed;
      carousel.scrollLeft = scrollPosition;

      if (scrollPosition >= cardWidth * (totalCards - 1)) {
        scrollPosition = 0;
        carousel.scrollLeft = scrollPosition;
      }

      requestAnimationFrame(scrollCarousel);
    }
  }

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

  carousel.addEventListener('touchstart', () => {
    isScrolling = true;
    scrollCarousel();
  });

  carousel.addEventListener('touchend', () => {
    isScrolling = false;
  });
});

/**
 * Add to cart button functionality
 */
document.querySelectorAll('.card').forEach(card => {
  const button = card.querySelector('.add-to-cart-btn');
  
  button.addEventListener('click', () => {
    const cardTitle = card.querySelector('.card-title').textContent;
    const cardDescription = card.querySelector('.card-description').textContent;
    const cardPrice = card.querySelector('.card-price').textContent;

    // Get existing cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if item is already in the cart
    if (!cartItems.some(item => item.title === cardTitle)) {
      // Add new item to cart
      cartItems.push({ title: cardTitle, description: cardDescription, price: cardPrice });
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      
      // Change the button text to "ADDED"
      button.textContent = 'ADDED';
      
      // After 1 second, revert the button text back to "Add to Cart"
      setTimeout(() => {
        button.textContent = 'Add to Cart';
      }, 1000);
      
      // Update the cart item count
      updateCartCount();
    }
  });
  
  card.addEventListener('mouseover', () => {
    button.style.display = 'block';
  });
  
  card.addEventListener('mouseout', () => {
    button.style.display = 'none';
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.card')) {
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.style.display = 'none';
    });
  }
});

/**
 * Update the cart count
 */
function updateCartCount() {
  const cartCountElem = document.querySelector('.header-action-btn.cart-btn .span');
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartCountElem.textContent = cartItems.length;
}

// Update cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);




