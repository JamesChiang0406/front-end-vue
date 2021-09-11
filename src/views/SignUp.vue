<template>
  <div class="container d-flex flex-column align-items-center py-2">
    <div>
      <img src="../assets/icon/Icon.png" alt="icon" />
    </div>

    <form class="signin-area" @submit.stop.prevent="handleSubmit">
      <div class="mt-3 title">
        <p>建立你的帳號</p>
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
        />
      </div>

      <!-- name -->
      <div class="form-label-group mb-2">
        <label for="name">名稱</label>
        <input
          type="text"
          class="form-control mt-3"
          v-model="name"
          name="name"
          id="name"
          required
        />
      </div>

      <!-- email -->
      <div class="form-label-group mb-2">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control mt-3"
          v-model="email"
          name="email"
          id="email"
          required
        />
      </div>

      <!-- password -->
      <div class="form-label-group mb-2">
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
      <div class="form-label-group mb-3">
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

      <div class="btn-wrapper">
        <button
          class="btn my-2 submit-btn"
          type="submit"
          :disabled="isProcessing"
        >
          {{ isProcessing ? "處理中..." : "註冊" }}
        </button>

        <div>
          <router-link to="/signin" style="font-weight: bold">取消</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { Toast } from "../utils/helpers";
import userAPI from "../apis/users";

export default {
  data() {
    return {
      account: "",
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      isProcessing: false,
    };
  },

  methods: {
    async handleSubmit() {
      try {
        if (
          !this.account ||
          !this.name ||
          !this.email ||
          !this.password ||
          !this.passwordCheck
        ) {
          return Toast.fire({
            icon: "error",
            title: "尚有欄位未填寫，請重新確認！",
          });
        }

        this.isProcessing = true;
        const { data } = await userAPI.create({
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck,
        });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        Toast.fire({
          icon: "success",
          title: "創立成功，返回登入頁面！",
          closeButtonHtml: true,
        });
        this.$router.push({ name: "sign-in" });
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法建立帳號，請稍後再試！",
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
  font-size: 1rem;
}

label {
  position: absolute;
  margin: 5px 0 10px 10px;
  font-size: 15px;
  color: rgb(92, 94, 134);
}
</style>