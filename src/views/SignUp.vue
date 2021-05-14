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
        />
      </div>

      <!-- email -->
      <div class="form-label-group mb-2">
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
      <div class="form-label-group mb-2">
        <label for="password">密碼</label>
        <input
          type="password"
          class="form-control mt-3"
          v-model="password"
          name="password"
          id="password"
        />
      </div>

      <!-- passwordCheck -->
      <div class="form-label-group mb-3">
        <label for="passwordCheck">密碼確認</label>
        <input
          type="text"
          class="form-control mt-3"
          v-model="passwordCheck"
          name="passwordCheck"
          id="passwordCheck"
        />
      </div>

      <div class="btn-wrapper">
        <button class="btn my-2 submit-btn" type="submit">註冊</button>

        <div>
          <router-link to="/signin" style="font-weight: bold">取消</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: "",
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    };
  },

  methods: {
    handleSubmit() {
      const data = JSON.stringify({
        account: this.account,
        name: this.name,
        email: this.email,
        password: this.password,
        passwordCheck: this.passwordCheck,
      });

      console.log(data);
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