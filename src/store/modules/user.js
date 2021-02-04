import axios from 'axios'
const state = {
    users: [],
    listUserSearched: [],
    user: null,
    is_loaded: false
}

const getters = {
    getUsers: (state) => (state.users),
    getUserSearched: (state) => (state.listUserSearched),
    getUser: (state)=>(state.user),
    getValueAfterLoaded:(state)=>(state.is_loaded)
}

const actions = {
    setUsers({ commit }) {
        axios.get(`/user.json`)
            .then(res => commit('setUsers', res.data))
            .catch(err => console.log(err.message))
    },

    setUserById({commit},id){
        let user=state.users.find(item=>item.id.toString()===id)
        commit('setUser',user);
    },

    setUser({commit},user){
        commit('setUser',user)
    },

    addUser({ commit }, user) {
        commit('addUser', user)
    },

    updateUser({ commit }, user) {
        commit('updateUser', user)
    },

    searchUser({ commit }, search) {
        commit('searchUser', search)
    }
}

const mutations = {
    setUsers: (state, users) => {
        state.users = users
        state.is_loaded=true;
    },

    setUser:(state,user)=>{
        state.user=user
    },

    addUser: (state, user) => {
        state.users.unshift(user);
    },

    updateUser: (state, user) => {
        let index = state.users.findIndex(item => item.id === user.id);
        state.users.splice(index, 1)
        state.users.splice(index, 0, user)
    },

    searchUser: (state, value_search) => {
        let listSearch = []
        state.users.forEach(function (user) {
            if (user.tendaydu.ten.toLowerCase().includes(value_search.toLowerCase())) {
                listSearch.push(user);
            }
            state.listUserSearched = listSearch;
        })
    },
}

export default { namespaced: true, state, actions, getters, mutations }