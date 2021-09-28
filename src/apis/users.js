import { apiHelper } from '../utils/helpers'

export default {
  create({ account, name, email, password, passwordCheck }) {
    return apiHelper.post('/regist', { account, name, email, password, passwordCheck })
  },

  getUser({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  }
}