<?php

use Src\Controller\TaskController;

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

$controller = new TaskController();

if ($uri === '/' && $method === 'GET') {
    $priority = $_GET['priority'] ?? null;
    $controller->index($priority);
} elseif ($uri === '/store' && $method === 'POST') {
    $controller->store();
} elseif ($uri === '/delete' && $method === 'POST') {
    $controller->destroy();
} else {
    http_response_code(404);
    echo "404 Not Found";
}
