
const test = require("node:test");
const assert = require("node:assert/strict");

const {
    cart,
    addToCart,
    getCartTotal,
    getCartCount,
    clearCart
} = require("./script.js");

test("adds a food item to the cart", () => {
    clearCart();

    assert.equal(addToCart("Burger", 149), true);
    assert.equal(cart.length, 1);
    assert.equal(getCartTotal(), 149);
});

test("increases quantity for repeated items", () => {
    clearCart();

    addToCart("Pizza", 199);
    addToCart("Pizza", 199);

    assert.equal(getCartCount(), 2);
    assert.equal(getCartTotal(), 398);
});

test("calculates total for different foods", () => {
    clearCart();

    addToCart("Burger", 149);
    addToCart("Pasta", 179);

    assert.equal(getCartTotal(), 328);
});

test("rejects invalid prices", () => {
    clearCart();

    assert.equal(addToCart("Burger", -10), false);
    assert.equal(addToCart("Burger", 0), false);
    assert.equal(cart.length, 0);
});

test("clears the cart", () => {
    clearCart();
    addToCart("Sandwich", 99);

    clearCart();

    assert.equal(getCartCount(), 0);
    assert.equal(getCartTotal(), 0);
});

test("rejects a missing food name", () => {
    clearCart();

    assert.equal(addToCart("", 100), false);
    assert.equal(cart.length, 0);
});

test.after(() => clearCart());
