// tests/integration/editing.test.js
// Інтеграційний тест: TodoService разом із модулями validator і todoList.
// Сховище тут лише заглушка, бо перевіряється взаємодія логіки редагування.
const TodoService = require('../../src/todoService');

function createService() {
  const fakeStorage = { load: () => [], save: () => {} };
  return new TodoService(fakeStorage);
}

test('Редагування: Esc скасовує зміни, Enter зберігає, порожній текст видаляє завдання', () => {
  const service = createService();
  const milk = service.add('Купити молоко');
  const bread = service.add('Купити хліб');

  // Esc (TC-07 з ЛР3): текст має лишитися попереднім
  service.startEdit(milk.id);
  service.changeDraft('Щось інше');
  service.cancelEdit();
  expect(service.editing).toBeNull();
  expect(service.visible()[0].title).toBe('Купити молоко');

  // Enter (TC-05): нормалізований текст зберігається
  service.startEdit(milk.id);
  service.changeDraft('  Купити сир  ');
  service.commitEdit();
  expect(service.visible()[0].title).toBe('Купити сир');

  // Порожній текст під час редагування (TC-10): завдання видаляється
  service.startEdit(bread.id);
  service.changeDraft('   ');
  service.commitEdit();
  expect(service.visible().map((t) => t.title)).toEqual(['Купити сир']);
  expect(service.itemsLeft()).toBe(1);
});
