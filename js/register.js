let emailInput = document.getElementById("email");
let userNameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let confirmInput = document.getElementById("confirm");

let div_name = document.getElementById("div_name");
let div_email = document.getElementById("div_email");
let div_confirm = document.getElementById("div_confirm");
let togglePassword = document.getElementById("togglePassword");
let toggleConfirm = document.getElementById("toggleConfirm");

let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

togglePassword.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.textContent = "🙈";
  } else {
    passwordInput.type = "password";
    togglePassword.textContent = "👁️";
  }
});

toggleConfirm.addEventListener("click", () => {
  if (confirmInput.type === "password") {
    confirmInput.type = "text";
    toggleConfirm.textContent = "🙈";
  } else {
    confirmInput.type = "password";
    toggleConfirm.textContent = "👁️";
  }
});
emailInput.addEventListener("input", () => {
  if (!emailRegex.test(emailInput.value.trim())) {
    div_email.style.display = "block";
    div_email.style.color = "red";
  } else {
    div_email.innerText = "✅ Email looks good";
    div_email.style.color = "green";
  }
});

userNameInput.addEventListener("input", () => {
  if (!usernameRegex.test(userNameInput.value.trim())) {
    div_name.style.display = "block";
    div_name.style.color = "red";
  } else {
    div_name.innerText = "✅ Username valid";
    div_name.style.color = "green";
  }
});

passwordInput.addEventListener("input", () => {
  if (!passRegex.test(passwordInput.value)) {
    div_confirm.innerText =
      "❌ Password must be 8+ chars, include upper, lower, number & special";
    div_confirm.style.display = "block";
    div_confirm.style.color = "red";
  } else {
    div_confirm.innerText = "✅ Strong password";
    div_confirm.style.color = "green";
  }
});

confirmInput.addEventListener("input", () => {
  if (confirmInput.value !== passwordInput.value) {
    div_confirm.innerText = "❌ Passwords do not match";
    div_confirm.style.display = "block";
    div_confirm.style.color = "red";
  } else {
    div_confirm.innerText = "✅ Passwords match";
    div_confirm.style.color = "green";
  }
});
btn_submit.addEventListener("click", () => {
  let userName = userNameInput.value.trim();
  let email = emailInput.value.trim();
  let password = passwordInput.value;
  let confirmPassword = confirmInput.value;
  let cart = [];

  // Check username
  if (!usernameRegex.test(userName)) {
    alert("❌ Invalid username!");
    return;
  }

  // Check email
  if (!emailRegex.test(email)) {
    alert("❌ Invalid email!");
    return;
  }

  // Check password strength
  if (!passRegex.test(password)) {
    alert(
      "❌ Weak password! Must be 8+ chars with upper, lower, number & special."
    );
    return;
  }

  // Confirm password match
  if (password !== confirmPassword) {
    alert("❌ Passwords do not match!");
    return;
  }

  // Check if user already exists
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let exists = users.some((user) => user.email === email);

  if (exists) {
    alert("❌ This email is already registered!");
    return;
  }

  // Save new user
  let newUser = { userName, email, password, cart };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  Swal.fire({
    title: "Login successful",
    icon: "success",
    draggable: true,
  });
  window.location.href = "login.html";
});
