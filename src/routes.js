export default {
  main: () => '/',
  product: (id) => `:${id ? id : 'id'}`,
  fetchFirstLoad: (perPage, skip) => `/api/v1/articles?&limit=${perPage}&skip=${skip}&fields=items(_id, price, title),count&lang=ru`,
  fetchLoadNewPage: (skip) => `/api/v1/articles?&skip=${skip}&fields=items(_id, price, title)&lang=ru`,
  fetchProduct: (id) => `api/v1/articles/${id}?fields=category, description, edition, madeIn, price, title,madeIn(title,code),category(title)&lang=ru`,
}