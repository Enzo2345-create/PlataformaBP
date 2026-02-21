"use strict";

/* ================================================
   UTILITÁRIO — detecta se é desktop (mouse real)
================================================ */
function isMouse() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}


/* ================================================
   HOVER — efeito de elevação nos cards e itens
================================================ */
const itensHover = document.querySelectorAll(
  ".card, .noticia, .card-fonte, .artigo, .card-fonte-extra, .coluna"
);

itensHover.forEach(el => {
  el.addEventListener("mouseenter", () => {
    if (isMouse()) {
      el.style.transform = "translateY(-6px)";
      el.style.boxShadow = "0 12px 25px rgba(0,0,0,0.12)";
    }
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "none";
    el.style.boxShadow = "";
  });
});


/* ================================================
   MENU MOBILE — abre/fecha sidebar com overlay
================================================ */
const btnMenu = document.getElementById("btnMenu");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

btnMenu.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  overlay.classList.toggle("show");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
});


/* ================================================
   MENU ATIVO — marca o botão clicado como .active
================================================ */
document.querySelectorAll(".btn-nav").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".btn-nav")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");
  });
});
