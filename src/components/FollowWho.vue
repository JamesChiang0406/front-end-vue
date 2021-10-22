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
      <div class="follower-profile d-flex" style="width: 75%">
        <div class="follower-pic" style="width: 20%">
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

      <div style="width: 25%">
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
    toPageId: {
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
    toPageId: function () {
      this.showData = [];
      for (let i = 0; i < 3; i++) {
        this.showData.push(this.recommendListData[i]);
      }
      this.clickable = true;
    },
  },

  methods: {
    async fetchRecommendList() {
      try {
        const { data } = await userAPI.getRecommendList();

        this.recommendListData = data;
        for (let i = 0; i < 3; i++) {
          this.showData.push(data[i]);
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
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法操作，請稍後再試！",
        });
      }
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
  border-radius: 20px;
  color: #ff6600;
  border-color: #ff6600;
  width: 100%;
  height: 100%;
  font-size: 0.9rem;
  padding: 5px 2px 2px 2px;
}
.following-btn {
  border-radius: 20px;
  color: white;
  background-color: #ff6600;
  border-color: #ff6600;
  width: 100%;
  height: 100%;
  font-size: 0.8rem;
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
  box-shadow: none;
}

.follower-pic:hover {
  opacity: 0.5;
}
</style>