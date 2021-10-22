import { apiHelper } from '../utils/helpers'

export default {
  create({ account, name, email, password, passwordCheck }) {
    return apiHelper.post('/regist', { account, name, email, password, passwordCheck })
  },

  getUser({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },

  getCurrentUser() {
    return apiHelper.get('/users/current_user')
  },

  putUser({ userId }, payload) {
    return apiHelper.put(`/users/${userId}`, payload)
  },

  getRecommendList() {
    return apiHelper.get('/followships')
  },

  addFollowing({ id }) {
    return apiHelper.post('/followships', { id })
  },

  removeFollowing({ id }) {
    return apiHelper.delete(`/followships/${id}`)
  }
}