// src/validator.js

/**
 * Нормалізує текст нового або відредагованого завдання.
 * Обрізає пробіли на початку і в кінці рядка.
 * @param {string} text - Текст, введений користувачем.
 * @returns {string|null} - Нормалізований текст або null, якщо текст порожній.
 */
function normalizeTitle(text) {
  if (typeof text !== 'string') {
    return null;
  }
  const title = text.trim();
  return title.length > 0 ? title : null;
}

module.exports = { normalizeTitle };
