// ===============================
// 🎬 ANIMAÇÃO DE ENTRADA
// ===============================
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.6s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 50);
});

// ===============================
// 🧭 MENU ATIVO + HOVER
// ===============================
const menuButtons = document.querySelectorAll(".menu button");

menuButtons.forEach(btn => {

  // Hover suave
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "translateX(6px)";
    btn.style.transition = "all 0.25s ease";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translateX(0)";
  });

  // Clique ativo
  btn.addEventListener("click", () => {
    menuButtons.forEach(b => {
      b.classList.remove("active");
      b.style.background = "#cfcfcf";
    });

    btn.classList.add("active");
    btn.style.background = "#a5a5a5";

    rippleEffect(btn);
  });
});

// ===============================
// 💧 EFEITO RIPPLE
// ===============================
function rippleEffect(button) {
  const ripple = document.createElement("span");

  ripple.style.position = "absolute";
  ripple.style.width = "10px";
  ripple.style.height = "10px";
  ripple.style.background = "rgba(255,255,255,0.6)";
  ripple.style.borderRadius = "50%";
  ripple.style.pointerEvents = "none";
  ripple.style.transform = "scale(0)";
  ripple.style.animation = "ripple 0.6s ease-out";

  button.style.position = "relative";
  button.style.overflow = "hidden";

  button.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

// cria keyframes via JS (evita mexer no CSS)
const style = document.createElement("style");
style.innerHTML = `
@keyframes ripple {
  to {
    transform: scale(20);
    opacity: 0;
  }
}
`;
document.head.appendChild(style);

// ===============================
// 📦 ANIMAÇÃO DOS CARDS
// ===============================
const cards = document.querySelectorAll(".card");

cards.forEach(card => {

  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-6px) scale(1.02)";
    card.style.boxShadow = "0 12px 25px rgba(0,0,0,0.15)";
    card.style.transition = "all 0.25s ease";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
    card.style.boxShadow = "none";
  });

});

// ===============================
// 🔍 HOVER NA TOPBAR
// ===============================
const search = document.querySelector(".search");

if (search) {
  search.addEventListener("mouseenter", () => {
    search.style.transform = "scale(1.02)";
    search.style.transition = "0.2s ease";
  });

  search.addEventListener("mouseleave", () => {
    search.style.transform = "scale(1)";
  });
}

// ===== MENU MOBILE =====
const toggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

// ===== FECHAR AO CLICAR FORA =====
document.addEventListener("click", (e) => {
  if (
    window.innerWidth <= 900 &&
    !sidebar.contains(e.target) &&
    !toggle.contains(e.target)
  ) {
    sidebar.classList.remove("open");
  }
});

// ===== HOVER CARDS =====
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-6px) scale(1.02)";
    card.style.boxShadow = "0 12px 25px rgba(0,0,0,0.15)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "none";
    card.style.boxShadow = "none";
  });
});

// ===== MENU ATIVO =====
document.querySelectorAll(".menu button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".menu button")
      .forEach(b => b.style.background = "#cfcfcf");

    btn.style.background = "#a5a5a5";
  });
});
