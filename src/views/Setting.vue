<template>
  <div class="container row">
    <div class="d-flex col-12" style="left: 15%">
      <div class="sidebar-area">
        <SideBar page-name="setting" v-on:openArea="openTweetArea" />
      </div>

      <div class="setting-area">
        <div class="title px-3">帳戶設定</div>

        <div class="fa-3x" v-show="isProcessing">
          <i class="fas fa-circle-notch fa-spin"></i>
        </div>
        <div class="setting-form px-3" :class="{ dataReading: isProcessing }">
          <form @submit.stop.prevent="handleSubmit">
            <!-- account -->
            <div class="form-label-group mb-4">
              <label for="account">帳號</label>
              <input
                type="text"
                class="form-control mt-3"
                v-model="account"
                name="account"
                id="account"
              />
            </div>

            <!-- name -->
            <div class="form-label-group mb-4">
              <label for="name">名稱</label>
              <input
                type="text"
                class="form-control mt-3"
                v-model="name"
                name="name"
                id="name"
              />
            </div>

            <!-- email -->
            <div class="form-label-group mb-4">
              <label for="email">Email</label>
              <input
                type="text"
                class="form-control mt-3"
                v-model="email"
                name="email"
                id="email"
                pattern="^\w+((-\w)|(\.\w))*@[A-Za-z0-9]+\.[A-Za-z]+$"
              />
            </div>

            <!-- password -->
            <div class="form-label-group mb-4">
              <label for="password">設定密碼</label>
              <input
                type="password"
                class="form-control mt-3"
                v-model="password"
                name="password"
                id="password"
                required
                autocomplete="off"
                pattern="[0-9]{8}"
                placeholder="請輸入由8位數字組合的密碼"
              />
            </div>

            <!-- passwordCheck -->
            <div class="form-label-group mb-4">
              <label for="passwordCheck">密碼確認</label>
              <input
                type="password"
                class="form-control mt-3"
                v-model="passwordCheck"
                name="passwordCheck"
                id="passwordCheck"
                required
                autocomplete="off"
                pattern="[0-9]{8}"
                placeholder="重新確認密碼"
              />
            </div>

            <div
              class="btn-wrapper d-flex justify-content-end"
              style="width: 540px"
            >
              <button
                class="btn my-2 submit-btn"
                type="submit"
                :disabled="isSetting"
              >
                儲存
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="tweeting-area" v-show="isTweetBtnClicked">
      <TweetingForm v-on:closeArea="closeTweetArea" :user-avatar="userAvatar" />
    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar";
import TweetingForm from "../components/TweetingForm.vue";
import userAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  data() {
    return {
      id: this.$store.state.currentUser.id,
      userAvatar: "",
      account: "",
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      isSetting: false,
      isProcessing: false,
      isTweetBtnClicked: false,
    };
  },

  components: {
    SideBar,
    TweetingForm,
  },

  created() {
    this.fetchUser({ userId: this.id });
  },

  methods: {
    async fetchUser({ userId }) {
      try {
        this.isProcessing = true;
        const { data } = await userAPI.getUser({ userId });
        if (!data) {
          throw new Error();
        }

        this.account = data.account;
        this.name = data.name;
        this.email = data.email;
        this.userAvatar = data.avatar;
        this.isProcessing = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試！",
        });
      }
    },

    async handleSubmit() {
      try {
        if (!this.password || !this.passwordCheck) {
          return Toast.fire({
            icon: "error",
            title: "尚有欄位未填，請重新確認！",
          });
        }
        if (
          !this.password.match(/[0-9]{8}/) ||
          !this.passwordCheck.match(/[0-9]{8}/) ||
          !this.email.match(/^\w+((-\w)|(\.\w))*@[A-Za-z0-9]+\.[A-Za-z]+$/)
        ) {
          return Toast.fire({
            icon: "error",
            title: "格式錯誤，請重新確認！",
          });
        }
        this.isSetting = true;

        const userId = this.id;
        const payload = {
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck,
        };

        const { data } = await userAPI.putUser({ userId }, payload);
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        Toast.fire({
          icon: "success",
          title: "資料設定成功！",
        });
        this.isSetting = false;
      } catch (error) {
        this.isSetting = false;
        Toast.fire({
          icon: "error",
          title: "無法設定使用者資料，請重新確認！",
        });
      }
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
  margin: 0;
  padding: 0;
}

.container {
  height: 100vh;
  margin: 0;
  padding: 0;
}

.tweeting-area {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.sidebar-area {
  width: 320px;
  height: auto;
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
}

.setting-area {
  width: 100%;
  border-left: 2px #e9e9e9 solid;
}

.dataReading {
  display: none;
}

.submit-btn {
  background-color: orangered;
  color: white;
  border-radius: 50px;
  width: 100px;
  height: 40px;
  padding: 5px;
}

span {
  font-weight: normal;
}

.form-label-group {
  position: relative;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  background-color: #f5f8fa;
  border-bottom: 2px #657786 solid;
  margin: 20px 0 0 0;
  height: 50px;
  width: 540px;
  text-decoration: none;
}

input {
  border: none;
  background-color: #f5f8fa;
  height: 50%;
  padding-left: 10px;
}
input::-webkit-input-placeholder {
  font-size: 16px;
}

input:focus {
  background-color: #f5f8fa;
  box-shadow: none;
}
input:focus::-webkit-input-placeholder {
  color: transparent;
}

.title {
  font-weight: bold;
  font-size: 25px;
  text-align: start;
  border-bottom: 2px #e9e9e9 solid;
}

label {
  position: absolute;
  bottom: 15px;
  margin: 5px 0 10px 10px;
  font-size: 15px;
  color: rgb(92, 94, 134);
}
</style>