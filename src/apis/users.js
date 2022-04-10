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
    return apiHelper.get('/recommends')
  },

  addFollowing({ id }) {
    return apiHelper.post('/followships', { id })
  },

  removeFollowing({ id }) {
    return apiHelper.delete(`/followships/${id}`)
  },

  getFollowers({ userId }) {
    return apiHelper.get(`/followers/${userId}`)
  },

  getFollowings({ userId }) {
    return apiHelper.get(`/followings/${userId}`)
  },

  putAvatarImg({ formData }) {
    return apiHelper.put('/users/image/avatar', formData)
  },

  putCoverImg({ formData }) {
    return apiHelper.put('/users/image/cover', formData)
  }
}