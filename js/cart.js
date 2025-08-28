let loginUser = JSON.parse(localStorage.getItem("loginUser")) || { cart: [] };
let cart = loginUser.cart;

let productRow = document.querySelector(".table-body");
let emptyCartMessage = document.getElementById("empty-cart-message");
let subtotalEl = document.getElementById("subtotal");
let shippingEl = document.querySelector(".shopping");
let grandTotalEl = document.getElementById("total");
let buttonBuy = document.querySelector(".button-buy");

function updateSummary() {
  let subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

  let shipping = cart.length > 0 ? 15 : 0;
  shippingEl.textContent = `$${shipping.toFixed(2)}`;

  grandTotalEl.textContent = `$${(subtotal + shipping).toFixed(2)}`;
}

function renderCart() {
  if (cart.length === 0) {
    productRow.innerHTML = "";
    emptyCartMessage.innerHTML = `<h3 class="text-center my-5">🛒 Cart is empty</h3>`;
    updateSummary();
    return;
  }

  emptyCartMessage.innerHTML = "";
  productRow.innerHTML = cart
    .map(
      (item, index) => `
    <tr>
      <td>
        <button  class="btn-remove" data-index="${index}">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
      <td><img src="${item.images?.[0] || ""}" alt="" width="50"/></td>
      <td><h5>${item.title}</h5></td>
      <td><h5>$${item.price}</h5></td>
      <td>
        <input  class="w-25 ps-1 quantity-input" 
               data-index="${index}" 
               value="${item.quantity}" 
               type="number" min="1" />
      </td>
      <td><h5 class="item-total">$${(item.price * item.quantity).toFixed(
        2
      )}</h5></td>
    </tr>
  `
    )
    .join("");

  // زرار الحذف
  document.querySelectorAll(".btn-remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let index = e.target.closest("button").dataset.index;
      cart.splice(index, 1);
      loginUser.cart = cart;
      localStorage.setItem("loginUser", JSON.stringify(loginUser));
      renderCart();
    });
  });

  // تغيير الكمية
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", (e) => {
      let index = e.target.dataset.index;
      let newQty = parseInt(e.target.value);
      if (isNaN(newQty) || newQty < 1) newQty = 1;
      cart[index].quantity = newQty;

      loginUser.cart = cart;
      localStorage.setItem("loginUser", JSON.stringify(loginUser));
      renderCart();
    });
  });

  updateSummary();
}

// أول ما الصفحة تفتح
renderCart();
toggleBuyButton();
function toggleBuyButton() {
  if (cart.length === 0) {
    buttonBuy.disabled = true;
    buttonBuy.classList.add("disabled");
  } else {
    buttonBuy.disabled = false;
    buttonBuy.classList.remove("disabled");
  }
}
buttonBuy.addEventListener("click", () => {
  Swal.fire({
    title: "Proceed successfully!",
    icon: "success",
    draggable: true,
  }).then(() => {
    cart = [];
    loginUser.cart = [];
    localStorage.setItem("loginUser", JSON.stringify(loginUser));
    renderCart();
  });
});