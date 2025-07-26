<?php

namespace Src\Controller;

use Src\Model\Task;

class TaskController
{
    public function index($priority = null)
    {
        if ($priority) {
            $tasks = Task::filterByPriority($priority);
        } else {
            $tasks = Task::all();
        }

        require_once __DIR__ . '/../View/index.php';
    }

    public function store()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = [
                'title' => $_POST['title'] ?? '',
                'description' => $_POST['description'] ?? '',
                'priority' => $_POST['priority'] ?? '',
                'parent_id' => $_POST['parent_id'] ?? null,
            ];

            $isSubtask = !empty($data['parent_id']);
            Task::create($data, $isSubtask);

            header('Location: /');
            exit;
        }
    }

    public function destroy()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = $_POST['id'] ?? null;

            if ($id) {
                Task::delete($id);
            }

            header('Location: /');
            exit;
        }
    }
}
