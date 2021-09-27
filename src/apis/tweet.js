import { apiHelper } from "../utils/helpers";

export default {
  getTweets() {
    return apiHelper.get('/tweets')
  },

  createTweet({ newTweet }) {
    return apiHelper.post('/tweets', { newTweet })
  }
}