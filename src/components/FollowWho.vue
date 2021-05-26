<template>
  <div class="container py-2 px-0">
    <div class="title">
      <span>跟隨誰</span>
    </div>

    <div
      class="followers d-flex justify-content-between align-items-center p-2"
    >
      <div class="follower-profile d-flex" style="width: 75%">
        <div class="follower-pic" style="width: 20%">
          <router-link to="/user/1">
            <img src="../assets/icon/Icon.png" alt="follower-pic" />
          </router-link>
        </div>

        <div
          class="name-account d-flex justify-content-start flex-wrap"
          style="width: 80%"
        >
          <span class="follower-name fw-bold">Mr Denny's</span>
          <small class="follower-account">@mrdennys</small>
        </div>
      </div>

      <div style="width: 25%">
        <button class="btn follow-btn">跟隨</button>
      </div>
    </div>

    <div
      class="followers d-flex justify-content-between align-items-center p-2"
    >
      <div class="follower-profile d-flex" style="width: 75%">
        <div class="follower-pic" style="width: 20%">
          <router-link to="/user/1">
            <img src="../assets/icon/Icon.png" alt="follower-pic" />
          </router-link>
        </div>

        <div
          class="name-account d-flex justify-content-start flex-wrap"
          style="width: 80%"
        >
          <span class="follower-name fw-bold">Mr Denny's</span>
          <small class="follower-account">@mrdennys</small>
        </div>
      </div>

      <div style="width: 25%">
        <button class="btn follow-btn">跟隨</button>
      </div>
    </div>

    <div class="show-more">
      <button class="btn show-btn">顯示更多</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: #f5f8fa;
  border-radius: 15px;
}

.title {
  border-bottom: 2px #e9e9e9 solid;
  padding-left: 10px;
  text-align: start;
  font-weight: bold;
}

.followers {
  width: 100%;
  height: 65px;
  border-bottom: 1px #e9e9e9 solid;
}
img {
  width: 40px;
  height: 40px;
}
.name-account {
  text-align: start;
  position: relative;
  padding-left: 12px;
}
.follower-account {
  color: darkgray;
  position: absolute;
  top: 15px;
  left: 10px;
}
.follower-account,
.follower-name {
  font-size: 16px;
}

.follow-btn {
  border-radius: 50px;
  color: #ff6600;
  border-color: #ff6600;
  width: 100%;
  height: 100%;
  font-size: 0.9rem;
  padding: 5px 2px 2px 2px;
}

.show-more {
  text-align: start;
}
.show-btn {
  color: #ff6600;
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 0;
}

.follower-pic:hover {
  opacity: 0.5;
}
</style>