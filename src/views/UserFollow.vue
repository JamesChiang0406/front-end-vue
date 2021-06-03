<template>
  <div class="container">
    <div class="row">
      <div class="col-3 px-4 pt-2">
        <SideBar />
      </div>

      <div class="follow-list col-6 p-0 border">
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

        <div class="following-followers d-flex mt-3">
          <div class="follower firstClicked">
            <span>跟隨者</span>
          </div>

          <div class="following">
            <span>正在跟隨</span>
          </div>
        </div>

        <div
          class="members p-2 d-flex"
          style="border-bottom: 2px #dee2e6 solid"
        >
          <div class="member-pic pt-2 mr-2">
            <img
              src="../assets/icon/Icon.png"
              alt="member-pic"
              style="width: 40px; height: 40px"
            />
          </div>

          <div class="member-data">
            <div class="d-flex justify-content-between align-items-center">
              <div class="member d-flex flex-column">
                <span class="member-name" style="font-weight: bold">Laure</span>
                <small class="member-account">@LaureBill</small>
              </div>

              <button class="follow-btn btn">跟隨</button>
              <button class="following-btn btn">正在跟隨</button>
            </div>

            <p class="member-description m-0" style="font-size: 0.8rem">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti.
            </p>
          </div>
        </div>

        <div
          class="members p-2 d-flex"
          style="border-bottom: 2px #dee2e6 solid"
        >
          <div class="member-pic pt-2 mr-2">
            <img
              src="../assets/icon/Icon.png"
              alt="member-pic"
              style="width: 40px; height: 40px"
            />
          </div>

          <div class="member-data">
            <div class="d-flex justify-content-between align-items-center">
              <div class="member d-flex flex-column">
                <span class="member-name" style="font-weight: bold">Laure</span>
                <small class="member-account">@LaureBill</small>
              </div>

              <button class="follow-btn btn">跟隨</button>
              <button class="following-btn btn">正在跟隨</button>
            </div>

            <p class="member-description m-0" style="font-size: 0.8rem">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti.
            </p>
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
};
</script>

<style scoped>
.title {
  text-align: start;
  position: relative;
  bottom: 8px;
}
.user-name {
  font-weight: bold;
}
.tweet-numbers {
  font-size: 0.5rem;
  position: absolute;
  top: 25px;
}

.follower,
.following {
  width: 20%;
  height: 35px;
  font-size: 0.8rem;
  font-weight: bold;
  color: darkgray;
}
.firstClicked,
.clicking {
  color: #ff6600;
  border-bottom: 2px #ff6600 solid;
}

.member-account {
  font-size: 0.8rem;
  color: darkgray;
}
.member-name,
.member-account,
.member-description {
  text-align: start;
}

.follow-btn {
  width: 70px;
  height: 35px;
  border-color: #ff6600;
  color: #ff6600;
  border-radius: 50px;
  font-size: 0.9rem;
  padding: 5px;
}
.following-btn {
  display: none;
  border-radius: 20px;
  color: white;
  background-color: #ff6600;
  border-color: #ff6600;
  width: 80px;
  height: 100%;
  font-size: 0.7rem;
  padding: 5px 2px 2px 2px;
}
</style>