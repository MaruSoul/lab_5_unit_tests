// tests/integration/persistence.test.js
// Інтеграційний тест: TodoService + storage + замоканий localStorage.
const TodoService = require('../../src/todoService');
const { createTodoStorage, STORAGE_KEY } = require('../../src/storage');

describe('Збереження списку завдань', () => {
  let localStorageMock;

  beforeEach(() => {
    // Mock-об'єкт замість справжнього localStorage браузера
    const data = {};
    localStorageMock = {
      getItem: jest.fn((key) => (key in data ? data[key] : null)),
      setItem: jest.fn((key, value) => {
        data[key] = value;
      }),
    };
  });

  test('Завдання і їхні статуси відновлюються після «перезавантаження сторінки»', () => {
    // Перше відкриття сторінки
    const firstSession = new TodoService(createTodoStorage(localStorageMock));
    firstSession.add('A');
    const b = firstSession.add('B');
    firstSession.add('C');
    firstSession.toggle(b.id);

    // Кожна зміна записується в localStorage під правильним ключем у форматі JSON
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(4);
    const [key, value] = localStorageMock.setItem.mock.calls[3];
    expect(key).toBe(STORAGE_KEY);
    expect(JSON.parse(value)).toHaveLength(3);

    // «F5»: новий екземпляр сервісу читає те саме сховище (TC-21 з ЛР3)
    const secondSession = new TodoService(createTodoStorage(localStorageMock));
    expect(localStorageMock.getItem).toHaveBeenCalledWith(STORAGE_KEY);
    expect(secondSession.visible().map((t) => t.title)).toEqual(['A', 'B', 'C']);
    expect(secondSession.visible('completed').map((t) => t.title)).toEqual(['B']);
    expect(secondSession.itemsLeft()).toBe(2);

    // Нове завдання після перезавантаження отримує унікальний id
    const d = secondSession.add('D');
    expect(d.id).toBe(4);
  });
});
