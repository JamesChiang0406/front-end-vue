<template>
  <div class="container mr-0">
    <div class="row">
      <div class="col-2 p-0 sidebar-area" style="height: 350px">
        <AdminSideBar page-name="userPage" />
      </div>

      <div class="users-list col-10 p-0">
        <div class="title">
          <span>使用者列表</span>
        </div>

        <div class="users-area d-flex pl-4 flex-wrap">
          <div
            class="
              users
              d-flex
              flex-column
              align-items-center
              mx-1
              mt-3
              pb-2
              border
            "
            v-for="user in users"
            :key="user.id"
          >
            <div class="user-img position-relative mb-4">
              <img :src="user.cover" alt="cover" class="user-cover" />
              <img :src="user.avatar" alt="userPic" class="user-pic" />
            </div>

            <div
              class="name-account d-flex flex-column"
              style="text-align: center"
            >
              <span>{{ user.name }}</span>
              <small style="color: rgb(141, 140, 140)"
                >@{{ user.account }}</small
              >
            </div>

            <div class="icon-area d-flex">
              <div class="comments mr-3">
                <img
                  src="../assets/icon/reply_icon.svg"
                  alt="reply-icon"
                  class="mr-1"
                />
                <small>{{ user.tweetNumbers }}</small>
              </div>

              <div class="likes">
                <img
                  src="../assets/icon/like_icon.svg"
                  alt="like-icon"
                  class="mr-1"
                />
                <small>{{ user.likeNumbers }}</small>
              </div>
            </div>

            <div class="following-followers d-flex" style="font-weight: 900">
              <div class="following mr-2">
                <small class="numbers">{{ user.followingNumbers }} 個</small>
                <small style="color: indianred">跟隨中</small>
              </div>

              <div class="followers">
                <small class="numbers">{{ user.followerNumbers }} 位</small>
                <small style="color: indianred">跟隨者</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSideBar from "../components/AdminSideBar";
import { Toast } from "../utils/helpers";
import adminAPI from "../apis/admin";

export default {
  components: {
    AdminSideBar,
  },

  data() {
    return {
      users: [],
    };
  },

  created() {
    this.fetchUsers();
  },

  methods: {
    async fetchUsers() {
      try {
        const { data } = await adminAPI.getUsers();
        this.users = data;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試！",
        });
      }
    },
  },
};
</script>

<style scoped>
span {
  font-size: 18px;
  font-weight: 900;
}

.container {
  height: 100vh;
}

.users-area {
  width: 100%;
  height: 100%;
}

.users-list {
  height: 100%;
  border-left: 2px #dee2e6 solid;
}

.title {
  display: flex;
  align-items: center;
  height: 50px;

  padding-top: 10px;
  padding-left: 20px;
  border-bottom: 2px #dee2e6 solid;

  text-align: start;
  font-weight: 900;
}

.users {
  width: 211px;
  height: 231px;
  border-radius: 10px;
  background-color: rgb(250, 250, 250);
}

.user-img {
  width: 100%;
  height: 40%;
}
.user-cover {
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.user-pic {
  position: absolute;
  width: 65px;
  height: 65px;
  top: 50%;
  left: 35%;
  border: 3px white solid;
  background-color: white;
  border-radius: 50%;
}

@media screen and (max-width: 992px) {
  .sidebar-area {
    font-size: 14px;
  }
}

@media screen and (max-width: 768px) {
  .sidebar-area {
    font-size: 10px;
  }
}
</style>