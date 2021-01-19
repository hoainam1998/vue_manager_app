import axios from 'axios'
const state={
    products:[],
    specificProduct:{}
};

const getters={
    getProducts:(state)=>(state.products),
    getSpecificProduct:(state)=>(state.specificProduct)
}

const actions={
    async setProducts({commit}){
        let res=await axios.get('./product.json')
        commit('setProducts',res.data)
    },

    setSpecificProduct({commit},product){
        commit('setSpecificProduct',product)
    },

    createProducts({commit},product){
        console.log(product);
        commit('createProducts',product)
    }
}

const mutations={
    setProducts:(state,products)=>(state.products=products),
    setSpecificProduct:(state,product)=>(state.specificProduct=product),
    createProducts:(state,product)=>(state.products.unshift(product))
}

export default {namespaced: true, state, getters, actions, mutations}