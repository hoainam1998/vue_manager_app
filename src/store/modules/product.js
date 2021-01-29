import axios from 'axios'
const state = {
    products: [],
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
    setProducts: (state, products) => (state.products = products),

    addProduct: (state, product) => (state.products.unshift(product)),

    updateProduct: (state, product) => {
        let index=state.products.findIndex(item=>item.id===product.id);
        state.products.splice(index,1)
        state.products.splice(index,0,product)
    },

    searchProduct: (state, value_search) => {
        let listProductSearch = state.products.filter(product => product.tensanpham.toLowerCase().includes(value_search.toLowerCase()));
        state.listProductSearch = listProductSearch;
    }

}

export default { namespaced: true, state, getters, actions, mutations }