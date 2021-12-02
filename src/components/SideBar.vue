<template>
  <div class="container d-flex flex-column">
    <div class="d-flex flex-column justify-content-start">
      <div class="title d-flex justify-content-start">
        <img src="../assets/icon/Icon.png" alt="title" />
      </div>

      <div class="link-area mt-3">
        <div class="home-page">
          <img
            v-if="pageIsHome"
            class="switchToHere"
            src="../assets/icon/home_icon_active.png"
            alt="home-page"
          />
          <img v-else src="../assets/icon/home_icon.png" alt="home-page" />

          <router-link
            v-if="pageIsHome"
            to="/mainpage"
            style="color: #ff6600"
            :class="{ switchToHere: pageIsHome }"
            >首頁</router-link
          >
          <router-link v-else to="/mainpage">首頁</router-link>
        </div>

        <div class="profile">
          <img
            v-if="pageIsProfile"
            class="switchToHere"
            src="../assets/icon/user_icon_active.png"
            alt="profile"
          />
          <img v-else src="../assets/icon/user_icon.png" alt="profile" />

          <router-link
            v-if="pageIsProfile"
            to="/user/self"
            style="color: #ff6600"
            :class="{ switchToHere: pageIsProfile }"
            >個人資料</router-link
          >
          <router-link v-else to="/user/self">個人資料</router-link>
        </div>

        <div class="setting">
          <img
            v-if="pageIsSetting"
            class="switchToHere"
            src="../assets/icon/setting_icon_active.png"
            alt="setting"
          />
          <img v-else src="../assets/icon/setting_icon.png" alt="setting" />

          <router-link
            v-if="pageIsSetting"
            to="/setting"
            style="color: #ff6600"
            :class="{ switchToHere: pageIsSetting }"
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
      <router-link to="/signin">
        <button type="button" @click="logout" class="logout-btn">登出</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageName: {
      require: false,
    },
  },

  data() {
    return {
      pageIsHome: true,
      pageIsProfile: false,
      pageIsSetting: false,
    };
  },

  created() {
    this.iconSwitch();
  },

  methods: {
    logout() {
      this.$store.commit("revokeAuthentication");
    },

    iconSwitch() {
      if (this.pageName === "profile") {
        this.pageIsProfile = true;
        this.pageIsHome = false;
        this.pageIsSetting = false;
      } else if (this.pageName === "setting") {
        this.pageIsSetting = true;
        this.pageIsProfile = false;
        this.pageIsHome = false;
      } else if (this.pageName === "homePage") {
        this.pageIsHome = true;
        this.pageIsSetting = false;
        this.pageIsProfile = false;
      } else {
        this.pageIsHome = false;
        this.pageIsSetting = false;
        this.pageIsProfile = false;
      }
    },
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
.switchToHere:hover {
  cursor: default;
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
.logout-btn {
  color: black;
  background-color: transparent;
  border-color: transparent;
  font-weight: bold;
  text-decoration-line: none;
}
.logout-btn:hover {
  color: black;
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