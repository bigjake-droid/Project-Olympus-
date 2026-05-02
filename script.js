function showCreate() {
  document.getElementById("createForm").classList.remove("hidden");
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("message").innerText = "";
}

function showLogin() {
  document.getElementById("loginForm").classList.remove("hidden");
  document.getElementById("createForm").classList.add("hidden");
  document.getElementById("message").innerText = "";
}

function createAccount() {
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!fullName || !email || !password || !confirmPassword) {
    return showMessage("Complete all fields.");
  }

  if (password !== confirmPassword) {
    return showMessage("Passwords do not match.");
  }

  const user = {
    fullName,
    email,
    createdAt: new Date().toISOString()
  };

  localStorage.setItem("vindex_user", JSON.stringify(user));
  localStorage.setItem("vindex_logged_in", "true");

  showMessage("Record established.");
}

function loginUser() {
  const email = document.getElementById("loginEmail").value.trim();
  const savedUser = JSON.parse(localStorage.getItem("vindex_user"));

  if (!savedUser || savedUser.email !== email) {
    return showMessage("No matching record found.");
  }

  localStorage.setItem("vindex_logged_in", "true");
  showMessage("Access granted.");
}

function showMessage(text) {
  document.getElementById("message").innerText = text;
}
