'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // Cart Management
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');
  const emptyCartMessage = document.getElementById('empty-cart-message');
  const generalCardImage = './assets/images/cart-card.jpg';

  // Check if cart elements exist
  if (!cartList || !cartTotal || !emptyCartMessage) {
    console.error('Cart elements not found.');
    return;
  }

  // Update the total price of the cart
  function updateCartTotal() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const total = cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      return sum + price;
    }, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
  }

  // Get image size based on screen width
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

  // Remove item from cart
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
});

// Checkout and Payment Handling
document.addEventListener('DOMContentLoaded', () => {
  const checkoutBtn = document.querySelector('.checkout-btn');
  const modal = document.getElementById('modal');
  const formOverlays = document.querySelectorAll('.form-overlay');
  const closeFormButtons = document.querySelectorAll('.close-form');
  const copyableAddresses = document.querySelectorAll('.copyable');
  const paymentPopup = document.getElementById('payment-popup');
  const darkerOverlay = document.getElementById('darker-overlay');

  // Show the modal with payment options
  checkoutBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    darkerOverlay.style.display = 'block';
  });

  // Hide the modal
  darkerOverlay.addEventListener('click', () => {
    modal.style.display = 'none';
    darkerOverlay.style.display = 'none';
  });

  // Show specific form based on selected payment method
  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('grid-item')) {
      const targetId = e.target.getAttribute('data-target');
      formOverlays.forEach(overlay => {
        if (overlay.id === targetId) {
          overlay.style.display = 'block';
          darkerOverlay.style.display = 'block';
        } else {
          overlay.style.display = 'none';
        }
      });
    }
  });

  // Close the forms
  closeFormButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.closest('.form-overlay').style.display = 'none';
      darkerOverlay.style.display = 'none';
    });
  });

  // Copy address to clipboard
  copyableAddresses.forEach(address => {
    address.addEventListener('click', () => {
      navigator.clipboard.writeText(address.textContent)
        .then(() => {
          alert('BTC address copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy address: ', err);
        });
    });
  });

  // Handle form submission
  document.querySelectorAll('.checkout-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      console.log('Form submitted with data:', Object.fromEntries(formData));
      
      // Hide form and show payment popup
      form.closest('.form-overlay').style.display = 'none';
      paymentPopup.style.display = 'block';
      darkerOverlay.style.display = 'block';

      // Redirect to home page after 2 seconds
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    });
  });
});






