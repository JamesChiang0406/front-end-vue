<template>
  <div class="container d-flex flex-column align-items-center py-5">
    <div>
      <img src="../assets/icon/Icon.png" alt="icon" />
    </div>

    <form class="signin-area" @submit.stop.prevent="handleSubmit">
      <div class="my-2 title">
        <p>登入 Alphitter</p>
      </div>

      <!-- account -->
      <div class="form-label-group mb-2">
        <label for="account">帳號</label>
        <input
          type="text"
          class="form-control mt-3"
          v-model="account"
          name="account"
          id="account"
          required
          autofocus
        />
      </div>

      <!-- password -->
      <div class="form-label-group mb-3">
        <label for="password">密碼</label>
        <input
          type="password"
          class="form-control mt-3"
          v-model="password"
          name="password"
          id="password"
          required
          autocomplete="off"
        />
      </div>

      <div class="btn-wrapper">
        <button
          class="btn my-2 submit-btn"
          type="submit"
          :disabled="isProcessing"
        >
          登入
        </button>

        <div class="buttons mt-3">
          <router-link to="/signup">註冊 Alphitter </router-link>
          <span class="text-primary mx-2"> ‧ </span>
          <router-link to="/admin"> 後台登入</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import authApi from "../apis/auth";
import { Toast } from "../utils/helpers";

export default {
  data() {
    return {
      account: "",
      password: "",
      isProcessing: false,
    };
  },

  methods: {
    async handleSubmit() {
      try {
        // 錯誤處理
        if (!this.account || !this.password) {
          return Toast.fire({
            icon: "error",
            title: "帳號或密碼未輸入，請重新確認！",
          });
        }

        this.isProcessing = true;
        const { data } = await authApi.signIn({
          account: this.account,
          password: this.password,
        });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        localStorage.setItem("token", data.token);
        this.$store.commit("setCurrentUser", data.user);
        this.$router.push({ name: "main-page" });
      } catch (error) {
        this.password = "";
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "帳號或密碼有誤，請重新確認！",
        });
      }
    },
  },
};
</script>

<style scoped>
form {
  width: 540px;
}

.submit-btn {
  width: 540px;
  background-color: orangered;
  color: white;
  border-radius: 50px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  font-weight: bolder;
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
  height: auto;
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
  font-weight: bolder;
}

label {
  position: absolute;
  margin: 5px 0 10px 10px;
  font-size: 15px;
  color: rgb(92, 94, 134);
}
</style>