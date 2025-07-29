<?php

namespace Src\Controller;

use Src\Model\Task;

class TaskController
{
    public function index($priorities = null)
    {
        header('Content-Type: application/json');

        if (!empty($priorities)) {
            $tasks = Task::filterByPriority($priorities);
        } else {
            $tasks = Task::all();
        }

        echo json_encode($tasks);
    }

    public function store()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);

            $data = [
                'title' => $input['title'] ?? '',
                'description' => $input['description'] ?? '',
                'priority' => $input['priority'] ?? '',
                'parent_id' => $input['parent_id'] ?? null,
            ];

            $isSubtask = !empty($data['parent_id']);
            $created = Task::create($data, $isSubtask);

            header('Content-Type: application/json');
            echo json_encode(['success' => true, 'task' => $created]);
        }
    }

    public function destroy()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            $input = json_decode(file_get_contents('php://input'), true);
            $id = $input['id'] ?? null;

            if ($id) {
                Task::delete($id);
                http_response_code(204); // No content
                return;
            }

            http_response_code(400); // Bad request
            echo json_encode(['error' => 'Missing task ID']);
        }
    }
}
