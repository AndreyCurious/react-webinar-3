import StoreModule from "../module";

class Categories extends StoreModule {

  initState() {
    return {
      categoriesList: []
    }
  }

  async fetchCategories() {
    const categories = await fetch('api/v1/categories?fields=_id,title,parent(_id)&limit=*')
    const jsonCategories = await categories.json();

    this.setState({
      ...this.getState(),
      categoriesList: [{ title: "Все", _id: 'null' }, ...jsonCategories.result.items],
    })
  }


}

export default Categories;