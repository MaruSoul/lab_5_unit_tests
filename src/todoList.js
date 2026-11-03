// src/todoList.js
// Чисті функції для роботи зі списком завдань.
// Жодна функція не змінює вхідний масив, а повертає новий.

const FILTERS = ['all', 'active', 'completed'];

/** Створює нове активне завдання. */
function createTodo(id, title) {
  return { id, title, completed: false };
}

/** Перемикає статус завдання з указаним id (виконане / активне). */
function toggleTodo(todos, id) {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
}

/** Змінює текст завдання з указаним id. */
function updateTitle(todos, id, title) {
  return todos.map((todo) => (todo.id === id ? { ...todo, title } : todo));
}

/** Видаляє завдання з указаним id. */
function removeTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id);
}

/**
 * Повертає завдання для фільтра All / Active / Completed.
 * @param {Array} todos - Список завдань.
 * @param {'all'|'active'|'completed'} filter - Назва фільтра.
 */
function filterTodos(todos, filter) {
  if (!FILTERS.includes(filter)) {
    throw new Error(`Невідомий фільтр: ${filter}`);
  }
  if (filter === 'active') return todos.filter((todo) => !todo.completed);
  if (filter === 'completed') return todos.filter((todo) => todo.completed);
  return [...todos];
}

/** Кількість активних (невиконаних) завдань – значення лічильника «items left». */
function countActive(todos) {
  return todos.filter((todo) => !todo.completed).length;
}

module.exports = {
  createTodo,
  toggleTodo,
  updateTitle,
  removeTodo,
  filterTodos,
  countActive,
};
