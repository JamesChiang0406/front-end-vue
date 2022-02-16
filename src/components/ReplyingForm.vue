<template>
  <div
    class="tweeting-form"
    style="
      background-color: white;
      width: 500px;
      height: auto;
      border: 2px #e9e9e9 solid;
      border-radius: 15px;
      margin-left: 425px;
      margin-top: 70px;
    "
  >
    <div
      class="cancel-area px-3 d-flex justify-content-start p-2"
      style="color: #ff6600; border-bottom: 2px solid #dee2e6"
      @click.stop.prevent="closeArea"
    >
      <i class="fas fa-times close-btn"></i>
    </div>

    <div class="reply-to d-flex pt-2" style="width: 100%; height: 40%">
      <div
        class="image-area d-flex flex-column align-items-center mx-1"
        style="width: 10%"
      >
        <img
          :src="replyTweet.user.avatar"
          alt="replied-pic"
          style="width: 45px; height: 50px; margin: 5px; border-radius: 50%"
        />
        <div class="stripe border"></div>
      </div>

      <div
        class="message-area"
        style="text-align: start; width: 90%; height: 100%"
      >
        <div class="name-account" style="font-size: 16px">
          <span class="name mr-1" style="font-weight: bold">{{
            replyTweet.user.name
          }}</span>
          <small class="account">@{{ replyTweet.user.account }}</small>
          <small class="publish-time">‧ 3小時</small>
        </div>

        <div class="text">
          <p style="font-size: 16px; margin-bottom: 10px">
            {{ replyTweet.description }}
          </p>
        </div>

        <div class="reply-to" style="font-size: 16px">
          <small>回覆給 </small>
          <router-link
            :to="{ name: 'other-user', params: { id: replyTweet.userId } }"
            style="color: #ff6600"
            >@{{ replyTweet.user.account }}</router-link
          >
        </div>
      </div>
    </div>

    <div style="width: 100%; height: 50%">
      <form class="tweet-form row m-0" style="width: 100%; height: 100%">
        <div
          class="
            message-area
            col-10
            d-flex
            justify-content-center
            align-items-start
            pt-1
            pl-0
          "
        >
          <img
            :src="replyerAvatar"
            alt="avatar-img"
            style="width: 50px; height: 50px; margin: 0 5px; border-radius: 50%"
          />

          <textarea
            class="form-control"
            v-model="reply"
            placeholder="轉推你的回覆"
            style="
              height: 180px;
              width: 100%;
              border: none;
              resize: none;
              padding: 10px;
            "
          >
          </textarea>
        </div>

        <div
          class="
            tweet-button
            col-2
            d-flex
            justify-content-center
            align-items-end
            p-0
          "
        >
          <button
            class="btn text-white mb-2"
            type="submit"
            @click.stop.prevent="createReply(replyTweet.tweetId)"
            :disabled="isLoading"
          >
            回覆
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Toast } from "../utils/helpers";
import tweetAPI from "../apis/tweet";

export default {
  props: {
    replyTweet: {
      require: false,
    },
  },

  data() {
    return {
      reply: "",
      replyerAvatar: this.$store.state.currentUser.avatar,
      isLoading: false,
    };
  },

  methods: {
    closeArea() {
      this.reply = "";
      this.$emit("closeArea");
    },

    async createReply(TweetId) {
      try {
        this.isLoading = true;
        const { data } = await tweetAPI.postReply({
          TweetId,
          comment: this.reply,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        Toast.fire({
          icon: "success",
          title: "回應成功！",
        });

        this.reply = "";
        this.isLoading = false;
        this.$emit("closeAndUp", TweetId);
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法發布此回應，請稍後再試！",
        });
      }
    },
  },
};
</script>

<style scoped>
button {
  border-radius: 50px;
  background-color: #ff6600;
  border-color: #ff6600;
  width: 70px;
  height: 35px;
  font-size: 0.9rem;
  padding: 5px;
}

.close-btn:hover {
  cursor: pointer;
}

textarea:focus {
  box-shadow: none;
}
textarea:focus::placeholder {
  color: transparent;
}

small {
  color: #7c7c7c;
}

.stripe {
  width: 10%;
  height: 80%;
  background-color: #dee2e6;
  border-radius: 30px;
}
</style>