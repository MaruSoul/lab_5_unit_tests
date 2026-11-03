// src/todoService.js
// Сервіс поєднує три модулі: validator, todoList і storage.

const { normalizeTitle } = require('./validator');
const list = require('./todoList');

class TodoService {
  /**
   * @param {{load: Function, save: Function}} todoStorage - Сховище завдань.
   */
  constructor(todoStorage) {
    this.storage = todoStorage;
    this.todos = todoStorage.load();
    this.nextId = this.todos.reduce((max, todo) => Math.max(max, todo.id), 0) + 1;
    this.editing = null;
  }

  /** Додає завдання. Повертає створене завдання або null, якщо текст порожній. */
  add(text) {
    const title = normalizeTitle(text);
    if (!title) {
      return null;
    }
    const todo = list.createTodo(this.nextId++, title);
    this.todos = [...this.todos, todo];
    this.storage.save(this.todos);
    return todo;
  }

  toggle(id) {
    this.todos = list.toggleTodo(this.todos, id);
    this.storage.save(this.todos);
  }

  remove(id) {
    this.todos = list.removeTodo(this.todos, id);
    this.storage.save(this.todos);
  }

  /** Подвійний клік: відкриває завдання для редагування. */
  startEdit(id) {
    const todo = this.todos.find((item) => item.id === id);
    this.editing = { id, draft: todo.title };
  }

  /** Введення тексту в поле редагування. */
  changeDraft(text) {
    this.editing.draft = text;
  }

  /** Enter або втрата фокусу: зберігає зміни. Порожній текст видаляє завдання. */
  commitEdit() {
    const { id, draft } = this.editing;
    const title = normalizeTitle(draft);
    this.todos = title
      ? list.updateTitle(this.todos, id, title)
      : list.removeTodo(this.todos, id);
    this.editing = null;
    this.storage.save(this.todos);
  }

  /** Esc: закриває редагування без збереження змін. */
  cancelEdit() {
    this.editing = null;
  }

  visible(filter = 'all') {
    return list.filterTodos(this.todos, filter);
  }

  itemsLeft() {
    return list.countActive(this.todos);
  }
}

module.exports = TodoService;
