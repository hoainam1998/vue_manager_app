import axios from 'axios'
const state = {
    users: [],
    listUserSearched: [],
}

const getters = {
    getUsers: (state) => (state.users),
    getUserSearched: (state) => (state.listUserSearched),
    getUserReload: (state) => (state.userReload)
}

const actions = {
    async setUsers({ commit }) {
        try {
            let res = await axios.get('./user.json');
            commit('setUsers', res.data)
        } catch (err) { console.log(err.message) }
    },

    addUser({ commit }, user) {
        console.log(user)
        commit('addUser', user)
    },

    updateUser({ commit }, user) {
        commit('updateUser', user)
    },

    searchUser({ commit }, search) {
        commit('searchUser', search)
    },

    setReload({commit}){
        commit('reload')
    }
}

const mutations = {
    setUsers: (state,users) => {state.users=users},

    addUser: (state,user)=> {
        state.users.unshift(user);
    },

    updateUser: (state, user) => {
        let index=state.users.findIndex(item=>item.id===user.id);
        state.users.splice(index,1)
        state.users.splice(index,0,user)
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