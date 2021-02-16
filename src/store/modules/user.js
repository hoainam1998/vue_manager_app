import axios from 'axios'
const state = {
    users: [],
    listUserSearched: [],
    user: null,
    is_users_load: true,
    user_existed: false
}

const getters = {
    getUsers: (state) => (state.users),
    getUserSearched: (state) => (state.listUserSearched),
    getUser: (state) => (state.user),
    get_is_users_load: (state) => (state.is_users_load),
    get_user_existed: (state) => (state.user_existed)
}

const actions = {
    getUsersFromAPI() {
        return axios.get(`/user.json`)
    },

    setUserById({ commit }, id) {
        let user = state.users.find(item => item.id.toString() === id)
        commit('setUser', user);
    },

    setUser({ commit }, user) {
        commit('setUser', user)
    },

    addUser({ commit }, user) {
        commit('addUser', user)
    },

    updateUser({ commit }, user) {
        commit('updateUser', user)
    },

    searchUser({ commit }, search) {
        commit('searchUser', search)
    },

    check_user_existed({ commit }, tendangnhap) {
        commit('check_user_existed', tendangnhap)
    }
}

const mutations = {
    setUsers: (state, users) => {
        state.users = users
        state.is_users_load = false
    },

    setUser: (state, user) => {
        state.user = user
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

    check_user_existed: (state, tendangnhap) => {
        console.log(tendangnhap)
        let index = state.users.findIndex(user => user.tendangnhap === tendangnhap)
        if (index !== -1) {
            state.user_existed = true
        }else {
            state.user_existed=false
        }

        console.log(index+' '+state.user_existed)
    }
}

export default { namespaced: true, state, actions, getters, mutations }