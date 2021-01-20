import axios from 'axios'
const state = {
    users: [],
    specificUser: {},
    listUserSearched: []
}

const getters = {
    getUsers: (state) => (state.users),
    getSpecificUser: (state) => (state.specificUser),
    getUserSearched: (state) => (state.listUserSearched)
}

const actions = {
    async setUsers({ commit }) {
        let res = await axios.get('./user.json');
        commit('setUsers', res.data)
    },

    addListUsers({ commit }, user) {
        commit('addListUser', user)
    },

    updateListUsers({ commit }, user) {

        commit('updateListUsers', user)
    },

    setSpecificUser({ commit }, user) {
        commit('setSpecificUser', user)
    },

    searchUser({ commit }, search) {
        commit('searchUser', search)
    }
}

const mutations = {
    setUsers: (state, users) => (state.users = users),

    addListUser: (state, user) => (state.users.unshift(user)),

    updateListUsers: (state, user) => (
        state.users.map(us => us.id === user.id ? { 
            id: us.id,
            power: us.power,
            tendangnhap: us.tendangnhap,
            matkhau: us.matkhau,
            tendaydu: user.tendaydu,
            ngayduoctao: us.ngayduoctao,
            trangthai: user.trangthai
         } : us)
    ),
    setSpecificUser: (state, user) => (state.specificUser = user),

    searchUser: (state, value_search) => {
        state.users.forEach(function (user) {
            let ten = user.tendaydu.ho + " " + user.tendaydu.ten;
            if (ten.toLowerCase().includes(value_search.toLowerCase())) {
                state.listUserSearched.push(user);
            }
        })
    }
}

export default { namespaced: true, state, actions, getters, mutations }