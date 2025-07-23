<?php
$dbPath = __DIR__ . '/database.sqlite';

try {
  $pdo = new PDO("sqlite:" . $dbPath);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // criação da tabela "tarefas"
  $pdo->exec("
  CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT NOT NULL,
      prioridade TEXT DEFAULT 'media',
      criada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
");
} catch (PDOException $e) {
  // se der erro, exibir a mensagem:
  die("Erro ao conectar ao SQLite: " . $e->getMessage());
}
