/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.code = Math.max.apply(null, initState.list.map(item => item.code))
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    // const getRandomId = () => {
    //   const num = Math.floor(Math.random() * 100) // сейчас доступно 100 уникальных id, можно менять на любое количество
    //   const listItem = this.state.list.find(item => {
    //     return item.code === num;
    //   });
    //   if (!listItem) {
    //     return num;
    //   }
    //   return getRandomId();
    // }


    // не знаю, можно использовать идентификатор после удаления или нет, реализовал оба варианта.
    const getId = () => {
      return this.code += 1;
    }
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: getId(), title: 'Новая запись' }]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          !item.count ? item.count = 0 : null;
          item.selected ? item.count += 1 : null;
        } else {
          item.selected = false;
        }
        return item;
      })
    })
  }
}

export default Store;
