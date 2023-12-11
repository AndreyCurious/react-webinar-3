import { codeGenerator } from "../../utils";
import StoreModule from "../module";
import routes from "../../routes";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      perPage: null,
      totalCountPages: null,
      isLoading: false,
    }
  }

  setPerPage(perPage) {
    this.setState({
      ...this.getState(),
      perPage: perPage
    })
  }

  async loadPage(currentPage) {
    this.setState({
      ...this.getState(),
      isLoading: true
    }, 'Загрузка');
    currentPage === 0 ? currentPage = 1 : null;
    const perPage = this.getState().perPage;
    const skip = (currentPage - 1) * perPage;
    const response = await fetch(routes.fetchLoadPage(perPage, skip));
    const json = await response.json();
    setTimeout(() => {
      this.setState({
        ...this.getState(),
        list: json.result.items,
        currentPage: currentPage,
        totalCountPages: Math.ceil(json.result.count / perPage),
        perPage: perPage,
        isLoading: false
      }, 'Загружены товары из АПИ');
    }, 500)

  }
}

export default Catalog;
