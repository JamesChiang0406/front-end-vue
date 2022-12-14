<template>
  <div class="container mr-0">
    <div class="row">
      <div class="col-2 p-0 sidebar-area" style="height: 350px">
        <AdminSideBar page-name="mainPage" />
      </div>

      <div class="tweets-list col-10 p-0">
        <div class="title">
          <span>推文清單</span>
        </div>

        <div
          class="tweets d-flex justify-content-between p-2"
          v-for="tweet in tweets"
          :key="tweet.id"
        >
          <div class="d-flex">
            <div class="tweeter-pic pt-2 mr-2">
              <img
                :src="tweet.user.avatar"
                alt="tweeter-pic"
                style="width: 45px; height: 45px"
              />
            </div>

            <div class="content">
              <div class="name-account">
                <span
                  class="mr-2"
                  style="font-weight: bolder; color: slategrey"
                  >{{ tweet.user.name }}</span
                >

                <small>@{{ tweet.user.account }}</small>
                <small> ‧ {{ tweet.createdAt }}</small>
              </div>

              <div class="tweet-text">
                <p>
                  {{ tweet.description }}
                </p>
              </div>
            </div>
          </div>

          <form
            class="delete-btn"
            @submit.stop.prevent="handleDelete(tweet.id)"
          >
            <button type="submit" style="background: transparent; border: none">
              <i class="fas fa-times" style="color: darkgray"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSideBar from "../components/AdminSideBar";
import adminAPI from "../apis/admin";
import { Toast } from "../utils/helpers";
import moment from "moment";

export default {
  components: {
    AdminSideBar,
  },

  data() {
    return {
      tweets: [],
    };
  },

  created() {
    this.fetchTweets();
    moment.locale("zh-tw");
  },

  methods: {
    async fetchTweets() {
      try {
        const { data } = await adminAPI.getTweets();
        if (!data) {
          throw new Error(data.message);
        }

        this.tweets = data;
        this.tweets.forEach((tweet) => {
          tweet.createdAt = moment(tweet.createdAt).fromNow();
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得推文，請稍後再試！",
        });
      }
    },

    handleDelete(id) {
      try {
        if (this.$store.state.currentUser.role !== "admin") {
          throw new Error("無授權的動作，請重新確認！");
        } else {
          // 刪除貼文前，提供確認視窗
          Toast.fire({
            icon: "warning",
            title: "確定要刪除嗎？",
            showConfirmButton: true,
            showCancelButton: true,
          }).then(async (result) => {
            if (result.isConfirmed) {
              const { data } = await adminAPI.deleteTweet({ tweetId: id });

              if (data.status !== "success") {
                throw new Error(data.message);
              }

              Toast.fire({
                icon: "success",
                title: "推文刪除成功！",
              });
              this.tweets = this.tweets.filter((tweet) => tweet.id !== id);
            } else {
              return;
            }
          });
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法刪除推文，請稍後再試！",
        });
      }
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
}

small {
  font-size: 0.75rem;
  color: darkgray;
}

p {
  margin: 0;
  font-size: 0.9rem;
}

.tweets-list {
  border-left: 2px #dee2e6 solid;
  height: 100%;
}
.tweets {
  border-bottom: 2px #dee2e6 solid;
}
.tweets:hover {
  background-color: mistyrose;
}

.title {
  display: flex;
  align-items: center;
  height: 50px;

  padding-top: 10px;
  padding-left: 20px;
  border-bottom: 2px #dee2e6 solid;

  text-align: start;
  font-weight: 900;
}

.content {
  text-align: start;
}

.delete-btn {
  width: 5%;
  color: darkgrey;
}

.tweet-text {
  width: 100%;
}

@media screen and (max-width: 992px) {
  .sidebar-area {
    font-size: 14px;
  }
}

@media screen and (max-width: 768px) {
  .sidebar-area {
    font-size: 10px;
  }
}
</style>