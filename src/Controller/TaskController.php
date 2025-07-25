<?php

namespace Src\Controller;
use Src\Model\Task;
class TaskController
{
    public function index() // chama o model para buscar as tarefas
    {
        $tasks = Task::all();
        require_once __DIR__ . '/../View/index.php';
    }
    public function store() // trata o POST do formulário e salva a nova tarefa no banco
    {
      if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = [
          'title' => $_POST['title'] ?? '',
          'description' => $_POST['description'] ?? '',
          'priority' => $_POST['priority'] ?? '',
          'parent_id' => $_POST['parent_id'] ?? null,
        ];
        Task::create($data);
        header('Location: /');
        exit;
      }
    }
    public function destroy() // trata requisições DELETE e remove a tarefa
    {
      if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        parse_str(file_get_contents("php://input"), $data);
        $id = $data['id'] ?? null;

        if ($id) {
          Task::delete($id);
        }
        header('Location: /');
        exit;
      }
    }
}
