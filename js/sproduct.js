let product = null; // متغير عام

document.addEventListener("DOMContentLoaded", () => {
  // قراءة المنتج من localStorage
  product = JSON.parse(localStorage.getItem("selectedProduct"));

  if (!product) {
    document.body.innerHTML =
      "<h3 class='text-center text-danger mt-5'>No product selected!</h3>";
    return;
  }

  // صورة رئيسية
  document.getElementById("productImg").src =
    product.thumbnail || product.images?.[0];

  // باقي التفاصيل
  document.getElementById("productTitle").textContent = product.title;
  document.getElementById("productPrice").textContent = `$${product.price}`;
  document.getElementById("productDesc").textContent = product.description;
  document.getElementById("productBrand").textContent = product.brand;
  document.getElementById("productCategory").textContent = product.category;
  document.getElementById("productStock").textContent =
    product.availabilityStatus + ` (${product.stock} available)`;
  document.getElementById("productWarranty").textContent =
    product.warrantyInformation;
  document.getElementById("productShipping").textContent =
    product.shippingInformation;
  document.getElementById("productReturn").textContent = product.returnPolicy;

  // الصور الصغيرة
  const smallImagesContainer = document.getElementById("smallImages");
  if (product.images && product.images.length > 0) {
    product.images.forEach((img) => {
      const col = document.createElement("div");
      col.classList.add("small-img-col");
      col.innerHTML = `<img src="${img}" alt="product">`;
      col.addEventListener("click", () => {
        document.getElementById("productImg").src = img;
      });
      smallImagesContainer.appendChild(col);
    });
  }

  // زرار Add to Cart (جواه علشان product يبقى معروف)
  const addToCartBtn = document.getElementById("addToCartBtn");
    addToCartBtn.addEventListener("click", () => {
  
    let loginUser = JSON.parse(localStorage.getItem("loginUser")) || {};
    let cart = loginUser.cart || [];

    let existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        images: product.images,
        quantity: 1,
      });
    }

    loginUser.cart = cart;
    localStorage.setItem("loginUser", JSON.stringify(loginUser));

    alert(`${product.title} added to cart!`);
  });
});
