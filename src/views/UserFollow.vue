<template>
  <div class="container">
    <div class="row">
      <div class="col-3 px-4 pt-2">
        <SideBar />
      </div>

      <div class="follow-list col-6 p-0 border">
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
          v-on:addMark="addFollowMark"
          v-on:removeMark="removeFollowMark"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar";
import FollowWho from "../components/FollowWho";
import { Toast } from "../utils/helpers";
import userAPI from "../apis/users";

export default {
  components: {
    SideBar,
    FollowWho,
  },

  data() {
    return {
      userId: this.$store.state.currentUser.id,
      followData: [],
      followersClicked: true,
      followingsClicked: false,
      userName: "",
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
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試！",
        });
      }
    },

    async fetchFollowings(id) {
      try {
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
            user.isFollowing = true;
          }
        });
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
            user.isFollowing = false;
          }
        });
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
          user.isFollowing = true;
        }
      });
    },

    removeFollowMark(id) {
      this.followData.map((user) => {
        if (user.id === id) {
          user.isFollowing = false;
        }
      });
    },
  },
};
</script>

<style scoped>
.title {
  text-align: start;
  position: relative;
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