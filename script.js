document.addEventListener("DOMContentLoaded", function () {

  const createBtn = document.getElementById("createBtn");
  const loginBtn = document.getElementById("loginBtn");

  createBtn.addEventListener("click", function () {
    localStorage.setItem("vindex_entry_mode", "create");

    // move to next screen
    window.location.href = "create.html";
  });

  loginBtn.addEventListener("click", function () {
    localStorage.setItem("vindex_entry_mode", "login");

    // move to next screen
    window.location.href = "login.html";
  });

});