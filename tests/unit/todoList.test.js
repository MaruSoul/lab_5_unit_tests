// tests/unit/todoList.test.js
// Модульні тести: перевіряють окремі функції модуля todoList.
const { toggleTodo, countActive, filterTodos } = require('../../src/todoList');

// Стан зі списку TC-14 з ЛР3: A, B (виконане), C
const todos = [
  { id: 1, title: 'A', completed: false },
  { id: 2, title: 'B', completed: true },
  { id: 3, title: 'C', completed: false },
];

test('filterTodos повертає завдання для фільтрів All / Active / Completed', () => {
  expect(filterTodos(todos, 'all').map((t) => t.title)).toEqual(['A', 'B', 'C']);
  expect(filterTodos(todos, 'active').map((t) => t.title)).toEqual(['A', 'C']);
  expect(filterTodos(todos, 'completed').map((t) => t.title)).toEqual(['B']);

  // Негативний випадок: невідомий фільтр
  expect(() => filterTodos(todos, 'archived')).toThrow('Невідомий фільтр');
});

test('toggleTodo змінює статус, а countActive – лічильник «items left»', () => {
  expect(countActive(todos)).toBe(2);

  const afterToggle = toggleTodo(todos, 1); // позначили A виконаним
  expect(afterToggle[0].completed).toBe(true);
  expect(countActive(afterToggle)).toBe(1);

  const afterSecondToggle = toggleTodo(afterToggle, 1); // зняли позначку
  expect(countActive(afterSecondToggle)).toBe(2);

  // Вихідний масив не змінився (функція чиста)
  expect(todos[0].completed).toBe(false);
});
