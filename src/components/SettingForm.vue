<template>
  <div class="setting-form">
    <div
      class="
        cancel-area
        px-3
        d-flex
        justify-content-start
        align-items-center
        p-2
      "
      style="color: #ff6600"
      @click.stop.prevent="closeArea"
    >
      <i class="fas fa-times close-btn"></i>
    </div>

    <div class="border-top p-2" style="width: 100%; height: 100%">
      <form
        class="tweet-form d-flex flex-column m-0"
        style="width: 100%; height: 80%"
        @submit.stop.prevent="handleSubmit"
      >
        <!-- account -->
        <div class="form-label-group d-flex align-items-center mt-4">
          <label for="account">帳號</label>
          <input
            type="text"
            class="form-control"
            v-model="account"
            name="account"
            id="account"
            required
          />
        </div>

        <!-- name -->
        <div class="form-label-group d-flex align-items-center mt-4">
          <label for="name">名稱</label>
          <input
            type="text"
            class="form-control"
            v-model="name"
            name="name"
            id="name"
            required
          />
        </div>

        <!-- email -->
        <div class="form-label-group d-flex align-items-center mt-4">
          <label for="email">Email</label>
          <input
            type="text"
            class="form-control"
            v-model="email"
            name="email"
            id="email"
            pattern="^\w+((-\w)|(\.\w))*@[A-Za-z0-9]+\.[A-Za-z]+$"
            required
          />
        </div>

        <!-- password -->
        <div class="form-label-group d-flex align-items-center mt-4">
          <label for="password">設定密碼</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            name="password"
            id="password"
            autocomplete="off"
            pattern="[0-9]{8}"
            placeholder="請輸入由8位數字組合的密碼"
            required
          />
        </div>

        <!-- passwordCheck -->
        <div class="form-label-group d-flex align-items-center mt-4">
          <label for="passwordCheck">密碼確認</label>
          <input
            type="password"
            class="form-control"
            v-model="passwordCheck"
            name="passwordCheck"
            id="passwordCheck"
            autocomplete="off"
            pattern="[0-9]{8}"
            placeholder="重新確認密碼"
            required
          />
        </div>

        <div
          class="
            tweet-button
            col-2
            d-flex
            justify-content-center
            align-items-end
            p-0
          "
        >
          <div class="btn-area">
            <button
              class="btn submit-btn text-white mt-4 ml-3"
              type="submit"
              :disabled="isSetting"
            >
              儲存
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
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

  created() {
    this.fetchUser();
  },

  methods: {
    closeArea() {
      this.password = "";
      this.passwordCheck = "";
      this.$emit("closeArea");
    },

    async fetchUser() {
      try {
        const { data } = await userAPI.getUser({ userId: this.id });
        if (!data) {
          throw new Error();
        }

        this.account = data.account;
        this.name = data.name;
        this.email = data.email;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍候再試！",
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
          title: "設定成功！",
        });
        this.isSetting = false;
        this.$emit("closeSetAndUp");
      } catch (error) {
        this.isSetting = false;
        Toast.fire({
          icon: "error",
          title: "無法設定，請稍候再試！",
        });
      }
    },
  },
};
</script>

<style scoped>
.setting-form {
  background-color: white;
  width: 700px;
  height: 540px;
  border: 2px #e9e9e9 solid;
  border-radius: 15px;
  margin-left: 325px;
  margin-top: 80px;
}

.close-btn:hover {
  cursor: pointer;
}

label {
  width: 20%;
  font-size: 16px;
  margin-right: 2px;
}
input {
  padding: 0;
  padding-left: 5px;
  width: 75%;
}
input:focus {
  box-shadow: none;
}
input:focus::-webkit-input-placeholder {
  color: transparent;
}

.submit-btn {
  background-color: orangered;
  color: white;
  border-radius: 50px;
  width: 100px;
  height: 40px;
  padding: 5px;
}
</style>