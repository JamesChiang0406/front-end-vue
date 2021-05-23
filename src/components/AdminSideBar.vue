<template>
  <div class="container py-1 px-0">
    <div class="d-flex flex-column justify-content-between">
      <div class="link-area">
        <div class="title mb-3">
          <img src="../assets/icon/Icon.png" alt="icon" />
        </div>

        <div class="admin-main mb-2">
          <img src="../assets/icon/home_icon.png" alt="home-icon" />
          <router-link to="/admin_main">推文清單</router-link>
        </div>

        <div class="users-list mb-2">
          <img src="../assets/icon/user_icon.png" alt="user-icon" />
          <router-link to="/admin_users">使用者列表</router-link>
        </div>
      </div>

      <div class="logout-area" style="padding-left: 3px">
        <img src="../assets/icon/logout_icon.png" alt="logout-icon" />
        <router-link to="">登出</router-link>
      </div>
    </div>
  </div>
</template>

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