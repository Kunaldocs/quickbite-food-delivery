
const cart = [];

function addToCart(name, price) {
    if (!name || !Number.isFinite(price) || price <= 0) {
        return false;
    }

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    renderCart();
    return true;
}

function getCartTotal() {
    return cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
}

function getCartCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

function clearCart() {
    cart.length = 0;
    renderCart();
}

function checkout() {
    const message = document.getElementById("message");

    if (cart.length === 0) {
        message.textContent = "Please add food before placing an order.";
        return;
    }

    message.textContent =
        `Order placed successfully! Total: ₹${getCartTotal()}`;

    clearCart();
}

function renderCart() {
    const itemsElement = document.getElementById("cart-items");
    const totalElement = document.getElementById("cart-total");
    const countElement = document.getElementById("cart-count");

    if (!itemsElement) return;

    itemsElement.replaceChildren();

    if (cart.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.textContent = "Your cart is empty.";
        itemsElement.appendChild(emptyItem);
    } else {
        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent =
                `${item.name} × ${item.quantity} — ₹${item.price * item.quantity}`;

            itemsElement.appendChild(li);
        });
    }

    if (totalElement) totalElement.textContent = getCartTotal();
    if (countElement) countElement.textContent = getCartCount();
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        cart,
        addToCart,
        getCartTotal,
        getCartCount,
        clearCart
    };
}

if (typeof document !== "undefined") {
    renderCart();
}
