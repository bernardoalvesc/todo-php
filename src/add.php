<?php
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $titulo = $_POST["titulo"] ?? '';
    $descricao = $_POST["descricao"] ?? '';
    $prioridade = $_POST["prioridade"] ?? '';

    if ($titulo && $descricao && $prioridade) {
        $stmt = $pdo->prepare("INSERT INTO tarefas (titulo, descricao, prioridade) VALUES (?, ?, ?)");
        $stmt->execute([$titulo, $descricao, $prioridade]);
    }

    header("Location: index.php");
    exit;
}
