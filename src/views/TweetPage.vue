<template>
  <div class="container">
    <div class="row mt-2">
      <div class="col-3 px-4">
        <SideBar />
      </div>

      <div class="tweet-text col-6 border">
        <div class="title d-flex justify-content-start align-items-center px-3">
          <div class="back-icon mr-3" @click="$router.back()">
            <i class="fas fa-arrow-left"></i>
          </div>
          <span>推文</span>
        </div>

        <div class="tweet-area d-flex flex-column">
          <div class="tweeter-profile d-flex px-3 my-2">
            <img
              src="../assets/icon/Icon.png"
              alt="avatar-img"
              style="
                width: 40px;
                height: 40px;
                margin-top: 5px;
                margin-right: 10px;
              "
            />

            <div class="name-account d-flex justify-content-center flex-column">
              <span class="follower-name fw-bold">Mr Denny's</span>
              <small class="follower-account">@mrdennys</small>
            </div>
          </div>

          <div class="article px-3">
            <p class="mb-1">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti. i amdf aodfj dlafjsf,
              sjfaf afjsdl asljaf aslfjl
            </p>
          </div>

          <div class="publish-time pb-1">
            <span>上午 10:05 ‧ 2020年6月10日</span>
          </div>

          <div class="replys-likes d-flex flex-column">
            <div class="numbers d-flex px-2 py-1">
              <div class="mr-2">
                <span class="reply-numbers">34 </span>
                <span>回覆</span>
              </div>

              <div>
                <span class="like-numbers">808 </span>
                <span>喜歡次數</span>
              </div>
            </div>

            <div class="icon d-flex justify-content-start p-2">
              <img
                src="../assets/icon/reply_icon.svg"
                alt=""
                style="width: 25px; height: 25px; margin-right: 110px"
              />
              <img
                src="../assets/icon/like_icon.svg"
                alt=""
                style="width: 25px; height: 25px"
              />
            </div>
          </div>
        </div>

        <div class="replys d-flex py-2 px-3">
          <div class="image-area pt-2" style="margin-right: 10px">
            <img
              src="../assets/icon/Icon.png"
              alt=""
              style="width: 40px; height: 40px"
            />
          </div>

          <div class="text-area d-flex flex-column flex-wrap">
            <div
              class="profile d-flex justify-content-start align-items-center"
            >
              <span class="follower-name" style="margin-right: 10px"
                >Mary Jane</span
              >
              <span class="follower-account">@mjjane ‧ 13小時</span>
            </div>

            <div class="reply-to">
              <span style="font-size: 15px; margin-right: 3px">回覆</span>
              <router-link to="" style="font-size: 15px">@apple</router-link>
            </div>

            <div class="tweet">
              <p class="m-0">Great~</p>
            </div>
          </div>
        </div>

        <div class="replys d-flex py-2 px-3">
          <div class="image-area pt-2" style="margin-right: 10px">
            <img
              src="../assets/icon/Icon.png"
              alt=""
              style="width: 40px; height: 40px"
            />
          </div>

          <div class="text-area d-flex flex-column flex-wrap">
            <div
              class="profile d-flex justify-content-start align-items-center"
            >
              <span class="follower-name" style="margin-right: 10px"
                >Squishy Tom</span
              >
              <span class="follower-account">@sushiTom ‧ 13小時</span>
            </div>

            <div class="reply-to">
              <span style="font-size: 15px; margin-right: 3px">回覆</span>
              <router-link to="" style="font-size: 15px">@apple</router-link>
            </div>

            <div class="tweet">
              <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-3 pr-0 pl-2">
        <FollowWho />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar";
import FollowWho from "../components/FollowWho";

export default {
  components: {
    SideBar,
    FollowWho,
  },
};
</script>

<style scoped>
span {
  font-weight: bold;
}

.container {
  padding: 0;
  width: 90%;
}

.tweet-text {
  padding: 0;
}

.title {
  padding: 20px 0px 10px 15px;
}
.back-icon:hover {
  cursor: pointer;
}
.tweet,
.follower-name {
  font-size: 18px;
}
.follower-account {
  font-size: 15px;
  color: #807a7a;
}
.publish-time {
  margin: 10px 10px;
  font-size: 0.75rem;
  color: #6e6e6e;
}
.numbers {
  font-size: 0.8rem;
}
.icon {
}
.name-account,
.article,
.publish-time,
.replys-likes,
.reply-to,
.tweet {
  text-align: start;
}
.replys,
.title,
.publish-time,
.numbers,
.icon {
  border-bottom: 2px #e9e9e9 solid;
}
</style>