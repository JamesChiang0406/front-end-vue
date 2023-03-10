<template>
  <div class="setting-form border">
    <div
      class="cancel-area px-3 d-flex justify-content-start align-items-center p-2"
      style="color: #ff6600"
      @click.stop.prevent="closeArea"
    >
      <i class="fas fa-times close-btn"></i>
    </div>

    <div class="border-top p-2" style="width: 100%; height: 100%">
      <form
        class="tweet-form d-flex flex-column m-0"
        id="formData"
        style="width: 100%; height: 80%"
        @submit.stop.prevent="handleSubmit"
        enctype="multipart/form-data"
      >
        <div class="input-group">
          <input
            type="file"
            class="form-control px-2 py-1 mr-2"
            name="image"
            id="file"
            @change="handleChange"
          />
          <button class="btn btn-outline-secondary" type="submit">上傳</button>
        </div>
        <div class="mt-2">
          <img
            :src="imgURL"
            alt="image"
            v-show="isAvatar"
            style="width: 90px; height: 90px; border-radius: 100%"
          />

          <img
            :src="imgURL"
            alt="image"
            v-show="isCover"
            style="width: 100%; height: 250px"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import userAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  props: {
    editWhere: {
      require: false,
    },
  },

  data() {
    return {
      imgURL: "",
      isCover: false,
      isAvatar: false,
    };
  },

  methods: {
    async handleSubmit(e) {
      try {
        const formData = new FormData(e.target);

        if (this.editWhere === "avatar") {
          const { data } = await userAPI.putAvatarImg({ formData });

          if (data.status === "error") {
            throw new Error(data.message);
          }

          Toast.fire({
            icon: "success",
            title: "個人照片更新成功！",
          });

          document.getElementById("formData").reset();
          this.isAvatar = false;
          this.$emit("updateImg");
        } else if (this.editWhere === "cover") {
          const { data } = await userAPI.putCoverImg({ formData });

          if (data.status === "error") {
            throw new Error(data.message);
          }

          Toast.fire({
            icon: "success",
            title: "封面照片更新成功！",
          });

          document.getElementById("formData").reset();
          this.isCover = false;
          this.$emit("updateImg");
        } else {
          return Toast.fire({
            icon: "error",
            title: "無效的操作，請稍後再試！",
          });
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法更改圖片，請稍後再試！",
        });
      }
    },

    handleChange(e) {
      const { files } = e.target;

      if (files.length === 0) {
        this.imgURL = "";
      } else {
        if (this.editWhere === "avatar") {
          this.imgURL = window.URL.createObjectURL(files[0]);
          this.isAvatar = true;
        } else {
          this.imgURL = window.URL.createObjectURL(files[0]);
          this.isCover = true;
        }
      }
    },

    closeArea() {
      document.getElementById("formData").reset();
      this.imgURL = "";
      this.isAvatar = false;
      this.isCover = false;
      this.$emit("closeArea");
    },
  },
};
</script>

<style scoped>
.setting-form {
  background-color: white;
  width: 650px;
  border-radius: 10px;
  margin-left: 375px;
  margin-top: 150px;
}

.close-btn:hover {
  cursor: pointer;
}
</style>