<template>
  <div class="wrapper d-flex p-0">
    <div class="sidebar-area">
      <SideBar />
    </div>

    <div class="setting-area">
      <div class="title px-3">帳戶設定</div>

      <div class="setting-form px-3">
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
            />
          </div>

          <!-- password -->
          <div class="form-label-group mb-4">
            <label for="password">密碼</label>
            <input
              type="password"
              class="form-control mt-3"
              v-model="password"
              name="password"
              id="password"
              required
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
</template>

<script>
import SideBar from "../components/SideBar";
import userAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  data() {
    return {
      id: this.$store.state.currentUser.id,
      account: "",
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      isSetting: false,
    };
  },

  components: {
    SideBar,
  },

  created() {
    this.fetchUser({ userId: this.id });
  },

  methods: {
    async fetchUser({ userId }) {
      try {
        const { data } = await userAPI.getUser({ userId });

        this.account = data.account;
        this.name = data.name;
        this.email = data.email;
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
        console.log(data);
        this.isSetting = false;
      } catch (error) {
        this.isSetting = false;
        Toast.fire({
          icon: "error",
          title: "無法設定使用者資料，請重新確認！",
        });
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  margin-left: 100px;
  margin-right: 0;
  height: 100vh;
}

.sidebar-area {
  width: 320px;
  padding-top: 8px;
}

.setting-area {
  width: 100%;
  border-left: 2px #e9e9e9 solid;
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
}

input:focus {
  background-color: #f5f8fa;
  box-shadow: none;
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