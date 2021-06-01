<template>
  <div
    class="edit-page"
    style="
      border: 2px #e9e9e9 solid;
      border-radius: 10px;
      background-color: white;
      width: 520px;
      height: 500px;
      margin-left: 33%;
      margin-top: 5%;
    "
  >
    <form action="" method="post" style="width: 100%; height: 100%">
      <div
        class="title-area d-flex justify-content-between align-items-center px-3 py-2"
        style="width: 100%; height: 11%"
      >
        <div class="title d-flex align-items-center">
          <i class="fas fa-times"></i>
          <span style="font-size: 16px; font-weight: bold; margin-left: 15px"
            >編輯個人資料</span
          >
        </div>

        <button class="btn text-white" type="submit">儲存</button>
      </div>

      <div
        class="image-area position-relative"
        style="width: 100%; height: 40%; margin-bottom: 4%"
      >
        <div
          class="cover-area d-flex justify-content-center align-items-center"
          style="width: 100%; height: 90%; color: white"
        >
          <label for="user-cover">
            <i class="fas fa-camera"></i>
            <input
              type="file"
              name="cover"
              id="user-cover"
              style="width: 100px; display: none"
            />
            <i class="fas fa-times" style="margin-left: 35px"></i>
          </label>
        </div>

        <div
          class="picture-area d-flex justify-content-center align-items-center pt-2"
          style="width: 75px; height: 75px; color: white"
        >
          <label for="user-pic">
            <i class="fas fa-camera"></i>
            <input
              type="file"
              name="userPic"
              id="user-pic"
              style="width: 100px; display: none"
            />
          </label>
        </div>
      </div>

      <div
        class="name-description d-flex flex-column justify-content-around"
        style="width: 100%; height: 40%"
      >
        <div
          class="name d-flex flex-column align-items-end px-2 position-relative"
          style="width: 100%"
        >
          <span style="font-size: 14px; position: absolute; left: 3%"
            >名稱</span
          >
          <input
            type="text"
            name="name"
            id="user-name"
            maxlength="50"
            style="padding: 15px 10px 0px 10px"
          />
          <small>8/50</small>
        </div>

        <div
          class="description d-flex flex-column align-items-end px-2 position-relative"
          style="width: 100%; height: 60%"
        >
          <span style="font-size: 14px; position: absolute; left: 3%"
            >自我介紹</span
          >
          <textarea
            type="text"
            name="description"
            id="user-description"
            rows="3"
            cols="50"
            maxlength="160"
            style="
              height: 90%;
              resize: none;
              padding-top: 15px;
              padding-left: 8px;
            "
          ></textarea>
          <small>0/169</small>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
button {
  border-radius: 50px;
  background-color: #ff6600;
  border-color: #ff6600;
  width: 70px;
  height: 30px;
  font-size: 0.9rem;
  padding: 2px;
}
small {
  font-size: 14px;
  color: darkgray;
}

.picture-area {
  position: absolute;
  top: 70%;
  left: 10px;
  background-image: url("../assets/icon/Icon.png");
  background-size: cover;
  background-position: center;
  background-color: white;
  border-radius: 50%;
  border: 3px white solid;
}

.cover-area {
  background-image: url("../assets/icon/Desert.jpg");
  background-size: cover;
  background-position: center;
}

#user-name,
#user-description {
  width: 100%;
  border: none;
  outline: none;
  background-color: #f5f8fa;
  border-radius: 1px;
  border-bottom: 1px black solid;
}
</style>