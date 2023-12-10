import routes from "../../routes";
import StoreModule from "../module";

class Product extends StoreModule {

  initState() {
    return {
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
      isLoading: false,
    }
  }


  async loadProductInfo(id) {
    this.setState({
      ...this.getState(),
      isLoading: true,
    }, 'Загрузка');
    const response = await fetch(routes.fetchProduct(id));
    const json = await response.json();
    setTimeout(() => {
      this.setState({
        ...this.getState(),
        currentProduct: json.result,
        isLoading: false,
      }, 'Загружен товар из АПИ');
    }, 500)
  }
}

export default Product;
