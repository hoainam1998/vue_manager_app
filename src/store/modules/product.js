import axios from 'axios'
const state = {
    products: [],
    specificProduct: {},
    listProductSearch: []
};

const getters = {
    getProducts: (state) => (state.products),
    getSpecificProduct: (state) => (state.specificProduct),
    getProductSearched: (state) => (state.listProductSearch)
}

const actions = {
    async setProducts({ commit }) {
        try {
            let res = await axios.get('./product.json')
            commit('setProducts', res.data)
        } catch (err) { console.log(err.message) }
    },

    setSpecificProduct({ commit }, product) {
        commit('setSpecificProduct', product)
    },

    createProducts({ commit }, product) {
        commit('createProducts', product)
    },

    updateProducts({ commit }, product) {
        commit('updateProducts', product)
    },

    searchProduct({ commit }, value_search) {
        commit('searchProduct', value_search)
    }
}

const mutations = {
    setProducts: (state, products) => (state.products = products),

    setSpecificProduct: (state, product) => (state.specificProduct = product),

    createProducts: (state, product) => (state.products.unshift(product)),

    updateProducts: (state, product) => (
        state.products = state.products.map(p => p.id === product.id ?
            {
                id: p.id,
                tensanpham: p.tensanpham,
                ngaytao: p.ngaytao,
                ngaycapnhapganday: product.ngaycapnhapganday,
                gia: product.gia,
                trangthai: product.trangthai
            } : p)),


    searchProduct: (state, value_search) => {
        let listProductSearch = state.products.filter(product => product.tensanpham.toLowerCase().includes(value_search.toLowerCase()));
        state.listProductSearch = listProductSearch;
    }

}

export default { namespaced: true, state, getters, actions, mutations }