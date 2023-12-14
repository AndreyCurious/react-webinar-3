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


export function getCatigoriesChildrens(categories) {
  const result = [{ title: "Все", _id: 'null' }];
  const getChild = (parentId, res, count = 1) => {
    let newParentId = '';
    categories.forEach((item) => {
      if (parentId === item.parent?._id && !res.find((item1) => item._id === item1._id)) {
        newParentId = item._id
        res.push({ ...item, title: `${'- '.repeat(count)}${item.title}` })
        getChild(newParentId, res, count + 1)
      }
    })
  }

  categories.slice(1).forEach((category) => {
    let parentId = category.parent?._id;
    if (category.parent === null) {
      result.push(category);
    } else {
      getChild(parentId, result);
    }

  });
  return result
}
/*
let count = 0
    const hasParent = (item) => {
      if (item.parent === null) {
        return count;
      } else {
        count += 1;
        hasParent(categories.find((category) => item.parent._id === category._id))
      }
      return count
    }

    hasParent(item)
    return item.title = `${'-'.repeat(count)}${item.title}`



    const path = [];
    const getChildren = (item) => {
      if (item.parent === null) {
        path.unshift(item)
      } else {
        path.unshift(item)
        getChildren(categories.find((category) => item.parent._id === category._id))
      }
    }
    getChildren(item)
    let path2 = result;
    path.forEach((item, index) => {
      path2[item.title] = { item: { ...item, title: `${'-'.repeat(index)}${item.title}` }, children: {} }
      path2 = path2[item.title].children

    })
*/