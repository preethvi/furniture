let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, img) {
  cart.push({ name, price, img });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
  renderCart(); // Optional if showing cart live
}

function updateCartCount() {
  const count = cart.length;
  document.getElementById("cartCount").innerText = count;
}

function renderCart() {
  const cartContainer = document.getElementById("cartItems");
  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <p>₹${item.price.toLocaleString()}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
    cartContainer.appendChild(cartItem);
  });

  document.getElementById("totalAmount").innerText = "₹" + total.toLocaleString();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

window.onload = function () {
  updateCartCount();
  renderCart();
};
