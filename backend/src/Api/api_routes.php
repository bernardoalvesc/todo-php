<?php

use Src\Model\Task;

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// === GET /api/tasks
if ($uri === '/api/tasks' && $method === 'GET') {
    $priorities = $_GET['priority'] ?? [];
    if (!empty($priorities)) {
        echo json_encode(Task::filterByPriority($priorities));
    } else {
        echo json_encode(Task::all());
    }

// === POST /api/tasks
} elseif ($uri === '/api/tasks' && $method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $isSubtask = !empty($data['parent_id']);
    Task::create($data, $isSubtask);
    http_response_code(201);
    echo json_encode(['message' => 'Task created']);

// === DELETE /api/tasks/{id}
} elseif (preg_match('#^/api/tasks/(\d+)$#', $uri, $matches) && $method === 'DELETE') {
    $id = $matches[1];
    Task::delete($id);
    echo json_encode(['message' => 'Task deleted']);

// === GET /api/subtasks
} elseif ($uri === '/api/subtasks' && $method === 'GET') {
    echo json_encode(Task::allSubtasks());

// === OPTIONS (preflight)
} elseif ($method === 'OPTIONS') {
    http_response_code(200);

// === 404 Not Found
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Not found']);
}
