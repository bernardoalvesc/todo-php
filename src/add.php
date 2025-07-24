<?php
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $titulo = $_POST['titulo'];
  $descricao = $_POST['descricao'];
  $prioridade = $_POST['prioridade'];
  $parent_id = $_POST['parent_id'] !== '' ? $_POST['parent_id'] : null;

  $stmt = $pdo->prepare("INSERT INTO tarefas (titulo, descricao, prioridade, parent_id) VALUES (?, ?, ?, ?)");
  $stmt->execute([$titulo, $descricao, $prioridade, $parent_id]);

  header("Location: index.php");
  exit;
}
