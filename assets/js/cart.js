'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');
  const generalCardImage = './assets/images/general-card.png'; // Path to your general card image

  // Get cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

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

    cartItems.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      
      cartItem.innerHTML = `
        <img src="${generalCardImage}" alt="General Card">
        <div class="cart-item-info">
          <div class="card-title">${item.title}</div>
          <div class="card-description">${item.description}</div>
          <div class="card-price">${item.price}</div>
        </div>
      `;
      
      cartList.appendChild(cartItem);
    });

    updateCartTotal();
  }

  renderCartItems();
});

function checkout() {






  
  alert('Checkout functionality not implemented yet.');
}
