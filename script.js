"use strict";

/* ================================================
   SCRIPT.JS — Lógica principal da Plataforma PRISMA
   Responsável por:
   - Sidebar dinâmica + colapso
   - Menu mobile (drawer)
   - Sistema de autenticação (login/cadastro) simulado
   - Renderização de conteúdo por página
   - Animações de scroll (IntersectionObserver)
   - Hover interativo nos cards
   - Toast de notificações
   - Ranking com abas (Desafios)
================================================ */


/* ================================================
   UTILITÁRIO — detecta se há mouse real (desktop)
   Evita aplicar efeitos de hover em touch devices
================================================ */
function isMouse() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}


/* ================================================
   ITENS DE NAVEGAÇÃO
   Cada item corresponde a uma aba do site.
================================================ */
const NAV_ITEMS = [
  { icon: "🏠", label: "Início",      href: "index.html" },
  { icon: "📄", label: "Artigos",     href: "artigos.html" },
  { icon: "🧭", label: "Notícias",    href: "noticias.html" },
  { icon: "🧩", label: "Desafios",    href: "desafios.html" },
  { icon: "🗣",  label: "Comunidade", href: "comunidade.html" },
];


/* ================================================
   SIDEBAR — Constrói e injeta HTML da barra lateral
   Detecta página atual para marcar item como ativo
================================================ */
function buildSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  const currentFile = location.pathname.split("/").pop() || "index.html";

  /* Lê dados do usuário logado (localStorage simulando sessão) */
  const usuario = getUsuario();
  const avatarLetra = usuario ? usuario.nome.charAt(0).toUpperCase() : "?";
  const nomeCurto = usuario ? usuario.nome.split(" ")[0] : "Visitante";

  sidebar.innerHTML = `
    <!-- Cabeçalho da sidebar: logo da plataforma -->
    <div class="logo">
      Plataforma<br>
      <strong>PRISMA</strong>
    </div>

    <!-- Botão para colapsar/expandir sidebar (desktop) -->
    <button class="btn-toggle-sidebar" id="btnToggleSidebar" title="Recolher menu">
      <svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>

    <!-- Itens de navegação gerados dinamicamente -->
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

    <!-- Perfil do usuário no rodapé da sidebar -->
    <div class="sidebar-perfil" id="sidebarPerfil">
      <div class="sidebar-avatar">${avatarLetra}</div>
      <span class="sidebar-nome">${nomeCurto}</span>
    </div>
  `;

  /* Abre modal de perfil ao clicar no nome na sidebar */
  document.getElementById("sidebarPerfil")?.addEventListener("click", abrirModalPerfil);

  /* Lógica de colapso da sidebar (salva preferência em localStorage) */
  const btnToggle = document.getElementById("btnToggleSidebar");
  if (localStorage.getItem("sidebarCollapsed") === "true") {
    document.body.classList.add("sidebar-collapsed");
  }

  btnToggle?.addEventListener("click", () => {
    document.body.classList.toggle("sidebar-collapsed");
    localStorage.setItem(
      "sidebarCollapsed",
      document.body.classList.contains("sidebar-collapsed")
    );
  });
}


/* ================================================
   MENU MOBILE — Drawer lateral com overlay
   Abre/fecha a sidebar em telas pequenas
================================================ */
function initMobileMenu() {
  const btnMenu = document.getElementById("btnMenu");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  if (!btnMenu || !sidebar || !overlay) return;

  /* Botão hamburguer abre o drawer */
  btnMenu.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
  });

  /* Clique no overlay fecha o drawer */
  overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
  });
}


/* ================================================
   SISTEMA DE AUTENTICAÇÃO SIMULADO
   Usa localStorage para persistir sessão.
   Em produção, seria substituído por chamadas PHP/PDO.
================================================ */

/* Retorna usuário logado ou null */
function getUsuario() {
  try {
    return JSON.parse(localStorage.getItem("prisma_usuario")) || null;
  } catch {
    return null;
  }
}

/* Salva usuário no localStorage (simula sessão de servidor) */
function salvarUsuario(usuario) {
  localStorage.setItem("prisma_usuario", JSON.stringify(usuario));
}

/* Remove usuário (logout) */
function removerUsuario() {
  localStorage.removeItem("prisma_usuario");
}

/* Atualiza o botão de perfil na topbar com nome e avatar */
function atualizarTopbarPerfil() {
  const usuario = getUsuario();
  const avatarEl = document.getElementById("avatarTopbar");
  const nomeEl = document.getElementById("nomeTopbar");
  if (!avatarEl || !nomeEl) return;

  if (usuario) {
    avatarEl.textContent = usuario.nome.charAt(0).toUpperCase();
    nomeEl.textContent = usuario.nome.split(" ")[0];
  } else {
    avatarEl.textContent = "?";
    nomeEl.textContent = "Entrar";
  }
}


/* ================================================
   MODAL DE PERFIL — Login, Cadastro e Painel
   Exibe formulário ou painel conforme estado de login
================================================ */

/* Injeta o HTML do modal e configura eventos */
function buildModalPerfil() {
  const modal = document.getElementById("modalPerfil");
  if (!modal) return;

  modal.innerHTML = `
    <div class="modal-box">
      <!-- Botão de fechar -->
      <button class="modal-fechar" id="modalFechar">✕</button>
      <div class="modal-logo">PRISMA</div>
      <p class="modal-subtitulo">Plataforma de Diversidade e Inclusão Étnico-Racial</p>

      <!-- Painel do usuário logado -->
      <div class="perfil-painel" id="painelLogado">
        <div class="perfil-avatar-grande" id="painelAvatar">?</div>
        <h3 style="text-align:center; font-family:var(--font-display); font-size:20px; font-weight:700; margin-bottom:4px;" id="painelNome"></h3>
        <p style="text-align:center; font-size:13px; color:var(--text-muted); margin-bottom:16px;" id="painelEmail"></p>

        <!-- Estatísticas rápidas do perfil -->
        <div class="perfil-stats">
          <div class="perfil-stat">
            <div class="perfil-stat-num">Nv. 4</div>
            <div class="perfil-stat-label">Nível</div>
          </div>
          <div class="perfil-stat">
            <div class="perfil-stat-num">340</div>
            <div class="perfil-stat-label">XP Total</div>
          </div>
          <div class="perfil-stat">
            <div class="perfil-stat-num">7🔥</div>
            <div class="perfil-stat-label">Ofensiva</div>
          </div>
        </div>

        <!-- Botão de logout -->
        <button class="btn-sair" id="btnSair">Sair da conta</button>
      </div>

      <!-- Formulário de autenticação (login / cadastro) -->
      <div id="painelAuth">
        <!-- Abas para alternar entre Login e Cadastro -->
        <div class="modal-tabs">
          <button class="modal-tab ativa" id="tabLogin">Entrar</button>
          <button class="modal-tab" id="tabCadastro">Cadastrar</button>
        </div>

        <!-- Formulário de login -->
        <div id="formLoginWrap">
          <div class="form-grupo">
            <label for="loginEmail">E-mail</label>
            <input type="email" id="loginEmail" placeholder="seu@email.com" autocomplete="email">
          </div>
          <div class="form-grupo">
            <label for="loginSenha">Senha</label>
            <input type="password" id="loginSenha" placeholder="••••••••" autocomplete="current-password">
          </div>
          <!-- Mensagem de erro de login -->
          <p class="form-erro" id="erroLogin">E-mail ou senha incorretos.</p>
          <button class="btn-submit" id="btnLogin">Entrar na plataforma</button>
        </div>

        <!-- Formulário de cadastro -->
        <div id="formCadastroWrap" style="display:none;">
          <div class="form-grupo">
            <label for="cadNome">Nome completo</label>
            <input type="text" id="cadNome" placeholder="Seu nome" autocomplete="name">
          </div>
          <div class="form-grupo">
            <label for="cadEmail">E-mail</label>
            <input type="email" id="cadEmail" placeholder="seu@email.com" autocomplete="email">
          </div>
          <div class="form-grupo">
            <label for="cadSenha">Senha</label>
            <input type="password" id="cadSenha" placeholder="Mínimo 6 caracteres" autocomplete="new-password">
          </div>
          <div class="form-grupo">
            <label for="cadConfirma">Confirmar senha</label>
            <input type="password" id="cadConfirma" placeholder="Repita a senha">
          </div>
          <!-- Mensagem de erro de cadastro -->
          <p class="form-erro" id="erroCadastro">Verifique os campos acima.</p>
          <button class="btn-submit" id="btnCadastrar">Criar minha conta</button>
        </div>
      </div>
    </div>
  `;

  /* --- Eventos do modal --- */

  /* Fechar modal ao clicar no botão X ou fora da caixa */
  document.getElementById("modalFechar")?.addEventListener("click", fecharModalPerfil);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) fecharModalPerfil();
  });

  /* Alterna entre abas Login e Cadastro */
  document.getElementById("tabLogin")?.addEventListener("click", () => {
    document.getElementById("formLoginWrap").style.display = "block";
    document.getElementById("formCadastroWrap").style.display = "none";
    document.getElementById("tabLogin").classList.add("ativa");
    document.getElementById("tabCadastro").classList.remove("ativa");
  });

  document.getElementById("tabCadastro")?.addEventListener("click", () => {
    document.getElementById("formLoginWrap").style.display = "none";
    document.getElementById("formCadastroWrap").style.display = "block";
    document.getElementById("tabCadastro").classList.add("ativa");
    document.getElementById("tabLogin").classList.remove("ativa");
  });

  /* Botão de login — valida credenciais salvas no localStorage */
  document.getElementById("btnLogin")?.addEventListener("click", () => {
    const email = document.getElementById("loginEmail").value.trim();
    const senha = document.getElementById("loginSenha").value;
    const erroEl = document.getElementById("erroLogin");

    if (!email || !senha) { erroEl.style.display = "block"; return; }

    /* Busca conta cadastrada */
    const contas = JSON.parse(localStorage.getItem("prisma_contas") || "[]");
    const conta = contas.find(c => c.email === email && c.senha === senha);

    if (!conta) {
      erroEl.style.display = "block";
    } else {
      erroEl.style.display = "none";
      salvarUsuario({ nome: conta.nome, email: conta.email });
      fecharModalPerfil();
      atualizarTopbarPerfil();
      buildSidebar();
      mostrarToast(`Bem-vindo(a) de volta, ${conta.nome.split(" ")[0]}! 🎉`);
    }
  });

  /* Botão de cadastro — salva nova conta no localStorage */
  document.getElementById("btnCadastrar")?.addEventListener("click", () => {
    const nome    = document.getElementById("cadNome").value.trim();
    const email   = document.getElementById("cadEmail").value.trim();
    const senha   = document.getElementById("cadSenha").value;
    const confirma = document.getElementById("cadConfirma").value;
    const erroEl  = document.getElementById("erroCadastro");

    /* Validações básicas */
    if (!nome || !email || !senha || senha.length < 6) {
      erroEl.textContent = "Preencha todos os campos (senha mínimo 6 caracteres).";
      erroEl.style.display = "block";
      return;
    }

    if (senha !== confirma) {
      erroEl.textContent = "As senhas não coincidem.";
      erroEl.style.display = "block";
      return;
    }

    /* Verifica se e-mail já está cadastrado */
    const contas = JSON.parse(localStorage.getItem("prisma_contas") || "[]");
    if (contas.find(c => c.email === email)) {
      erroEl.textContent = "Este e-mail já está cadastrado.";
      erroEl.style.display = "block";
      return;
    }

    /* Salva nova conta e faz login automaticamente */
    contas.push({ nome, email, senha });
    localStorage.setItem("prisma_contas", JSON.stringify(contas));
    salvarUsuario({ nome, email });

    erroEl.style.display = "none";
    fecharModalPerfil();
    atualizarTopbarPerfil();
    buildSidebar();
    mostrarToast(`Conta criada com sucesso! Seja bem-vindo(a), ${nome.split(" ")[0]}! 🎊`);
  });

  /* Botão de logout */
  document.getElementById("btnSair")?.addEventListener("click", () => {
    removerUsuario();
    fecharModalPerfil();
    atualizarTopbarPerfil();
    buildSidebar();
    mostrarToast("Você saiu da sua conta.");
  });
}

/* Abre o modal e exibe o painel correto (logado ou auth) */
function abrirModalPerfil() {
  const modal = document.getElementById("modalPerfil");
  if (!modal) return;

  const usuario = getUsuario();
  const painelLogado = document.getElementById("painelLogado");
  const painelAuth   = document.getElementById("painelAuth");

  if (usuario) {
    /* Mostra painel de perfil do usuário logado */
    painelLogado.classList.add("ativo");
    painelAuth.style.display = "none";
    document.getElementById("painelAvatar").textContent = usuario.nome.charAt(0).toUpperCase();
    document.getElementById("painelNome").textContent = usuario.nome;
    document.getElementById("painelEmail").textContent = usuario.email;
  } else {
    /* Mostra formulário de login/cadastro */
    painelLogado.classList.remove("ativo");
    painelAuth.style.display = "block";
  }

  modal.classList.add("aberto");
}

/* Fecha o modal de perfil */
function fecharModalPerfil() {
  document.getElementById("modalPerfil")?.classList.remove("aberto");
}


/* ================================================
   ANIMAÇÃO DE ENTRADA — IntersectionObserver
   Revela blocos suavemente ao entrar no viewport
================================================ */
function initScrollReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visivel");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.07 });

  /* Cada bloco recebe delay crescente para efeito cascata */
  document.querySelectorAll(".bloco").forEach((el, i) => {
    el.style.setProperty("--delay", `${i * 60}ms`);
    el.classList.add("reveal");
    obs.observe(el);
  });
}


/* ================================================
   HOVER INTERATIVO — elevação em cards
   Aplicado apenas quando há mouse real (não touch)
================================================ */
function initHover() {
  const seletores = [
    ".card-mini", ".card-noticia-media", ".noticia-lateral",
    ".card-fonte", ".artigo", ".card-missao", ".card-usuario",
    ".ranking-item", ".conquista-card", ".card-hero",
    ".card-noticia-grande", ".item-lista", ".post-card",
    ".topico-item", ".card-fonte-noticia"
  ];

  document.querySelectorAll(seletores.join(", ")).forEach(el => {
    el.addEventListener("mouseenter", () => {
      if (!isMouse()) return;
      /* Não sobrescreve transform de cards que já têm animação própria */
      if (!el.dataset.hoverActive) {
        el.dataset.hoverActive = "1";
      }
    });
    el.addEventListener("mouseleave", () => {
      delete el.dataset.hoverActive;
    });
  });
}


/* ================================================
   TOAST — notificação flutuante no rodapé
================================================ */
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
   RENDERIZADORES DE PÁGINA
   Cada função preenche os elementos HTML da sua
   respectiva página com dados vindos de DADOS.js
================================================ */


/* --------------------------------------------------
   INÍCIO — página principal (index.html)
-------------------------------------------------- */
function renderInicio() {
  /* Verifica se é a página de início */
  if (!document.getElementById("cardDestaque")) return;
  const d = DADOS.inicio;

  /* Card de destaque hero */
  const dest = document.getElementById("cardDestaque");
  if (dest) {
    dest.innerHTML = `
      <div class="card-inner">
        <span class="card-tag">${d.destaque.tag}</span>
        <h2 class="card-titulo">${d.destaque.titulo}</h2>
        <p class="card-desc">${d.destaque.descricao}</p>
        <span class="card-data">${d.destaque.data}</span>
      </div>`;
  }

  /* Cards mini laterais */
  ["cardMini1", "cardMini2"].forEach((id, i) => {
    const el = document.getElementById(id);
    const c = d.cardsMini[i];
    if (el && c) {
      el.innerHTML = `
        <div class="card-tag">${c.tag}</div>
        <div class="card-titulo-sm" style="font-family:var(--font-display);font-size:15px;font-weight:700;color:var(--text);line-height:1.4;">${c.titulo}</div>`;
    }
  });

  /* Lista de recomendações */
  const listaRec = document.getElementById("listaRecomendacoes");
  if (listaRec) {
    listaRec.innerHTML = d.recomendacoes.map(r => `
      <div class="item-lista">
        <span class="item-cat">${r.categoria}</span>
        <span class="item-titulo">${r.titulo}</span>
      </div>
    `).join("");
  }

  /* Artigos em destaque */
  const listaArt = document.getElementById("listaArtigosInicio");
  if (listaArt) {
    listaArt.innerHTML = d.artigos.map(a => `
      <article class="artigo">
        <div>
          <div class="artigo-info">
            <span class="artigo-tipo">Artigo</span>
            <span class="artigo-data">${a.data}</span>
            <span class="artigo-area-badge">${a.area}</span>
          </div>
          <h3 class="artigo-titulo">${a.titulo}</h3>
          <p class="artigo-autores">✍️ ${a.autores}</p>
          <p class="artigo-resumo">${a.resumo}</p>
        </div>
        <div class="artigo-imagem">${a.area.split(" ")[0]}</div>
      </article>
    `).join("");
  }

  /* Fontes */
  const gradeFontes = document.getElementById("gradeFontes");
  if (gradeFontes) {
    gradeFontes.innerHTML = d.fontes.map(f => `
      <div class="card-fonte">
        <div class="fonte-cat">${f.categoria}</div>
        <div class="fonte-nome">${f.nome}</div>
        <div class="fonte-desc">${f.descricao}</div>
      </div>
    `).join("");
  }

  /* Notícias em miniatura */
  const gradeNot = document.getElementById("gradeNoticiasInicio");
  if (gradeNot) {
    gradeNot.innerHTML = d.noticiasMini.map(n => `
      <div class="card-noticia-media">
        <div class="noticia-media-thumb">${n.thumb}</div>
        <div class="noticia-media-corpo">
          <div class="noticia-media-cat">${n.cat}</div>
          <div class="noticia-media-titulo">${n.titulo}</div>
        </div>
      </div>
    `).join("");
  }

  /* Mini card de desafio */
  const desafioMini = document.getElementById("desafioMiniInicio");
  const dm = d.desafioMini;
  if (desafioMini && dm) {
    desafioMini.innerHTML = `
      <div class="card-desafio-principal">
        <div class="card-desafio-titulo">${dm.titulo}</div>
        <div class="card-desafio-desc">${dm.desc}</div>
        <div class="card-desafio-recompensa">🏆 +${dm.xp} XP</div>
        <div class="barra-prog-label">Progresso: ${dm.progresso}%</div>
        <div class="barra-progresso">
          <div class="barra-progresso-fill" style="width:${dm.progresso}%;"></div>
        </div>
        <a href="desafios.html" style="display:inline-block;margin-top:14px;background:rgba(242,230,216,.15);color:var(--c-cream);padding:9px 20px;border-radius:20px;font-size:13px;font-weight:700;">
          Ir para desafios →
        </a>
      </div>
    `;
  }
}


/* --------------------------------------------------
   ARTIGOS — artigos.html
   Inclui filtros por área, lista com autores e fontes
-------------------------------------------------- */
function renderArtigos() {
  if (!document.getElementById("listaArtigos")) return;
  const d = DADOS.artigos;
  let filtroAtivo = "Todos";

  /* Monta botões de filtro */
  const filtrosEl = document.getElementById("filtrosArtigos");
  if (filtrosEl) {
    filtrosEl.innerHTML = d.categorias.map((c, i) => `
      <button class="tag-categoria-btn${i === 0 ? " ativa" : ""}" data-cat="${c}">${c}</button>
    `).join("");

    /* Evento de clique nos filtros — filtra a lista de artigos */
    filtrosEl.querySelectorAll(".tag-categoria-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        filtrosEl.querySelectorAll(".tag-categoria-btn").forEach(b => b.classList.remove("ativa"));
        btn.classList.add("ativa");
        filtroAtivo = btn.dataset.cat;
        renderListaArtigos(filtroAtivo);
      });
    });
  }

  /* Função interna: renderiza lista filtrada */
  function renderListaArtigos(filtro) {
    const lista = document.getElementById("listaArtigos");
    const artigos = filtro === "Todos"
      ? d.lista
      : d.lista.filter(a => a.area === filtro);

    const contador = document.getElementById("contadorArtigos");
    if (contador) contador.textContent = `${artigos.length} artigo(s)`;

    lista.innerHTML = artigos.map(a => `
      <article class="artigo">
        <div>
          <div class="artigo-info">
            <span class="artigo-tipo">${a.tipo}</span>
            <span class="artigo-data">${a.data}</span>
            <span class="artigo-area-badge">${a.area}</span>
          </div>
          <h3 class="artigo-titulo">${a.titulo}</h3>
          <!-- Autores do artigo em destaque -->
          <p class="artigo-autores" style="margin-bottom:8px;">✍️ ${a.autores}</p>
          <p class="artigo-resumo">${a.resumo}</p>
        </div>
        <div class="artigo-imagem">${a.emoji}</div>
      </article>
    `).join("");
  }

  renderListaArtigos("Todos");

  /* Autores em destaque */
  const gradeAut = document.getElementById("gradeAutores");
  if (gradeAut) {
    gradeAut.innerHTML = d.autores.map(a => `
      <div class="card-usuario">
        <div class="usuario-avatar" style="background:${a.cor};">${a.emoji}</div>
        <div class="usuario-nome">${a.nome}</div>
        <div class="usuario-esp">${a.esp}</div>
        <div class="usuario-posts">${a.artigos} artigos</div>
      </div>
    `).join("");
  }

  /* Fontes acadêmicas */
  const gradeFont = document.getElementById("gradeFontesArtigos");
  if (gradeFont) {
    gradeFont.innerHTML = d.fontes.map(f => `
      <div class="card-fonte">
        <div class="fonte-cat">${f.categoria}</div>
        <div class="fonte-nome">${f.nome}</div>
        <div class="fonte-desc">${f.descricao}</div>
      </div>
    `).join("");
  }
}


/* --------------------------------------------------
   NOTÍCIAS — noticias.html
   Inclui destaque, grade, destaques rápidos e fontes
-------------------------------------------------- */
function renderNoticias() {
  if (!document.getElementById("noticiaDestaque")) return;
  const d = DADOS.noticias;

  /* Filtros de categoria */
  const filtrosEl = document.getElementById("filtrosNoticias");
  if (filtrosEl) {
    filtrosEl.innerHTML = d.categorias.map((c, i) => `
      <button class="tag-categoria-btn${i === 0 ? " ativa" : ""}">${c}</button>
    `).join("");

    filtrosEl.querySelectorAll(".tag-categoria-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        filtrosEl.querySelectorAll(".tag-categoria-btn").forEach(b => b.classList.remove("ativa"));
        btn.classList.add("ativa");
      });
    });
  }

  /* Notícia destaque grande */
  const dest = document.getElementById("noticiaDestaque");
  if (dest) {
    dest.innerHTML = `
      <div class="card-inner">
        <span class="card-tag">${d.destaque.tag}</span>
        <span class="card-tag" style="background:rgba(242,230,216,.15); color:var(--c-cream);">${d.destaque.categoria}</span>
        <h2 class="card-titulo" style="font-size:22px;">${d.destaque.titulo}</h2>
        <p class="card-desc">${d.destaque.subtitulo}</p>
        <span class="card-data">${d.destaque.data}</span>
      </div>`;
  }

  /* Notícias laterais */
  const lat = document.getElementById("noticiasLaterais");
  if (lat) {
    lat.innerHTML = d.laterais.map(n => `
      <div class="noticia-lateral">
        <span style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--c-copper);">${n.cat}</span>
        <span style="font-size:13px;font-weight:600;color:var(--text);line-height:1.4;">${n.titulo}</span>
        <span style="font-size:11px;color:var(--text-muted);">${n.data}</span>
      </div>
    `).join("");
  }

  /* Grade de notícias médias */
  const grade = document.getElementById("gradeNoticias");
  if (grade) {
    grade.innerHTML = d.medias.map(n => `
      <div class="card-noticia-media">
        <div class="noticia-media-thumb">${n.thumb}</div>
        <div class="noticia-media-corpo">
          <div class="noticia-media-cat">${n.cat}</div>
          <div class="noticia-media-titulo">${n.titulo}</div>
          <div class="noticia-media-data">${n.data}</div>
        </div>
      </div>
    `).join("");
  }

  /* Destaques rápidos */
  const lista = document.getElementById("listaNoticias");
  if (lista) {
    lista.innerHTML = d.rapidas.map(n => `
      <div class="item-lista">
        <span class="item-cat">${n.cat}</span>
        <span class="item-titulo">${n.titulo}</span>
      </div>
    `).join("");
  }

  /* Fontes e veículos */
  const gradeFont = document.getElementById("gradeFontesNoticias");
  if (gradeFont) {
    gradeFont.innerHTML = d.fontes.map(f => `
      <div class="card-fonte-noticia">
        <div class="fonte-logo">${f.emoji}</div>
        <div class="fonte-info">
          <div class="fonte-nome">${f.nome}</div>
          <div class="fonte-tipo">${f.tipo}</div>
        </div>
      </div>
    `).join("");
  }
}


/* --------------------------------------------------
   DESAFIOS — desafios.html
   XP, Widget de Ofensiva, Missões, Conquistas, Ranking
-------------------------------------------------- */
function renderDesafios() {
  if (!document.getElementById("xpBar")) return;
  const d = DADOS.desafio;

  /* Barra de XP */
  const pct = Math.round((d.usuario.xpAtual / d.usuario.xpProximo) * 100);
  document.getElementById("xpBar").style.width = pct + "%";
  const xpTexto = document.getElementById("xpTexto");
  if (xpTexto) xpTexto.textContent = `${d.usuario.xpAtual} / ${d.usuario.xpProximo} XP`;
  const xpNivel = document.getElementById("xpNivel");
  if (xpNivel) xpNivel.textContent = `Nível ${d.usuario.nivel}`;

  /* ---- Widget de ofensiva (streak de dias consecutivos) ---- */
  const widgetOf = document.getElementById("widgetOfensiva");
  if (widgetOf) {
    const diasHtml = d.usuario.diasFeitos.map((feito, i) => {
      const hoje = i === 6; /* índice do dia de hoje */
      const label = ["D", "S", "T", "Q", "Q", "S", "S", "D", "S", "T", "Q", "Q", "S", "S"][i];
      return `<div class="dia-streak${feito ? " feito" : ""}${hoje ? " hoje" : ""}" title="${feito ? "Feito" : "Pendente"}">${label}</div>`;
    }).join("");

    widgetOf.innerHTML = `
      <!-- Ícone de chama principal -->
      <div class="ofensiva-chama">🔥</div>
      <div class="ofensiva-info">
        <!-- Número de dias da ofensiva -->
        <div class="ofensiva-numero">${d.usuario.streak}</div>
        <div class="ofensiva-label">dias consecutivos de quiz</div>
        <!-- Mini calendário dos últimos 14 dias -->
        <div class="ofensiva-dias">${diasHtml}</div>
      </div>
    `;
  }

  /* ---- Desafio principal da semana ---- */
  const dp = document.getElementById("desafioPrincipal");
  if (dp) {
    dp.innerHTML = `
      <div class="card-desafio-titulo">${d.desafioPrincipal.titulo}</div>
      <div class="card-desafio-desc">${d.desafioPrincipal.descricao}</div>
      <div class="card-desafio-recompensa">🏆 ${d.desafioPrincipal.recompensa}</div>
      <div class="barra-prog-label">Progresso geral: ${d.desafioPrincipal.progresso}%</div>
      <div class="barra-progresso">
        <div class="barra-progresso-fill" style="width:${d.desafioPrincipal.progresso}%;"></div>
      </div>`;
  }

  /* ---- Grade de missões ---- */
  function renderMissoes() {
    const grade = document.getElementById("gradeMissoes");
    if (!grade) return;
    grade.innerHTML = d.missoes.map(m => `
      <div class="card-missao ${m.status}" id="missao-${m.id}">
        <div class="missao-status-badge ${m.status}">
          ${m.status === "concluido" ? "✅ Concluída" : m.status === "bloqueado" ? "🔒 Bloqueada" : "⏳ Em andamento"}
        </div>
        <div class="missao-titulo">${m.titulo}</div>
        <div class="missao-desc">${m.descricao}</div>
        <div class="missao-xp">+${m.xp} XP</div>
        <div class="barra-progresso">
          <div class="barra-progresso-fill"
               style="width:${m.progresso}%; background:${m.status === 'concluido' ? '#5aaa6e' : m.status === 'bloqueado' ? '#bbb' : 'var(--c-copper)'}">
          </div>
        </div>
        <div class="missao-pct">${m.progresso}%</div>
        ${m.status === "andamento" ? `<button class="btn-avancar-missao" data-id="${m.id}">+ Avançar missão</button>` : ""}
      </div>
    `).join("");

    /* Botões de avanço das missões em andamento */
    grade.querySelectorAll(".btn-avancar-missao").forEach(btn => {
      btn.addEventListener("click", () => avancarMissao(parseInt(btn.dataset.id)));
    });
  }

  renderMissoes();

  /* ---- Conquistas ---- */
  const gradeConq = document.getElementById("gradeConquistas");
  if (gradeConq) {
    gradeConq.innerHTML = d.conquistas.map(c => `
      <div class="conquista-card ${c.desbloqueada ? "" : "bloqueada"}">
        <div class="conquista-icone-box" style="background:${c.cor};">${c.icone}</div>
        <div class="conquista-nome">${c.nome}</div>
        <div class="conquista-desc">${c.descricao}</div>
      </div>
    `).join("");
  }

  /* ---- Ranking com abas (pessoal / grupos) ---- */
  let tabAtiva = "pessoal";

  function renderRanking() {
    const grade = document.getElementById("gradeRanking");
    if (!grade) return;
    const dados = tabAtiva === "pessoal" ? d.rankingPessoal : d.rankingGrupos;
    grade.innerHTML = dados.map(r => `
      <div class="ranking-item ${r.destaque ? "eu" : ""}">
        <span class="ranking-pos">${r.pos}</span>
        <div class="ranking-avatar" style="background:${r.cor};"></div>
        <div class="ranking-info">
          <div class="ranking-nome">${r.nome}</div>
          <div class="ranking-nivel">${r.nivel}</div>
        </div>
        <div class="ranking-xp-pill">${r.xp} XP</div>
      </div>
    `).join("");
  }

  renderRanking();

  /* Clique nas abas de ranking */
  document.querySelectorAll(".ranking-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".ranking-tab").forEach(b => b.classList.remove("ativa"));
      btn.classList.add("ativa");
      tabAtiva = btn.dataset.tab;
      renderRanking();
    });
  });
}

/* Avança progresso de uma missão em 20% e verifica conclusão */
function avancarMissao(id) {
  const missao = DADOS.desafio.missoes.find(m => m.id === id);
  if (!missao || missao.status !== "andamento") return;

  missao.progresso = Math.min(100, missao.progresso + 20);

  if (missao.progresso >= 100) {
    missao.status = "concluido";
    DADOS.desafio.usuario.xpAtual = Math.min(
      DADOS.desafio.usuario.xpProximo,
      DADOS.desafio.usuario.xpAtual + missao.xp
    );
    mostrarToast(`+${missao.xp} XP! Missão "${missao.titulo}" concluída! 🎉`);
  }

  /* Recalcula progresso geral do desafio principal */
  const total = DADOS.desafio.missoes.filter(m => m.status !== "bloqueado");
  const media = total.reduce((s, m) => s + m.progresso, 0) / total.length;
  DADOS.desafio.desafioPrincipal.progresso = Math.round(media);

  /* Re-renderiza página de desafios */
  renderDesafios();
}


/* --------------------------------------------------
   COMUNIDADE — comunidade.html
   Ranking de tópicos, widget discussão, membros, posts
-------------------------------------------------- */
function renderComunidade() {
  if (!document.getElementById("rankingTopicos")) return;
  const d = DADOS.comunidade;

  /* ---- Ranking de tópicos em alta ---- */
  const topicosEl = document.getElementById("rankingTopicos");
  if (topicosEl) {
    topicosEl.innerHTML = d.topicosEmAlta.map((t, i) => `
      <div class="topico-item">
        <!-- Posição no ranking -->
        <span class="topico-pos">${i + 1}</span>
        <div class="topico-info">
          <div class="topico-nome">${t.nome}</div>
          <div class="topico-qtd">${t.qtd}</div>
        </div>
        <!-- Indicador de tendência -->
        <span class="topico-trend">${t.trend}</span>
      </div>
    `).join("");
  }

  /* ---- Widget de trecho de discussão ----
     Exibe apenas placeholder — sem inventar conteúdo real */
  const trechoEl = document.getElementById("trechoDiscussao");
  const metaEl   = document.getElementById("metaDiscussao");
  const t = d.trechoDestaque;

  if (trechoEl) trechoEl.textContent = t.texto;
  if (metaEl) {
    metaEl.innerHTML = `
      <div class="discussao-avatar"></div>
      <div>
        <div class="discussao-autor">${t.autor}</div>
        <div class="discussao-topico">Em: ${t.topico}</div>
      </div>
    `;
  }

  /* ---- Membros ativos ---- */
  const gradeUs = document.getElementById("gradeUsuarios");
  if (gradeUs) {
    gradeUs.innerHTML = d.usuarios.map(u => `
      <div class="card-usuario">
        <div class="usuario-avatar" style="background:${u.cor};">${u.emoji}</div>
        <div class="usuario-nome">${u.nome}</div>
        <div class="usuario-esp">${u.esp}</div>
        <div class="usuario-posts">${u.posts} posts</div>
      </div>
    `).join("");
  }

  /* ---- Lista de posts com curtidas e comentários ---- */
  const listaPosts = document.getElementById("listaPosts");
  if (listaPosts) {
    listaPosts.innerHTML = d.posts.map(post => `
      <div class="post-card">
        <div class="post-header">
          <div class="post-avatar" style="background:${post.avatarCor};">${post.avatarEmoji}</div>
          <div>
            <div class="post-autor">${post.autor}</div>
            <div class="post-data">${post.data}</div>
          </div>
        </div>
        <h3 class="post-titulo">${post.titulo}</h3>
        <p class="post-conteudo">${post.conteudo}</p>
        <div class="post-tags">${post.tags.map(t => `<span class="post-tag">${t}</span>`).join("")}</div>
        <div class="post-acoes">
          <button class="btn-curtir" data-id="${post.id}">♥ <span class="curtidas-count">${post.curtidas}</span></button>
          <button class="btn-comentar-toggle" data-id="${post.id}">💬 Comentar</button>
        </div>
        <!-- Área expandível de comentários -->
        <div class="area-comentarios" id="comentarios-${post.id}" style="display:none;">
          <div class="lista-comentarios" id="lista-com-${post.id}"></div>
          <div class="form-comentario">
            <input type="text" class="input-comentario" placeholder="Escreva um comentário..." maxlength="280">
            <button class="btn-enviar-com" data-id="${post.id}">Enviar</button>
          </div>
        </div>
      </div>
    `).join("");

    /* Evento de curtida — toggle com contagem */
    listaPosts.querySelectorAll(".btn-curtir").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.dataset.id);
        const post = d.posts.find(p => p.id === id);
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

    /* Evento de abrir/fechar área de comentários */
    listaPosts.querySelectorAll(".btn-comentar-toggle").forEach(btn => {
      btn.addEventListener("click", () => {
        const area = document.getElementById(`comentarios-${btn.dataset.id}`);
        const aberto = area.style.display !== "none";
        area.style.display = aberto ? "none" : "block";
        btn.textContent = aberto ? "💬 Comentar" : "💬 Fechar";
        if (!aberto) area.querySelector(".input-comentario").focus();
      });
    });

    /* Evento de enviar comentário */
    listaPosts.querySelectorAll(".btn-enviar-com").forEach(btn => {
      btn.addEventListener("click", () => enviarComentario(btn.dataset.id));
    });

    listaPosts.querySelectorAll(".input-comentario").forEach(input => {
      input.addEventListener("keydown", e => {
        if (e.key === "Enter") {
          const id = input.closest(".area-comentarios").id.replace("comentarios-", "");
          enviarComentario(id);
        }
      });
    });
  }

  /* Botão de nova discussão (placeholder) */
  document.getElementById("btnNovoPost")?.addEventListener("click", () => {
    const usuario = getUsuario();
    if (!usuario) {
      mostrarToast("Faça login para iniciar uma discussão.");
      abrirModalPerfil();
    } else {
      mostrarToast("Funcionalidade de novo post em breve! ✍️");
    }
  });
}

/* Adiciona comentário ao post localmente */
function enviarComentario(postId) {
  const area   = document.getElementById(`comentarios-${postId}`);
  const input  = area.querySelector(".input-comentario");
  const texto  = input.value.trim();
  if (!texto) return;

  const lista = document.getElementById(`lista-com-${postId}`);
  const item  = document.createElement("div");
  item.className = "comentario-item";
  item.innerHTML = `
    <div class="com-avatar"></div>
    <div class="com-corpo">
      <span class="com-autor">Você</span>
      <p class="com-texto">${texto}</p>
    </div>`;
  lista.appendChild(item);
  input.value = "";
  input.focus();
}


/* ================================================
   DISPATCH — detecta página atual e chama renderizador
================================================ */
function renderPagina() {
  const page = location.pathname.split("/").pop() || "index.html";
  switch (page) {
    case "index.html":      renderInicio();     break;
    case "artigos.html":    renderArtigos();    break;
    case "noticias.html":   renderNoticias();   break;
    case "desafios.html":   renderDesafios();   break;
    case "comunidade.html": renderComunidade(); break;
  }
}


/* ================================================
   BUSCA — filtragem básica em campo de pesquisa
   Emite toast informando funcionalidade em desenvolvimento
================================================ */
function initBusca() {
  const campo = document.getElementById("campoBusca");
  if (!campo) return;

  let timer;
  campo.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (campo.value.trim().length >= 3) {
        /* Em produção: enviaria requisição PHP para backend de busca */
        mostrarToast(`Buscando: "${campo.value.trim()}"…`);
      }
    }, 600);
  });
}


/* ================================================
   INIT — ponto de entrada, chamado no DOMContentLoaded
================================================ */
document.addEventListener("DOMContentLoaded", () => {
  buildSidebar();         /* Constrói sidebar */
  initMobileMenu();       /* Configura menu mobile */
  buildModalPerfil();     /* Injeta HTML do modal de autenticação */
  atualizarTopbarPerfil();/* Atualiza botão de perfil na topbar */
  renderPagina();         /* Renderiza conteúdo específico da página atual */
  initBusca();            /* Inicializa campo de busca */
  initScrollReveal();     /* Animações de entrada por scroll */
  initHover();            /* Efeitos de hover nos cards */

  /* Botão de abrir perfil na topbar */
  document.getElementById("btnAbrirPerfil")?.addEventListener("click", abrirModalPerfil);
});
