import axios from 'axios'
const state = {
    products: [],
    listProductSearch: [],
    product: null,
    is_products_load: true,
};

const getters = {
    getProducts: (state) => (state.products),
    getProductSearched: (state) => (state.listProductSearch),
    getProduct: (state) => (state.product),
    get_is_products_load: (state) => (state.is_products_load),
}

const actions = {
    getProductsFromAPI() {
        return axios.get(`/product.json`)  
    },

    setProduct({ commit }, product) {
        commit('setProduct', product)
    },

    setProductById({ commit }, id) {
        let product = state.products.find(item => item.id.toString() === id)
        commit('setProduct', product)
    },

    setSpecificProduct({ commit }, product) {
        commit('setSpecificProduct', product)
    },

    addProduct({ commit }, product) {
        commit('addProduct', product)
    },

    updateProduct({ commit }, product) {
        commit('updateProduct', product)
    },

    searchProduct({ commit }, value_search) {
        commit('searchProduct', value_search)
    }
}

const mutations = {
    setProducts: (state, products) => {
        state.products = products
        state.is_products_load=false
    },

    setProduct: (state, product) => {
        state.product = product
    },

    addProduct: (state, product) => {
        state.products.unshift(product)
    },

    updateProduct: (state, product) => {
        let index = state.products.findIndex(item => item.id === product.id);
        state.products.splice(index, 1)
        state.products.splice(index, 0, product)
    },

    searchProduct: (state, value_search) => {
        let listProductSearch = state.products.filter(product => product.tensanpham.toLowerCase().includes(value_search.toLowerCase()));
        state.listProductSearch = listProductSearch;
    }
}

export default { namespaced: true, state, getters, actions, mutations }