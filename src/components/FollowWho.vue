<template>
  <div class="container py-2 px-0">
    <div class="title">
      <span>跟隨誰</span>
    </div>

    <div
      class="followers d-flex justify-content-between align-items-center p-2"
      v-for="user in showData"
      :key="user.id"
    >
      <div class="follower-profile d-flex">
        <div class="follower-pic mr-2" style="width: 20%">
          <router-link :to="{ name: 'other-user', params: { id: user.id } }">
            <img :src="user.avatar" alt="" />
          </router-link>
        </div>

        <div
          class="name-account d-flex justify-content-start flex-wrap"
          style="width: 80%"
        >
          <span class="follower-name fw-bold">{{ user.name }}</span>
          <small class="follower-account">@{{ user.account }}</small>
        </div>
      </div>

      <div class="d-flex justify-content-end btns">
        <button
          class="btn following-btn"
          v-if="user.isFollowing"
          @click.stop.prevent="removeFollowing(user.id)"
        >
          跟隨中
        </button>
        <button
          class="btn follow-btn"
          v-else
          @click.stop.prevent="addFollowing(user.id)"
        >
          跟隨
        </button>

        <div v-if="pageName" class="chatBtn-area">
          <button
            class="btn chat-btn"
            @click.stop.prevent="chatToWho(user.name, user.id)"
          >
            聊天
          </button>
        </div>
      </div>
    </div>

    <div class="show-more">
      <button
        class="btn show-btn"
        @click.stop.prevent="showRecommendList"
        v-if="clickable"
      >
        顯示更多
      </button>
    </div>
  </div>
</template>

<script>
import userAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  props: {
    followData: {
      require: false,
    },
    addWho: {
      require: false,
    },
    removeWho: {
      require: false,
    },
    pageName: {
      require: false,
    },
  },

  data() {
    return {
      recommendListData: {},
      showData: [],
      clickable: true,
    };
  },

  created() {
    this.fetchRecommendList();
  },

  watch: {
    addWho: function () {
      if (this.addWho !== -1) {
        this.showData.map((user) => {
          if (user.id === this.addWho) {
            user.isFollowing = true;
          }
        });
      }
    },

    removeWho: function () {
      if (this.removeWho !== -1) {
        this.showData.map((user) => {
          if (user.id === this.removeWho) {
            user.isFollowing = false;
          }
        });
      }
    },
  },

  methods: {
    async fetchRecommendList() {
      try {
        const { data } = await userAPI.getRecommendList();

        this.recommendListData = data;

        if (this.recommendListData.length <= 3) {
          for (let i = 0; i < 1; i++) {
            this.showData.push(data[i]);
          }
        } else {
          for (let i = 0; i < 3; i++) {
            this.showData.push(data[i]);
          }
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得推薦欄資料，請稍後再試！",
        });
      }
    },

    showRecommendList() {
      if (this.showData.length < this.recommendListData.length) {
        this.showData.push(this.recommendListData[this.showData.length]);

        if (this.showData.length === this.recommendListData.length) {
          this.clickable = false;
        }
      }
    },

    async addFollowing(id) {
      try {
        const { data } = await userAPI.addFollowing({ id });
        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.showData.map((user) => {
          if (user.id === id) {
            user.isFollowing = true;
          } else {
            return;
          }
        });

        this.$emit("addMark", id);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法追蹤，請稍後再試！",
        });
      }
    },

    async removeFollowing(id) {
      try {
        const { data } = await userAPI.removeFollowing({ id });
        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.showData.map((user) => {
          if (user.id === id) {
            user.isFollowing = false;
          } else {
            return;
          }
        });
        this.$emit("removeMark", id);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法操作，請稍後再試！",
        });
      }
    },

    chatToWho(name, id) {
      const roomDetail = { name, id };
      this.$emit("chatArea", roomDetail);
    },
  },
};
</script>

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

.follower-profile {
  width: 50%;
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

.btns {
  width: 50%;
}
.follow-btn {
  border-radius: 20px;
  color: #ff6600;
  border-color: #ff6600;
  width: 50%;
  height: 100%;
  font-size: 0.9rem;
  padding: 5px 2px 2px 2px;
  margin-right: 10px;
}
.following-btn {
  border-radius: 20px;
  color: white;
  background-color: #ff6600;
  border-color: #ff6600;
  width: 50%;
  height: 100%;
  font-size: 0.8rem;
  padding: 5px 2px 2px 2px;
  margin-right: 10px;
}

.chat-btn {
  border-radius: 20px;
  color: white;
  background-color: #319ae0;
  width: 50px;
  height: 35px;
  font-size: 0.9rem;
  padding: 5px;
}

.show-more {
  text-align: start;
}
.show-btn {
  color: #ff6600;
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 0;
  box-shadow: none;
}

.follower-pic:hover {
  opacity: 0.5;
}

@media screen and (max-width: 992px) {
  .follower-profile {
    width: 25%;
  }
  .name-account {
    z-index: -999;
  }

  .btns {
    width: 75%;
  }
  .follow-btn,
  .following-btn {
    margin: 0 5px;
  }
}

@media screen and (max-width: 768px) {
  .btns {
    flex-direction: column;
    align-items: center;
    margin-left: 20px;
  }
  .follow-btn,
  .following-btn {
    width: 80%;
    font-size: 10px;
  }

  .chatBtn-area {
    width: 80%;
  }
  .chat-btn {
    width: 100%;
    height: 25px;
    font-size: 10px;
  }
}
</style>