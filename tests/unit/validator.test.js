// tests/unit/validator.test.js
// Модульний тест: перевіряє лише функцію normalizeTitle.
const { normalizeTitle } = require('../../src/validator');

test('normalizeTitle обрізає пробіли і відхиляє порожній текст', () => {
  // Позитивні випадки (TC-03, TC-04 з ЛР3)
  expect(normalizeTitle('Купити молоко')).toBe('Купити молоко');
  expect(normalizeTitle('   Подзвонити мамі   ')).toBe('Подзвонити мамі');
  expect(normalizeTitle("Зустріч о 15:00 – кав'ярня №5")).toBe("Зустріч о 15:00 – кав'ярня №5");

  // Негативні випадки (TC-08, TC-09 з ЛР3)
  expect(normalizeTitle('')).toBeNull();
  expect(normalizeTitle('     ')).toBeNull();
  expect(normalizeTitle(undefined)).toBeNull();
});
