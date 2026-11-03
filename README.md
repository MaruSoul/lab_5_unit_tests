# Модульні та інтеграційні тести логіки TodoMVC

Лабораторна робота №5 з дисципліни «Забезпечення якості ПП».

Проєкт містить логіку списку завдань у стилі [TodoMVC](https://todomvc.com/examples/react/dist/),
який я тестувала вручну в лабораторних роботах 3–4, і автоматизовані тести до неї на Jest.

## Структура

```
src/
  validator.js     – нормалізація тексту завдання
  todoList.js      – чисті функції: перемикання статусу, фільтри, лічильник
  storage.js       – збереження списку в localStorage (JSON)
  todoService.js   – сервіс, що поєднує три модулі вище
tests/
  unit/            – 3 модульні тести
  integration/     – 2 інтеграційні тести (у т.ч. з mock-об'єктом localStorage)
```

## Запуск

```bash
npm install
npm test
```

Звіт у testomat.io:

```bash
TESTOMATIO=<ключ проєкту> npx jest
```
