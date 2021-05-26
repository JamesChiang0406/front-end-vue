<template>
  <div
    class="tweeting-form"
    style="
      background-color: white;
      width: 450px;
      height: 250px;
      border: 2px #e9e9e9 solid;
      border-radius: 15px;
      margin-left: 425px;
      margin-top: 80px;
    "
  >
    <div
      class="cancel-area px-3 d-flex justify-content-start p-2"
      style="color: #ff6600"
    >
      <i class="fas fa-times"></i>
    </div>

    <div class="border-top p-2" style="width: 100%; height: 100%">
      <form class="tweet-form row m-0" style="width: 100%; height: 80%">
        <div
          class="message-area col-10 d-flex justify-content-center align-items-start pl-0"
        >
          <img
            src="../assets/icon/Icon.png"
            alt="avatar-img"
            style="width: 40px; height: 40px; margin-right: 10px"
          />

          <textarea
            class="form-control"
            placeholder="有什麼新鮮事?"
            style="height: 100%; width: 100%; border: none; resize: none"
          >
          </textarea>
        </div>

        <div
          class="tweet-button col-2 d-flex justify-content-center align-items-end p-0"
        >
          <button class="btn text-white mb-2" type="submit">推文</button>
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

textarea:focus::placeholder {
  color: transparent;
}
</style>