'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');
  const emptyCartMessage = document.getElementById('empty-cart-message'); // Element for the empty cart message
  const generalCardImage = './assets/images/general-card.png'; // Path to your general card image
  const popupMessage = document.getElementById('popup-message');

  // Check if cartList, cartTotal, emptyCartMessage, and popupMessage elements exist
  if (!cartList || !cartTotal || !emptyCartMessage || !popupMessage) {
    console.error('Cart elements not found.');
    return;
  }

  // Get cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  console.log('Cart Items:', cartItems); // Debug log

  // Function to update the cart total
  function updateCartTotal() {
    const total = cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      return sum + price;
    }, 0);

    cartTotal.textContent = `$${total.toFixed(2)}`;
  }

  // Render cart items
  function renderCartItems() {
    cartList.innerHTML = '';

    if (cartItems.length === 0) {
      emptyCartMessage.style.display = 'block'; // Show the empty cart message
    } else {
      emptyCartMessage.style.display = 'none'; // Hide the empty cart message
      cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
          <img src="${generalCardImage}" alt="General Card">
          <div class="cart-item-info">
            <div class="card-title">${item.title}</div>
            <div class="card-description">${item.description}</div>
            <div class="card-price">${item.price}</div>
          </div>
          <button class="remove-item" data-index="${index}">x</button>
        `;
        
        cartList.appendChild(cartItem);
      });
    }

    updateCartTotal();
  }

  // Function to show the popup message
  function showPopup() {
    popupMessage.style.display = 'block';
    setTimeout(() => {
      popupMessage.style.display = 'none';
    }, 1000); // Hide popup after 1 second
  }

  // Function to remove item from cart
  function removeCartItem(index) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    showPopup(); // Show the popup message
    setTimeout(() => {
      renderCartItems(); // Re-render the cart items after 1 second
    }, 1000); // Wait 1 second before re-rendering
  }

  // Handle remove button click
  cartList.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-item')) {
      const index = e.target.getAttribute('data-index');
      removeCartItem(index);
    }
  });

  renderCartItems();
});

/**
 * Checkout button functionality
 */
function checkout() {
  alert('Checkout functionality not implemented yet.');
}
