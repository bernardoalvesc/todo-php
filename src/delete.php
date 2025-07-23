<?php
require 'db.php';

// obter o id da tarefa
$id = $_GET['id'] ?? null;

if ($id) {
  $stmt = $pdo->prepare("DELETE FROM tarefas WHERE id = ?");
  $stmt->execute([$ID]);
}

header('Location: index.php');
