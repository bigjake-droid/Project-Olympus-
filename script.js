document.addEventListener("DOMContentLoaded", function () {
  runIntro();
  protectPages();
  wireAuthButtons();
  wireParallax();
  renderEvidence();
});

/* =========================
   INTRO
========================= */

function runIntro() {
  const intro = document.getElementById("intro");

  if (!intro) return;

  setTimeout(function () {
    intro.classList.add("intro-exit");
  }, 4300);

  setTimeout(function () {
    intro.style.display = "none";
  }, 5600);
}

/* =========================
   PAGE PROTECTION
========================= */

function protectPages() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const protectedPages = [
    "dashboard.html",
    "guidebook.html",
    "evidence.html"
  ];

  if (!protectedPages.includes(currentPage)) return;

  const loggedIn = localStorage.getItem("vindex_logged_in");

  if (loggedIn !== "true") {
    window.location.href = "index.html?v=20000";
  }
}

/* =========================
   AUTH / LOGIN
========================= */

function wireAuthButtons() {
  const splashPanel = document.getElementById("splashPanel");
  const createPanel = document.getElementById("createPanel");
  const loginPanel = document.getElementById("loginPanel");

  const createBtn = document.getElementById("createBtn");
  const loginBtn = document.getElementById("loginBtn");

  const submitCreateBtn = document.getElementById("submitCreateBtn");
  const submitLoginBtn = document.getElementById("submitLoginBtn");

  const backFromCreateBtn = document.getElementById("backFromCreateBtn");
  const backFromLoginBtn = document.getElementById("backFromLoginBtn");

  if (createBtn && createPanel) {
    createBtn.addEventListener("click", function () {
      showPanel(createPanel);
    });
  }

  if (loginBtn && loginPanel) {
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
    submitCreateBtn.addEventListener("click", createUser);
  }

  if (submitLoginBtn) {
    submitLoginBtn.addEventListener("click", loginUser);
  }
}

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

function createUser() {
  const fullName = document.getElementById("fullName")?.value.trim();
  const email = document.getElementById("createEmail")?.value.trim().toLowerCase();
  const password = document.getElementById("createPassword")?.value.trim();
  const confirmPassword = document.getElementById("confirmPassword")?.value.trim();

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

  window.location.href = "dashboard.html?v=20000";
}

function loginUser() {
  const email = document.getElementById("loginEmail")?.value.trim().toLowerCase();
  const password = document.getElementById("loginPassword")?.value.trim();

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

  window.location.href = "dashboard.html?v=20000";
}

function logoutUser() {
  localStorage.setItem("vindex_logged_in", "false");
  window.location.href = "index.html?v=20000";
}

/* =========================
   NAVIGATION
========================= */

function goBack() {
  window.location.href = "dashboard.html?v=20000";
}

function openSection(sectionName) {
  if (sectionName === "Evidence Organizer") {
    window.location.href = "evidence.html?v=20000";
    return;
  }

  if (sectionName === "Pro Se Guidebook") {
    window.location.href = "guidebook.html?v=20000";
    return;
  }

  showMessage(sectionName + " coming next.");
}

/* =========================
   GUIDEBOOK
========================= */

function toggleCard(card) {
  card.classList.toggle("active");

  const mark = card.querySelector(".toggle-mark");

  if (mark) {
    mark.textContent = card.classList.contains("active") ? "−" : "+";
  }
}

/* =========================
   PARALLAX
========================= */

function wireParallax() {
  const bg = document.querySelector(".parallax-bg");
  const panel = document.querySelector(".entry-panel");

  if (!bg) return;

  document.addEventListener("pointermove", function (event) {
    const x = (event.clientX / window.innerWidth - 0.5) * 18;
    const y = (event.clientY / window.innerHeight - 0.5) * 18;

    bg.style.transform = `scale(1.06) translate(${x}px, ${y}px)`;

    if (panel) {
      panel.style.transform = `translate(${-x * 0.18}px, ${-y * 0.18}px)`;
    }
  });
}

/* =========================
   EVIDENCE ORGANIZER
========================= */

function addEvidence() {
  const title = document.getElementById("evTitle")?.value.trim();
  const date = document.getElementById("evDate")?.value;
  const type = document.getElementById("evType")?.value.trim();
  const source = document.getElementById("evSource")?.value.trim();
  const summary = document.getElementById("evSummary")?.value.trim();
  const link = document.getElementById("evLink")?.value.trim();
  const doctrineSelect = document.getElementById("evDoctrine");

  if (!title || !date || !type || !source || !summary) {
    showMessage("Title, date, type, source, and summary are required.");
    return;
  }

  const doctrine = doctrineSelect
    ? Array.from(doctrineSelect.selectedOptions).map(function (option) {
        return option.value;
      })
    : [];

  const evidence = JSON.parse(localStorage.getItem("vindex_evidence")) || [];

  const newItem = {
    id: Date.now(),
    title: title,
    date: date,
    type: type,
    source: source,
    summary: summary,
    link: link,
    doctrine: doctrine,
    createdAt: new Date().toISOString()
  };

  evidence.push(newItem);
  localStorage.setItem("vindex_evidence", JSON.stringify(evidence));

  clearEvidenceForm();
  renderEvidence();
  showMessage("Evidence added.");
}

function renderEvidence() {
  const container = document.getElementById("evidenceList");

  if (!container) return;

  const evidence = JSON.parse(localStorage.getItem("vindex_evidence")) || [];

  if (evidence.length === 0) {
    container.innerHTML = `
      <div class="guide-card active">
        <div class="guide-header">
          <div class="guide-badge">0</div>
          <div>
            <h2>No Evidence Logged</h2>
            <small>START THE RECORD</small>
          </div>
        </div>
        <div class="guide-body">
          <div class="guide-line-item">Add your first evidence entry above.</div>
        </div>
      </div>
    `;
    return;
  }

  const sorted = evidence.slice().sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  container.innerHTML = sorted.map(function (item) {
    const doctrineText = item.doctrine && item.doctrine.length
      ? item.doctrine.join(", ")
      : "No doctrine tagged";

    const linkHtml = item.link
      ? `<a class="evidence-link" href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer">Open Evidence</a>`
      : `<span class="evidence-link disabled">No Link Added</span>`;

    return `
      <article class="guide-card active evidence-item">
        <div class="guide-header">
          <div class="guide-badge">${escapeHtml(item.type.substring(0, 2).toUpperCase())}</div>

          <div>
            <h2>${escapeHtml(item.title)}</h2>
            <small>${escapeHtml(item.date)} · ${escapeHtml(item.source)}</small>
          </div>

          <button class="delete-evidence-btn" onclick="deleteEvidence(${item.id})">×</button>
        </div>

        <div class="guide-body">
          <div class="guide-line-item"><strong>Type:</strong> ${escapeHtml(item.type)}</div>
          <div class="guide-line-item"><strong>Summary:</strong> ${escapeHtml(item.summary)}</div>
          <div class="guide-line-item"><strong>Doctrine:</strong> ${escapeHtml(doctrineText)}</div>
          <div class="guide-line-item">${linkHtml}</div>
        </div>
      </article>
    `;
  }).join("");
}

function deleteEvidence(id) {
  const evidence = JSON.parse(localStorage.getItem("vindex_evidence")) || [];

  const updated = evidence.filter(function (item) {
    return item.id !== id;
  });

  localStorage.setItem("vindex_evidence", JSON.stringify(updated));

  renderEvidence();
  showMessage("Evidence removed.");
}

function clearEvidenceForm() {
  const fields = [
    "evTitle",
    "evDate",
    "evType",
    "evSource",
    "evSummary",
    "evLink"
  ];

  fields.forEach(function (id) {
    const field = document.getElementById(id);
    if (field) field.value = "";
  });

  const doctrineSelect = document.getElementById("evDoctrine");

  if (doctrineSelect) {
    Array.from(doctrineSelect.options).forEach(function (option) {
      option.selected = false;
    });
  }
}

/* =========================
   UI MESSAGE
========================= */

function showMessage(text) {
  const messageBox = document.getElementById("messageBox");

  if (!messageBox) return;

  messageBox.textContent = text;
  messageBox.classList.add("show");

  setTimeout(function () {
    messageBox.classList.remove("show");
  }, 1800);
}

/* =========================
   SAFETY / DISPLAY HELPERS
========================= */

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}