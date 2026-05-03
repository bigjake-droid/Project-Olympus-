// ================================
// VINDEX CORE SCRIPT SYSTEM
// ================================

document.addEventListener("DOMContentLoaded", function () {

  // ================================
  // AUTH GUARD (protect pages)
  // ================================

  const protectedPages = ["dashboard.html", "guidebook.html"];

  const currentPage = window.location.pathname.split("/").pop();

  if (protectedPages.includes(currentPage)) {
    const loggedIn = localStorage.getItem("vindex_logged_in");

    if (loggedIn !== "true") {
      window.location.href = "index.html?v=1200";
      return;
    }
  }

  // ================================
  // LOAD USER NAME (future use)
  // ================================

  const savedUser = JSON.parse(localStorage.getItem("vindex_user"));

  if (savedUser && savedUser.fullName) {
    const nameTargets = document.querySelectorAll(".user-name");

    nameTargets.forEach(el => {
      el.textContent = savedUser.fullName;
    });
  }

});


// ================================
// NAVIGATION
// ================================

function goBack() {
  window.location.href = "dashboard.html?v=1200";
}


// ================================
// DASHBOARD ACTIONS
// ================================

function openSection(sectionName) {

  switch (sectionName) {
    case "Pro Se Guidebook":
      window.location.href = "guidebook.html?v=1200";
      break;

    case "Evidence Organizer":
      showMessage("Evidence Organizer coming next.");
      break;

    case "Case Timeline":
      showMessage("Case Timeline coming next.");
      break;

    case "Export Dossier":
      showMessage("Export system coming next.");
      break;

    default:
      showMessage(sectionName + " coming next.");
  }
}


// ================================
// GUIDEBOOK INTERACTION
// ================================

function toggleCard(card) {
  card.classList.toggle("active");
}


// ================================
// AUTH SYSTEM
// ================================

function logoutUser() {
  localStorage.setItem("vindex_logged_in", "false");
  window.location.href = "index.html?v=1200";
}


// ================================
// UI FEEDBACK SYSTEM
// ================================

function showMessage(text) {
  let box = document.getElementById("messageBox");

  if (!box) return;

  box.textContent = text;
  box.classList.add("show");

  setTimeout(() => {
    box.classList.remove("show");
  }, 1800);
}