// src/storage.js

const STORAGE_KEY = 'todos-react';

/**
 * Створює сховище списку завдань поверх об'єкта з інтерфейсом localStorage
 * (методи getItem і setItem). Так модуль можна протестувати без браузера.
 * @param {{getItem: Function, setItem: Function}} storage
 */
function createTodoStorage(storage) {
  return {
    load() {
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }
      try {
        const data = JSON.parse(raw);
        return Array.isArray(data) ? data : [];
      } catch (error) {
        return []; // пошкоджені дані не повинні ламати застосунок
      }
    },
    save(todos) {
      storage.setItem(STORAGE_KEY, JSON.stringify(todos));
    },
  };
}

module.exports = { createTodoStorage, STORAGE_KEY };
