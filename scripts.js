let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(item, price) {
    cart.push({ item, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item} has been added to your cart.`);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cartItems');
    const totalAmountP = document.getElementById('totalAmount');

    if (cartItemsDiv && totalAmountP) {
        cartItemsDiv.innerHTML = '';
        let total = 0;
        cart.forEach(cartItem => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = `${cartItem.item} - $${cartItem.price}`;
            cartItemsDiv.appendChild(itemDiv);
            total += cartItem.price;
        });
        totalAmountP.textContent = `Total: $${total}`;
    }
}

// Ensure that the cart is displayed correctly on the cart page
document.addEventListener('DOMContentLoaded', updateCartDisplay);
