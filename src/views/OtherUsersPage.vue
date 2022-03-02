<template>
  <div class="container">
    <div class="row">
      <div class="col-3 px-4 pt-2">
        <SideBar v-on:openArea="openTweetArea" />
      </div>

      <div
        class="fa-3x col-6"
        v-show="isProcessing"
        style="border: 2px #e9e9e9 solid; padding: 0"
      >
        <i class="fas fa-circle-notch fa-spin"></i>
      </div>
      <div
        class="user-self col-6 p-0 border"
        :class="{ dataReading: isProcessing }"
      >
        <div
          class="nav-bar d-flex align-items-center px-3 py-2"
          style="margin-bottom: 3px"
        >
          <div class="title d-flex flex-column">
            <span class="user-name">{{ user.name }}</span>
            <small class="tweet-numbers">{{ tweets.length }} 推文</small>
          </div>
        </div>

        <div class="user-profile position-relative">
          <div class="picture-area">
            <img
              :src="user.cover"
              alt="user-pic"
              style="
                width: 100%;
                height: 250px;
                background-size: cover;
                background-position: center;
              "
            />

            <div class="edit-area d-flex justify-content-between px-3">
              <img :src="user.avatar" alt="user-pic" class="user-pic" />
            </div>
          </div>
        </div>

        <div
          class="introduction d-flex flex-column"
          style="margin-top: 30px; padding: 15px"
        >
          <div class="name-account d-flex flex-column position-relative mb-3">
            <span class="user-name">{{ user.name }}</span>
            <small class="user-account">@{{ user.account }}</small>
          </div>

          <p class="description">
            {{ user.introduction }}
          </p>

          <div class="followings-followers d-flex">
            <div class="mr-3">
              <router-link
                :to="{ name: 'other-user-follower', params: { id: this.id } }"
                class="followers"
              >
                <span>{{ user.followerCount }}位跟隨者</span>
              </router-link>
            </div>

            <div>
              <router-link
                :to="{ name: 'other-user-following', params: { id: this.id } }"
                class="followings"
              >
                <span>{{ user.followingCount }}個跟隨中</span>
              </router-link>
            </div>
          </div>
        </div>

        <div class="show-btns d-flex justify-content-start border-bottom">
          <div
            class="changeArea"
            :class="{ firstClicked: isTweetsArea }"
            @click.stop.prevent="fetchTweets()"
          >
            推文
          </div>
          <div
            class="changeArea"
            :class="{ firstClicked: isRepliedArea }"
            @click.stop.prevent="fetchReplies(id)"
          >
            回覆的內容
          </div>
          <div
            class="changeArea"
            :class="{ firstClicked: isLikedArea }"
            @click.stop.prevent="fetchLikedTweets(id)"
          >
            喜歡的內容
          </div>
        </div>

        <div
          class="other-tweets d-flex py-2"
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
                  class="avatar"
                  alt="icon"
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
                  class="follower-name d-flex align-items-center"
                >
                  <span>{{ tweet.user.name }}</span>
                </router-link>

                <span class="follower-account"
                  >@{{ tweet.user.account }} ‧ {{ tweet.fromNow }}</span
                >
              </div>
              <span style="font-size: 0.75em" v-if="isRepliedArea"
                >回覆給
                <router-link
                  class="repliedArea"
                  :to="{
                    name: 'other-user',
                    params: { id: tweet.repliedUserId },
                  }"
                >
                  @{{ tweet.repliedUserAccount }}
                </router-link>
              </span>

              <div class="reply" v-if="isRepliedArea" style="text-align: start">
                <p class="m-0">
                  {{ tweet.description }}
                </p>
              </div>
              <div
                class="tweet"
                v-else
                style="text-align: start"
                @click.stop.prevent="tweetPage(tweet.id)"
              >
                <p class="m-0">
                  {{ tweet.description }}
                </p>
              </div>

              <div
                class="icon-area d-flex justify-content-start"
                v-if="iconSwitch"
              >
                <div
                  class="comments"
                  style="margin-right: 30px"
                  @click.stop.prevent="openReplyArea(tweet.id)"
                >
                  <img
                    src="../assets/icon/reply_icon.svg"
                    alt="comment-icon"
                    class="reply-btn"
                    style="margin-right: 10px"
                  />
                  <small>{{ tweet.repliedCount }}</small>
                </div>

                <div class="likes">
                  <img
                    v-if="tweet.isUserLiked"
                    src="../assets/icon/like_icon_active.svg"
                    alt="like-icon"
                    style="margin-right: 10px; width: 13px; height: 13px"
                    @click.stop.prevent="unlikeThisTweet(tweet.id)"
                  />
                  <img
                    v-else
                    src="../assets/icon/like_icon.svg"
                    alt="like-icon"
                    style="margin-right: 10px"
                    @click.stop.prevent="likeThisTweet(tweet.id)"
                  />
                  <small
                    :class="{ isActived: tweet.isUserLiked }"
                    style="text-decoration-line: none"
                    >{{ tweet.likedCount }}</small
                  >
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

      <div class="col-3 pr-0 pl-2 pt-2">
        <FollowWho :to-page-id="id" />
      </div>
    </div>

    <div class="tweeting-area" v-show="isTweetBtnClicked">
      <TweetingForm v-on:closeArea="closeTweetArea" :user-avatar="userAvatar" />
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
import TweetingForm from "../components/TweetingForm.vue";
import ReplyingForm from "../components/ReplyingForm.vue";
import { Toast } from "../utils/helpers";
import userAPI from "../apis/users";
import tweetAPI from "../apis/tweet";
import moment from "moment";

export default {
  components: {
    SideBar,
    FollowWho,
    TweetingForm,
    ReplyingForm,
  },

  data() {
    return {
      userAvatar: this.$store.state.currentUser.avatar,
      id: this.$route.params.id,
      user: {},
      tweets: [],
      isTweetsArea: true,
      isRepliedArea: false,
      isLikedArea: false,
      iconSwitch: true,
      errMsg: "",
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
    this.selfOrUsers();
    this.fetchUser({ userId: this.id });
    this.fetchTweets();
    moment.locale("zh-tw");
  },

  beforeRouteUpdate(to, from, next) {
    this.id = to.params.id;
    this.fetchUser({ userId: this.id });
    this.fetchTweets();
    next();
  },

  methods: {
    tweetPage(id) {
      this.$router.push({
        name: "tweet-page",
        params: { id },
      });
    },

    async fetchUser({ userId }) {
      try {
        this.isProcessing = true;
        const { data } = await userAPI.getUser({ userId });

        this.user = data;
        this.isProcessing = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試！",
        });
      }
    },

    async fetchTweets() {
      try {
        // 狀態切換
        this.isTweetsArea = true;
        this.isRepliedArea = false;
        this.isLikedArea = false;
        this.iconSwitch = true;

        // 取得資料 & 錯誤處理
        const { data } = await tweetAPI.getUserTweets({ userId: this.id });
        if (data.status === "error") {
          throw new Error();
        }

        // 佈署資料 & 錯誤處理
        this.tweets = data;
        this.tweets = this.tweets.filter(
          (tweet) => tweet.UserId === Number(this.id)
        );
        this.tweets.forEach((tweet) => {
          tweet.fromNow = moment(tweet.createdAt).fromNow();
        });
        if (this.tweets.length === 0) {
          Toast.fire({
            icon: "warning",
            title: "無相關資料，請重新確認！",
          });
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試！",
        });
      }
    },

    async fetchLikedTweets(userId) {
      try {
        this.isTweetsArea = false;
        this.isRepliedArea = false;
        this.isLikedArea = true;
        this.iconSwitch = true;

        const { data } = await tweetAPI.getUserTweets({ userId });
        if (data.status === "error") {
          throw new Error();
        }

        this.tweets = data;
        this.tweets = this.tweets.filter((tweet) => tweet.isLiked === true);
        this.tweets.forEach((tweet) => {
          tweet.isUserTweet = this.$store.state.currentUser.id === tweet.UserId;
          tweet.fromNow = moment(tweet.createdAt).fromNow();
        });
        if (this.tweets.length === 0) {
          Toast.fire({
            icon: "warning",
            title: "無相關資料，請重新確認！",
          });
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試！",
        });
      }
    },

    async fetchReplies(userId) {
      try {
        this.isTweetsArea = false;
        this.isLikedArea = false;
        this.iconSwitch = false;

        const { data } = await tweetAPI.getReplies({ userId });
        if (data.status === "error") {
          this.errMsg = data.message;
          throw new Error();
        }

        this.tweets = data;
        this.tweets.forEach((tweet) => {
          tweet.fromNow = moment(tweet.createdAt).fromNow();
        });
        this.isRepliedArea = true;
      } catch (error) {
        this.isRepliedArea = true;
        Toast.fire({
          icon: "warning",
          title: this.errMsg,
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
            tweet.isUserLiked = true;
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
            tweet.isUserLiked = false;
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

    openTweetArea() {
      this.isTweetBtnClicked = true;
    },

    closeTweetArea() {
      this.isTweetBtnClicked = false;
    },

    selfOrUsers() {
      if (this.$route.params.id === this.$store.state.currentUser.id) {
        this.$router.push({
          name: "user-self",
        });
      }
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
  z-index: 1;
  position: relative;
}

.dataReading {
  display: none;
}

.tweeting-area {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
}
.replying-area {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgb(0, 0, 0, 0.5);
}

.title {
  width: 50%;
  text-align: start;
  position: relative;
  bottom: 8px;
}
.tweet-numbers {
  font-size: 0.5rem;
  position: absolute;
  top: 25px;
}

.edit-area {
  position: absolute;
  top: 80%;
  width: 100%;
}
.user-pic {
  width: 90px;
  height: 90px;
  border: 3px white solid;
  border-radius: 100%;
  background-color: white;
}

.introduction {
  text-align: start;
}
.user-account {
  position: absolute;
  top: 22px;
  left: -1px;
  color: darkgray;
}
a,
.changeArea {
  width: 23%;
  padding: 10px 0;
  text-decoration-line: none;
  color: #2e2e2e;
  font-size: 16px;
  font-weight: bolder;
}
.changeArea:hover {
  cursor: pointer;
}
.repliedArea:hover {
  cursor: pointer;
  color: crimson;
}

.firstClicked,
.clicking {
  color: #ff6600;
  border-bottom: 2px #ff6600 solid;
}

.other-tweets {
  padding: 14px;
  border-bottom: 2px #e9e9e9 solid;
}
.other-tweets:hover {
  background-color: #f5f8fa;
}
.tweet:hover {
  cursor: pointer;
}

.profile,
.tweet,
.reply,
.icon-area {
  width: 100%;
}
.follower-name {
  width: 52px;
  height: 30px;
  font-weight: bold;
}

a,
.followings,
.followers,
.user-name {
  font-weight: bold;
}

.followings,
.followers,
.tweet,
.reply,
.follower-account,
.description {
  font-size: 0.8rem;
}

.follower-account,
.comments,
.likes {
  color: darkgray;
}
.likes:hover,
.reply-btn:hover {
  cursor: pointer;
  color: crimson;
}

.follower-name:hover,
.comments:hover,
.isActived {
  color: crimson;
}

.avatar:hover {
  opacity: 0.5;
}
</style>