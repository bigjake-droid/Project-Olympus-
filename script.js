document.addEventListener("DOMContentLoaded", function () {
  const intro = document.getElementById("intro");

  if (intro) {
    setTimeout(function () {
      intro.classList.add("intro-exit");
    }, 4300);

    setTimeout(function () {
      intro.style.display = "none";
    }, 5600);
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const protectedPages = ["dashboard.html", "guidebook.html"];

  if (protectedPages.includes(currentPage)) {
    const loggedIn = localStorage.getItem("vindex_logged_in");

    if (loggedIn !== "true") {
      window.location.href = "index.html?v=10000";
      return;
    }
  }

  const splashPanel = document.getElementById("splashPanel");
  const createPanel = document.getElementById("createPanel");
  const loginPanel = document.getElementById("loginPanel");

  const createBtn = document.getElementById("createBtn");
  const loginBtn = document.getElementById("loginBtn");

  const submitCreateBtn = document.getElementById("submitCreateBtn");
  const submitLoginBtn = document.getElementById("submitLoginBtn");

  const backFromCreateBtn = document.getElementById("backFromCreateBtn");
  const backFromLoginBtn = document.getElementById("backFromLoginBtn");

  if (createBtn && loginBtn && splashPanel && createPanel && loginPanel) {
    createBtn.addEventListener("click", function () {
      showPanel(createPanel);
    });

    loginBtn.addEventListener("click", function () {
      showPanel(loginPanel);
    });
  }

  if (backFromCreateBtn && splashPanel) {
    backFromCreateBtn.addEventListener("click", function () {
      showPanel(splashPanel);
    });
  }

  if (backFromLoginBtn && splashPanel) {
    backFromLoginBtn.addEventListener("click", function () {
      showPanel(splashPanel);
    });
  }

  if (submitCreateBtn) {
    submitCreateBtn.addEventListener("click", function () {
      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("createEmail").value.trim().toLowerCase();
      const password = document.getElementById("createPassword").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();

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
        password: password,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem("vindex_user", JSON.stringify(user));
      localStorage.setItem("vindex_logged_in", "true");

      window.location.href = "dashboard.html?v=10000";
    });
  }

  if (submitLoginBtn) {
    submitLoginBtn.addEventListener("click", function () {
      const email = document.getElementById("loginEmail").value.trim().toLowerCase();
      const password = document.getElementById("loginPassword").value.trim();

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

      window.location.href = "dashboard.html?v=10000";
    });
  }

  const bg = document.querySelector(".parallax-bg");
  const panel = document.querySelector(".entry-panel");

  document.addEventListener("pointermove", function (event) {
    if (!bg) return;

    const x = (event.clientX / window.innerWidth - 0.5) * 18;
    const y = (event.clientY / window.innerHeight - 0.5) * 18;

    bg.style.transform = `scale(1.06) translate(${x}px, ${y}px)`;

    if (panel) {
      panel.style.transform = `translate(${-x * 0.18}px, ${-y * 0.18}px)`;
    }
  });
});

function showPanel(panelToShow) {
  const splashPanel = document.getElementById("splashPanel");
  const createPanel = document.getElementById("createPanel");
  const loginPanel = document.getElementById("loginPanel");

  if (splashPanel) splashPanel.className = "entry-panel hidden-panel";
  if (createPanel) createPanel.className = "form-panel hidden-panel";
  if (loginPanel) loginPanel.className = "form-panel hidden-panel";

  panelToShow.classList.remove("hidden-panel");
  panelToShow.classList.add("active-panel");
}

function openSection(sectionName) {
  showMessage(sectionName + " coming next.");
}

function goBack() {
  window.location.href = "dashboard.html?v=10000";
}

function toggleCard(card) {
  card.classList.toggle("active");

  const mark = card.querySelector(".toggle-mark");

  if (mark) {
    mark.textContent = card.classList.contains("active") ? "−" : "+";
  }
}

function logoutUser() {
  localStorage.setItem("vindex_logged_in", "false");
  window.location.href = "index.html?v=10000";
}

function showMessage(text) {
  const messageBox = document.getElementById("messageBox");

  if (!messageBox) return;

  messageBox.textContent = text;
  messageBox.classList.add("show");

  setTimeout(function () {
    messageBox.classList.remove("show");
  }, 1800);
}