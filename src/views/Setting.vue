<template>
  <div class="wrapper d-flex p-0">
    <div class="sidebar-area">
      <SideBar />
    </div>

    <div class="setting-area">
      <div class="title px-3">帳戶設定</div>

      <div class="setting-form px-3">
        <form>
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
            />
          </div>

          <!-- passwordCheck -->
          <div class="form-label-group mb-4">
            <label for="passwordCheck">密碼確認</label>
            <input
              type="text"
              class="form-control mt-3"
              v-model="passwordCheck"
              name="passwordCheck"
              id="passwordCheck"
            />
          </div>

          <div
            class="btn-wrapper d-flex justify-content-end"
            style="width: 540px"
          >
            <button class="btn my-2 submit-btn" type="submit">儲存</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar";

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
  components: {
    SideBar,
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