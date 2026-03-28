/* ================================================
   DADOS.JS — Banco de dados estático da plataforma
   Todos os conteúdos exibidos nas páginas vêm daqui.
   Em produção, esses objetos seriam retornados por APIs PHP.
================================================ */

"use strict";

const DADOS = {

  /* ============================================
     INÍCIO — dados do feed principal
  ============================================ */
  inicio: {
    destaque: {
      tag: "Em Destaque",
      titulo: "Identidade e pertencimento: o lugar do negro na democracia brasileira",
      descricao: "Uma análise histórica e contemporânea sobre representatividade, direitos e as conquistas da população afrodescendente no Brasil.",
      data: "28 de março de 2026",
      cor: "linear-gradient(135deg, #594A3C 0%, #26241E 100%)"
    },
    cardsMini: [
      { tag: "Artigo", titulo: "Quilombolas e o direito constitucional à terra", cor: "#A67153" },
      { tag: "Notícia", titulo: "Nova lei amplia cotas em universidades federais", cor: "#615F6D" }
    ],
    recomendacoes: [
      { categoria: "História", titulo: "A Abolição e o mito da libertação completa" },
      { categoria: "Cultura", titulo: "Religiões afro-brasileiras e liberdade de culto" },
      { categoria: "Políticas", titulo: "Ações afirmativas no Brasil: balanço de 20 anos" },
      { categoria: "Saúde", titulo: "Racismo como determinante de saúde pública" },
      { categoria: "Educação", titulo: "Lei 10.639 e o ensino da história africana" },
      { categoria: "Arte", titulo: "Arte negra e resistência no pós-abolição" }
    ],
    fontes: [
      { categoria: "Governo", nome: "IBGE", descricao: "Instituto Brasileiro de Geografia e Estatística — dados populacionais e socioeconômicos." },
      { categoria: "Acadêmica", nome: "CAPES", descricao: "Portal de periódicos com produção científica nacional e internacional." },
      { categoria: "Direitos", nome: "SEPPIR", descricao: "Secretaria de Políticas de Promoção da Igualdade Racial." },
      { categoria: "Internacional", nome: "ONU Mulheres", descricao: "Dados e relatórios sobre interseccionalidade de gênero e raça." }
    ],
    artigos: [
      {
        titulo: "Letramento racial crítico no ensino básico: desafios e possibilidades",
        autores: "Dra. Beatriz Nascimento, Prof. Elias Souza",
        data: "Março 2026",
        area: "📚 Educação",
        resumo: "Análise das práticas pedagógicas voltadas ao letramento racial em escolas públicas brasileiras entre 2020 e 2025."
      },
      {
        titulo: "O racismo estrutural como obstáculo ao desenvolvimento econômico sustentável",
        autores: "Dr. Abdias Rodrigues, Dra. Lélia Fernandes",
        data: "Fevereiro 2026",
        area: "📊 Economia",
        resumo: "Estudo quantitativo sobre a correlação entre desigualdade racial e indicadores de desenvolvimento no Brasil."
      }
    ],
    noticiasMini: [
      { cat: "Política", titulo: "STF reafirma constitucionalidade das cotas raciais", thumb: "⚖️" },
      { cat: "Cultura", titulo: "Festival Afro celebra 10 anos com recorde de público", thumb: "🎭" },
      { cat: "Educação", titulo: "Universidades ampliam programas de permanência para cotistas", thumb: "🎓" }
    ],
    desafioMini: {
      titulo: "Quiz: Personalidades negras na história do Brasil",
      desc: "Teste seus conhecimentos sobre figuras históricas fundamentais para a cultura e política brasileira.",
      xp: 120,
      progresso: 45
    }
  },

  /* ============================================
     ARTIGOS — dados completos
  ============================================ */
  artigos: {
    categorias: ["Todos", "Educação", "Política", "Cultura", "Saúde", "Economia", "Direito"],
    lista: [
      {
        titulo: "Letramento racial crítico no ensino básico: desafios e possibilidades",
        autores: "Dra. Beatriz Nascimento · Prof. Elias Souza",
        data: "28 mar 2026",
        area: "Educação",
        emoji: "📚",
        resumo: "Análise das práticas pedagógicas voltadas ao letramento racial em escolas públicas brasileiras entre 2020 e 2025, com foco nos desafios da formação docente.",
        tipo: "Artigo"
      },
      {
        titulo: "O racismo estrutural como obstáculo ao desenvolvimento econômico sustentável",
        autores: "Dr. Abdias Rodrigues · Dra. Lélia Fernandes",
        data: "15 mar 2026",
        area: "Economia",
        emoji: "📊",
        resumo: "Estudo quantitativo sobre a correlação entre desigualdade racial e indicadores macroeconômicos no Brasil, com série histórica de 30 anos.",
        tipo: "Artigo"
      },
      {
        titulo: "Religiosidade afro-brasileira e laicidade do Estado: tensões contemporâneas",
        autores: "Prof. Candomblé Lima · Dra. Spiritista Moura",
        data: "10 mar 2026",
        area: "Direito",
        emoji: "⚖️",
        resumo: "Análise jurídica dos conflitos entre intolerância religiosa e o princípio constitucional de liberdade de culto no contexto das religiões de matriz africana.",
        tipo: "Artigo"
      },
      {
        titulo: "Saúde da população negra: racismo como determinante social",
        autores: "Dra. Sueli Carneiro · Dr. José Geraldo",
        data: "02 mar 2026",
        area: "Saúde",
        emoji: "🏥",
        resumo: "Revisão sistemática sobre o impacto do racismo institucional no acesso e qualidade dos serviços de saúde para populações negras no SUS.",
        tipo: "Artigo"
      },
      {
        titulo: "Quilombolas e o direito constitucional à terra: 35 anos de CF/88",
        autores: "Prof. Clóvis Moura · Dra. Valdecir Nascimento",
        data: "22 fev 2026",
        area: "Direito",
        emoji: "🏡",
        resumo: "Balanço do processo de titulação de terras quilombolas a partir da promulgação da Constituição Federal, com dados atualizados da Fundação Palmares.",
        tipo: "Documento"
      },
      {
        titulo: "Arte negra contemporânea e resistência política no Brasil pós-2013",
        autores: "Dra. Conceição Evaristo · Prof. Nei Lopes",
        data: "18 fev 2026",
        area: "Cultura",
        emoji: "🎨",
        resumo: "Mapeamento das expressões artísticas de autoria negra como forma de resistência cultural e política no período pós-manifestações de junho de 2013.",
        tipo: "Artigo"
      }
    ],
    autores: [
      { nome: "Dra. Beatriz Nascimento", esp: "Historiadora e escritora", emoji: "✍️", cor: "#A67153", artigos: 14 },
      { nome: "Prof. Abdias do Nascimento", esp: "Ativismo e teatro negro", emoji: "🎭", cor: "#594A3C", artigos: 9 },
      { nome: "Dra. Sueli Carneiro", esp: "Filosofia e feminismo negro", emoji: "🌺", cor: "#615F6D", artigos: 18 },
      { nome: "Prof. Clóvis Moura", esp: "Sociologia e quilombismo", emoji: "🏡", cor: "#26241E", artigos: 11 }
    ],
    fontes: [
      { categoria: "Repositório", nome: "BDTD", descricao: "Biblioteca Digital Brasileira de Teses e Dissertações com acesso gratuito." },
      { categoria: "Periódico", nome: "Cadernos CEDES", descricao: "Publicação científica sobre educação e sociedade, Unicamp." },
      { categoria: "Acervo", nome: "Fundação Palmares", descricao: "Produção cultural e histórica sobre a população afrodescendente." },
      { categoria: "Internacional", nome: "African Studies", descricao: "Base internacional de estudos africanos e diaspóricos." }
    ]
  },

  /* ============================================
     NOTÍCIAS — dados completos
  ============================================ */
  noticias: {
    categorias: ["Todas", "Política", "Educação", "Cultura", "Saúde", "Direitos", "Internacional"],
    destaque: {
      tag: "Urgente",
      titulo: "STF reafirma por unanimidade constitucionalidade das cotas raciais em universidades",
      subtitulo: "Decisão histórica garante a manutenção das políticas de ação afirmativa no ensino superior por mais 10 anos.",
      data: "28 março 2026",
      categoria: "Política"
    },
    laterais: [
      {
        cat: "Educação",
        titulo: "MEC lança programa nacional de formação docente em história afro-brasileira",
        data: "27 mar 2026"
      },
      {
        cat: "Cultura",
        titulo: "Festival Afro-Latino celebra 10 anos com recorde de 300 mil visitantes",
        data: "26 mar 2026"
      },
      {
        cat: "Saúde",
        titulo: "MS amplia política de saúde integral da população negra em todo o país",
        data: "25 mar 2026"
      }
    ],
    medias: [
      { cat: "Direitos", titulo: "Nova lei criminaliza racismo algorítmico em plataformas digitais", data: "24 mar 2026", thumb: "💻" },
      { cat: "Internacional", titulo: "ONU aprova resolução histórica sobre reparações históricas à diáspora africana", data: "22 mar 2026", thumb: "🌍" },
      { cat: "Política", titulo: "Governo amplia programa habitacional para comunidades quilombolas", data: "20 mar 2026", thumb: "🏠" }
    ],
    rapidas: [
      { cat: "Cultura", titulo: "Museu de Arte Afro-Brasileira inaugura nova ala permanente em SP" },
      { cat: "Economia", titulo: "Startups lideradas por negros crescem 42% no último trimestre" },
      { cat: "Educação", titulo: "Pesquisa revela aumento de 15% no acesso de negros ao ensino superior" },
      { cat: "Saúde", titulo: "Campanha combate anemia falciforme em comunidades periféricas" }
    ],
    fontes: [
      { emoji: "📰", nome: "Agência Brasil", tipo: "Agência de Notícias" },
      { emoji: "🌐", nome: "Geledés", tipo: "Instituto da Mulher Negra" },
      { emoji: "📡", nome: "Portal Afro", tipo: "Mídia Especializada" },
      { emoji: "🏛", nome: "SEPPIR", tipo: "Governo Federal" },
      { emoji: "📻", nome: "Rádio Batukajé", tipo: "Mídia Comunitária" },
      { emoji: "🌍", nome: "ONU News Brasil", tipo: "Internacional" }
    ]
  },

  /* ============================================
     DESAFIOS — XP, Missões, Conquistas, Ranking
  ============================================ */
  desafio: {
    usuario: {
      xpAtual: 340,
      xpProximo: 500,
      nivel: 4,
      streak: 7,         /* dias consecutivos de quiz */
      diasFeitos: [true, true, true, true, true, true, true, false, false, false, false, false, false, false]
    },
    desafioPrincipal: {
      titulo: "📖 Semana da Consciência Histórica",
      descricao: "Complete todas as missões desta semana para aprender sobre personalidades, movimentos e marcos históricos da luta antirracista no Brasil.",
      recompensa: "500 XP + Conquista Especial",
      progresso: 45
    },
    missoes: [
      {
        id: 1, titulo: "Quiz: Abolicionismo",
        descricao: "Responda 10 perguntas sobre o movimento abolicionista e seus líderes históricos.",
        xp: 80, status: "concluido", progresso: 100
      },
      {
        id: 2, titulo: "Leitura: Zumbi dos Palmares",
        descricao: "Leia o artigo completo sobre a trajetória de resistência de Zumbi e responda ao questionário.",
        xp: 100, status: "andamento", progresso: 60
      },
      {
        id: 3, titulo: "Quiz: Constituição e Direitos",
        descricao: "Teste seus conhecimentos sobre os direitos garantidos pela CF/88 à população negra.",
        xp: 90, status: "andamento", progresso: 20
      },
      {
        id: 4, titulo: "Desafio: Mapa Cultural",
        descricao: "Identifique no mapa as principais regiões de quilombos no Brasil contemporâneo.",
        xp: 130, status: "bloqueado", progresso: 0
      },
      {
        id: 5, titulo: "Texto: Diáspora Africana",
        descricao: "Leia sobre os fluxos migratórios forçados que formaram as comunidades afrodescendentes nas Américas.",
        xp: 70, status: "bloqueado", progresso: 0
      },
      {
        id: 6, titulo: "Quiz Final: Panorama Atual",
        descricao: "Questionário completo sobre políticas públicas e indicadores sociais atuais da população negra.",
        xp: 150, status: "bloqueado", progresso: 0
      }
    ],
    conquistas: [
      { nome: "Primeiros Passos", descricao: "Completou a primeira missão na plataforma.", icone: "🥉", cor: "#CD7F32", desbloqueada: true },
      { nome: "Leitor Assíduo", descricao: "Leu 5 artigos completos na plataforma.", icone: "📚", cor: "#A67153", desbloqueada: true },
      { nome: "Semana de Ouro", descricao: "7 dias consecutivos de atividade na plataforma.", icone: "🔥", cor: "#E8A025", desbloqueada: true },
      { nome: "Conhecedor", descricao: "Atingiu o nível 5 na plataforma.", icone: "🎓", cor: "#615F6D", desbloqueada: false },
      { nome: "Embaixador", descricao: "Convidou 3 amigos para a plataforma.", icone: "🤝", cor: "#5A8A6A", desbloqueada: false },
      { nome: "Mestre da História", descricao: "Completou todos os quizzes da trilha histórica.", icone: "🏆", cor: "#D4AF37", desbloqueada: false },
      { nome: "Voz da Comunidade", descricao: "Fez 20 comentários em discussões.", icone: "💬", cor: "#594A3C", desbloqueada: false },
      { nome: "Pesquisador", descricao: "Leu 20 artigos científicos completos.", icone: "🔬", cor: "#26241E", desbloqueada: false }
    ],
    rankingPessoal: [
      { pos: "🥇", nome: "Iara Moreira", nivel: 8, xp: 1240, cor: "#A67153", destaque: false },
      { pos: "🥈", nome: "Marcus Oliveira", nivel: 7, xp: 980, cor: "#594A3C", destaque: false },
      { pos: "🥉", nome: "Yara Gomes", nivel: 6, xp: 820, cor: "#615F6D", destaque: false },
      { pos: "4", nome: "Você", nivel: 4, xp: 340, cor: "#26241E", destaque: true },
      { pos: "5", nome: "Fernanda Lima", nivel: 4, xp: 290, cor: "#A67153", destaque: false }
    ],
    rankingGrupos: [
      { pos: "🥇", nome: "Quilombo Digital", nivel: "Grupo", xp: 4820, cor: "#A67153", destaque: false },
      { pos: "🥈", nome: "Afrofuturistas SP", nivel: "Grupo", xp: 3910, cor: "#594A3C", destaque: false },
      { pos: "🥉", nome: "Coletivo Ancestral", nivel: "Grupo", xp: 3100, cor: "#615F6D", destaque: false },
      { pos: "4", nome: "Rede Bahia Plural", nivel: "Grupo", xp: 2740, cor: "#26241E", destaque: false },
      { pos: "5", nome: "Candomblé & Cultura", nivel: "Grupo", xp: 2310, cor: "#A67153", destaque: false }
    ]
  },

  /* ============================================
     COMUNIDADE — membros, posts, tópicos
  ============================================ */
  comunidade: {
    /* Tópicos mais discutidos (ranking temático) */
    topicosEmAlta: [
      { nome: "Cotas raciais e meritocracia", qtd: "142 discussões", trend: "🔥" },
      { nome: "Branqueamento e identidade racial", qtd: "98 discussões", trend: "📈" },
      { nome: "Intolerância religiosa no Brasil", qtd: "87 discussões", trend: "⚡" },
      { nome: "Racismo algorítmico e tecnologia", qtd: "74 discussões", trend: "🚀" },
      { nome: "Feminismo negro e interseccionalidade", qtd: "68 discussões", trend: "📊" }
    ],
    /* Trecho de discussão em destaque (widget cinza — placeholder real) */
    trechoDestaque: {
      texto: "— trecho de discussão da comunidade aparecerá aqui —",
      autor: "Membro da comunidade",
      topico: "Cotas raciais e meritocracia"
    },
    usuarios: [
      { nome: "Iara Moreira", esp: "Historiadora", emoji: "📜", cor: "#A67153", posts: 48 },
      { nome: "Marcus Oliveira", esp: "Ativista Cultural", emoji: "🎭", cor: "#594A3C", posts: 35 },
      { nome: "Yara Gomes", esp: "Pesquisadora", emoji: "🔬", cor: "#615F6D", posts: 29 },
      { nome: "Kofi Asante", esp: "Educador", emoji: "📚", cor: "#26241E", posts: 22 }
    ],
    posts: [
      {
        id: 1,
        autor: "Iara Moreira",
        avatarEmoji: "I",
        avatarCor: "#A67153",
        data: "Hoje, 14h22",
        titulo: "O silêncio das instituições sobre o racismo cotidiano",
        conteudo: "Precisamos falar sobre como o racismo se manifesta em espaços institucionais que teoricamente deveriam ser neutros. Escolas, hospitais, empresas — todos esses ambientes reproduzem desigualdades raciais de formas nem sempre visíveis.",
        tags: ["Racismo Estrutural", "Instituições", "Direitos"],
        curtidas: 34
      },
      {
        id: 2,
        autor: "Marcus Oliveira",
        avatarEmoji: "M",
        avatarCor: "#594A3C",
        data: "Ontem, 20h15",
        titulo: "Arte como resistência: o papel do hip-hop na luta antirracista",
        conteudo: "O hip-hop nasceu como linguagem de resistência nas periferias negras. No Brasil, artistas como Emicida, Criolo e Racionais continuam essa tradição, trazendo a realidade das comunidades negras para o centro do debate cultural.",
        tags: ["Hip-Hop", "Arte", "Resistência", "Cultura Negra"],
        curtidas: 58
      },
      {
        id: 3,
        autor: "Yara Gomes",
        avatarEmoji: "Y",
        avatarCor: "#615F6D",
        data: "22 mar 2026",
        titulo: "Dados do IBGE revelam persistência da desigualdade racial no mercado de trabalho",
        conteudo: "Os últimos dados da PNAD mostram que trabalhadores negros recebem em média 42% menos que trabalhadores brancos com mesma escolaridade e tempo de experiência. Precisamos ir além das políticas de acesso e discutir também equidade salarial.",
        tags: ["Mercado de Trabalho", "IBGE", "Desigualdade"],
        curtidas: 77
      }
    ]
  }
};
