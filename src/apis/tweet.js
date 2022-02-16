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
  },

  getUserTweets({ userId }) {
    return apiHelper.get(`/tweets/others/${userId}`)
  },

  getTweet({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`)
  },

  postReply({ TweetId, comment }) {
    return apiHelper.post('/tweets/reply', { TweetId, comment })
  },

  deleteReply({ reply_id }) {
    return apiHelper.delete(`/tweets/reply/${reply_id}`)
  }
}