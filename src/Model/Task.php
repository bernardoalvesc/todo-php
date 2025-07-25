<?php

namespace Src\Model;

use Src\Core\Database;
use PDO;

class Task
{
    public static function all()
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->query("SELECT * FROM tarefas ORDER BY criada_em DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function create(array $data)
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare("INSERT INTO tarefas (titulo, descricao, prioridade, parent_id) VALUES (?, ?, ?, ?)");
        return $stmt->execute([
            $data['title'],
            $data['description'],
            $data['priority'],
            $data['parent_id']
        ]);
    }

    public static function delete($id)
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare("DELETE FROM tarefas WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
