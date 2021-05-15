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

        <div class="tweet-area d-flex">
          <form class="tweet-form d-flex justify-content-between">
            <div
              class="message-area d-flex justify-content-center align-items-start"
            >
              <img
                src="../assets/icon/Icon.png"
                alt="avatar-img"
                style="width: 40px; height: 40px; margin-top: 3px"
              />
              <textarea
                class="form-control"
                placeholder="有什麼新鮮事?"
                style="height: 125px; width: 425px"
              >
              </textarea>
            </div>

            <div
              class="tweet-button d-flex justify-content-center align-items-end"
            >
              <button class="btn text-white mb-2" type="submit">推文</button>
            </div>
          </form>
        </div>

        <div
          class="other-tweets d-flex py-2"
          @click.stop.prevent="tweetPage(1)"
        >
          <div class="image-area pt-2" style="margin-right: 10px">
            <img
              src="../assets/icon/Icon.png"
              alt=""
              style="width: 40px; height: 40px"
            />
          </div>

          <div class="tweets-area d-flex flex-wrap">
            <div
              class="profile d-flex justify-content-start align-items-center"
            >
              <span class="follower-name" style="margin-right: 10px"
                >Apple</span
              >
              <span class="follower-account">@apple ‧ 3小時</span>
            </div>

            <div class="tweet" style="text-align: start">
              <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti. i amdf aodfj
                dlafjsf, sjfaf afjsdl asljaf aslfjl
              </p>
            </div>

            <div class="icon-area d-flex justify-content-start">
              <div class="comments" style="margin-right: 30px">
                <router-link to="" style="margin-right: 10px">
                  <img src="../assets/icon/reply_icon.svg" alt="comment-icon" />
                </router-link>
                <small>12</small>
              </div>
              <div class="likes">
                <img
                  src="../assets/icon/like_icon.svg"
                  alt="like-icon"
                  style="margin-right: 10px"
                />
                <small>76</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-3 pr-0 pl-2">
        <FollowWho />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar";
import FollowWho from "../components/FollowWho";

export default {
  components: {
    SideBar,
    FollowWho,
  },
  methods: {
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
html {
  position: relative;
  z-index: -1;
  background-color: black;
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
  padding: 10px 15px 0 15px;
}
.tweet-form {
  width: 100%;
}
textarea {
  resize: none;
  border: none;
  overflow: hidden;
}
textarea::-webkit-input-placeholder {
  font-size: 20px;
  font-weight: bold;
  color: rgb(197, 195, 195);
}
textarea:-ms-input-placeholder {
  font-size: 20px;
  font-weight: bold;
  color: rgb(197, 195, 195);
}
textarea:-moz-placeholder {
  font-size: 20px;
  font-weight: bold;
  color: rgb(197, 195, 195);
}
textarea:focus {
  box-shadow: none;
}
textarea:focus:-moz-placeholder,
textarea:focus:-ms-input-placeholder,
textarea:focus::-webkit-input-placeholder {
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
.tweet,
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
.fa-times:hover {
  cursor: pointer;
}
.tweeting-area {
  z-index: 999;
  position: absolute;
  border-radius: 15px;
  border: 2px #e9e9e9 solid;
  width: 450px;
  height: 250px;
}
</style>