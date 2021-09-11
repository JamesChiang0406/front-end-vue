import { apiHelper } from "../utils/helpers";

export default {
  signIn({ account, password }) {
    return apiHelper.post('/login', { account, password })
  },

  adminSignIn({ account, password }) {
    return apiHelper.post('/admin/login', { account, password })
  }
}