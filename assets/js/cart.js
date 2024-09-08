'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');
  const emptyCartMessage = document.getElementById('empty-cart-message');
  const generalCardImage = './assets/images/cart-card.jpg';

  // Check if cartList, cartTotal, and emptyCartMessage elements exist
  if (!cartList || !cartTotal || !emptyCartMessage) {
    console.error('Cart elements not found.');
    return;
  }

  // Function to update the cart total
  function updateCartTotal() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const total = cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      return sum + price;
    }, 0);

    cartTotal.textContent = `$${total.toFixed(2)}`;
  }

  // Function to get the appropriate image size based on screen width
  function getImageSize() {
    return window.innerWidth <= 600 ? '80px' : '100px';
  }

  // Render cart items
  function renderCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartList.innerHTML = '';

    if (cartItems.length === 0) {
      emptyCartMessage.style.display = 'block';
    } else {
      emptyCartMessage.style.display = 'none';
      cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        // Set image size based on screen width
        const imageSize = getImageSize();

        cartItem.innerHTML = `
          <img src="${generalCardImage}" alt="General Card" style="border-radius: 10px; width: ${imageSize}; height: auto;">
          <div class="cart-item-info" style="color: red;">
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

  // Function to remove item from cart
  function removeCartItem(index) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCartItems();
  }

  // Handle remove button click
  cartList.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-item')) {
      const index = e.target.getAttribute('data-index');
      removeCartItem(index);
    }
  });

  // Initial render of cart items
  renderCartItems();

  // Checkout Functionality
  const checkoutButton = document.querySelector('.checkout-btn');
  const modal = document.getElementById('modal');

  checkoutButton.addEventListener('click', function () {
    modal.style.display = 'flex';
  });

  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  document.querySelectorAll('.grid-item').forEach(function (item) {
    item.addEventListener('click', function () {
      const formId = item.getAttribute('data-target');
      const formOverlay = document.getElementById(formId);
      formOverlay.style.display = 'flex';
      modal.style.display = 'none';
    });
  });

  document.querySelectorAll('.close-form').forEach(function (button) {
    button.addEventListener('click', function () {
      const formOverlay = button.closest('.form-overlay');
      formOverlay.style.display = 'none';
    });
  });

  // Handle form submission and show the payment popup
  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission behavior

      // Display the payment confirmation popup
      const paymentPopup = document.getElementById('payment-popup');
      paymentPopup.innerHTML = `
        ✅✅✅✅✅ <br><br> Your Payment Information Was Submitted! Your Goods Should Drop To Your Inbox Soon.<br><br>
        Please Check Your Spam Email Folder As Well!
      `;
      paymentPopup.style.backgroundColor = '#007BFF'; // Light blue background
      paymentPopup.style.display = 'block';

      // Show the "Back To Home Page" button
      const backHomeButton = document.querySelector('.back-home-button');
      backHomeButton.style.display = 'block';

      // Hide the form
      document.querySelector('.form-overlay').style.display = 'none';

      // Clear the form inputs
      form.reset();

      // Clear the cart
      clearCart();

      // Optionally, you could redirect after a delay or let the user click the button
    });
  }

  // Close form button functionality
  document.querySelectorAll('.close-form').forEach(function (button) {
    button.addEventListener('click', function () {
      document.querySelector('.form-overlay').style.display = 'none';
    });
  });

  // Function to clear cart
  function clearCart() {
    localStorage.removeItem('cartItems');
    renderCartItems();
  }

  // Copy BTC Address to Clipboard
  const btcAddressSpan = document.getElementById('btc-address');
  if (btcAddressSpan) {
    btcAddressSpan.addEventListener('click', function () {
      navigator.clipboard.writeText(btcAddressSpan.textContent)
        .then(() => {
          const paymentPopup = document.getElementById('payment-popup');
          paymentPopup.textContent = 'Address Copied!';
          paymentPopup.style.backgroundColor = '#28a745'; // Green background
          paymentPopup.style.display = 'block';
          setTimeout(() => {
            paymentPopup.style.display = 'none';
          }, 1000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    });
  }
});







