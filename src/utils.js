/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}


export function getPaginationArray(currentPage, totalCountPages) {
  // не очень изящно, не придумал ничего лучше
  if ([1, 2].indexOf(currentPage) !== -1) {
    return [1, 2, 3, null, totalCountPages]
  }
  if (currentPage === 3) {
    return [1, 2, 3, 4, null, totalCountPages]
  }
  if ([totalCountPages, totalCountPages - 1].indexOf(currentPage) !== -1) {
    return [1, null, totalCountPages - 2, totalCountPages - 1, totalCountPages]
  }
  if (currentPage === totalCountPages - 2) {
    return [1, null, totalCountPages - 3, totalCountPages - 2, totalCountPages - 1, totalCountPages]
  }
  return [1, null, currentPage - 1, currentPage, currentPage + 1, null, totalCountPages]
}
