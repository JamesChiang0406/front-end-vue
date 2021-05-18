<template>
  <div class="container d-flex flex-column">
    <div class="d-flex flex-column justify-content-start">
      <div class="title d-flex justify-content-start">
        <img src="../assets/icon/Icon.png" alt="title" />
      </div>

      <div class="link-area mt-3">
        <div class="home-page">
          <img src="../assets/icon/home_icon.png" alt="home-page" />
          <router-link to="/mainpage">首頁</router-link>
        </div>

        <div class="profile">
          <img src="../assets/icon/user_icon.png" alt="profile" />
          <router-link to="/user/self">個人資料</router-link>
        </div>

        <div class="setting">
          <img src="../assets/icon/setting_icon.png" alt="setting" />
          <router-link to="/setting">設定</router-link>
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

<style scoped>
.container {
  height: 100%;
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