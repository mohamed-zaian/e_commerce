// =============== متغيرات عامة ===============
let products = []; // هنا هيتخزن الداتا كلها
let badge = document.getElementById("cartBadge");

// =============== Get Products from API ===============
async function getPosts() {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

// =============== Display Products ===============
function displayProduct(productArr) {
  let gridHtml = "";

  for (let i = 0; i < productArr.length; i++) {
    gridHtml += `
      <div class="product text-center col-lg-3 col-md-4 col-12 mb-4 product-card" 
          data-id="${productArr[i].id}">
        <img class="img-fluid mb-3" src="${productArr[i].thumbnail}" alt="${productArr[i].title}" />
        <div class="star">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-regular fa-star"></i>
        </div>
        <h5 class="p-name">${productArr[i].title}</h5>
        <h4 class="p-price">$${productArr[i].price}</h4>
        <button class="buy-btn add-to-cart" data-id="${productArr[i].id}">
          Buy Now
        </button>
      </div>
    `;
  }

  document.getElementById("productList").innerHTML = gridHtml;

  // كليك على الكارت يفتح صفحة التفاصيل
  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart")) return;
      const productId = card.getAttribute("data-id");
      const selectedProduct = productArr.find((p) => p.id == productId);
      if (selectedProduct) {
        localStorage.setItem(
          "selectedProduct",
          JSON.stringify(selectedProduct)
        );
        window.location.href = "sproduct.html";
      }
    });
  });

  // زرار Buy Now يضيف للكارت
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const productId = e.target.getAttribute("data-id");
      addToCart(productId, productArr);
    });
  });
}

// =============== Add to Cart ===============
function addToCart(productId, productArr) {
  let loginUser = JSON.parse(localStorage.getItem("loginUser")) || {};
  let users = JSON.parse(localStorage.getItem("users")) || [];

  let cart = loginUser.cart || [];

  let newProduct = productArr.find((p) => p.id == productId);
  if (!newProduct) return;

  let existingProduct = cart.find((item) => item.id === newProduct.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
    Swal.fire({
      title: `${newProduct.title} is already in cart! Quantity increased.`,
      icon: "success",
      draggable: true,
    });
  } else {
    cart.push({
      id: newProduct.id,
      title: newProduct.title,
      price: newProduct.price,
      images: newProduct.images,
      quantity: 1,
    });
    Swal.fire({
      title: `${newProduct.title} added to cart!`,
      icon: "success",
      draggable: true,
    });
  }

  loginUser.cart = cart;
  localStorage.setItem("loginUser", JSON.stringify(loginUser));

  // ✅ تحديث الـ users list كمان
  let updatedUsers = users.map((user) => {
    if (user.email === loginUser.email) {
      return loginUser;
    }
    return user;
  });
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  // تحديث البادج
  badge.textContent = cart.length;
}

// =============== Update Cart Badge ===============
function updateBadge() {
  let loginUser = JSON.parse(localStorage.getItem("loginUser")) || {};
  let cart = loginUser.cart || [];
  badge.textContent = cart.length;
}

// =============== Main ===============
document.addEventListener("DOMContentLoaded", async () => {
  products = await getPosts();
  if (products) {
    displayProduct(products);
    updateBadge();
  }
});

// =============== Filter by Category ===============
let select = document.getElementById("categoryFilter");

select.addEventListener("change", function () {
  let selectedValue = select.value;
  if (selectedValue === "All") {
    displayProduct(products);
  } else {
    let filtered = products.filter((p) => p.category === selectedValue);
    displayProduct(filtered);
  }
});

// =============== Sign Out ===============
let signOutBtn = document.getElementById("signOut");

signOutBtn.addEventListener("click", () => {
  localStorage.removeItem("loginUser");

  // امسح الـ history وبدل الصفحة بالـ login
  window.location.replace("login.html");
  history.pushState(null, "", "login.html");
  window.onpopstate = function () {
    history.go(1); // يمنع الـ back
  };
});
