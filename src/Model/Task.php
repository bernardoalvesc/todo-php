<?php

namespace Src\Model;

use Src\Core\Database;
use PDO;

class Task
{
    public static function create(array $data, bool $isSubtask = false): void
    {
        $pdo = Database::getConnection();

        if ($isSubtask) {
            $stmt = $pdo->prepare("INSERT INTO subtasks (title, description, priority) VALUES (?, ?, ?)");
            $stmt->execute([
                $data['title'],
                $data['description'],
                $data['priority']
            ]);

            $subtaskId = $pdo->lastInsertId();

            $stmtRel = $pdo->prepare("INSERT INTO task_subtask (task_id, subtask_id) VALUES (?, ?)");
            $stmtRel->execute([$data['parent_id'], $subtaskId]);
        } else {
            $stmt = $pdo->prepare("INSERT INTO tasks (title, description, priority) VALUES (?, ?, ?)");
            $stmt->execute([
                $data['title'],
                $data['description'],
                $data['priority']
            ]);
        }
    }

    public static function all(): array
    {
        $pdo = Database::getConnection();
        $stmt = $pdo->query("SELECT * FROM tasks ORDER BY created_at DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getSubtasks(int $taskId): array
    {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare("SELECT s.* FROM subtasks s
                               INNER JOIN task_subtask ts ON ts.subtask_id = s.id
                               WHERE ts.task_id = ?");
        $stmt->execute([$taskId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function delete(int $id): void
    {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare("DELETE FROM tasks WHERE id = ?");
        $stmt->execute([$id]);
    }

    public static function filterByPriority(array $priorities): array
    {
        $pdo = Database::getConnection();
        $placeholders = implode(',', array_fill(0, count($priorities), '?'));

        $stmt = $pdo->prepare("SELECT * FROM tasks WHERE priority IN ($placeholders) ORDER BY created_at DESC");
        $stmt->execute($priorities);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
