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
        try {
            let res = await axios.get('./user.json');
            commit('setUsers', res.data)
        } catch (err) { console.log(err.message) }
    },

    addUser({ commit }, user) {
        console.log('add list users ')
        commit('addUser', user)
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

    addUser: (state, user) => (state.users.unshift(user)),

    updateListUsers: (state, user) => {
        state.users=state.users.map(us => us.id === user.id ? {
            id: us.id,
            power: us.power,
            tendangnhap: us.tendangnhap,
            matkhau: us.matkhau,
            tendaydu: user.tendaydu,
            ngayduoctao: us.ngayduoctao,
            trangthai: user.trangthai
        } : us)
    },
    
    setSpecificUser: (state, user) => (state.specificUser = user),

    searchUser: (state, value_search) => {
        let listSearch=[]
        state.users.forEach(function (user) {
            if (user.tendaydu.ten.toLowerCase().includes(value_search.toLowerCase())) {
               listSearch.push(user);         
            }
            state.listUserSearched=listSearch;
        })
    }
}

export default { namespaced: true, state, actions, getters, mutations }