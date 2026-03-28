<?php
/* ================================================
   API.PHP — Backend PHP da Plataforma PRISMA
   Endpoints simulados para autenticação e busca.
   
   Em produção, conectaria a um banco de dados MySQL via PDO.
   Por ora, utiliza arquivos JSON como persistência simples.
   
   Endpoints disponíveis:
   POST /api.php?action=login      — Autenticar usuário
   POST /api.php?action=cadastro   — Registrar novo usuário
   GET  /api.php?action=busca      — Buscar conteúdo
   GET  /api.php?action=perfil     — Retornar dados do perfil
   POST /api.php?action=logout     — Encerrar sessão
================================================ */

/* --- Configurações gerais --- */
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

/* Inicia sessão PHP para controle de autenticação */
session_start();

/* Arquivo JSON que simula banco de usuários */
define("ARQUIVO_USUARIOS", __DIR__ . "/dados/usuarios.json");
define("ARQUIVO_CONTEUDO", __DIR__ . "/dados/conteudo.json");

/* Lê a ação solicitada */
$action = $_GET["action"] ?? "ping";


/* ================================================
   UTILITÁRIOS
================================================ */

/**
 * Lê o arquivo JSON de usuários e retorna array.
 * Retorna array vazio se o arquivo não existir.
 */
function lerUsuarios(): array {
    if (!file_exists(ARQUIVO_USUARIOS)) return [];
    $conteudo = file_get_contents(ARQUIVO_USUARIOS);
    return json_decode($conteudo, true) ?? [];
}

/**
 * Salva array de usuários no arquivo JSON.
 * Cria o diretório /dados se não existir.
 */
function salvarUsuarios(array $usuarios): void {
    $dir = dirname(ARQUIVO_USUARIOS);
    if (!is_dir($dir)) mkdir($dir, 0755, true);
    file_put_contents(ARQUIVO_USUARIOS, json_encode($usuarios, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

/**
 * Retorna resposta JSON e encerra execução.
 * @param bool   $sucesso  — status da operação
 * @param mixed  $dados    — payload de resposta
 * @param string $mensagem — mensagem legível
 */
function responder(bool $sucesso, mixed $dados = null, string $mensagem = ""): void {
    echo json_encode([
        "sucesso"  => $sucesso,
        "mensagem" => $mensagem,
        "dados"    => $dados
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Valida formato de e-mail usando filter_var.
 */
function emailValido(string $email): bool {
    return (bool) filter_var($email, FILTER_VALIDATE_EMAIL);
}


/* ================================================
   ROTEAMENTO DE ACTIONS
================================================ */
switch ($action) {

    /* -----------------------------------------------
       LOGIN — valida e-mail e senha, inicia sessão
    ----------------------------------------------- */
    case "login":
        /* Lê corpo JSON da requisição */
        $body  = json_decode(file_get_contents("php://input"), true) ?? [];
        $email = trim($body["email"] ?? "");
        $senha = $body["senha"] ?? "";

        /* Validação básica dos campos */
        if (empty($email) || empty($senha)) {
            responder(false, null, "Preencha e-mail e senha.");
        }

        /* Busca usuário no banco simulado */
        $usuarios = lerUsuarios();
        $encontrado = null;
        foreach ($usuarios as $u) {
            /* Compara senha usando password_verify para hash bcrypt */
            if ($u["email"] === $email && password_verify($senha, $u["senha_hash"])) {
                $encontrado = $u;
                break;
            }
        }

        if (!$encontrado) {
            responder(false, null, "E-mail ou senha incorretos.");
        }

        /* Cria sessão do usuário */
        $_SESSION["usuario_id"]    = $encontrado["id"];
        $_SESSION["usuario_nome"]  = $encontrado["nome"];
        $_SESSION["usuario_email"] = $encontrado["email"];

        /* Retorna dados públicos do usuário (sem senha) */
        responder(true, [
            "id"    => $encontrado["id"],
            "nome"  => $encontrado["nome"],
            "email" => $encontrado["email"],
            "nivel" => $encontrado["nivel"] ?? 1,
            "xp"    => $encontrado["xp"] ?? 0,
            "streak"=> $encontrado["streak"] ?? 0
        ], "Login realizado com sucesso.");
        break;


    /* -----------------------------------------------
       CADASTRO — valida campos e cria novo usuário
    ----------------------------------------------- */
    case "cadastro":
        $body    = json_decode(file_get_contents("php://input"), true) ?? [];
        $nome    = trim($body["nome"]    ?? "");
        $email   = trim($body["email"]   ?? "");
        $senha   = $body["senha"]        ?? "";
        $confirma= $body["confirma"]     ?? "";

        /* Validação de campos obrigatórios */
        if (empty($nome) || empty($email) || empty($senha)) {
            responder(false, null, "Preencha todos os campos obrigatórios.");
        }

        /* Valida formato do e-mail */
        if (!emailValido($email)) {
            responder(false, null, "Formato de e-mail inválido.");
        }

        /* Valida tamanho mínimo da senha */
        if (strlen($senha) < 6) {
            responder(false, null, "A senha deve ter no mínimo 6 caracteres.");
        }

        /* Valida confirmação de senha */
        if ($senha !== $confirma) {
            responder(false, null, "As senhas não coincidem.");
        }

        /* Verifica se e-mail já está cadastrado */
        $usuarios = lerUsuarios();
        foreach ($usuarios as $u) {
            if ($u["email"] === $email) {
                responder(false, null, "Este e-mail já está cadastrado.");
            }
        }

        /* Cria novo usuário com hash seguro da senha */
        $novoUsuario = [
            "id"          => uniqid("usr_"),
            "nome"        => $nome,
            "email"       => $email,
            "senha_hash"  => password_hash($senha, PASSWORD_BCRYPT),
            "nivel"       => 1,
            "xp"          => 0,
            "streak"      => 0,
            "criado_em"   => date("Y-m-d H:i:s")
        ];

        $usuarios[] = $novoUsuario;
        salvarUsuarios($usuarios);

        /* Inicia sessão automaticamente após cadastro */
        $_SESSION["usuario_id"]    = $novoUsuario["id"];
        $_SESSION["usuario_nome"]  = $novoUsuario["nome"];
        $_SESSION["usuario_email"] = $novoUsuario["email"];

        responder(true, [
            "id"    => $novoUsuario["id"],
            "nome"  => $novoUsuario["nome"],
            "email" => $novoUsuario["email"],
            "nivel" => 1,
            "xp"    => 0,
            "streak"=> 0
        ], "Conta criada com sucesso!");
        break;


    /* -----------------------------------------------
       LOGOUT — destrói sessão do usuário
    ----------------------------------------------- */
    case "logout":
        $_SESSION = [];
        session_destroy();
        responder(true, null, "Logout realizado com sucesso.");
        break;


    /* -----------------------------------------------
       PERFIL — retorna dados do usuário logado
    ----------------------------------------------- */
    case "perfil":
        /* Verifica se há sessão ativa */
        if (empty($_SESSION["usuario_id"])) {
            responder(false, null, "Usuário não autenticado.");
        }

        /* Busca dados atualizados do usuário */
        $usuarios = lerUsuarios();
        $perfil = null;
        foreach ($usuarios as $u) {
            if ($u["id"] === $_SESSION["usuario_id"]) {
                $perfil = $u;
                break;
            }
        }

        if (!$perfil) {
            responder(false, null, "Usuário não encontrado.");
        }

        /* Retorna apenas dados públicos */
        responder(true, [
            "id"     => $perfil["id"],
            "nome"   => $perfil["nome"],
            "email"  => $perfil["email"],
            "nivel"  => $perfil["nivel"],
            "xp"     => $perfil["xp"],
            "streak" => $perfil["streak"]
        ]);
        break;


    /* -----------------------------------------------
       BUSCA — pesquisa simples no conteúdo simulado
    ----------------------------------------------- */
    case "busca":
        $query = trim($_GET["q"] ?? "");

        /* Requer pelo menos 3 caracteres */
        if (strlen($query) < 3) {
            responder(false, null, "Digite ao menos 3 caracteres para buscar.");
        }

        /*
         * Em produção: executaria SELECT com LIKE ou FULLTEXT INDEX no MySQL.
         * Aqui: filtra array estático de exemplo.
         */
        $catalogo = [
            ["tipo" => "artigo",  "titulo" => "Letramento racial crítico no ensino básico"],
            ["tipo" => "artigo",  "titulo" => "Racismo estrutural e desenvolvimento econômico"],
            ["tipo" => "noticia", "titulo" => "STF reafirma constitucionalidade das cotas raciais"],
            ["tipo" => "noticia", "titulo" => "Festival Afro celebra 10 anos com recorde de público"],
            ["tipo" => "artigo",  "titulo" => "Religiosidade afro-brasileira e laicidade do Estado"],
            ["tipo" => "artigo",  "titulo" => "Saúde da população negra: racismo como determinante"],
        ];

        /* Filtra por correspondência parcial (case-insensitive) */
        $queryLower = mb_strtolower($query, "UTF-8");
        $resultados = array_filter($catalogo, function($item) use ($queryLower) {
            return str_contains(mb_strtolower($item["titulo"], "UTF-8"), $queryLower);
        });

        responder(true, array_values($resultados), count($resultados) . " resultado(s) encontrado(s).");
        break;


    /* -----------------------------------------------
       PING — verifica se a API está funcionando
    ----------------------------------------------- */
    case "ping":
    default:
        responder(true, ["versao" => "1.0", "status" => "online"], "PRISMA API ativa.");
        break;
}
?>
