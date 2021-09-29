<template>
  <div class="container d-flex flex-column">
    <div class="d-flex flex-column justify-content-start">
      <div class="title d-flex justify-content-start">
        <img src="../assets/icon/Icon.png" alt="title" />
      </div>

      <div class="link-area mt-3">
        <div class="home-page">
          <img
            v-if="homeIsClicked"
            src="../assets/icon/home_icon_active.png"
            alt="home-page"
          />
          <img v-else src="../assets/icon/home_icon.png" alt="home-page" />

          <router-link
            v-if="homeIsClicked"
            to="/mainpage"
            style="color: #ff6600"
            >首頁</router-link
          >
          <router-link v-else to="/mainpage">首頁</router-link>
        </div>

        <div class="profile">
          <img
            v-if="profileIsClicked"
            src="../assets/icon/user_icon_active.png"
            alt="profile"
          />
          <img v-else src="../assets/icon/user_icon.png" alt="profile" />

          <router-link
            v-if="profileIsClicked"
            to="/user/self"
            style="color: #ff6600"
            >個人資料</router-link
          >
          <router-link v-else to="/user/self">個人資料</router-link>
        </div>

        <div class="setting">
          <img
            v-if="settingIsClicked"
            src="../assets/icon/setting_icon_active.png"
            alt="setting"
          />
          <img v-else src="../assets/icon/setting_icon.png" alt="setting" />

          <router-link
            v-if="settingIsClicked"
            to="/setting"
            style="color: #ff6600"
            >設定</router-link
          >
          <router-link v-else to="/setting">設定</router-link>
        </div>
      </div>

      <div class="tweet-btn mt-3">
        <button class="btn">推文</button>
      </div>
    </div>

    <div class="logout-area">
      <img src="../assets/icon/logout_icon.png" alt="logout" />
      <router-link to="">登出</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      homeIsClicked: false,
      profileIsClicked: false,
      settingIsClicked: false,
    };
  },
};
</script>

<style scoped>
.container {
  height: 600px;
  justify-content: space-between;
}
img {
  width: 25px;
  height: 25px;
  margin-right: 30px;
}

.link-area,
.logout-area {
  text-align: start;
}

a {
  color: black;
  text-decoration-line: none;
  font-weight: bold;
}
a:hover {
  color: #ff6600;
}

button {
  color: white;
  border-radius: 50px;
  background-color: #ff6600;
  border-color: #ff6600;
  width: 100%;
  height: 35px;
  font-size: 0.9rem;
  padding: 5px;
}
button:hover {
  color: white;
}

.home-page,
.profile,
.setting,
.logout-area {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
</style>