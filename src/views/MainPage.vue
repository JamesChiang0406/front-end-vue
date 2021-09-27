<template>
  <div class="container">
    <div class="row mt-2">
      <div class="col-3 px-4">
        <SideBar />
      </div>

      <div class="main-area col-6">
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
          class="other-tweets d-flex py-2"
          v-for="tweet in tweets"
          :key="tweet.id"
        >
          <div class="image-area pt-2" style="margin-right: 15px">
            <router-link
              :to="{ name: 'other-user', params: { id: tweet.UserId } }"
            >
              <img
                :src="tweet.user.avatar"
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
                >@{{ tweet.user.account }} ‧ 3小時</span
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
              <div class="comments" style="margin-right: 30px">
                <router-link to="" style="margin-right: 10px">
                  <img src="../assets/icon/reply_icon.svg" alt="comment-icon" />
                </router-link>
                <small>{{ tweet.repliedCount }}</small>
              </div>

              <div class="likes">
                <router-link to="" style="margin-right: 10px">
                  <img src="../assets/icon/like_icon.svg" alt="like-icon" />
                </router-link>
                <small>{{ tweet.likedCount }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-3 pr-0 pl-2">
        <FollowWho />
      </div>
    </div>

    <div class="tweeting-area">
      <TweetingForm />
    </div>

    <div class="replying-area">
      <ReplyingForm />
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

export default {
  data() {
    return {
      tweets: [],
      newTweet: "",
      isLoading: false,
    };
  },

  created() {
    this.fetchTweets();
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
        const { data } = await tweetAPI.getTweets();

        if (!data) {
          throw new Error(data.message);
        }

        this.tweets = data;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得推文，請稍後再試！",
        });
      }
    },

    async handleSubmit() {
      try {
        console.log("hi");
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
  cursor: pointer;
  background-color: #f5f8fa;
}
.profile,
.tweet-text,
.icon-area {
  width: 100%;
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
  display: none;
  width: 100%;
  height: 100%;
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
}
.replying-area {
  display: none;
  z-index: 999;
  position: absolute;
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

.image-area:hover {
  opacity: 0.5;
}
</style>