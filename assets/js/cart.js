'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');
  const emptyCartMessage = document.getElementById('empty-cart-message'); // Element for the empty cart message
  const generalCardImage = './assets/images/cart-card.jpg'; // Path to your general card image

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
    if (window.innerWidth <= 600) {
      return '80px'; // Width for small screens
    } else {
      return '100px'; // Default width for larger screens
    }
  }

  // Render cart items
  function renderCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartList.innerHTML = '';

    if (cartItems.length === 0) {
      emptyCartMessage.style.display = 'block'; // Show the empty cart message
    } else {
      emptyCartMessage.style.display = 'none'; // Hide the empty cart message
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
    renderCartItems(); // Render cart items without reloading the page
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



//CHECKOUT BUTTON
// Checkout FUnction:


document.addEventListener('DOMContentLoaded', function () {
    const checkoutButton = document.querySelector('.checkout-btn');
    const modal = document.getElementById('modal');
    const closeModalButton = modal.querySelector('.close-modal');

    // Show the modal
    checkoutButton.addEventListener('click', function () {
        modal.style.display = 'flex'; // Or use 'block' depending on your CSS
    });

    // Hide the modal
    closeModalButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Hide the modal when clicking outside of the modal content
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle close button for each form
    document.querySelectorAll('.close-form').forEach(function (button) {
        button.addEventListener('click', function () {
            const formOverlay = button.closest('.form-overlay');
            formOverlay.style.display = 'none';
        });
    });

    // Handle grid item clicks to open specific forms
    document.querySelectorAll('.grid-item').forEach(function (item) {
        item.addEventListener('click', function () {
            const formId = item.getAttribute('data-target');
            const formOverlay = document.getElementById(formId);
            formOverlay.style.display = 'flex'; // Or use 'block'
            modal.style.display = 'none';
        });
    });
});

