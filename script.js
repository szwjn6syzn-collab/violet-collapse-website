const cart = [];

const cartList = document.getElementById("cartList");
const subtotalEl = document.getElementById("subtotal");
const shippingEl = document.getElementById("shipping");
const totalEl = document.getElementById("total");
const checkoutForm = document.getElementById("checkoutForm");

function formatMoney(value) {
  return `$${value.toFixed(2)}`;
}

function renderCart() {
  if (!cart.length) {
    cartList.innerHTML = '<li class="empty-state">Your cart is empty.</li>';
    subtotalEl.textContent = "$0.00";
    shippingEl.textContent = "$0.00";
    totalEl.textContent = "$0.00";
    return;
  }

  let subtotal = 0;

  cartList.innerHTML = cart
    .map((item) => {
      subtotal += item.price;
      return `
        <li class="cart-item">
          <div>
            <span class="name">${item.name}</span>
            <span class="meta">Qty 1</span>
          </div>
          <strong>${formatMoney(item.price)}</strong>
        </li>
      `;
    })
    .join("");

  const shipping = cart.length ? 0 : 0;
  const total = subtotal + shipping;

  subtotalEl.textContent = formatMoney(subtotal);
  shippingEl.textContent = formatMoney(shipping);
  totalEl.textContent = formatMoney(total);
}

function addToCart(event) {
  const product = event.currentTarget.closest(".product");
  const name = product.dataset.name;
  const price = Number(product.dataset.price);

  cart.push({ name, price });
  renderCart();
}

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", addToCart);
});

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!cart.length) {
    alert("Add an item to your cart before checking out.");
    return;
  }

  alert("Payment approved. Thanks for supporting Violet Collapse!");
  cart.length = 0;
  renderCart();
  checkoutForm.reset();
});

renderCart();








































































































