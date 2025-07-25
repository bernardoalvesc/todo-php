<section class="mb-8">
  <h2 class="text-xl font-semibold text-yellow-400 mb-4">Adicionar nova tarefa</h2>
  <form action="/store" method="POST" class="space-y-4">
    <div>
      <label for="title" class="block font-semibold mb-1">Título:</label>
      <input type="text" id="title" name="title" required
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" />
    </div>

    <div>
      <label for="description" class="block font-semibold mb-1">Descrição:</label>
      <textarea id="description" name="description" rows="3" required
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"></textarea>
    </div>

    <div>
      <label for="priority" class="block font-semibold mb-1">Prioridade:</label>
      <select id="priority" name="priority" required
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400">
        <option value="high">Alta</option>
        <option value="medium">Média</option>
        <option value="low">Baixa</option>
      </select>
    </div>

    <div>
      <label for="parent_id" class="block font-semibold mb-1">Subtarefa de:</label>
      <select id="parent_id" name="parent_id"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400">
        <option value="">None (Main Task)</option>
        <?php foreach ($allTasks as $t): ?>
          <option value="<?= $t['id'] ?>"><?= htmlspecialchars($t['title']) ?></option>
        <?php endforeach; ?>
      </select>
    </div>

    <button type="submit"
      class="bg-yellow-400 text-white font-semibold py-2 px-4 rounded-md w-full hover:bg-yellow-500 transition">
      Add Task
    </button>
  </form>
</section>
