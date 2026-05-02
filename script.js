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

    setTimeout(function () {
      panelToShow.classList.remove("hidden-panel");
      panelToShow.classList.add("active-panel");
    }, 80);
  }

  function showMessage(text) {
    messageBox.textContent = text;
    messageBox.classList.add("show");

    setTimeout(function () {
      messageBox.classList.remove("show");
    }, 2200);
  }

  createBtn.addEventListener("click", function () {
    localStorage.setItem("vindex_entry_mode", "create");
    showPanel(createPanel);
  });

  loginBtn.addEventListener("click", function () {
    localStorage.setItem("vindex_entry_mode", "login");
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
      fullName: fullName,
      email: email,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem("vindex_user", JSON.stringify(user));
    localStorage.setItem("vindex_logged_in", "true");

    showMessage("Record established.");

    setTimeout(function () {
      document.body.innerHTML = `
        <main class="vindex-screen">
          <div class="dark-overlay"></div>
          <section class="form-panel active-panel">
            <h2>Welcome, ${fullName}</h2>
            <p>Your record has begun.</p>
            <button class="primary-btn" onclick="location.reload()">Continue</button>
          </section>
        </main>
      `;
    }, 1000);
  });

  submitLoginBtn.addEventListener("click", function () {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const savedUser = JSON.parse(localStorage.getItem("vindex_user"));

    if (!email || !password) {
      showMessage("Enter email and password.");
      return;
    }

    if (!savedUser || savedUser.email !== email) {
      showMessage("No matching record found.");
      return;
    }

    localStorage.setItem("vindex_logged_in", "true");

    showMessage("Access granted.");

    setTimeout(function () {
      document.body.innerHTML = `
        <main class="vindex-screen">
          <div class="dark-overlay"></div>
          <section class="form-panel active-panel">
            <h2>Access Granted</h2>
            <p>Welcome back, ${savedUser.fullName}.</p>
            <button class="primary-btn" onclick="location.reload()">Continue</button>
          </section>
        </main>
      `;
    }, 1000);
  });
});