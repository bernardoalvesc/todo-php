## 📅 Histórico de Versões

### ✅ 2025-07-23 - v0.1

- Primeira estrutura funcional criada (PHP, SQLite e Tailwind).
- Implementação da listagem e adição de tarefas.
- Banco criado dinamicamente via `PDO`.
- Configuração de Docker corrigida para suportar `sqlite3` CLI.
- Correção no link da CDN do Tailwind.
- Resolução do bug de conexão com PDO (`could not find driver`).
- Tarefas começaram a ser salvas corretamente no banco SQLite.
- Inserção de tarefas confirmada via terminal.

---

### ✅ 2025-07-24 - v0.2

- Adição da função delete.
- Estrutura de subtarefas aninhadas: agora é possível selecionar uma tarefa pai ao criar uma nova tarefa.
- Interface atualizada para exibir listas aninhadas com TailwindCSS, representando a hierarquia entre tarefas e subtarefas.

---

### ✅ 2025-07-25/26 - v0.3

- Deixar a adição de itens de forma recursiva.
- Correção do banco de dados.
- Adição de um filtro de prioridade.
- Padronizar as variáveis e funções para o inglês.
- Transformação para o padrão MVC + POO.
 
---

### ✅ 2025-07-29 - v0.4
- Refatoração completa do front-end com Preact e TypeScript.
- Tarefas agora são exibidas corretamente usando API externa.
- Correção no TaskCard e no sistema de filtro.
- Implementação da função de exclusão de tarefas pela interface.
- Exibição das subtarefas aninhadas dentro de cada tarefa.
- Correção do bug 404 nas rotas de subtarefas.
- Ajuste no path de require no index.php para garantir carregamento da API corretamente no ambiente Docker.
- Confirmação de funcionamento da hierarquia entre tarefas e subtarefas via API.
- Nova UI.
