import { apiHelper } from "../utils/helpers";

export default {
  getChats({ chatter_id }) {
    return apiHelper.get(`/chatroom/${chatter_id}`)
  },

  postChat({ chatter_id, content }) {
    return apiHelper.post('/chatroom', { chatter_id, content })
  }
}