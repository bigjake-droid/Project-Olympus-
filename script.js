document.addEventListener("DOMContentLoaded", function () {
  const splashPanel = document.getElementById("splashPanel");
  const createPanel = document.getElementById("createPanel");
  const loginPanel = document.getElementById("loginPanel");

  const createBtn = document.getElementById("createBtn");
  const loginBtn = document.getElementById("loginBtn");

  const submitCreateBtn = document.getElementById("submitCreateBtn");
  const submitLoginBtn = document.getElementById("submitLoginBtn");

  const backFromCreateBtn = document.getElementById("backFromCreateBtn");
  const backFromLoginBtn = document.getElementById("backFromLoginBtn");

  const messageBox = document.getElementById("messageBox");

  function showPanel(panelToShow) {
    splashPanel.className = "entry-panel hidden-panel";
    createPanel.className = "form-panel hidden-panel";
    loginPanel.className = "form-panel hidden-panel";

    panelToShow.classList.remove("hidden-panel");
    panelToShow.classList.add("active-panel");
  }

  function showMessage(text) {
    messageBox.textContent = text;
    messageBox.classList.add("show");

    setTimeout(function () {
      messageBox.classList.remove("show");
    }, 2000);
  }

  createBtn.addEventListener("click", function () {
    showPanel(createPanel);
  });

  loginBtn.addEventListener("click", function () {
    showPanel(loginPanel);
  });

  backFromCreateBtn.addEventListener("click", function () {
    showPanel(splashPanel);
  });

  backFromLoginBtn.addEventListener("click", function () {
    showPanel(splashPanel);
  });

  submitCreateBtn.addEventListener("click", function () {
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("createEmail").value.trim();
    const password = document.getElementById("createPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!fullName || !email || !password || !confirmPassword) {
      showMessage("Complete all fields.");
      return;
    }

    if (password !== confirmPassword) {
      showMessage("Passwords do not match.");
      return;
    }

    const user = {
      fullName,
      email,
      password,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem("vindex_user", JSON.stringify(user));
    localStorage.setItem("vindex_logged_in", "true");

    window.location.href = "dashboard.html";
  });

  submitLoginBtn.addEventListener("click", function () {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const savedUser = JSON.parse(localStorage.getItem("vindex_user"));

    if (!email || !password) {
      showMessage("Enter email and password.");
      return;
    }

    if (!savedUser || savedUser.email !== email || savedUser.password !== password) {
      showMessage("No matching record found.");
      return;
    }

    localStorage.setItem("vindex_logged_in", "true");

    window.location.href = "dashboard.html";
  });
});