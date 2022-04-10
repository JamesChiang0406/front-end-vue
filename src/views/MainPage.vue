<template>
  <div class="container">
    <div class="row mt-2">
      <div class="col-3 px-4 pt-1">
        <SideBar page-name="homePage" v-on:openArea="openTweetArea" />
      </div>

      <div class="fa-3x main-area col-6" v-show="isProcessing">
        <i class="fas fa-circle-notch fa-spin"></i>
      </div>
      <div class="main-area col-6" :class="{ dataReading: isProcessing }">
        <div class="title d-flex justify-content-start align-items-center">
          <span>首頁</span>
        </div>

        <div class="tweet-area pt-1 d-flex" style="width: 100%">
          <form
            class="tweet-form d-flex justify-content-between"
            style="width: 100%"
            @submit.stop.prevent="handleSubmit"
          >
            <div
              class="
                message-area
                d-flex
                justify-content-center
                align-items-start
              "
              style="width: 85%; padding-left: 5px"
            >
              <img
                src="../assets/icon/Icon.png"
                alt="avatar-img"
                style="width: 40px; height: 40px; margin-top: 5px"
              />
              <textarea
                class="form-control"
                placeholder="有什麼新鮮事?"
                style="height: 125px; width: 90%"
                v-model="newTweet"
                name="newTweet"
              >
              </textarea>
            </div>

            <div
              class="tweet-button d-flex justify-content-center align-items-end"
              style="width: 15%"
            >
              <button
                class="btn text-white mb-2"
                type="submit"
                :disabled="isLoading"
              >
                推文
              </button>
            </div>
          </form>
        </div>

        <div
          class="other-tweets d-flex justify-content-between py-2"
          v-for="tweet in tweets"
          :key="tweet.id"
        >
          <div class="d-flex" style="width: 90%">
            <div class="image-area pt-2" style="margin-right: 15px">
              <router-link
                :to="{ name: 'other-user', params: { id: tweet.UserId } }"
              >
                <img
                  :src="tweet.user.avatar"
                  class="image"
                  alt="image"
                  style="width: 40px; height: 40px"
                />
              </router-link>
            </div>

            <div class="tweets-area d-flex flex-wrap">
              <div
                class="profile d-flex justify-content-start align-items-center"
              >
                <router-link
                  :to="{ name: 'other-user', params: { id: tweet.UserId } }"
                >
                  <span class="follower-name" style="margin-right: 10px">{{
                    tweet.user.name
                  }}</span>
                </router-link>

                <span class="follower-account"
                  >@{{ tweet.user.account }} ‧ {{ tweet.fromNow }}</span
                >
              </div>

              <div
                class="tweet-text"
                style="text-align: start"
                @click.stop.prevent="tweetPage(tweet.id)"
              >
                <p class="m-0">
                  {{ tweet.description }}
                </p>
              </div>

              <div class="icon-area d-flex justify-content-start">
                <div
                  class="comments"
                  style="margin-right: 30px"
                  @click.stop.prevent="openReplyArea(tweet.id)"
                >
                  <img
                    src="../assets/icon/reply_icon.svg"
                    alt="comment-icon"
                    style="width: 13px; height: 13px; margin-right: 5px"
                    class="reply-btn"
                  />
                  <small>{{ tweet.repliedCount }}</small>
                </div>

                <div class="likes d-flex">
                  <div
                    v-if="tweet.isLiked"
                    class="isLiked"
                    @click.stop.prevent="unlikeThisTweet(tweet.id)"
                    style="margin-right: 5px"
                  >
                    <img
                      src="../assets/icon/like_icon_active.svg"
                      alt="like-icon"
                      style="width: 13px; height: 13px"
                    />
                  </div>

                  <div
                    v-else
                    @click.stop.prevent="likeThisTweet(tweet.id)"
                    class="likeIcon"
                    style="margin-right: 5px"
                  >
                    <img
                      src="../assets/icon/like_icon.svg"
                      alt="like-icon"
                      style="width: 13px; height: 13px"
                    />
                  </div>

                  <div>
                    <small :class="{ isActived: tweet.isLiked }">
                      {{ tweet.likedCount }}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style="width: 10%; height: 30px" v-if="tweet.isUserTweet">
            <div @click.stop.prevent="deleteTweet(tweet.id, tweet.UserId)">
              <i class="fas fa-times del-btn"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="col-3 pr-0 pl-2">
        <FollowWho />
      </div>
    </div>

    <div class="tweeting-area" v-show="isTweetBtnClicked">
      <TweetingForm
        v-on:closeArea="closeTweetArea"
        v-on:reloadTweet="fetchTweets"
        :user-avatar="userAvatar"
      />
    </div>

    <div class="replying-area" v-show="isReplyBtnClicked">
      <ReplyingForm
        :reply-tweet="replyTweet"
        v-on:closeArea="closeReplyArea"
        v-on:closeAndUp="closeAndUp"
      />
    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar";
import FollowWho from "../components/FollowWho";
import TweetingForm from "../components/TweetingForm";
import ReplyingForm from "../components/ReplyingForm";
import tweetAPI from "../apis/tweet";
import { Toast } from "../utils/helpers";
import moment from "moment";

export default {
  data() {
    return {
      userAvatar: this.$store.state.currentUser.avatar,
      tweets: [],
      newTweet: "",
      isLoading: false,
      isProcessing: false,
      isTweetBtnClicked: false,
      isReplyBtnClicked: false,
      replyTweet: {
        userId: -1,
        tweetId: -1,
        createdAt: "",
        description: "",
        user: {
          account: "",
          avatar: "",
          name: "",
        },
      },
    };
  },

  created() {
    this.fetchTweets();
    moment.locale("zh-tw");
  },

  components: {
    SideBar,
    FollowWho,
    TweetingForm,
    ReplyingForm,
  },

  methods: {
    async fetchTweets() {
      try {
        this.isProcessing = true;
        const { data } = await tweetAPI.getTweets();

        if (!data) {
          throw new Error(data.message);
        }

        this.tweets = data;
        this.tweets.forEach((tweet) => {
          tweet.isUserTweet = this.$store.state.currentUser.id === tweet.UserId;
          tweet.fromNow = moment(tweet.createdAt).fromNow();
        });
        this.isProcessing = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得推文，請稍後再試！",
        });
      }
    },

    async handleSubmit() {
      try {
        this.isLoading = true;
        if (this.newTweet.trim() === "") {
          this.newTweet = "";
          throw new Error();
        }

        const { data } = await tweetAPI.createTweet({
          description: this.newTweet,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        Toast.fire({
          icon: "success",
          title: "推文成功！",
        });
        this.isLoading = false;
        this.newTweet = "";
        this.fetchTweets();
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法發布此推文，請稍後再試！",
        });
      }
    },

    tweetPage(id) {
      this.$router.push({
        name: "tweet-page",
        params: { id },
      });
    },

    deleteTweet(id, tweetUserId) {
      try {
        const userId = this.$store.state.currentUser.id;

        if (userId !== tweetUserId) {
          throw new Error("此動作未授權，請重新確認！");
        } else {
          // 刪除貼文前，提供確認視窗
          Toast.fire({
            icon: "warning",
            title: "確定要刪除嗎？",
            showConfirmButton: true,
            showCancelButton: true,
          }).then(async (result) => {
            if (result.isConfirmed) {
              const { data } = await tweetAPI.deleteTweet({ tweet_id: id });
              if (data.status === "error") {
                throw new Error(data.message);
              }

              Toast.fire({
                icon: "success",
                title: "推文刪除成功",
              });
              this.tweets = this.tweets.filter((tweet) => {
                return tweet.id !== id;
              });
            } else {
              return;
            }
          });
        }
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法刪除，請稍後再試！",
        });
      }
    },

    async likeThisTweet(tweetId) {
      try {
        const { data } = await tweetAPI.likeTweet({ tweetId });
        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.tweets.map((tweet) => {
          if (tweet.id === tweetId) {
            tweet.isLiked = true;
            tweet.likedCount += 1;
          }
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法操作，請稍後再試！",
        });
      }
    },

    async unlikeThisTweet(tweetId) {
      try {
        const { data } = await tweetAPI.unlikeTweet({ tweetId });
        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.tweets.map((tweet) => {
          if (tweet.id === tweetId) {
            tweet.isLiked = false;
            tweet.likedCount -= 1;
          }
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法操作，請稍後再試！",
        });
      }
    },

    openTweetArea() {
      this.isTweetBtnClicked = true;
    },

    closeTweetArea() {
      this.isTweetBtnClicked = false;
    },

    async openReplyArea(tweetId) {
      try {
        const { data } = await tweetAPI.getTweet({ tweetId });
        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.replyTweet.userId = data.UserId;
        this.replyTweet.tweetId = tweetId;
        this.replyTweet.createdAt = moment(data.createdAt).fromNow();
        this.replyTweet.description = data.description;
        this.replyTweet.user = data.user;
        this.isReplyBtnClicked = true;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得推文，請稍後再試！",
        });
      }
    },

    closeReplyArea() {
      this.isReplyBtnClicked = false;
    },

    closeAndUp(TweetId) {
      this.tweets.map((tweet) => {
        if (tweet.id === TweetId) {
          tweet.repliedCount += 1;
        }
      });

      this.isReplyBtnClicked = false;
    },
  },
};
</script>

<style scoped>
body {
  position: relative;
  z-index: 1;
}

.container {
  width: 100%;
  padding: 0;
}

.main-area {
  border: 2px #e9e9e9 solid;
  padding: 0;
}
.dataReading {
  display: none;
}

.title {
  border-bottom: 2px #e9e9e9 solid;
  font-weight: bolder;
  padding: 20px 0px 10px 15px;
}

.tweet-area {
  border-bottom: 10px #e9e9e9 solid;
}
textarea {
  resize: none;
  border: none;
  overflow: hidden;
}
textarea::-webkit-input-placeholder,
textarea:-ms-input-placeholder,
textarea:-moz-placeholder {
  font-size: 20px;
  font-weight: bold;
  color: rgb(197, 195, 195);
}
textarea:focus {
  box-shadow: none;
}
textarea:focus::placeholder {
  color: transparent;
}
button {
  border-radius: 50px;
  background-color: #ff6600;
  border-color: #ff6600;
  width: 70px;
  height: 35px;
  font-size: 0.9rem;
  padding: 5px;
}

.other-tweets {
  padding: 14px;
  border-bottom: 2px #e9e9e9 solid;
}
.other-tweets:hover {
  background-color: #f5f8fa;
}
.tweet-text:hover {
  cursor: pointer;
}

.profile,
.tweet-text,
.icon-area {
  width: 100%;
}
.isActived {
  color: crimson;
}

.isLiked:hover,
.likeIcon:hover,
.del-btn:hover {
  cursor: pointer;
  color: crimson;
}

.follower-name {
  font-weight: bold;
  font-size: 18px;
}
.follower-account {
  font-size: 13px;
  font-weight: bold;
  color: rgb(172, 168, 168);
}
a {
  color: black;
}
a:hover {
  text-decoration-line: none;
}
p {
  font-size: 15px;
}

.cancel-area {
  border-bottom: 2px #e9e9e9 solid;
  text-align: start;
  color: #ff6600;
}

.tweeting-area {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.replying-area {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.follower-name:hover,
.comments:hover,
.likes:hover {
  text-decoration-line: underline;
  color: crimson;
}

.reply-btn:hover {
  cursor: pointer;
}

.image:hover {
  opacity: 0.5;
}
</style>