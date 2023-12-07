export default {
  main: () => '/',
  product: (id) => `:${id ? id : 'id'}`,
  fetchFirstLoad: (perPage) => `/api/v1/articles?&limit=${perPage}&fields=items(*),count&lang=ru`,
  fetchLoadNewPage: (skip) => `/api/v1/articles?&skip=${skip}&lang=ru`,
  fetchProduct: (id) => `api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)&lang=ru`,
}