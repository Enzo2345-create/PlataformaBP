"use strict";

/* ================================================
   UTILITÁRIO — detecta se é desktop (mouse real)
================================================ */
function isMouse() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}


/* ================================================
   SIDEBAR — injeção dinâmica + lógica
================================================ */
const NAV_ITEMS = [
  { icon: "🏠", label: "Início",        href: "index.html" },
  { icon: "🧭", label: "Atualidades",   href: "atualidades.html" },
  { icon: "📜", label: "Memória",       href: "memoria.html" },
  { icon: "🧠", label: "Conceitos",     href: "conceitos.html" },
  { icon: "📊", label: "Retratos",      href: "retratos.html" },
  { icon: "🎨", label: "Expressões",    href: "expressoes.html" },
  { icon: "🗣",  label: "Comunidade",   href: "comunidade.html" },
  { icon: "🧩", label: "Desafio",       href: "desafio.html" },
];

function buildSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  const currentFile = location.pathname.split("/").pop() || "index.html";

  sidebar.innerHTML = `
    <div class="logo">Plataforma<br><strong>PRISMA</strong></div>

    <button class="btn-toggle-sidebar" id="btnToggleSidebar" title="Recolher menu">
      <svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>

    <nav>
      ${NAV_ITEMS.map(item => `
        <a
          href="${item.href}"
          class="btn-nav${currentFile === item.href ? " active" : ""}"
          data-tooltip="${item.label}"
        >
          <span class="nav-icon">${item.icon}</span>
          <span class="nav-label">${item.label}</span>
        </a>
      `).join("")}
    </nav>

    <div class="rodape-sidebar"></div>
  `;

  /* Toggle sidebar colapsado (desktop) */
  const btnToggle = document.getElementById("btnToggleSidebar");
  const collapsed = localStorage.getItem("sidebarCollapsed") === "true";
  if (collapsed) document.body.classList.add("sidebar-collapsed");

  btnToggle.addEventListener("click", () => {
    document.body.classList.toggle("sidebar-collapsed");
    localStorage.setItem(
      "sidebarCollapsed",
      document.body.classList.contains("sidebar-collapsed")
    );
  });
}


/* ================================================
   MENU MOBILE — abre/fecha sidebar com overlay
================================================ */
function initMobileMenu() {
  const btnMenu  = document.getElementById("btnMenu");
  const sidebar  = document.getElementById("sidebar");
  const overlay  = document.getElementById("overlay");

  if (!btnMenu || !sidebar || !overlay) return;

  btnMenu.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
  });
}


/* ================================================
   HOVER — efeito de elevação nos cards e itens
================================================ */
function initHover() {
  const seletores = [
    ".card", ".noticia", ".card-fonte", ".artigo",
    ".card-fonte-extra", ".coluna", ".card-branco",
    ".card-conceito", ".card-stat", ".card-grafico",
    ".card-galeria", ".post-card", ".card-usuario",
    ".card-missao", ".ranking-item", ".timeline-card",
    ".card-epoca", ".noticia-lateral", ".card-noticia-media",
  ];

  document.querySelectorAll(seletores.join(", ")).forEach(el => {
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
}


/* ================================================
   INIT
================================================ */
document.addEventListener("DOMContentLoaded", () => {
  buildSidebar();
  initMobileMenu();
  initHover();
});
