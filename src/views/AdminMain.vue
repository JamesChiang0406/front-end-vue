<template>
  <div class="container mr-0">
    <div class="row">
      <div class="col-3 p-0">
        <AdminSideBar />
      </div>

      <div class="tweets-list col-9 p-0">
        <div class="title">
          <span>推文清單</span>
        </div>

        <div class="tweets d-flex p-2">
          <div class="tweeter-pic pt-2 mr-2">
            <router-link to="/user/1">
              <img
                src="../assets/icon/Icon.png"
                alt="tweeter-pic"
                style="width: 45px; height: 45px"
              />
            </router-link>
          </div>

          <div class="content">
            <div class="name-account">
              <router-link to="/user/1" class="mr-2">
                <span>Apple</span>
              </router-link>

              <small>@apple</small>
              <small> ‧ 10小時</small>
            </div>

            <div class="tweet-text">
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti.
              </p>
            </div>
          </div>

          <div class="delete-btn">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSideBar from "../components/AdminSideBar";

export default {
  components: {
    AdminSideBar,
  },
};
</script>

<style scoped>
small {
  font-size: 0.75rem;
  color: darkgray;
}

a {
  color: black;
  text-decoration-line: none;
}
a:hover {
  color: #007bff;
}

p {
  margin: 0;
  font-size: 0.9rem;
}

.tweets-list {
  border-left: 2px #dee2e6 solid;
  height: 100vh;
}
.tweets {
  border-bottom: 2px #dee2e6 solid;
}

.title {
  display: flex;
  align-items: center;
  height: 50px;

  padding-top: 10px;
  padding-left: 20px;
  border-bottom: 2px #dee2e6 solid;

  text-align: start;
  font-weight: 900;
}

.tweeter-pic:hover {
  opacity: 0.5;
}

.content {
  text-align: start;
}

.delete-btn {
  width: 5%;
  color: darkgrey;
}

.tweet-text {
  width: 100%;
}
</style>