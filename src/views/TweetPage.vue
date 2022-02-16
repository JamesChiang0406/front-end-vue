<template>
  <div class="container">
    <div class="row mt-2">
      <div class="col-3 px-4">
        <SideBar v-on:openArea="openTweetArea" />
      </div>

      <div
        class="fa-3x col-6"
        style="border: 2px #e9e9e9 solid; padding: 0"
        v-show="isProcessing"
      >
        <i class="fas fa-circle-notch fa-spin"></i>
      </div>
      <div
        class="tweet-text col-6 border"
        :class="{ dataReading: isProcessing }"
      >
        <div class="title d-flex justify-content-start align-items-center px-3">
          <div class="back-icon mr-3" @click="$router.back()">
            <i class="fas fa-arrow-left"></i>
          </div>
          <span>推文</span>
        </div>

        <div class="tweet-area d-flex flex-column">
          <div class="tweeter-profile d-flex px-3 my-2">
            <router-link
              :to="{ name: 'other-user', params: { id: tweet.UserId } }"
            >
              <img
                :src="tweet.user.avatar"
                alt="avatar-img"
                style="
                  width: 40px;
                  height: 40px;
                  margin-top: 5px;
                  margin-right: 10px;
                "
                class="image-area"
              />
            </router-link>

            <div class="name-account d-flex justify-content-center flex-column">
              <span class="follower-name fw-bold">{{ tweet.user.name }}</span>
              <small class="follower-account">@{{ tweet.user.account }}</small>
            </div>
          </div>

          <div class="article px-3">
            <p class="mb-1">
              {{ tweet.description }}
            </p>
          </div>

          <div class="publish-time pb-1">
            <span>上午 10:05 ‧ 2020年6月10日</span>
          </div>

          <div class="replys-likes d-flex flex-column">
            <div class="numbers d-flex px-2 py-1">
              <div
                v-if="tweet.isLiked"
                class="likes isLiked"
                style="margin-right: 15px"
                @click.stop.prevent="unlikeThisTweet(tweet.id)"
              >
                <span class="like-numbers">{{ tweet.likedCount }} </span>
                <span>喜歡</span>
              </div>
              <div
                v-else
                class="likes"
                style="margin-right: 15px"
                @click.stop.prevent="likeThisTweet(tweet.id)"
              >
                <span class="like-numbers">{{ tweet.likedCount }} </span>
                <span>喜歡</span>
              </div>

              <div
                class="reply-numbers"
                @click.stop.prevent="openReplyArea(tweet.id)"
              >
                <span>{{ tweet.repliedCount }} </span>
                <span>回覆</span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="replys d-flex justify-content-between py-2 px-3"
          v-for="reply in tweet.tweetReplies"
          :key="reply.id"
        >
          <div class="d-flex">
            <div class="image-area pt-2" style="margin-right: 16px">
              <router-link
                :to="{ name: 'other-user', params: { id: reply.User.id } }"
              >
                <img
                  :src="reply.User.avatar"
                  alt="icon"
                  style="width: 40px; height: 40px"
                />
              </router-link>
            </div>

            <div class="text-area d-flex flex-column flex-wrap">
              <div
                class="profile d-flex justify-content-start align-items-center"
              >
                <span class="follower-name" style="margin-right: 10px">{{
                  reply.User.name
                }}</span>
                <span class="follower-account"
                  >@{{ reply.User.account }} ‧ 13小時</span
                >
              </div>

              <div class="reply-to">
                <span style="font-size: 15px; margin-right: 3px">回覆</span>
                <router-link
                  :to="{ name: 'other-user', params: { id: tweet.UserId } }"
                  style="font-size: 15px"
                  >@{{ tweet.user.account }}</router-link
                >
              </div>

              <div class="tweet">
                <p class="m-0">{{ reply.comment }}</p>
              </div>
            </div>
          </div>

          <div
            v-if="reply.isUserReply"
            @click.stop.prevent="deleteReply(reply.id)"
          >
            <i class="fas fa-times delete-btn"></i>
          </div>
        </div>
      </div>

      <div class="col-3 pr-0 pl-2">
        <FollowWho />
      </div>
    </div>

    <div class="tweeting-area" v-show="isTweetBtnClicked">
      <TweetingForm v-on:closeArea="closeTweetArea" />
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
import ReplyingForm from "../components/ReplyingForm";
import tweetAPI from "../apis/tweet";
import { Toast } from "../utils/helpers";

export default {
  components: {
    SideBar,
    FollowWho,
    ReplyingForm,
    TweetingForm,
  },

  data() {
    return {
      tweetId: this.$route.params.id,
      tweet: {
        UserId: -1,
        user: {
          account: "",
          avatar: "",
          name: "",
        },
        tweetReplies: {},
      },
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
    this.fetchTweet();
  },

  methods: {
    async fetchTweet() {
      try {
        this.isProcessing = true;
        const userId = this.$store.state.currentUser.id;

        const { data } = await tweetAPI.getTweet({ tweetId: this.tweetId });
        if (data.status === "error") {
          throw new Error();
        }

        this.tweet = data;
        this.tweet.tweetReplies.map((reply) => {
          if (reply.User.id === userId) {
            reply.isUserReply = true;
          } else {
            reply.isUserReply = false;
          }
        });
        this.isProcessing = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "此推文不存在，請重新查詢！",
        });
      }
    },

    async likeThisTweet(tweetId) {
      try {
        const { data } = await tweetAPI.likeTweet({ tweetId });
        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.tweet.isLiked = true;
        this.tweet.likedCount += 1;
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
        if (data.message === "error") {
          throw new Error(data.message);
        }

        this.tweet.isLiked = false;
        this.tweet.likedCount -= 1;
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
        this.replyTweet.createdAt = data.createdAt;
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

    closeAndUp() {
      this.isReplyBtnClicked = false;
      this.fetchTweet();
    },

    deleteReply(replyId) {
      // 刪除前提供確認視窗
      Toast.fire({
        icon: "warning",
        title: "確定要刪除此回覆嗎？",
        showConfirmButton: true,
        showCancelButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await tweetAPI.deleteReply({ reply_id: replyId });
          if (data.status === "error") {
            throw new Error(data.message);
          }

          Toast.fire({
            icon: "success",
            title: "刪除回覆成功！",
          });
          this.tweet.tweetReplies = this.tweet.tweetReplies.filter((reply) => {
            return reply.id !== replyId;
          });
        } else {
          return;
        }
      });
    },
  },
};
</script>

<style scoped>
body {
  z-index: 1;
  position: relative;
}
span {
  font-weight: bold;
}

.container {
  padding: 0;
  width: 90%;
}

.dataReading {
  display: none;
}

.tweeting-area {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.tweet-text {
  padding: 0;
}

.title {
  padding: 20px 0px 10px 15px;
}
.back-icon:hover {
  cursor: pointer;
}
.tweet,
.follower-name {
  font-size: 18px;
}
.follower-account {
  font-size: 15px;
  color: #807a7a;
}
.publish-time {
  margin: 10px 10px;
  font-size: 0.75rem;
  color: #6e6e6e;
}
.numbers {
  font-size: 0.8rem;
}
.image-area:hover {
  opacity: 0.5;
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

.name-account,
.article,
.publish-time,
.replys-likes,
.reply-to,
.tweet {
  text-align: start;
}
.isLiked {
  color: crimson;
}
.likes:hover {
  cursor: pointer;
}
.reply-numbers:hover,
.delete-btn:hover {
  cursor: pointer;
  color: crimson;
}
.replys,
.title,
.publish-time,
.numbers,
.icon {
  border-bottom: 2px #e9e9e9 solid;
}
</style>