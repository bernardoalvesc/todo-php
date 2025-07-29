<?php

use Src\Model\Task;

// === Configurações de segurança ===
header('Content-Type: application/json');

$allowedOrigins = ['http://localhost:5873']; // define quais domínios podem acessar a API
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// função auxiliar para sanitizar entradas
function sanitizeInput($data) {
    if (is_array($data)) {
        return array_map('sanitizeInput', $data);
    }
    return htmlspecialchars(strip_tags(trim($data)));
}

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH); // extrai apenas o caminho da URI da requisição (sem query strings)
$method = $_SERVER['REQUEST_METHOD']; // captura o método HTTP da requisição (GET, POST, etc.)
$cleanUri = str_replace('/index.php', '', $uri); // remove "/index.php" da URI, caso esteja presente (para rotas amigáveis)
file_put_contents(__DIR__ . '/log_uri.txt', json_encode([ // cria um arquivo log_uri.txt com as informações da URI e método, para debug
    'REQUEST_URI' => $_SERVER['REQUEST_URI'],
    'cleanUri' => $cleanUri,
    'method' => $method
], JSON_PRETTY_PRINT));

// === GET /api/tasks
if ($cleanUri === '/api/tasks' && $method === 'GET') { // se houver filtros de prioridade na query string (?priority=high
    $priorities = $_GET['priority'] ?? [];
    if (!empty($priorities)) {     // Se houver prioridades, filtra as tasks por elas
        $priorities = sanitizeInput($priorities);
        echo json_encode(Task::filterByPriority($priorities));
    } else {  // caso contrário, retorna todas as tasks
        echo json_encode(Task::all());
    }

// === POST /api/tasks
} elseif ($cleanUri === '/api/tasks' && $method === 'POST') {   // lê o corpo da requisição (JSON) e transforma em array associativo
    $data = json_decode(file_get_contents("php://input"), true);
    $data = sanitizeInput($data);   // sanitiza os dados de entrada
    $isSubtask = !empty($data['parent_id']);     // verifica se é uma subtarefa (tem parent_id) - era o que deu erro ontem

    Task::create($data, $isSubtask);     // cria a task (ou subtarefa)

    http_response_code(201);     // define o código HTTP 201 (Created)
    echo json_encode(['message' => 'Task created']);    // Retorna mensagem de sucesso

// === DELETE /api/tasks/{id}
} elseif (preg_match('#^/api/tasks/(\d+)$#', $cleanUri, $matches) && $method === 'DELETE') {

    $id = (int) $matches[1];    // extrai o ID da task da URI
    Task::delete($id);     // deleta a task com o ID extraído

    echo json_encode(['message' => 'Task deleted']);     // Retorna mensagem de confirmação

// === GET /api/subtasks
} elseif (rtrim($cleanUri, '/') === '/api/subtasks' && $method === 'GET') {

    echo json_encode(Task::allSubtasks());     // retorna todas as subtarefas

// === OPTIONS (preflight)
} elseif ($method === 'OPTIONS') {
    http_response_code(200);

// === 404 Not Found
} else {
    // se nenhuma rota for compatível, retorna erro 404
    http_response_code(404);
    echo json_encode(['error' => 'Not found']);
}
