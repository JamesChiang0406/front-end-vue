<template>
  <div class="container">
    <div class="row">
      <div class="col-3 px-4 pt-2">
        <SideBar />
      </div>

      <div class="user-self col-6 p-0 border">
        <div class="nav-bar d-flex align-items-center p-2">
          <div
            class="back-icon mr-4 d-flex align-items-center"
            @click="$router.back()"
          >
            <i class="fas fa-arrow-left"></i>
          </div>

          <div class="title d-flex flex-column">
            <span class="user-name">John Doe</span>
            <small class="tweet-numbers">25 推文</small>
          </div>
        </div>

        <div class="user-profile position-relative">
          <div class="picture-area">
            <img
              src="../assets/icon/Desert.jpg"
              alt="user-pic"
              style="width: 100%; height: 200px"
            />

            <div class="edit-area d-flex justify-content-between px-3">
              <img
                src="../assets/icon/Icon.png"
                alt="user-pic"
                class="user-pic"
              />
              <button class="btn edit-btn">編輯個人資料</button>
            </div>
          </div>
        </div>

        <div class="introduction d-flex flex-column mt-5 p-2">
          <div class="name-account d-flex flex-column position-relative mb-3">
            <span class="user-name">John Doe</span>
            <small class="user-account">@heyjohn</small>
          </div>

          <p class="description">
            At vero eos et accusamus et iusto odio dignissimos ducimus.
          </p>

          <div class="following-followers d-flex">
            <div class="mr-3">
              <router-link to="/user/self/following" class="following">
                <span>34個跟隨中</span>
              </router-link>
            </div>

            <div>
              <router-link to="/user/self/follower" class="followers">
                <span>59位跟隨者</span>
              </router-link>
            </div>
          </div>
        </div>

        <div class="show-btns d-flex justify-content-start border-bottom">
          <router-link class="firstClicked" to="">推文</router-link>
          <router-link class="" to="">推文與回覆</router-link>
          <router-link class="" to="">喜歡的內容</router-link>
        </div>

        <div class="other-tweets d-flex py-2">
          <div class="image-area pt-2" style="margin-right: 15px">
            <img
              src="../assets/icon/Icon.png"
              alt="icon"
              style="width: 40px; height: 40px"
            />
          </div>

          <div
            class="tweets-area d-flex flex-wrap"
            @click.stop.prevent="tweetPage(1)"
          >
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

      <div class="col-3 pr-0 pl-2 pt-2">
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
.title {
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
.edit-btn {
  padding: 2px;
  margin-top: 10%;
  width: 130px;
  height: 40px;
  font-size: 15px;
  border-radius: 30px;
  color: #ff6600;
  border: 1px #ff6600 solid;
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

a {
  width: 23%;
  padding: 10px 0;
  text-decoration-line: none;
  color: #2e2e2e;
  font-size: 16px;
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
  cursor: pointer;
  background-color: #f5f8fa;
}
.profile,
.tweet,
.icon-area {
  width: 100%;
}

a,
.following,
.followers,
.user-name {
  font-weight: bold;
}

.following,
.followers,
.tweet,
.follower-account,
.description {
  font-size: 0.8rem;
}

.follower-account,
.comments,
.likes {
  color: darkgray;
}
</style>