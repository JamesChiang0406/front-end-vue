<template>
  <div class="container py-1 px-0" style="height: 100%">
    <div
      class="d-flex flex-column justify-content-between"
      style="height: 100%"
    >
      <div class="link-area">
        <div class="title mb-3">
          <img src="../assets/icon/Icon.png" alt="icon" />
        </div>

        <div class="admin-main mb-2">
          <img
            v-if="pageIsMainPage"
            src="../assets/icon/home_icon_active.png"
            alt="home-icon"
          />
          <img v-else src="../assets/icon/home_icon.png" alt="home-icon" />

          <router-link
            v-if="pageIsMainPage"
            to="/admin_main"
            style="color: #ff6600"
            >推文清單</router-link
          >
          <router-link v-else to="/admin_main">推文清單</router-link>
        </div>

        <div class="users-list mb-2">
          <img
            v-if="pageIsUserPage"
            src="../assets/icon/user_icon_active.png"
            alt="user-icon"
          />
          <img v-else src="../assets/icon/user_icon.png" alt="user-icon" />

          <router-link
            v-if="pageIsUserPage"
            to="/admin_users"
            style="color: #ff6600"
            >使用者列表</router-link
          >
          <router-link v-else to="/admin_users">使用者列表</router-link>
        </div>
      </div>

      <div class="logout-area" style="padding-left: 3px">
        <img src="../assets/icon/logout_icon.png" alt="logout-icon" />
        <router-link to="/admin">
          <button type="button" @click="logout">登出</button>
        </router-link>
      </div>
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
      pageIsMainPage: true,
      pageIsUserPage: false,
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
      if (this.pageName === "mainPage") {
        this.pageIsMainPage = true;
        this.pageIsUserPage = false;
      } else if (this.pageName === "userPage") {
        this.pageIsMainPage = false;
        this.pageIsUserPage = true;
      } else {
        this.pageIsMainPage = false;
        this.pageIsUserPage = false;
      }
    },
  },
};
</script>

<style scoped>
img {
  width: 28px;
  height: 28px;
  margin-right: 15px;
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
  color: black;
  background-color: transparent;
  border-color: transparent;
  font-weight: bold;
}
button:hover {
  color: #ff6600;
}

.link-area,
.logout-area {
  text-align: start;
}

.admin-main,
.users-list,
.logout-area {
  height: 45px;
  display: flex;
  align-items: center;
}
</style>