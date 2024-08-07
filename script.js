// Image slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const mainImg = document.getElementById('MainImg');
    const smallImgs = document.getElementsByClassName('small-img');

    // Set up variables for automatic sliding
    let currentIndex = 0;
    const slideInterval = 3000; // Change image every 3 seconds
    let slideTimer;

    // Function to change the main image
    function changeImage(index) {
        mainImg.src = smallImgs[index].src;
        currentIndex = index;
    }

    // Set up click events for small images
    for (let i = 0; i < smallImgs.length; i++) {
        smallImgs[i].addEventListener('click', function() {
            changeImage(i);
            resetTimer();
        });
    }

    // Function to move to the next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % smallImgs.length;
        changeImage(currentIndex);
    }

    // Function to start the automatic sliding
    function startSlideShow() {
        slideTimer = setInterval(nextSlide, slideInterval);
    }

    // Function to stop the automatic sliding
    function stopSlideShow() {
        clearInterval(slideTimer);
    }

    // Function to reset the timer when manually changing images
    function resetTimer() {
        stopSlideShow();
        startSlideShow();
    }

    // Start the slideshow
    startSlideShow();

    // Optional: Pause slideshow on mouseover and resume on mouseout
    const productDetails = document.getElementById('prodetails');
    productDetails.addEventListener('mouseover', stopSlideShow);
    productDetails.addEventListener('mouseout', startSlideShow);
});


















// registration form ==> validate ===> phone number | email (regex)
function validateForm() {
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{11}$/; 

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (!phoneRegex.test(phone)) {
        alert("Please enter a valid 11-digit phone number.");
        return false;
    }

    alert("Form submitted successfully!");
    return true;
}


















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
  









// cart calculations is functional 
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
















// Function to add items to cart
document.addEventListener('DOMContentLoaded', function() {
    const addToCartBtn = document.getElementById('addToCartBtn');
    addToCartBtn.addEventListener('click', addToCart);

    function addToCart() {
        const productName = document.querySelector('.single-pro-details h4').textContent;
        const productPrice = document.querySelector('.single-pro-details h2').textContent.replace('$', '');
        const productSize = document.querySelector('.single-pro-details select').value;
        const productQuantity = parseInt(document.querySelector('.single-pro-details input[type="number"]').value);
        const productImage = document.getElementById('MainImg').src;

        const product = {
            name: productName,
            price: productPrice,
            size: productSize,
            quantity: productQuantity,
            image: productImage
        };

        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        cartItems.push(product);

        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        window.location.href = 'cart.html';
    }
});
