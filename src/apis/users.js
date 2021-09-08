import { apiHelper } from '../utils/helpers'

export default {
  create({ formData }) {
    return apiHelper.post('/regist', formData)
  }
}