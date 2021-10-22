import Vue from 'vue'
import Vuex from 'vuex'
import userAPI from '../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      account: '',
      email: '',
      name: '',
      avatar: '',
      cover: '',
      introduction: '',
      role: ''
    },
    isAuthenticated: false,
    token: ''
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      },
        state.isAuthenticated = true
      state.token = localStorage.getItem('token')
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await userAPI.getCurrentUser()
        const { id, account, avatar, cover, email, introduction, name, role } = data
        if (!data) {
          throw new Error('資料為空，請重新確認！')
        }

        commit('setCurrentUser', {
          id,
          account,
          avatar,
          cover,
          email,
          introduction,
          name,
          role
        })
        return true
      } catch (error) {
        commit('revokeAuthentication')
        console.log(error)
        console.error('無法取得資料，請稍後再試！')
      }
    }
  },
  modules: {
  }
})
