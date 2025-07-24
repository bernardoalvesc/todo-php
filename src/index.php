<?php
require 'db.php';

// Organiza tarefas por ID e subtarefas
$todas = $pdo->query("SELECT * FROM tarefas ORDER BY criada_em DESC")->fetchAll(PDO::FETCH_ASSOC);
$tarefas = [];
foreach ($todas as $t) {
    if ($t['parent_id']) {
        $tarefas[$t['parent_id']]['subtarefas'][] = $t;
    } else {
        $tarefas[$t['id']] = $t;
    }
}
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

        <div>
          <label for="parent_id" class="block font-semibold mb-1">Subtarefa de:</label>
          <select id="parent_id" name="parent_id"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400">
            <option value="">Nenhuma (Tarefa principal)</option>
            <?php foreach ($todas as $pai): ?>
              <option value="<?= $pai['id'] ?>"><?= htmlspecialchars($pai['titulo']) ?></option>
            <?php endforeach; ?>
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
          <li class="p-4 rounded-md bg-yellow-50 border-l-4 <?= $t['prioridade'] === 'alta' ? 'border-red-500' : ($t['prioridade'] === 'media' ? 'border-yellow-500' : 'border-green-500') ?>">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold"><?= htmlspecialchars($t['titulo']) ?></h3>
                <p class="text-sm text-gray-700"><?= htmlspecialchars($t['descricao']) ?></p>
              </div>
              <form method="POST" action="delete.php" onsubmit="return confirm('Tem certeza que deseja excluir?');">
                <input type="hidden" name="id" value="<?= $t['id'] ?>">
                <button type="submit" class="text-red-600 text-sm hover:underline">Excluir</button>
              </form>
            </div>

            <?php if (!empty($t['subtarefas'])): ?>
              <ul class="mt-3 ml-4 space-y-2">
                <?php foreach ($t['subtarefas'] as $sub): ?>
                  <li class="p-3 rounded bg-white border-l-4 <?= $sub['prioridade'] === 'alta' ? 'border-red-400' : ($sub['prioridade'] === 'media' ? 'border-yellow-400' : 'border-green-400') ?>">
                    <div class="flex justify-between items-start">
                      <div>
                        <h4 class="font-semibold"><?= htmlspecialchars($sub['titulo']) ?></h4>
                        <p class="text-sm text-gray-700"><?= htmlspecialchars($sub['descricao']) ?></p>
                      </div>
                      <form method="POST" action="delete.php" onsubmit="return confirm('Excluir subtarefa?');">
                        <input type="hidden" name="id" value="<?= $sub['id'] ?>">
                        <button type="submit" class="text-red-500 text-sm hover:underline">Excluir</button>
                      </form>
                    </div>
                  </li>
                <?php endforeach; ?>
              </ul>
            <?php endif; ?>
          </li>
        <?php endforeach; ?>
      </ul>
    </section>

  </div>
</body>
</html>
