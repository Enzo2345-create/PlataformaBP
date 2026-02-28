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
      <svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>

    <nav>
      ${NAV_ITEMS.map(item => `
        <a href="${item.href}"
           class="btn-nav${currentFile === item.href ? " active" : ""}"
           data-tooltip="${item.label}">
          <span class="nav-icon">${item.icon}</span>
          <span class="nav-label">${item.label}</span>
        </a>
      `).join("")}
    </nav>

    <div class="rodape-sidebar"></div>
  `;

  const btnToggle = document.getElementById("btnToggleSidebar");
  if (localStorage.getItem("sidebarCollapsed") === "true")
    document.body.classList.add("sidebar-collapsed");

  btnToggle.addEventListener("click", () => {
    document.body.classList.toggle("sidebar-collapsed");
    localStorage.setItem(
      "sidebarCollapsed",
      document.body.classList.contains("sidebar-collapsed")
    );
  });
}


/* ================================================
   MENU MOBILE
================================================ */
function initMobileMenu() {
  const btnMenu = document.getElementById("btnMenu");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
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
   HOVER — efeito de elevação nos cards
================================================ */
function initHover() {
  const sels = [
    ".card", ".noticia", ".card-fonte", ".artigo", ".card-fonte-extra",
    ".coluna", ".card-branco", ".card-conceito", ".card-stat",
    ".card-grafico", ".card-galeria-item", ".post-card", ".card-usuario",
    ".card-missao", ".ranking-item", ".timeline-card", ".card-epoca",
    ".noticia-lateral", ".card-noticia-media",
  ];
  document.querySelectorAll(sels.join(", ")).forEach(el => {
    el.addEventListener("mouseenter", () => {
      if (isMouse()) {
        el.style.transform = "translateY(-5px)";
        el.style.boxShadow = "0 12px 25px rgba(0,0,0,0.12)";
      }
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
      el.style.boxShadow = "";
    });
  });
}


/* ================================================
   ANIMAÇÃO DE ENTRADA — IntersectionObserver
================================================ */
function initScrollReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visivel");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".bloco").forEach((el, i) => {
    el.style.setProperty("--delay", `${i * 60}ms`);
    el.classList.add("reveal");
    obs.observe(el);
  });
}


/* ================================================
   RENDERIZADORES DE PÁGINA
================================================ */

/* ---------- INÍCIO ---------- */
function renderInicio() {
  if (!document.querySelector(".bloco-topo")) return;
  const d = DADOS.inicio;

  const dest = document.querySelector(".card-destaque");
  if (dest) {
    dest.style.background = d.destaque.cor;
    dest.innerHTML = `
      <div class="card-inner">
        <span class="card-tag">${d.destaque.tag}</span>
        <h2 class="card-titulo">${d.destaque.titulo}</h2>
        <p class="card-desc">${d.destaque.descricao}</p>
        <span class="card-data">${d.destaque.data}</span>
      </div>`;
  }

  document.querySelectorAll(".grade-cards .card").forEach((el, i) => {
    const c = d.cards[i];
    if (!c) return;
    el.style.background = c.cor;
    el.innerHTML = `<div class="card-inner"><span class="card-tag">${c.tag}</span><h3 class="card-titulo-sm">${c.titulo}</h3></div>`;
  });

  document.querySelectorAll(".lista-noticias .noticia").forEach((el, i) => {
    const n = d.recomendacoes[i];
    if (!n) return;
    el.innerHTML = `
      <div class="noticia-inner">
        <span class="noticia-cat">${n.categoria}</span>
        <span class="noticia-titulo">${n.titulo}</span>
      </div>`;
  });

  document.querySelectorAll(".grade-fontes .card-fonte").forEach((el, i) => {
    const f = d.fontes[i];
    if (!f) return;
    el.innerHTML = `
      <div class="fonte-cat">${f.categoria}</div>
      <div class="fonte-nome">${f.nome}</div>
      <div class="fonte-desc">${f.descricao}</div>`;
  });

  document.querySelectorAll(".lista-artigos .artigo").forEach((el, i) => {
    const a = d.artigos[i];
    if (!a) return;
    el.querySelector(".artigo-titulo").textContent = a.titulo;
    el.querySelector(".artigo-autores").textContent = a.autores;
    el.querySelector(".artigo-info .artigo-data").textContent = a.data;
    const img = el.querySelector(".artigo-imagem");
    if (img) img.innerHTML = `<span class="artigo-area">${a.area}</span>`;
  });
}


/* ---------- ATUALIDADES ---------- */
function renderAtualidades() {
  if (!document.querySelector(".grade-destaque-atualidades")) return;
  const d = DADOS.atualidades;

  const linha = document.querySelector(".linha-categoria");
  if (linha) {
    linha.innerHTML = d.categorias.map((c, i) =>
      `<button class="tag-categoria-btn${i === 0 ? " ativa" : ""}">${c}</button>`
    ).join("");
    linha.querySelectorAll(".tag-categoria-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        linha.querySelectorAll(".tag-categoria-btn").forEach(b => b.classList.remove("ativa"));
        btn.classList.add("ativa");
      });
    });
  }

  const grande = document.querySelector(".card-noticia-grande");
  if (grande) {
    grande.innerHTML = `
      <div class="card-inner card-inner-dark">
        <span class="card-tag">${d.destaque.tag}</span>
        <h2 class="card-titulo">${d.destaque.titulo}</h2>
        <p class="card-desc">${d.destaque.descricao}</p>
        <span class="card-data">${d.destaque.data}</span>
      </div>`;
  }

  document.querySelectorAll(".noticia-lateral").forEach((el, i) => {
    const n = d.laterais[i];
    if (!n) return;
    el.innerHTML = `
      <div class="noticia-inner-v">
        <span class="noticia-cat">${n.categoria}</span>
        <span class="noticia-titulo">${n.titulo}</span>
        <span class="noticia-tempo">${n.tempo}</span>
      </div>`;
  });

  document.querySelectorAll(".card-noticia-media").forEach((el, i) => {
    const n = d.mais[i];
    if (!n) return;
    el.querySelector(".galeria-info").innerHTML = `
      <div class="noticia-cat">${n.categoria}</div>
      <div class="noticia-titulo-md">${n.titulo}</div>
      <div class="noticia-tempo">${n.data}</div>`;
  });

  document.querySelectorAll(".lista-noticias .noticia").forEach((el, i) => {
    const n = d.rapidos[i];
    if (!n) return;
    el.innerHTML = `
      <div class="noticia-inner">
        <span class="noticia-cat">${n.categoria}</span>
        <span class="noticia-titulo">${n.titulo}</span>
      </div>`;
  });
}


/* ---------- MEMÓRIA ---------- */
function renderMemoria() {
  if (!document.querySelector(".grade-epocas")) return;
  const d = DADOS.memoria;

  document.querySelectorAll(".card-epoca").forEach((el, i) => {
    const e = d.epocas[i];
    if (!e) return;
    el.innerHTML = `
      <span class="epoca-ano">${e.ano}</span>
      <div class="epoca-titulo">${e.titulo}</div>
      <div class="epoca-desc">${e.descricao}</div>`;
  });

  document.querySelectorAll(".timeline-item").forEach((el, i) => {
    const t = d.timeline[i];
    if (!t) return;
    const ano = el.querySelector(".timeline-ano");
    const card = el.querySelector(".timeline-card");
    if (ano) ano.textContent = t.ano;
    if (card) card.innerHTML = `
      <div class="timeline-evento">${t.evento}</div>
      <div class="timeline-desc">${t.descricao}</div>`;
  });

  document.querySelectorAll(".lista-artigos .artigo").forEach((el, i) => {
    const a = d.documentos[i];
    if (!a) return;
    el.querySelector(".artigo-titulo").textContent = a.titulo;
    el.querySelector(".artigo-autores").textContent = a.autores;
    const img = el.querySelector(".artigo-imagem");
    if (img) img.innerHTML = `<span class="artigo-area">${a.area}</span>`;
  });
}


/* ---------- CONCEITOS ---------- */
function renderConceitos() {
  if (!document.querySelector(".destaque-conceito")) return;
  const d = DADOS.conceitos;

  const dest = document.querySelector(".destaque-conceito");
  if (dest) {
    dest.innerHTML = `
      <div class="conceito-dest-titulo">${d.destaque.termo}</div>
      <div class="conceito-dest-def">${d.destaque.definicao}</div>
      <div class="conceito-dest-autor">— ${d.destaque.autora}</div>`;
  }

  document.querySelectorAll(".card-conceito").forEach((el, i) => {
    const c = d.lista[i];
    if (!c) return;
    el.innerHTML = `
      <div class="conceito-icone-emoji">${c.icone}</div>
      <div class="conceito-area">${c.area}</div>
      <div class="conceito-termo">${c.termo}</div>
      <div class="conceito-def">${c.definicao}</div>`;
  });

  document.querySelectorAll(".lista-artigos .artigo").forEach((el, i) => {
    const a = d.artigos[i];
    if (!a) return;
    el.querySelector(".artigo-titulo").textContent = a.titulo;
    el.querySelector(".artigo-autores").textContent = a.autores;
    const img = el.querySelector(".artigo-imagem");
    if (img) img.innerHTML = `<span class="artigo-area">${a.area}</span>`;
  });
}


/* ---------- RETRATOS — Chart.js ---------- */
function renderRetratos() {
  if (!document.getElementById("graficoIDH")) return;
  const d = DADOS.retratos;

  document.querySelectorAll(".card-stat").forEach((el, i) => {
    const s = d.stats[i];
    if (!s) return;
    el.innerHTML = `
      <div class="stat-num">${s.numero}</div>
      <div class="stat-lbl">${s.label}</div>`;
  });

  const paleta = ["#8cc7b5","#a8d4c8","#b4cfc9","#c2ddd7","#5aaa93"];

  new Chart(document.getElementById("graficoIDH"), {
    type: "line",
    data: {
      labels: d.graficos.evolucao.labels,
      datasets: [{
        label: "IDH",
        data: d.graficos.evolucao.dados,
        borderColor: "#5aaa93",
        backgroundColor: "rgba(140,199,181,0.15)",
        borderWidth: 2.5,
        pointBackgroundColor: "#5aaa93",
        pointRadius: 4,
        fill: true,
        tension: 0.4
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { min: 0.62, max: 0.80 } } }
  });

  new Chart(document.getElementById("graficoGini"), {
    type: "bar",
    data: {
      labels: d.graficos.desigualdade.labels,
      datasets: [{
        label: "Gini",
        data: d.graficos.desigualdade.dados,
        backgroundColor: paleta,
        borderRadius: 6
      }]
    },
    options: {
      indexAxis: "y",
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { x: { min: 0.3, max: 0.65 } }
    }
  });

  new Chart(document.getElementById("graficoRaca"), {
    type: "doughnut",
    data: {
      labels: d.graficos.composicao.labels,
      datasets: [{
        data: d.graficos.composicao.dados,
        backgroundColor: ["#8cc7b5","#e8d9a8","#5aaa93","#f0c678","#c2ddd7"],
        borderWidth: 2,
        borderColor: "#fff"
      }]
    },
    options: { responsive: true, plugins: { legend: { position: "right" } } }
  });

  new Chart(document.getElementById("graficoRenda"), {
    type: "bar",
    data: {
      labels: d.graficos.renda.labels,
      datasets: [{
        label: "Renda média (R$)",
        data: d.graficos.renda.dados,
        backgroundColor: paleta,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
}


/* ---------- EXPRESSÕES — galeria + lightbox ---------- */
function renderExpressoes() {
  if (!document.querySelector(".grade-galeria-real")) return;
  const d = DADOS.expressoes;

  const linha = document.querySelector(".linha-categoria");
  if (linha) {
    linha.innerHTML = d.categorias.map((c, i) =>
      `<button class="tag-categoria-btn${i === 0 ? " ativa" : ""}" data-cat="${c}">${c}</button>`
    ).join("");
    linha.querySelectorAll(".tag-categoria-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        linha.querySelectorAll(".tag-categoria-btn").forEach(b => b.classList.remove("ativa"));
        btn.classList.add("ativa");
        filtrarGaleria(btn.dataset.cat);
      });
    });
  }

  renderGaleria(d.galeria);
  buildLightbox();
}

function renderGaleria(itens) {
  const grade = document.querySelector(".grade-galeria-real");
  if (!grade) return;
  grade.innerHTML = itens.map((item, i) => `
    <div class="card-galeria-item${i === 0 ? " grande" : ""}"
         data-id="${item.id}" data-tipo="${item.tipo}"
         style="background:${item.cor}; cursor:pointer;">
      <div class="galeria-overlay">
        <span class="galeria-tipo-badge">${item.tipo}</span>
        <div class="galeria-hover-info">
          <div class="galeria-hover-titulo">${item.titulo}</div>
          <div class="galeria-hover-autor">${item.autor}</div>
        </div>
      </div>
    </div>
  `).join("");

  grade.querySelectorAll(".card-galeria-item").forEach(el => {
    el.addEventListener("click", () => {
      const id = parseInt(el.dataset.id);
      const item = DADOS.expressoes.galeria.find(g => g.id === id);
      if (item) abrirLightbox(item);
    });
  });

  initHover();
}

function filtrarGaleria(cat) {
  const itens = cat === "Todas"
    ? DADOS.expressoes.galeria
    : DADOS.expressoes.galeria.filter(i => i.tipo === cat);
  renderGaleria(itens);
}

function buildLightbox() {
  if (document.getElementById("lightbox")) return;
  const lb = document.createElement("div");
  lb.id = "lightbox";
  lb.className = "lightbox";
  lb.innerHTML = `
    <div class="lightbox-backdrop"></div>
    <div class="lightbox-box">
      <button class="lightbox-fechar">✕</button>
      <div class="lightbox-visual" id="lbVisual"></div>
      <div class="lightbox-info">
        <div class="lightbox-tipo" id="lbTipo"></div>
        <h2 class="lightbox-titulo" id="lbTitulo"></h2>
        <div class="lightbox-meta">
          <span id="lbAutor"></span> &bull; <span id="lbAno"></span>
        </div>
        <p class="lightbox-desc" id="lbDesc"></p>
      </div>
    </div>`;
  document.body.appendChild(lb);

  lb.querySelector(".lightbox-fechar").addEventListener("click", fecharLightbox);
  lb.querySelector(".lightbox-backdrop").addEventListener("click", fecharLightbox);
  document.addEventListener("keydown", e => { if (e.key === "Escape") fecharLightbox(); });
}

function abrirLightbox(item) {
  const lb = document.getElementById("lightbox");
  lb.querySelector("#lbVisual").style.background = item.cor;
  lb.querySelector("#lbTipo").textContent = item.tipo;
  lb.querySelector("#lbTitulo").textContent = item.titulo;
  lb.querySelector("#lbAutor").textContent = item.autor;
  lb.querySelector("#lbAno").textContent = item.ano;
  lb.querySelector("#lbDesc").textContent = item.descricao;
  lb.classList.add("aberto");
  document.body.style.overflow = "hidden";
}

function fecharLightbox() {
  document.getElementById("lightbox")?.classList.remove("aberto");
  document.body.style.overflow = "";
}


/* ---------- COMUNIDADE — comentários ---------- */
function renderComunidade() {
  if (!document.querySelector(".lista-posts")) return;
  const d = DADOS.comunidade;

  const gradeUsuarios = document.querySelector(".grade-usuarios");
  if (gradeUsuarios) {
    gradeUsuarios.innerHTML = d.membros.map(m => `
      <div class="card-usuario">
        <div class="usuario-avatar" style="background:${m.cor};"></div>
        <div class="usuario-nome">${m.nome}</div>
        <div class="usuario-esp">${m.especialidade}</div>
        <div class="usuario-posts">${m.posts} publicações</div>
      </div>
    `).join("");
  }

  const lista = document.querySelector(".lista-posts");
  if (lista) {
    lista.innerHTML = d.posts.map(post => `
      <div class="post-card" id="post-${post.id}">
        <div class="post-avatar" style="background:${d.membros.find(m=>m.nome===post.autor)?.cor || '#8cc7b5'};"></div>
        <div class="post-corpo">
          <div class="post-header">
            <span class="post-autor">${post.autor}</span>
            <span class="post-tempo">${post.tempo}</span>
          </div>
          <p class="post-conteudo">${post.conteudo}</p>
          <div class="post-tags">
            ${post.tags.map(t => `<span class="post-tag">${t}</span>`).join("")}
          </div>
          <div class="post-acoes">
            <button class="btn-curtir" data-id="${post.id}">
              ♥ <span class="curtidas-count">${post.curtidas}</span>
            </button>
            <button class="btn-comentar-toggle" data-id="${post.id}">💬 Comentar</button>
          </div>
          <div class="area-comentarios" id="comentarios-${post.id}" style="display:none;">
            <div class="lista-comentarios" id="lista-com-${post.id}"></div>
            <div class="form-comentario">
              <input type="text" class="input-comentario" placeholder="Escreva um comentário..." maxlength="280" />
              <button class="btn-enviar-com" data-id="${post.id}">Enviar</button>
            </div>
          </div>
        </div>
      </div>
    `).join("");
  }

  lista.querySelectorAll(".btn-curtir").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const post = DADOS.comunidade.posts.find(p => p.id === id);
      if (!post) return;
      if (btn.classList.contains("curtido")) {
        post.curtidas--;
        btn.classList.remove("curtido");
      } else {
        post.curtidas++;
        btn.classList.add("curtido");
      }
      btn.querySelector(".curtidas-count").textContent = post.curtidas;
    });
  });

  lista.querySelectorAll(".btn-comentar-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const area = document.getElementById(`comentarios-${id}`);
      const aberto = area.style.display !== "none";
      area.style.display = aberto ? "none" : "block";
      btn.textContent = aberto ? "💬 Comentar" : "💬 Fechar";
      if (!aberto) area.querySelector(".input-comentario").focus();
    });
  });

  lista.querySelectorAll(".btn-enviar-com").forEach(btn => {
    btn.addEventListener("click", () => enviarComentario(btn.dataset.id));
  });

  lista.querySelectorAll(".input-comentario").forEach(input => {
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        const id = input.closest(".area-comentarios").id.replace("comentarios-","");
        enviarComentario(id);
      }
    });
  });
}

function enviarComentario(postId) {
  const area = document.getElementById(`comentarios-${postId}`);
  const input = area.querySelector(".input-comentario");
  const texto = input.value.trim();
  if (!texto) return;

  const lista = document.getElementById(`lista-com-${postId}`);
  const item = document.createElement("div");
  item.className = "comentario-item";
  item.innerHTML = `
    <div class="com-avatar"></div>
    <div class="com-corpo">
      <span class="com-autor">Você</span>
      <p class="com-texto">${texto}</p>
    </div>`;
  lista.appendChild(item);
  input.value = "";
}


/* ---------- DESAFIO — interativo ---------- */
function renderDesafio() {
  if (!document.getElementById("xpBar")) return;
  const d = DADOS.desafio;

  const pct = Math.round((d.usuario.xpAtual / d.usuario.xpProximo) * 100);
  document.getElementById("xpBar").style.width = pct + "%";
  const xpText = document.getElementById("xpTexto");
  if (xpText) xpText.textContent = `${d.usuario.xpAtual} / ${d.usuario.xpProximo} XP — Nível ${d.usuario.nivel}`;

  const dp = document.getElementById("desafioPrincipal");
  if (dp) {
    dp.innerHTML = `
      <div class="card-desafio-titulo">${d.desafioPrincipal.titulo}</div>
      <div class="card-desafio-desc">${d.desafioPrincipal.descricao}</div>
      <div class="card-desafio-recompensa">🏆 ${d.desafioPrincipal.recompensa}</div>
      <div class="barra-prog-label">Progresso geral: ${d.desafioPrincipal.progresso}%</div>
      <div class="barra-progresso">
        <div class="barra-progresso-fill" style="width:${d.desafioPrincipal.progresso}%"></div>
      </div>`;
  }

  const gradeMissoes = document.querySelector(".grade-desafios");
  if (gradeMissoes) {
    gradeMissoes.innerHTML = d.missoes.map(m => `
      <div class="card-missao ${m.status}" id="missao-${m.id}">
        <div class="missao-status-badge ${m.status}">
          ${m.status === "concluido" ? "✅ Concluída" : m.status === "bloqueado" ? "🔒 Bloqueada" : "⏳ Em andamento"}
        </div>
        <div class="missao-titulo">${m.titulo}</div>
        <div class="missao-desc">${m.descricao}</div>
        <div class="missao-xp">+${m.xp} XP</div>
        <div class="barra-progresso" style="margin-top:10px;">
          <div class="barra-progresso-fill"
               style="width:${m.progresso}%; background:${m.status === 'concluido' ? '#5aaa6e' : m.status === 'bloqueado' ? '#bbb' : '#5aaa93'}">
          </div>
        </div>
        <div class="missao-pct">${m.progresso}%</div>
        ${m.status === "andamento" ? `<button class="btn-avancar-missao" data-id="${m.id}">+ Avançar</button>` : ""}
      </div>
    `).join("");

    gradeMissoes.querySelectorAll(".btn-avancar-missao").forEach(btn => {
      btn.addEventListener("click", () => avancarMissao(parseInt(btn.dataset.id)));
    });
  }

  const gradeConq = document.querySelector(".conquistas-grade");
  if (gradeConq) {
    gradeConq.innerHTML = d.conquistas.map(c => `
      <div class="card-fonte conquista-card ${c.desbloqueada ? "" : "bloqueada"}">
        <div class="conquista-icone-box" style="background:${c.cor};">${c.icone}</div>
        <div class="conquista-nome">${c.nome}</div>
        <div class="conquista-desc">${c.descricao}</div>
      </div>
    `).join("");
  }

  const listaRanking = document.querySelector(".grade-ranking");
  if (listaRanking) {
    listaRanking.innerHTML = d.ranking.map(r => `
      <div class="ranking-item ${r.destaque ? "eu" : ""}">
        <span class="ranking-pos">${r.pos}</span>
        <div class="ranking-avatar" style="background:${r.cor};"></div>
        <div class="ranking-info">
          <div class="ranking-nome">${r.nome}</div>
          <div class="ranking-nivel">Nível ${r.nivel}</div>
        </div>
        <div class="ranking-xp-pill">${r.xp} XP</div>
      </div>
    `).join("");
  }
}

function avancarMissao(id) {
  const missao = DADOS.desafio.missoes.find(m => m.id === id);
  if (!missao || missao.status !== "andamento") return;

  missao.progresso = Math.min(100, missao.progresso + 20);
  if (missao.progresso >= 100) {
    missao.status = "concluido";
    DADOS.desafio.usuario.xpAtual += missao.xp;
    mostrarToast(`+${missao.xp} XP! Missão "${missao.titulo}" concluída! 🎉`);
  }

  const total = DADOS.desafio.missoes.filter(m => m.status !== "bloqueado");
  const media = total.reduce((s, m) => s + m.progresso, 0) / total.length;
  DADOS.desafio.desafioPrincipal.progresso = Math.round(media);

  renderDesafio();
}

function mostrarToast(msg) {
  let t = document.getElementById("prisma-toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "prisma-toast";
    t.className = "prisma-toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3200);
}


/* ================================================
   DISPATCH — detecta qual página e renderiza
================================================ */
function renderPagina() {
  const page = location.pathname.split("/").pop() || "index.html";
  switch (page) {
    case "index.html":       renderInicio();      break;
    case "atualidades.html": renderAtualidades(); break;
    case "memoria.html":     renderMemoria();     break;
    case "conceitos.html":   renderConceitos();   break;
    case "retratos.html":    renderRetratos();    break;
    case "expressoes.html":  renderExpressoes();  break;
    case "comunidade.html":  renderComunidade();  break;
    case "desafio.html":     renderDesafio();     break;
  }
}


/* ================================================
   INIT
================================================ */
document.addEventListener("DOMContentLoaded", () => {
  buildSidebar();
  initMobileMenu();
  renderPagina();
  initHover();
  initScrollReveal();
});
