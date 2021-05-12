<template>
  <div class="container border">
    <div class="row mt-2">
      <div class="col-3 px-4">
        <SideBar />
      </div>

      <div class="tweet-area col-6">
        <div
          class="title d-flex justify-content-start align-items-center border"
        >
          <i class="fas fa-arrow-left"></i>
          <div class="ml-2">
            <span>推文</span>
          </div>
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
          <div class="image-area mr-2 pt-2">
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
              <span class="follower-name mr-1">Apple</span>
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
              <div class="comments mr-4">
                <router-link to="" class="mr-1">
                  <img src="../assets/icon/reply_icon.svg" alt="comment-icon" />
                </router-link>
                <small>12</small>
              </div>
              <div class="likes">
                <img
                  src="../assets/icon/like_icon.svg"
                  alt="like-icon"
                  class="mr-1"
                />
                <small>76</small>
              </div>
            </div>
          </div>
        </div>

        <div class="other-tweets d-flex py-2">
          <div class="image-area mr-2 pt-2">
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
              <span class="follower-name mr-1">Apple</span>
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
              <div class="comments mr-4">
                <router-link to="" class="mr-1">
                  <img src="../assets/icon/reply_icon.svg" alt="comment-icon" />
                </router-link>
                <small>12</small>
              </div>
              <div class="likes">
                <img
                  src="../assets/icon/like_icon.svg"
                  alt="like-icon"
                  class="mr-1"
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
};
</script>

<style scoped>
.container {
  width: 100%;
}

.title {
  border-bottom: 2px #e9e9e9 solid;
  font-weight: bolder;
  padding: 20px 0px 10px 15px;
}
</style>