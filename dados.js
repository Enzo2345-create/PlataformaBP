"use strict";

/* ================================================
   DADOS CENTRAIS DA PLATAFORMA PRISMA
   Fonte única de verdade para todo o conteúdo.
================================================ */

const DADOS = {

  /* ── INÍCIO ─────────────────────────────── */
  inicio: {
    destaque: {
      titulo: "O Brasil em 2026: entre a reinvenção e a permanência",
      descricao: "Uma análise sobre as transformações sociais, econômicas e culturais que moldam o presente e projetam o futuro do país.",
      tag: "Editorial",
      data: "28 fev 2026",
      cor: "#8cc7b5"
    },
    cards: [
      { titulo: "Democracia sob pressão", tag: "Política", cor: "#a8d4c8" },
      { titulo: "Crise climática e respostas locais", tag: "Meio Ambiente", cor: "#b4cfc9" },
      { titulo: "IA e o mercado de trabalho", tag: "Tecnologia", cor: "#c2ddd7" }
    ],
    recomendacoes: [
      { titulo: "Reforma tributária: o que muda para você", categoria: "Economia" },
      { titulo: "Povos indígenas e a luta pela terra", categoria: "Direitos" },
      { titulo: "O colapso das cidades médias", categoria: "Urbanismo" },
      { titulo: "Saúde mental na era digital", categoria: "Saúde" },
      { titulo: "Literatura periférica ganha espaço global", categoria: "Cultura" },
      { titulo: "Eleições municipais: o que esperar", categoria: "Política" }
    ],
    fontes: [
      { nome: "IBGE", descricao: "Instituto Brasileiro de Geografia e Estatística", categoria: "Dados oficiais" },
      { nome: "Nexo", descricao: "Jornalismo explicativo e contextual", categoria: "Mídia independente" },
      { nome: "Fiocruz", descricao: "Pesquisa em saúde pública e ciências biomédicas", categoria: "Pesquisa" },
      { nome: "Agência Pública", descricao: "Jornalismo investigativo sem fins lucrativos", categoria: "Investigação" }
    ],
    artigos: [
      {
        tipo: "Artigo",
        data: "19 fev 2026",
        titulo: "Desigualdade racial no acesso à justiça: um estudo longitudinal",
        autores: "Carvalho, M.; Santos, R.; Oliveira, T.",
        area: "Direito & Sociologia"
      },
      {
        tipo: "Artigo",
        data: "18 fev 2026",
        titulo: "Juventude e participação política no Brasil pós-pandemia",
        autores: "Lima, P.; Ferreira, A.",
        area: "Ciência Política"
      }
    ]
  },

  /* ── ATUALIDADES ─────────────────────────── */
  atualidades: {
    categorias: ["Todas", "Política", "Economia", "Cultura", "Ciência", "Meio Ambiente", "Internacional"],
    destaque: {
      titulo: "Cúpula climática define metas para 2035 com participação de 140 países",
      descricao: "Acordo histórico estabelece redução de 60% nas emissões de carbono. Brasil negocia compensações pela preservação da Amazônia.",
      tag: "Internacional",
      data: "28 fev 2026"
    },
    laterais: [
      { titulo: "STF retoma julgamento sobre marco temporal indígena", categoria: "Política", tempo: "2h atrás" },
      { titulo: "Banco Central mantém taxa Selic em 10,5% ao ano", categoria: "Economia", tempo: "4h atrás" },
      { titulo: "Festival de Parintins bate recorde de público internacional", categoria: "Cultura", tempo: "6h atrás" }
    ],
    mais: [
      { titulo: "Vacina contra dengue tem eficácia confirmada em estudo nacional", categoria: "Ciência", data: "27 fev" },
      { titulo: "Mercado de trabalho cria 180 mil vagas formais em janeiro", categoria: "Economia", data: "26 fev" },
      { titulo: "Nova lei de proteção de dados entra em vigor na próxima semana", categoria: "Direito", data: "25 fev" }
    ],
    rapidos: [
      { titulo: "Manifestações tomam capitais pelo Dia da Consciência Negra", categoria: "Direitos" },
      { titulo: "Incêndios no Cerrado destroem 120 mil hectares em fevereiro", categoria: "Meio Ambiente" },
      { titulo: "Premiação Jabuti anuncia lista de finalistas 2026", categoria: "Cultura" },
      { titulo: "Inflação fecha fevereiro em 0,38%, menor nível em 3 anos", categoria: "Economia" }
    ]
  },

  /* ── MEMÓRIA ─────────────────────────────── */
  memoria: {
    epocas: [
      { ano: "1950", titulo: "Desenvolvimentismo e modernização", descricao: "Era JK, Brasília e o otimismo nacional" },
      { ano: "1970", titulo: "Milagre econômico e resistência", descricao: "Crescimento sob a ditadura militar e movimentos clandestinos" },
      { ano: "1990", titulo: "Redemocratização e Plano Real", descricao: "Constituição de 88, abertura econômica e estabilização" },
      { ano: "2010", titulo: "Brasil emergente e polarização", descricao: "Copa do Mundo, crise política e novos movimentos sociais" }
    ],
    timeline: [
      { ano: "2026", evento: "Novo pacto climático internacional", descricao: "Brasil lidera negociações sobre preservação da Amazônia no cenário global." },
      { ano: "2024", evento: "Eleições e renovação do Congresso", descricao: "Maior participação de mulheres e jovens no legislativo federal." },
      { ano: "2020", evento: "Pandemia de COVID-19", descricao: "Brasil enfrenta uma das maiores crises sanitárias de sua história." },
      { ano: "2015", evento: "Operação Lava Jato", descricao: "Investigações revelam esquema de corrupção sistêmica no país." },
      { ano: "2010", evento: "Brasil na Copa do Mundo", descricao: "País recebe o evento e vive ápice do otimismo da era Lula." }
    ],
    documentos: [
      { tipo: "Documento", data: "1988", titulo: "Constituição Federal — A Carta Cidadã", autores: "Assembleia Nacional Constituinte", area: "Direito Constitucional" },
      { tipo: "Registro", data: "1964", titulo: "Ato Institucional Nº 1 — Instauração da Ditadura", autores: "Arquivo Nacional", area: "História Política" }
    ]
  },

  /* ── CONCEITOS ───────────────────────────── */
  conceitos: {
    destaque: {
      termo: "Interseccionalidade",
      definicao: "Conceito que descreve como diferentes aspectos da identidade social — raça, gênero, classe, sexualidade — se sobrepõem e criam experiências únicas de privilégio ou opressão.",
      autora: "Kimberlé Crenshaw, 1989"
    },
    lista: [
      { icone: "⚖️", termo: "Equidade", definicao: "Distribuição justa de recursos considerando as diferenças de ponto de partida de cada grupo.", area: "Justiça Social" },
      { icone: "🌐", termo: "Colonialidade", definicao: "Herança estrutural do colonialismo que persiste nas relações de poder após a independência formal.", area: "Teoria Decolonial" },
      { icone: "🧬", termo: "Racismo estrutural", definicao: "Forma de racismo que opera através de instituições, leis e normas sociais, independente da intenção individual.", area: "Sociologia" },
      { icone: "🏙️", termo: "Gentrificação", definicao: "Processo de transformação urbana que expulsa populações mais pobres de áreas valorizadas.", area: "Urbanismo" },
      { icone: "📢", termo: "Agenda Setting", definicao: "Capacidade da mídia de influenciar quais temas são considerados importantes pela opinião pública.", area: "Comunicação" },
      { icone: "🔄", termo: "Neoliberalismo", definicao: "Conjunto de políticas econômicas baseadas na desregulamentação, privatizações e redução do Estado.", area: "Economia Política" }
    ],
    artigos: [
      { tipo: "Conceito", data: "15 jan 2026", titulo: "Além da inclusão: repensando o conceito de pertencimento nas instituições", autores: "Mendes, C.; Araújo, F.", area: "Ciências Sociais" }
    ]
  },

  /* ── RETRATOS ─────────────────────────────── */
  retratos: {
    stats: [
      { numero: "213M", label: "População brasileira (2026)" },
      { numero: "47%", label: "Brasileiros na classe C" },
      { numero: "8,2%", label: "Taxa de desemprego" },
      { numero: "63%", label: "Acesso à internet banda larga" }
    ],
    graficos: {
      evolucao: {
        titulo: "Evolução do IDH brasileiro (2000–2025)",
        labels: ["2000","2005","2010","2015","2020","2025"],
        dados: [0.665, 0.699, 0.726, 0.754, 0.748, 0.771]
      },
      desigualdade: {
        titulo: "Coeficiente de Gini por região (2025)",
        labels: ["Norte","Nordeste","Centro-Oeste","Sudeste","Sul"],
        dados: [0.52, 0.55, 0.49, 0.48, 0.44]
      },
      composicao: {
        titulo: "Composição por raça/cor (IBGE 2025)",
        labels: ["Parda","Branca","Preta","Amarela","Indígena"],
        dados: [46.8, 42.7, 9.1, 0.9, 0.5]
      },
      renda: {
        titulo: "Renda média domiciliar mensal por quintil (R$)",
        labels: ["1º","2º","3º","4º","5º"],
        dados: [520, 1150, 2100, 3800, 11200]
      }
    }
  },

  /* ── EXPRESSÕES ───────────────────────────── */
  expressoes: {
    categorias: ["Todas", "Literatura", "Música", "Cinema", "Arte Visual", "Teatro", "Fotografia"],
    galeria: [
      {
        id: 1,
        titulo: "Favela Rising",
        autor: "Coletivo Imagens do Povo",
        tipo: "Fotografia",
        ano: 2025,
        descricao: "Série documental sobre resistência cultural nas comunidades do Rio de Janeiro.",
        cor: "#8cc7b5"
      },
      {
        id: 2,
        titulo: "Mãe Preta",
        autor: "Rosana Paulino",
        tipo: "Arte Visual",
        ano: 2024,
        descricao: "Instalação sobre maternidade negra e colonialismo no Brasil.",
        cor: "#c8d9d4"
      },
      {
        id: 3,
        titulo: "Sertão Neon",
        autor: "Pedro Morales",
        tipo: "Fotografia",
        ano: 2025,
        descricao: "O Nordeste contemporâneo entre a tradição e a modernidade urbana.",
        cor: "#b4cfc9"
      },
      {
        id: 4,
        titulo: "Aquilombar",
        autor: "Teatro da Vertigem",
        tipo: "Teatro",
        ano: 2025,
        descricao: "Espetáculo immersivo sobre a história dos quilombos no Brasil.",
        cor: "#a0c0b8"
      },
      {
        id: 5,
        titulo: "Batuque Digital",
        autor: "DJ Marfaisa",
        tipo: "Música",
        ano: 2026,
        descricao: "Álbum visual que funde percussão afro-brasileira com eletrônica experimental.",
        cor: "#a8d4c8"
      },
      {
        id: 6,
        titulo: "Terra Sem Males",
        autor: "Glaucia Nogueira",
        tipo: "Cinema",
        ano: 2025,
        descricao: "Longa sobre cosmovisão Guarani e a luta territorial no sul do país.",
        cor: "#c2ddd7"
      },
      {
        id: 7,
        titulo: "Bordados da Memória",
        autor: "Bordadeiras do Cariri",
        tipo: "Arte Visual",
        ano: 2024,
        descricao: "Obras coletivas que narram histórias de mulheres do sertão em bordado.",
        cor: "#d5e8e3"
      },
      {
        id: 8,
        titulo: "O Silêncio das Pedras",
        autor: "Luiz Ruffato",
        tipo: "Literatura",
        ano: 2026,
        descricao: "Romance sobre o esquecimento e a memória operária no interior de Minas.",
        cor: "#c0dbd4"
      }
    ]
  },

  /* ── COMUNIDADE ───────────────────────────── */
  comunidade: {
    membros: [
      { nome: "Ana Beatriz", especialidade: "Sociologia Urbana", posts: 47, cor: "#8cc7b5" },
      { nome: "Rafael Torres", especialidade: "Jornalismo Investigativo", posts: 31, cor: "#a8d4c8" },
      { nome: "Camila Souza", especialidade: "Direitos Humanos", posts: 58, cor: "#b4cfc9" },
      { nome: "Diego Mendes", especialidade: "Economia Crítica", posts: 24, cor: "#c2ddd7" }
    ],
    posts: [
      {
        id: 1,
        autor: "Ana Beatriz",
        tempo: "há 2h",
        conteudo: "Acabei de ler o relatório do IBGE sobre desigualdade habitacional. Os dados sobre famílias em situação de moradia inadequada no Norte são alarmantes — crescimento de 18% desde 2020. Alguém tem acesso ao estudo completo?",
        tags: ["Moradia", "IBGE", "Desigualdade"],
        curtidas: 24,
        comentarios: []
      },
      {
        id: 2,
        autor: "Camila Souza",
        tempo: "há 5h",
        conteudo: "O julgamento de hoje no STF sobre territórios quilombolas pode definir precedentes para dezenas de casos. É fundamental acompanhar — transmissão ao vivo no canal do tribunal. O que vocês acham do argumento do relator?",
        tags: ["STF", "Quilombolas", "Direitos"],
        curtidas: 41,
        comentarios: []
      },
      {
        id: 3,
        autor: "Rafael Torres",
        tempo: "há 1 dia",
        conteudo: "Finalizei a série investigativa sobre terceirização em serviços públicos municipais. Publicação prevista para a próxima semana. Para quem quiser revisar o rascunho e dar feedback, mando o link por DM.",
        tags: ["Investigação", "Trabalho", "Município"],
        curtidas: 18,
        comentarios: []
      },
      {
        id: 4,
        autor: "Diego Mendes",
        tempo: "há 2 dias",
        conteudo: "Thread sobre a reforma tributária: o que realmente muda para as famílias de baixa renda? Spoiler: menos do que o governo anuncia, mas mais do que os críticos admitem. Contexto é tudo.",
        tags: ["Reforma Tributária", "Economia", "Política"],
        curtidas: 67,
        comentarios: []
      }
    ]
  },

  /* ── DESAFIO ──────────────────────────────── */
  desafio: {
    usuario: {
      nome: "Você",
      nivel: 4,
      xpAtual: 650,
      xpProximo: 1000,
      totalConquistas: 3
    },
    desafioPrincipal: {
      titulo: "Maratona de Fevereiro",
      descricao: "Complete 5 leituras aprofundadas, comente em 3 discussões e assista 2 conteúdos de Expressões até o fim do mês.",
      progresso: 65,
      recompensa: "250 XP + Badge 'Leitor Dedicado'"
    },
    missoes: [
      { id: 1, titulo: "Explorador de Conceitos", descricao: "Leia 3 verbetes do glossário", progresso: 100, status: "concluido", xp: 50 },
      { id: 2, titulo: "Voz da Comunidade", descricao: "Comente em 3 discussões diferentes", progresso: 67, status: "andamento", xp: 80 },
      { id: 3, titulo: "Analista de Dados", descricao: "Explore todos os gráficos de Retratos", progresso: 40, status: "andamento", xp: 60 },
      { id: 4, titulo: "Memorialista", descricao: "Leia 5 registros históricos", progresso: 20, status: "andamento", xp: 70 },
      { id: 5, titulo: "Crítico Cultural", descricao: "Acesse 4 obras em Expressões", progresso: 100, status: "concluido", xp: 60 },
      { id: 6, titulo: "Cidadão Informado", descricao: "Leia 10 notícias de Atualidades", progresso: 0, status: "bloqueado", xp: 100 }
    ],
    conquistas: [
      { nome: "Primeiro Passo", descricao: "Completou seu primeiro acesso", icone: "🌱", desbloqueada: true, cor: "#8cc7b5" },
      { nome: "Leitor Ávido", descricao: "Leu 20 artigos na plataforma", icone: "📚", desbloqueada: true, cor: "#a8d4c8" },
      { nome: "Crítico Cultural", descricao: "Explorou 4 obras em Expressões", icone: "🎨", desbloqueada: true, cor: "#e0b87a" },
      { nome: "Analista", descricao: "Explorou todos os gráficos", icone: "📊", desbloqueada: false, cor: "#ccc" }
    ],
    ranking: [
      { pos: 1, nome: "Mariana Costa", xp: 2840, nivel: 7, cor: "#8cc7b5" },
      { pos: 2, nome: "João Vitor", xp: 2510, nivel: 6, cor: "#a8d4c8" },
      { pos: 3, nome: "Letícia Ramos", xp: 2190, nivel: 6, cor: "#b4cfc9" },
      { pos: 4, nome: "Carlos Eduardo", xp: 1870, nivel: 5, cor: "#c2ddd7" },
      { pos: 5, nome: "Você", xp: 650, nivel: 4, cor: "#e8d9a8", destaque: true }
    ]
  }
};
