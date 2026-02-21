"use strict";

// ================= CARDS HOVER =================
// ================= CARDS HOVER =================
// ================= HOVER GLOBAL =================
function isDesktop() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

const hoverItems = document.querySelectorAll(
  ".card, .news-item, .nature-news-card, .article-item, .source-card, .column"
);

hoverItems.forEach(el => {
  el.addEventListener("mouseenter", () => {
    if (isDesktop()) {
      el.style.transform = "translateY(-6px)";
      el.style.boxShadow = "0 12px 25px rgba(0,0,0,0.12)";
    }
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "none";
    el.style.boxShadow = "";
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
