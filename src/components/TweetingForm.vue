<template>
  <div class="tweeting-form">
    <div
      class="cancel-area px-3 d-flex justify-content-start p-2"
      style="color: #ff6600"
      @click.stop.prevent="closeArea"
    >
      <i class="fas fa-times close-btn"></i>
    </div>

    <div class="border-top p-2" style="width: 100%; height: 100%">
      <form class="tweet-form row m-0" style="width: 100%; height: 80%">
        <div
          class="
            message-area
            col-10
            d-flex
            justify-content-center
            align-items-start
            pl-0
          "
        >
          <img
            :src="userAvatar"
            alt="avatar-img"
            style="
              width: 50px;
              height: 50px;
              margin-right: 10px;
              border-radius: 30px;
            "
          />

          <textarea
            class="form-control"
            placeholder="有什麼新鮮事?"
            v-model="newTweet"
            style="height: 100%; width: 100%; border: none; resize: none"
            required
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
            @click.stop.prevent="handleSubmit"
            :disabled="isLoading"
          >
            推文
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import tweetAPI from "../apis/tweet";
import { Toast } from "../utils/helpers";

export default {
  props: {
    userAvatar: {
      require: false,
    },
  },

  data() {
    return {
      newTweet: "",
      isLoading: false,
    };
  },

  methods: {
    closeArea() {
      this.newTweet = "";
      this.$emit("closeArea");
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
        this.$emit("closeArea");
        this.$emit("reloadTweet");
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法發布此推文，請稍後再試！",
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

textarea:focus::placeholder {
  color: transparent;
}

.tweeting-form {
  background-color: white;
  width: 450px;
  height: 250px;
  border: 2px #e9e9e9 solid;
  border-radius: 15px;
  margin-left: 425px;
  margin-top: 80px;
}

.close-btn:hover {
  cursor: pointer;
}
</style>