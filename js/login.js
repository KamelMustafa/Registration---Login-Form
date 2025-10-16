const loginForm = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");

function showError(input, message) {
  const box = input.parentElement;
  const errorMsg = box.querySelector(".error");
  errorMsg.textContent = message;
  box.classList.add("error");
  box.classList.remove("success");
}

function showSuccess(input) {
  const box = input.parentElement;
  const errorMsg = box.querySelector(".error");
  errorMsg.textContent = "";
  box.classList.add("success");
  box.classList.remove("error");
}

function isEmailValid(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.toLowerCase());
}

function checkLoginForm() {
  let valid = true;

  if (email.value.trim() === "") {
    showError(email, "Email is required");
    valid = false;
  } else if (!isEmailValid(email.value)) {
    showError(email, "Invalid email");
    valid = false;
  } else {
    showSuccess(email);
  }

  if (password.value.trim() === "") {
    showError(password, "Password is required");
    valid = false;
  } else {
    showSuccess(password);
  }

  return valid;
}

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (checkLoginForm()) {
    const oldMsg = document.querySelector(".success-banner");
    if (oldMsg) oldMsg.remove();

    const msg = document.createElement("div");
    msg.textContent = "Login successful!";
    msg.className = "success-banner";
    loginForm.prepend(msg);

    loginForm.reset();
    document.querySelectorAll(".input-control").forEach(function (box) {
      box.classList.remove("success", "error");
      box.querySelector(".error").textContent = "";
    });

    setTimeout(function () {
      msg.remove();
    }, 3000);
  }
});
