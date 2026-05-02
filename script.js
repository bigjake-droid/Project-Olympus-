document.addEventListener("DOMContentLoaded", function () {
  const createBtn = document.getElementById("createBtn");
  const loginBtn = document.getElementById("loginBtn");

  if (!createBtn || !loginBtn) {
    console.error("Buttons not found. Check index.html button IDs.");
    return;
  }

  createBtn.addEventListener("click", function () {
    localStorage.setItem("vindex_entry_mode", "create");

    alert("Create Account selected. Next screen coming.");
  });

  loginBtn.addEventListener("click", function () {
    localStorage.setItem("vindex_entry_mode", "login");

    alert("Login selected. Next screen coming.");
  });
});