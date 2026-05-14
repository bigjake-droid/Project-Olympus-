const STORAGE_KEYS = {
  evidence: "vindex_evidence",
  timeline: "vindex_timeline",
  session: "vindex_session"
};

let evidence = JSON.parse(localStorage.getItem(STORAGE_KEYS.evidence)) || [];
let timeline = JSON.parse(localStorage.getItem(STORAGE_KEYS.timeline)) || [];

document.addEventListener("DOMContentLoaded", () => {
  const sessionActive = localStorage.getItem(STORAGE_KEYS.session);

  if (sessionActive === "active") {
    showScreen("dashboardScreen");
  } else {
    showScreen("loginScreen");
  }

  renderEvidence();
  renderTimeline();
});

function initializeSession() {
  const code = document.getElementById("authCode").value.trim();

  if (!code) {
    alert("Enter authorization code.");
    return;
  }

  localStorage.setItem(STORAGE_KEYS.session, "active");
  showScreen("dashboardScreen");
}

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(screenId);

  if (target) {
    target.classList.add("active");
    window.scrollTo(0, 0);
  } else {
    console.error("Screen not found:", screenId);
  }
}

/* =========================
   EVIDENCE ORGANIZER
========================= */

function addEvidence() {
  const title = document.getElementById("evidenceTitle").value.trim();
  const notes = document.getElementById("evidenceNotes").value.trim();
  const tag = document.getElementById("evidenceTag").value.trim();

  if (!title || !notes) {
    alert("Add an evidence title and what it proves.");
    return;
  }

  const entry = {
    id: Date.now(),
    title,
    notes,
    tag,
    created: new Date().toLocaleString()
  };

  evidence.unshift(entry);
  saveEvidence();
  renderEvidence();

  document.getElementById("evidenceTitle").value = "";
  document.getElementById("evidenceNotes").value = "";
  document.getElementById("evidenceTag").value = "";
}

function saveEvidence() {
  localStorage.setItem(STORAGE_KEYS.evidence, JSON.stringify(evidence));
}

function renderEvidence() {
  const list = document.getElementById("evidenceList");
  if (!list) return;

  if (evidence.length === 0) {
    list.innerHTML = `<div class="item"><p>No evidence entered yet.</p></div>`;
    return;
  }

  list.innerHTML = evidence.map(item => `
    <div class="item">
      <h2>${escapeHTML(item.title)}</h2>
      <p class="meta">${escapeHTML(item.tag || "Uncategorized")} // ${escapeHTML(item.created)}</p>
      <p>${escapeHTML(item.notes)}</p>
      <button class="delete-btn" onclick="deleteEvidence(${item.id})">Delete Evidence</button>
    </div>
  `).join("");
}

function deleteEvidence(id) {
  evidence = evidence.filter(item => item.id !== id);
  saveEvidence();
  renderEvidence();
}

/* =========================
   CASE TIMELINE
========================= */

function addTimelineEvent() {
  const time = document.getElementById("eventTime").value.trim();
  const title = document.getElementById("eventTitle").value.trim();
  const notes = document.getElementById("eventNotes").value.trim();

  if (!time || !title || !notes) {
    alert("Add time/date, title, and details.");
    return;
  }

  const event = {
    id: Date.now(),
    time,
    title,
    notes,
    created: new Date().toLocaleString()
  };

  timeline.push(event);
  saveTimeline();
  renderTimeline();

  document.getElementById("eventTime").value = "";
  document.getElementById("eventTitle").value = "";
  document.getElementById("eventNotes").value = "";
}

function saveTimeline() {
  localStorage.setItem(STORAGE_KEYS.timeline, JSON.stringify(timeline));
}

function renderTimeline() {
  const list = document.getElementById("timelineList");
  if (!list) return;

  if (timeline.length === 0) {
    list.innerHTML = `<div class="item"><p>No timeline events entered yet.</p></div>`;
    return;
  }

  list.innerHTML = timeline.map(event => `
    <div class="item">
      <h2>${escapeHTML(event.time)} — ${escapeHTML(event.title)}</h2>
      <p>${escapeHTML(event.notes)}</p>
      <p class="meta">Entered: ${escapeHTML(event.created)}</p>
      <button class="delete-btn" onclick="deleteTimelineEvent(${event.id})">Delete Event</button>
    </div>
  `).join("");
}

function deleteTimelineEvent(id) {
  timeline = timeline.filter(event => event.id !== id);
  saveTimeline();
  renderTimeline();
}

/* =========================
   EXPORT DOSSIER
========================= */

function generateDossier() {
  let output = "";

  output += "PROJECT VINDEX DOSSIER\n";
  output += "VOX DEI // ESTABLISH THE RECORD\n";
  output += "Generated: " + new Date().toLocaleString() + "\n\n";

  output += "==============================\n";
  output += "CASE CHRONOLOGY\n";
  output += "==============================\n\n";

  if (timeline.length === 0) {
    output += "No timeline events entered.\n\n";
  } else {
    timeline.forEach((event, index) => {
      output += `${index + 1}. ${event.time} — ${event.title}\n`;
      output += `${event.notes}\n`;
      output += `Entered: ${event.created}\n\n`;
    });
  }

  output += "==============================\n";
  output += "EVIDENCE INDEX\n";
  output += "==============================\n\n";

  if (evidence.length === 0) {
    output += "No evidence entered.\n\n";
  } else {
    evidence.forEach((item, index) => {
      output += `${index + 1}. ${item.title}\n`;
      output += `Tag: ${item.tag || "Uncategorized"}\n`;
      output += `Proof Value: ${item.notes}\n`;
      output += `Entered: ${item.created}\n\n`;
    });
  }

  document.getElementById("dossierOutput").value = output;
}

/* =========================
   SECURITY / CLEANUP
========================= */

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}