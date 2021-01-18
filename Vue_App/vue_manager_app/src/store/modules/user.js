import axios from 'axios'
const state = {
    users: []
}
const getters = {
    getUsers: (state) => (state.users)
}

const actions = {
    async setUsers({ commit }) {
        let res = await axios.get('./user.json');
        commit('setUsers', res.data)
    }
}

const mutations = {
    setUsers: (state, users) => (state.users = users)
}

export default { namespaced: true, state, actions, getters, mutations }