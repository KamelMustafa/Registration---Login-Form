const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const phone = document.getElementById("phone");
const strengthText = document.getElementById("password-strength");

password.addEventListener("input", function () {
  const val = password.value;
  if (val.length < 6) {
    strengthText.textContent = "Weak";
    strengthText.style.color = "red";
  } else if (val.length < 10) {
    strengthText.textContent = "Moderate";
    strengthText.style.color = "orange";
  } else {
    strengthText.textContent = "Strong";
    strengthText.style.color = "green";
  }
});

const allInputs = document.querySelectorAll("input");
allInputs.forEach(function (input) {
  input.addEventListener("focus", function () {
    input.style.boxShadow = "0 0 5px rgba(108, 99, 255, 0.5)";
  });
  input.addEventListener("blur", function () {
    input.style.boxShadow = "none";
  });
});

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

function checkForm() {
  let valid = true;

  if (username.value.trim() === "") {
    showError(username, "Username is required");
    valid = false;
  } else {
    showSuccess(username);
  }

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
  } else if (password.value.length < 8) {
    showError(password, "Password must be at least 8 characters");
    valid = false;
  } else {
    showSuccess(password);
  }

  if (password2.value.trim() === "") {
    showError(password2, "Please confirm your password");
    valid = false;
  } else if (password2.value !== password.value) {
    showError(password2, "Passwords do not match");
    valid = false;
  } else {
    showSuccess(password2);
  }

  const phonePattern = /^01[0-2,5][0-9]{8}$/;
  if (phone.value.trim() === "") {
    showError(phone, "Phone number is required");
    valid = false;
  } else if (!phonePattern.test(phone.value)) {
    showError(phone, "Invalid Egyptian phone number");
    valid = false;
  } else {
    showSuccess(phone);
  }

  return valid;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (checkForm()) {
    const oldMsg = document.querySelector(".success-banner");
    if (oldMsg) oldMsg.remove();

    const msg = document.createElement("div");
    msg.textContent = "Registration successful!";
    msg.className = "success-banner";
    form.prepend(msg);

    form.reset();
    document.querySelectorAll(".input-control").forEach(function (box) {
      box.classList.remove("success", "error");
      box.querySelector(".error").textContent = "";
    });
    strengthText.textContent = "";
    strengthText.style.color = "";

    setTimeout(function () {
      msg.remove();
    }, 3000);
  }
});
