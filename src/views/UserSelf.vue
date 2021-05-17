<template>
  <div class="container">
    <div class="row">
      <div class="col-3 px-4">
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
              alt=""
              style="width: 100%; height: 200px"
            />

            <div class="edit-area d-flex justify-content-between px-3">
              <img src="../assets/icon/Icon.png" alt="" class="user-pic" />
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
            <div class="following mr-3">
              <span>34個跟隨中</span>
            </div>

            <div class="followers">
              <span>59位跟隨者</span>
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

.following,
.followers,
.user-name {
  font-weight: bold;
}

.following,
.followers,
.description {
  font-size: 0.75rem;
}
</style>