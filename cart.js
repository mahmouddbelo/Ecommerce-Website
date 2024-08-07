document.addEventListener('DOMContentLoaded', function() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cartItems');

    cartItemsContainer.innerHTML = '';

    cartItems.forEach((item, index) => {
        const row = `
            <tr>
                <td><a href="#" class="removeItem" data-index="${index}"><i class='bx bx-no-entry'></i></a></td>
                <td><img src="${item.image}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td class="price">${item.price}</td>
                <td><input type="number" value="${item.quantity}" min="1" class="quantity"></td>
                <td class="subtotal">${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
            </tr>
        `;
        cartItemsContainer.innerHTML += row;
    });

    // Add event listeners for quantity changes and item removal
    document.querySelectorAll('.quantity').forEach(input => {
        input.addEventListener('change', updateCart);
    });

    document.querySelectorAll('.removeItem').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const index = parseInt(this.getAttribute('data-index'));
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            this.closest('tr').remove();
            updateCart();
        });
    });

    // Initial cart total calculation
    updateCart();
});













// Function to update cart totals
function updateCart() {
    let total = 0;
    const cartItems = document.querySelectorAll('#cartItems tr');
    
    cartItems.forEach(item => {
        const price = parseFloat(item.querySelector('.price').textContent);
        const quantity = parseInt(item.querySelector('.quantity').value);
        const subtotal = price * quantity;
        
        item.querySelector('.subtotal').textContent = subtotal.toFixed(2);
        total += subtotal;
    });
    
    document.getElementById('cartSubtotal').textContent = '$' + total.toFixed(2);
    document.getElementById('cartTotal').textContent = '$' + total.toFixed(2);
}

// Event listeners for cart actions
document.addEventListener('DOMContentLoaded', function() {
    updateCart();

    document.querySelectorAll('.quantity').forEach(input => {
        input.addEventListener('change', updateCart);
    });

    document.querySelectorAll('.removeItem').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.closest('tr').remove();
            updateCart();
        });
    });
});












// Function to scroll to the top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Function to toggle the visibility of the button based on scroll position
  window.onscroll = function() {
    const button = document.getElementById('scrollToTop');
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  };
