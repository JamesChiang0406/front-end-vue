<template>
  <div class="container">
    <div class="row">
      <div class="col-3 px-4 pt-2">
        <SideBar page-name="profile" v-on:openArea="openTweetArea" />
      </div>

      <div
        class="fa-3x col-6"
        style="border: 2px #e9e9e9 solid; padding: 0"
        v-show="isProcessing"
      >
        <i class="fas fa-circle-notch fa-spin"></i>
      </div>
      <div
        class="follow-list col-6 p-0 border"
        :class="{ dataReading: isProcessing }"
      >
        <div class="nav-bar d-flex align-items-center p-2">
          <div
            class="back-icon mr-3 d-flex align-items-center"
            @click="$router.back()"
          >
            <i class="fas fa-arrow-left"></i>
          </div>
          <div class="title d-flex align-items-center">
            <span class="user-name" style="font-weight: bold">
              {{ userName }}
            </span>
          </div>
        </div>

        <div class="following-followers d-flex mt-3">
          <div
            class="follower"
            :class="{ firstClicked: followersClicked }"
            @click.stop.prevent="fetchFollowers(userId)"
          >
            <span>跟隨者</span>
          </div>

          <div
            class="following"
            :class="{ firstClicked: followingsClicked }"
            @click.stop.prevent="fetchFollowings(userId)"
          >
            <span>正在跟隨</span>
          </div>
        </div>

        <div
          class="members p-2 d-flex"
          style="border-bottom: 2px #dee2e6 solid"
          v-for="user in followData"
          :key="user.id"
        >
          <div class="member-pic pt-2 mr-1" style="width: 11%">
            <router-link :to="{ name: 'other-user', params: { id: user.id } }">
              <img
                :src="user.avatar"
                alt="..."
                style="width: 40px; height: 40px"
              />
            </router-link>
          </div>

          <div class="member-data" style="width: 89%">
            <div
              class="d-flex justify-content-between align-items-center"
              style="margin-bottom: 12px"
            >
              <div class="member d-flex flex-column" style="position: relative">
                <router-link
                  :to="{ name: 'other-user', params: { id: user.id } }"
                  class="member-name"
                >
                  {{ user.name }}
                </router-link>
                <small class="member-account">@{{ user.account }}</small>
              </div>

              <button
                class="following-btn btn"
                v-if="user.isUserFollowing"
                @click.stop.prevent="removeFollowing(user.id)"
              >
                正在跟隨
              </button>
              <button
                class="follow-btn btn"
                v-else
                @click.stop.prevent="addFollowing(user.id)"
              >
                跟隨
              </button>
            </div>

            <p class="member-description m-0" style="font-size: 0.8rem">
              {{ user.introduction }}
            </p>
          </div>
        </div>
      </div>

      <div class="col-3 pr-0 pl-2 pt-2">
        <FollowWho
          :follow-data="followData"
          :add-who="addWho"
          :remove-who="removeWho"
          v-on:addMark="addFollowMark"
          v-on:removeMark="removeFollowMark"
        />
      </div>
    </div>

    <div class="tweeting-area" v-show="isTweetBtnClicked">
      <TweetingForm v-on:closeArea="closeTweetArea" />
    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar";
import FollowWho from "../components/FollowWho";
import TweetingForm from "../components/TweetingForm.vue";
import { Toast } from "../utils/helpers";
import userAPI from "../apis/users";

export default {
  components: {
    SideBar,
    FollowWho,
    TweetingForm,
  },

  data() {
    return {
      userId: this.$store.state.currentUser.id,
      followData: [],
      followersClicked: true,
      followingsClicked: false,
      userName: "",
      addWho: -1,
      removeWho: -1,
      isProcessing: false,
      isTweetBtnClicked: false,
    };
  },

  created() {
    this.followersOrfollowings();
    this.fetchUser(this.userId);
    this.followersClicked
      ? this.fetchFollowers(this.userId)
      : this.fetchFollowings(this.userId);
  },

  methods: {
    async fetchUser(id) {
      try {
        const { data } = await userAPI.getUser({ userId: id });
        if (!data) {
          throw new Error();
        }

        this.userName = data.name;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試！",
        });
      }
    },

    async fetchFollowers(id) {
      try {
        this.isProcessing = true;
        const { data } = await userAPI.getFollowers({ userId: id });
        if (data.length === 0) {
          Toast.fire({
            icon: "warning",
            title: "此帳戶無跟隨者資料！",
          });
        }

        this.followersClicked = true;
        this.followingsClicked = false;
        this.followData = data;
        this.isProcessing = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試！",
        });
      }
    },

    async fetchFollowings(id) {
      try {
        this.isProcessing = true;
        const { data } = await userAPI.getFollowings({ userId: id });
        if (data.length === 0) {
          Toast.fire({
            icon: "warning",
            title: "此帳戶無跟隨中的資料",
          });
        }

        this.followersClicked = false;
        this.followingsClicked = true;
        this.followData = data;
        this.isProcessing = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試！",
        });
      }
    },

    async addFollowing(id) {
      try {
        const { data } = await userAPI.addFollowing({ id });
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.followData.map((user) => {
          if (user.id === id) {
            user.isUserFollowing = true;
          }
        });
        this.addWho = id;
        this.removeWho = -1;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法採取此動作，請稍後再試！",
        });
      }
    },

    async removeFollowing(id) {
      try {
        const { data } = await userAPI.removeFollowing({ id });
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.followData.map((user) => {
          if (user.id === id) {
            user.isUserFollowing = false;
          }
        });
        this.removeWho = id;
        this.addWho = -1;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法採取此動作，請稍後再試！",
        });
      }
    },

    async followersOrfollowings() {
      if (this.$route.path.split("/").includes("followings")) {
        this.followersClicked = false;
        this.followingsClicked = true;
      }
    },

    addFollowMark(id) {
      this.followData.map((user) => {
        if (user.id === id) {
          user.isUserFollowing = true;
        }
      });
    },

    removeFollowMark(id) {
      this.followData.map((user) => {
        if (user.id === id) {
          user.isUserFollowing = false;
        }
      });
    },

    openTweetArea() {
      this.isTweetBtnClicked = true;
    },

    closeTweetArea() {
      this.isTweetBtnClicked = false;
    },
  },
};
</script>

<style scoped>
body {
  position: relative;
  z-index: 1;
}

.tweeting-area {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.5);
}

.title {
  text-align: start;
  position: relative;
}

.dataReading {
  display: none;
}

.follower,
.following {
  width: 20%;
  height: 35px;
  font-size: 0.8rem;
  font-weight: bold;
  color: darkgray;
}
.follower:hover,
.following:hover {
  cursor: pointer;
}
.firstClicked {
  color: #ff6600;
  border-bottom: 2px #ff6600 solid;
}

.member-account {
  position: absolute;
  text-align: start;
  font-size: 0.8rem;
  color: darkgray;
  top: 17px;
  left: -2px;
}
.member-name {
  text-align: start;
  font-size: 16px;
  font-weight: bold;
  text-decoration-line: none;
  color: #2e2e2e;
}
.member-description {
  text-align: start;
}
.member-pic:hover {
  opacity: 0.5;
}
.member-name:hover {
  color: crimson;
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