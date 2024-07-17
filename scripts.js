document.addEventListener('DOMContentLoaded', () => {
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.product-item .add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Remove from cart functionality
    const removeFromCartButtons = document.querySelectorAll('.cart-item button');
    removeFromCartButtons.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });

    // Update cart total when quantity changes
    const quantityInputs = document.querySelectorAll('.cart-item input[type="number"]');
    quantityInputs.forEach(input => {
        input.addEventListener('change', updateCartTotal);
    });

    // Add to wishlist functionality
    const addToWishlistButtons = document.querySelectorAll('.product-item .add-to-wishlist');
    addToWishlistButtons.forEach(button => {
        button.addEventListener('click', addToWishlist);
    });

    // Sample checkout functionality
    const checkoutButton = document.querySelector('.checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', sampleCheckout);
    }

    // Order placement functionality
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', placeOrder);
    }

    // Simulate adding item to cart
    function addToCart(event) {
        const product = event.target.closest('.product-item');
        const productName = product.querySelector('h2').textContent;
        alert(`Added ${productName} to cart!`);
        // In a real application, you would update the cart state and possibly send data to a server
    }

    // Simulate removing item from cart
    function removeFromCart(event) {
        const cartItem = event.target.closest('.cart-item');
        cartItem.remove();
        updateCartTotal();
        // In a real application, you would update the cart state and possibly send data to a server
    }

    // Update cart total (simplified version)
    function updateCartTotal() {
        const cartItems = document.querySelectorAll('.cart-item');
        let total = 0;
        cartItems.forEach(item => {
            const price = parseFloat(item.querySelector('p').textContent.replace('$', ''));
            const quantity = parseInt(item.querySelector('input').value);
            total += price * quantity;
        });
        const cartTotal = document.querySelector('.cart-total h2');
        if (cartTotal) {
            cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        }
    }

    // Simulate adding item to wishlist
    function addToWishlist(event) {
        const product = event.target.closest('.product-item');
        const productName = product.querySelector('h2').textContent;
        alert(`Added ${productName} to wishlist!`);
        // In a real application, you would update the wishlist state and possibly send data to a server
    }

    // Sample checkout process
    function sampleCheckout() {
        const cartItems = document.querySelectorAll('.cart-item');
        let orderSummary = "Order Summary:\n\n";
        let total = 0;

        cartItems.forEach(item => {
            const name = item.querySelector('h2').textContent;
            const price = parseFloat(item.querySelector('p').textContent.replace('$', ''));
            const quantity = parseInt(item.querySelector('input').value);
            const itemTotal = price * quantity;
            total += itemTotal;

            orderSummary += `${name} - Quantity: ${quantity} - $${itemTotal.toFixed(2)}\n`;
        });

        orderSummary += `\nTotal: $${total.toFixed(2)}`;

        alert(orderSummary);
        alert("Thank you for your purchase! This is a sample checkout process.");
        // In a real application, you would process the payment and send the order to a server
    }

    // Function to load wishlist items (for demonstration purposes)
    function loadWishlistItems() {
        const wishlistItems = [
            { name: "Product 1", price: 19.99, image: "product1.jpg" },
            { name: "Product 2", price: 29.99, image: "product2.jpg" },
            { name: "Product 3", price: 39.99, image: "product3.jpg" },
        ];

        const wishlistContainer = document.querySelector('.wishlist-items');
        if (wishlistContainer) {
            wishlistItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('wishlist-item');
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <h2>${item.name}</h2>
                    <p>$${item.price.toFixed(2)}</p>
                    <button class="add-to-cart">Add to Cart</button>
                `;
                wishlistContainer.appendChild(itemElement);
            });
        }
    }

    // Load wishlist items when on the wishlist page
    if (window.location.pathname.includes('wishlist.html')) {
        loadWishlistItems();
    }

    function placeOrder(event) {
        event.preventDefault();

        // Basic form validation
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const country = document.getElementById('country').value;
        const cardNumber = document.getElementById('card-number').value;
        const expiry = document.getElementById('expiry').value;
        const cvv = document.getElementById('cvv').value;

        if (!name || !address || !city || !country || !cardNumber || !expiry || !cvv) {
            alert('Please fill in all fields');
            return;
        }

        // Simple card number validation (16 digits)
        if (!/^\d{16}$/.test(cardNumber)) {
            alert('Please enter a valid 16-digit card number');
            return;
        }

        // Simple expiry date validation (MM/YY format)
        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
            alert('Please enter a valid expiry date in MM/YY format');
            return;
        }

        // Simple CVV validation (3 or 4 digits)
        if (!/^\d{3,4}$/.test(cvv)) {
            alert('Please enter a valid CVV (3 or 4 digits)');
            return;
        }

        // Simulate order processing
        const orderNumber = Math.floor(Math.random() * 1000000);
        const orderDate = new Date().toLocaleDateString();

        // Create order summary
        let orderSummary = `Order Confirmation\n\n`;
        orderSummary += `Order Number: ${orderNumber}\n`;
        orderSummary += `Date: ${orderDate}\n\n`;
        orderSummary += `Shipping Information:\n`;
        orderSummary += `${name}\n${address}\n${city}, ${country}\n\n`;
        orderSummary += `Items Ordered:\n`;

        const cartItems = document.querySelectorAll('.cart-item');
        let total = 0;

        cartItems.forEach(item => {
            const itemName = item.querySelector('h2').textContent;
            const itemPrice = parseFloat(item.querySelector('p').textContent.replace('$', ''));
            const itemQuantity = parseInt(item.querySelector('input').value);
            const itemTotal = itemPrice * itemQuantity;
            total += itemTotal;

            orderSummary += `${itemName} - Quantity: ${itemQuantity} - $${itemTotal.toFixed(2)}\n`;
        });

        orderSummary += `\nTotal: $${total.toFixed(2)}`;

        // Display order confirmation
        alert('Order placed successfully!');
        alert(orderSummary);

        // Clear the cart and reset the form
        const cartItemsContainer = document.querySelector('.cart-items');
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
        }
        event.target.reset();

        // In a real application, you would send this data to a server for processing
        console.log('Order data:', {
            orderNumber,
            orderDate,
            shippingInfo: { name, address, city, country },
            paymentInfo: { cardNumber, expiry, cvv },
            items: Array.from(cartItems).map(item => ({
                name: item.querySelector('h2').textContent,
                price: parseFloat(item.querySelector('p').textContent.replace('$', '')),
                quantity: parseInt(item.querySelector('input').value)
            })),
            total
        });
    }
});