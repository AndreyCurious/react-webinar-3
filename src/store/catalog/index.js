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
      currentProduct: {
        title: '',
        _id: null,
        description: '',
        madeIn: {
          title: '',
          code: ''
        },
        category: {
          title: ''
        },
        edititon: 0,
        price: 0,
      },
    }
  }

  getPaginationArray(currentPage, totalCountPages) {
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

  async loadProductInfo(id) {
    const response = await fetch(routes.fetchProduct(id));
    const json = await response.json();
    this.setState({
      ...this.getState(),
      currentProduct: json.result,
    }, 'Загружен товар из АПИ');
  }


  async loadPage(currentPage = 1, perPage = 10) {
    const skip = (currentPage - 1) * 10;
    const response = await fetch(routes.fetchFirstLoad(perPage, skip));
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      currentPage: currentPage,
      totalCountPages: Math.ceil(json.result.count / perPage),
      perPage: perPage,
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
