# Модульні та інтеграційні тести логіки TodoMVC

[![Lab CI](https://github.com/MaruSoul/lab_5_unit_tests/actions/workflows/ci.yml/badge.svg)](https://github.com/MaruSoul/lab_5_unit_tests/actions/workflows/ci.yml)

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

## Continuous Integration

При кожному push і pull request у гілку `main` GitHub Actions автоматично
встановлює залежності і запускає всі тести (`.github/workflows/ci.yml`).

## Запуск

```bash
npm install
npm test
```

Звіт у testomat.io:

```bash
TESTOMATIO=<ключ проєкту> npx jest
```
