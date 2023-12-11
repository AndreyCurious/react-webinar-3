export default {
  main: () => `/`,
  product: (id) => `/articles/:${id}`,
  fetchLoadPage: (perPage, skip) => `/api/v1/articles?&limit=${perPage}&skip=${skip}&fields=items(_id, price, title),count&lang=ru`,
  fetchProduct: (id) => `api/v1/articles/${id}?fields=category, description, edition, madeIn, price, title,madeIn(title,code),category(title)&lang=ru`,
}