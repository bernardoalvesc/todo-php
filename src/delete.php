<?php
require 'db.php';

// verificacao da requisicao feita com post no index
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = $_POST['id'] ?? null;
    if ($id) {
        $stmt = $pdo->prepare("DELETE FROM tarefas WHERE id = ?");
        $stmt->execute([$id]);
    }
}
header("Location: index.php");
exit;
