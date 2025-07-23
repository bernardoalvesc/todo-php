<?php
require 'db.php';

// coleta de dados
$titulo = $_POST['titulo'] ?? '';
$descricao = $_POST['descricao'] ?? '';
$prioridade = $_POST['prioridade'] ?? '';

// se o titulo e a descrição estiverem preenchidos, insere a tarefa

if ($titulo && $descricao) {
  $stmt = $pdo->prepare("INSERT INTO tarefas (titulo, descricao, prioridade) VALUES (?, ?, ?)");
}

header('Location: index.php');
