<?php
require 'db.php';
require __DIR__ . '/../vendor/autoload.php';
$tarefas = $pdo->query("SELECT * FROM tarefas ORDER BY criada_em DESC")->fetchAll(PDO::FETCH_ASSOC);

function agruparPorPai(array $tarefas): array {
    $grupo = [];
    foreach ($tarefas as $tarefa) {
        $pai = $tarefa['parent_id'] ?? null;
        $grupo[$pai][] = $tarefa;
    }
    return $grupo;
}

//renderizar tarefas com subtarefas
function renderTarefas(array $grupo, $paiId = null): string {
    if (!isset($grupo[$paiId])) return '';

    $html = '<ul class="space-y-4 ml-4">';
    foreach ($grupo[$paiId] as $t) {
        $prioridade = $t['prioridade'] ?? '';
        $borda = match($prioridade) {
            'alta' => 'border-red-500',
            'media' => 'border-yellow-500',
            'baixa' => 'border-green-500',
            default => 'border-gray-300'
        };

        $html .= '<li class="p-4 rounded-md bg-yellow-50 border-l-4 ' . $borda . '">';
        $html .= '<div>';
        $html .= '<h3 class="font-semibold">' . htmlspecialchars($t['titulo'] ?? '') . '</h3>';
        $html .= '<p class="text-sm text-gray-700">' . htmlspecialchars($t['descricao'] ?? '') . '</p>';
        $html .= '</div>';
        $html .= '<form method="POST" action="delete.php" onsubmit="return confirm(\'Tem certeza que deseja excluir?\');">';
        $html .= '<input type="hidden" name="id" value="' . $t['id'] . '">';
        $html .= '<button type="submit" class="text-red-600 text-sm hover:underline">Excluir</button>';
        $html .= '</form>';
        $html .= renderTarefas($grupo, $t['id']); // Subtarefas
        $html .= '</li>';
    }
    $html .= '</ul>';
    return $html;
}

$grupoTarefas = agruparPorPai($tarefas);
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
            <?php foreach ($tarefas as $pai): ?>
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
      <?= renderTarefas($grupoTarefas) ?>
    </section>

  </div>
</body>
</html>

