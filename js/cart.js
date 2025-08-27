let loginUser = JSON.parse(localStorage.getItem("loginUser"));
let cart = loginUser.cart;

let productContainer = document.querySelector(".product-container");
console.log(productContainer);

productContainer.classList.add("row");

for (let item of cart) {
  let productRow = document.querySelector(".table-body");

  productRow.innerHTML += `
   <tr>
            <td>
              <a class="btn-remove" href="#"><i class="fas fa-trash-alt"></i></a>
            </td>
            <td><img src=${item.image} alt="" /></td>
            <td><h5>${item.name}</h5></td>
            <td><h5>$${item.price}</h5></td>
            <td><input class="w-25 ps-1" value="${item.quantity}" type="number" /></td>
            <td><h5>$${item.price * item.quantity}</h5></td>
          </tr>
  `;

}

document.querySelectorAll(".btn-remove").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    cart.splice(index, 1);
    loginUser.cart = cart;
    localStorage.setItem("loginUser", JSON.stringify(loginUser));
    location.reload();
  });
});
