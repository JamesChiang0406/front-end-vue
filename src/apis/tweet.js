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
  },

  getReplies({ userId }) {
    return apiHelper.get(`/tweets/replies/${userId}`)
  },

  likeTweet({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`)
  },

  unlikeTweet({ tweetId }) {
    return apiHelper.delete(`/tweets/${tweetId}/like`)
  }
}