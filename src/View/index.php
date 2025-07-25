<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>To do List</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  <style> body { font-family: 'Poppins', sans-serif; } </style>
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen">
  <div class="bg-white shadow-md rounded-lg max-w-2xl w-full p-8">
    <header class="text-center mb-8">
      <h1 class="text-3xl font-semibold text-yellow-400">Painel de Controle de Tarefas</h1>
      <p class="text-gray-600 text-lg mt-2">Gerencie suas tarefas de forma simples e eficiente.</p>
    </header>

    <?php include __DIR__ . '/add.php'; ?>

    <section>
      <h2 class="text-xl font-semibold text-yellow-400 mb-4">Lista de tarefas</h2>
      <ul class="space-y-4">
        <?php foreach ($tasks as $task): ?>
        <li class="flex justify-between items-start p-4 rounded-md bg-yellow-50 border-l-4
          <?= $task['priority'] === 'high' ? 'border-red-500' : ($task['priority'] === 'medium' ? 'border-yellow-500' : 'border-green-500') ?>">
          <div>
            <h3 class="font-semibold"><?= htmlspecialchars($task['title']) ?></h3>
            <p class="text-sm text-gray-700"><?= htmlspecialchars($task['description']) ?></p>

            <?php
              $subtasks = \Src\Model\Task::getSubtasks($task['id']);
              if ($subtasks):
            ?>
              <ul class="mt-2 ml-4 list-disc text-sm text-gray-600">
                <?php foreach ($subtasks as $sub): ?>
                  <li>
                    <strong><?= htmlspecialchars($sub['title']) ?>:</strong>
                    <?= htmlspecialchars($sub['description']) ?>
                  </li>
                <?php endforeach; ?>
              </ul>
            <?php endif; ?>
          </div>
          <form method="POST" action="/delete" onsubmit="return confirm('Delete this task?');">
            <input type="hidden" name="id" value="<?= $task['id'] ?>">
            <button type="submit" class="text-red-600 text-sm hover:underline">Excluir</button>
          </form>
        </li>
        <?php endforeach; ?>
      </ul>
    </section>
  </div>
</body>
</html>
