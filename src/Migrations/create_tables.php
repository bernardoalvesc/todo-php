<?php
require_once __DIR__ . '/../Core/Database.php';

$pdo = Database::getConnection();

$pdo->exec("
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    priority TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

$pdo->exec("
CREATE TABLE IF NOT EXISTS subtasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    priority TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

$pdo->exec("
CREATE TABLE IF NOT EXISTS task_subtask (
    task_id INTEGER,
    subtask_id INTEGER,
    PRIMARY KEY (task_id, subtask_id),
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (subtask_id) REFERENCES subtasks(id) ON DELETE CASCADE
)");

echo "Tabelas criadas com sucesso!\n";
