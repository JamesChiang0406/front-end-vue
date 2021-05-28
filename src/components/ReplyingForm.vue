<template>
  <div
    class="tweeting-form"
    style="
      background-color: white;
      width: 500px;
      height: auto;
      border: 2px #e9e9e9 solid;
      border-radius: 15px;
      margin-left: 425px;
      margin-top: 70px;
    "
  >
    <div
      class="cancel-area px-3 d-flex justify-content-start p-2"
      style="color: #ff6600"
    >
      <i class="fas fa-times"></i>
    </div>

    <div class="reply-to d-flex pt-2" style="width: 100%; height: 40%">
      <div
        class="image-area d-flex flex-column align-items-center mx-1"
        style="width: 10%"
      >
        <img
          src="../assets/icon/Icon.png"
          alt="replied-pic"
          style="width: 40px; height: 40px; margin: 5px 0"
        />
        <div class="stripe border"></div>
      </div>

      <div
        class="message-area"
        style="text-align: start; width: 90%; height: 100%"
      >
        <div class="name-account" style="font-size: 16px">
          <span class="name mr-1" style="font-weight: bold">Apple</span>
          <small class="account">@apple </small>
          <small class="publish-time">‧ 3小時</small>
        </div>

        <div class="text">
          <p style="font-size: 16px; margin-bottom: 10px">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti.
          </p>
        </div>

        <div class="reply-to" style="font-size: 16px">
          <small>回覆給 </small>
          <router-link to="/user/1" style="color: #ff6600">@apple</router-link>
        </div>
      </div>
    </div>

    <div style="width: 100%; height: 50%">
      <form class="tweet-form row m-0" style="width: 100%; height: 100%">
        <div
          class="message-area col-10 d-flex justify-content-center align-items-start pt-1 pl-0"
        >
          <img
            src="../assets/icon/Icon.png"
            alt="avatar-img"
            style="width: 40px; height: 40px; margin: 0 10px"
          />

          <textarea
            class="form-control"
            placeholder="轉推你的回覆"
            style="
              height: 180px;
              width: 100%;
              border: none;
              resize: none;
              padding: 5px 0 0 0;
            "
          >
          </textarea>
        </div>

        <div
          class="tweet-button col-2 d-flex justify-content-center align-items-end p-0"
        >
          <button class="btn text-white mb-2" type="submit">回覆</button>
        </div>
      </form>
    </div>
  </div>
</template>


<style scoped>
button {
  border-radius: 50px;
  background-color: #ff6600;
  border-color: #ff6600;
  width: 70px;
  height: 35px;
  font-size: 0.9rem;
  padding: 5px;
}

textarea:focus {
  box-shadow: none;
}
textarea:focus::placeholder {
  color: transparent;
}

small {
  color: #7c7c7c;
}

.stripe {
  width: 10%;
  height: 80%;
  background-color: #dee2e6;
  border-radius: 30px;
}
</style>