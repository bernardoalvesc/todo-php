<?php

use Src\Model\Task;

header('Content-Type: application/json');
header('Acess-Control-Allow-Origin: *');
header('Acess-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Acess-Control-Allow-Headers: Content-Type');

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// remover o prefixo /api/tasks
$cleanUri = str_replace('/api/tasks','', $uri);

// === get /api/tasks
if ($cleanUri === '' && $method === 'GET') {
  $priorities = $_GET['priority'] ?? [];
  if (!empty($priorities)) {
    echo json_encode(Task::filterByPriority($priorities));
  } else {
    echo json_encode(Task::all());
  }

// === post /api/tasks
} elseif ($cleanUri === '' && $method === 'POST') {
  $data = json_decode(file_get_contents("php://input"),true);
  $isSubtask = !empty($data['parent_id']);
  Task::create($data, $isSubtask);
  http_response_code(201);
  echo json_encode(['message' => 'Task created']);

// === delete /api/tasks/{id}
} elseif (preg_match('#^/(\d+)$#', $cleanUri, $matches) && $method === 'DELETE') {
  $id = $matches[1];
  Task::delete($id);
  echo json_encode(['message' => 'Task deleted']);

// === options(pré-flight)
} elseif ($method === 'OPTIONS') {
  http_response_code(200);

// === 404
} else {
  http_response_code(404);
  echo json_encode(['error' => 'Not found']);
}
