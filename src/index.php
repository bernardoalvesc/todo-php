<?php
require 'db.php';
$tarefas = $pdo->query("SELECT * FROM tarefas ORDER BY criada_em DESC")->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Painel de Controle de Tarefas</title>

  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Poppins', sans-serif; }
  </style>
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen">
  <div class="bg-white shadow-md rounded-lg max-w-2xl w-full p-8">

    <header class="text-center mb-8">
      <h1 class="text-3xl font-semibold text-yellow-400">Painel de Controle de Tarefas</h1>
      <p class="text-gray-600 text-lg mt-2">Gerencie suas tarefas de forma simples e eficiente.</p>
    </header>

    <section class="mb-8">
      <h2 class="text-xl font-semibold text-yellow-400 mb-4">Adicionar Nova Tarefa</h2>
      <form action="add.php" method="POST" class="space-y-4">
        <div>
          <label for="titulo" class="block font-semibold mb-1">Título da Tarefa:</label>
          <input type="text" id="titulo" name="titulo" required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        </div>

        <div>
          <label for="descricao" class="block font-semibold mb-1">Descrição:</label>
          <textarea id="descricao" name="descricao" rows="3" required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"></textarea>
        </div>

        <div>
          <label for="prioridade" class="block font-semibold mb-1">Prioridade:</label>
          <select id="prioridade" name="prioridade" required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400">
            <option value="alta">Alta</option>
            <option value="media">Média</option>
            <option value="baixa">Baixa</option>
          </select>
        </div>

        <button type="submit"
          class="bg-yellow-400 text-white font-semibold py-2 px-4 rounded-md w-full hover:bg-yellow-500 transition">
          Adicionar Tarefa
        </button>
      </form>
    </section>

    <section>
      <h2 class="text-xl font-semibold text-yellow-400 mb-4">Lista de Tarefas</h2>
      <ul class="space-y-4">
        <?php foreach ($tarefas as $t): ?>
        <li class="flex justify-between items-start p-4 rounded-md bg-yellow-50 border-l-4
            <?= $t['prioridade'] === 'alta' ? 'border-red-500' : ($t['prioridade'] === 'media' ? 'border-yellow-500' : 'border-green-500') ?>">
          <div>
            <h3 class="font-semibold"><?= htmlspecialchars($t['titulo']) ?></h3>
            <p class="text-sm text-gray-700"><?= htmlspecialchars($t['descricao']) ?></p>
          </div>
          <a href="delete.php?id=<?= $t['id'] ?>" class="text-red-600 text-sm hover:underline">Excluir</a>
        </li>
        <?php endforeach; ?>
      </ul>
    </section>

  </div>
</body>
</html>
