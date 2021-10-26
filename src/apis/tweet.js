import { apiHelper } from "../utils/helpers";

export default {
  getTweets() {
    return apiHelper.get('/tweets')
  },

  createTweet({ description }) {
    return apiHelper.post('/tweets', { description })
  },

  deleteTweet({ tweet_id }) {
    return apiHelper.delete(`/tweets/${tweet_id}`)
  }
}