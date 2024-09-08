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

  // Show the modal
  checkoutButton.addEventListener('click', function () {
    modal.style.display = 'flex'; // Show the modal
  });

  // Hide the modal when clicking outside of the modal content
  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none'; // Hide the modal
    }
  });

  // Handle grid item clicks to open specific forms
  document.querySelectorAll('.grid-item').forEach(function (item) {
    item.addEventListener('click', function () {
      const formId = item.getAttribute('data-target');
      const formOverlay = document.getElementById(formId);
      formOverlay.style.display = 'flex'; // Show the form
      modal.style.display = 'none'; // Hide the modal
    });
  });

  // Handle close button for each form
  document.querySelectorAll('.close-form').forEach(function (button) {
    button.addEventListener('click', function () {
      const formOverlay = button.closest('.form-overlay');
      formOverlay.style.display = 'none'; // Hide the form
    });
  });
});





//THIS IS TO COPY THE SPECIFIC COIN ADDRESS

  document.getElementById('btc-address').addEventListener('click', function() {
    // Get the address text
    var address = document.getElementById('btc-address').textContent;

    // Create a temporary textarea to copy the text
    var textarea = document.createElement('textarea');
    textarea.value = address;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    // Show the popup
    var popup = document.getElementById('popup');
    popup.classList.add('show');

    // Hide the popup after 1 second
    setTimeout(function() {
      popup.classList.remove('show');
    }, 1000);
  });





//THIS IS TO SUBMIT THE FORM AND REDIRECT TO HOME

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('checkout-form');
  const paymentPopup = document.getElementById('payment-popup');
  const closeFormButton = document.querySelector('.close-form');
  const btcAddressSpan = document.getElementById('btc-address');

  // Copy BTC Address to Clipboard
  btcAddressSpan.addEventListener('click', function() {
    navigator.clipboard.writeText(btcAddressSpan.textContent)
      .then(() => {
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

  // Handle form submission
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Display the confirmation popup
    paymentPopup.textContent = 'Payment Information Submitted! Your goods should arrive in your inbox soon.';
    paymentPopup.style.backgroundColor = '#007BFF'; // Light blue background
    paymentPopup.style.display = 'block';
    
    // Hide the form
    document.querySelector('.form-overlay').style.display = 'none';
    
    // Clear the form inputs
    form.reset();

    // Clear the cart (assuming you have a function or method to handle this)
    clearCart();

    // Redirect to the home page after 2 seconds
    setTimeout(() => {
      window.location.href = 'index.html'; // Replace with your home page URL
    }, 2000);
  });

  // Close form button functionality
  closeFormButton.addEventListener('click', function() {
    document.querySelector('.form-overlay').style.display = 'none';
  });

  // Function to clear cart (replace with your own cart clearing logic)
  function clearCart() {
    // Example cart clearing logic
    console.log('Cart cleared'); // Replace with actual cart clearing code
  }
});







