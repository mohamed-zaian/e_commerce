let btn = document.getElementById("btn");
let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let email = document.getElementById("email");
let pass = document.getElementById("password");
let div_email = document.getElementById("email_div");
let passDiv = document.getElementById("password_div");
let togglePassword = document.getElementById("togglePassword");

let users = JSON.parse(localStorage.getItem("users")) || [];

// ========== Toggle password ==========
togglePassword.addEventListener("click", () => {
  if (pass.type === "password") {
    pass.type = "text";
    togglePassword.textContent = "🙈";
  } else {
    pass.type = "password";
    togglePassword.textContent = "👁️";
  }
});

// ========== Email validation ==========
email.addEventListener("input", () => {
  if (!emailRegex.test(email.value.trim())) {
    div_email.style.display = "block";
    div_email.innerText = "❌ Invalid email";
    div_email.style.color = "red";
  } else {
    div_email.innerText = "✅ Email looks good";
    div_email.style.color = "green";
  }
});

// ========== Form Submit ==========
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault(); // منع الـ refresh

  let emailValue = email.value.trim();
  let passValue = pass.value.trim();

  let user = users.find((u) => u.email === emailValue);

  if (!user) {
    div_email.style.display = "block";
    div_email.innerText = "❌ Email not found!";
    div_email.style.color = "red";
    return;
  }

  if (user.password !== passValue) {
    passDiv.style.display = "block";
    passDiv.innerText = "❌ Incorrect password!";
    passDiv.style.color = "red";
    return;
  }

  // ✅ Login success
Swal.fire({
  title: "Login Successful!",
  icon: "success",
  draggable: true
});

  localStorage.setItem("loginUser", JSON.stringify(user));

  setTimeout(() => {
    window.location.href = "shop.html";
  }, 1500);
});
