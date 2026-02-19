"use strict";

// ================= CARDS HOVER =================
// ================= CARDS HOVER =================
function isDesktop() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

document.querySelectorAll(".card").forEach(card => {

  card.addEventListener("mouseenter", () => {
    if (isDesktop()) {
      card.style.transform = "translateY(-6px) scale(1.02)";
      card.style.boxShadow = "0 12px 25px rgba(0,0,0,0.15)";
    }
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "none";
    card.style.boxShadow = "";
  });

});


// ================= MENU MOBILE =================
const toggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  overlay.classList.toggle("show");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
});

// ================= MENU ATIVO =================
document.querySelectorAll(".menu-button").forEach(btn => {
  btn.addEventListener("click", () => {

    document.querySelectorAll(".menu-button")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

  });
});
