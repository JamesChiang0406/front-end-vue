<template>
  <div class="container px-0 border">
    <div class="title d-flex justify-content-between align-items-center px-2">
      <span>{{ chattingTo.chatterName }}</span>

      <div class="close-area" @click="closeArea">
        <i class="fas fa-times close-btn"></i>
      </div>
    </div>

    <div
      class="contents"
      ref="contents"
      style="min-width: 50px; max-width: 300px"
    >
      <div class="chats" id="chats" v-for="chat in chats" :key="chat.id">
        <div
          class="row justify-content-end align-items-end"
          v-if="chat.isUserMsg"
        >
          <div
            class="col-6 border"
            style="
              border-radius: 18px;
              padding: 7px 15px;
              min-width: 50px;
              max-width: 200px;
              background-color: #70b6e6;
              color: white;
            "
          >
            <span>{{ chat.chatDetail }}</span>
          </div>
          <div class="col-3 justify-content-center p-0 m-0">
            <img
              :src="userAvatar"
              alt="user-avatar"
              style="
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-left: 10px;
              "
            />
          </div>
        </div>

        <div class="row align-items-end" v-else>
          <div class="col-3">
            <img
              :src="chat.chatterAvatar"
              alt="chatter-avatar"
              style="
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 10px;
              "
            />
          </div>
          <div
            class="col-6"
            style="
              margin: 0;
              border-radius: 18px;
              padding: 7px 15px;
              min-width: 50px;
              max-width: 200px;
              background-color: rgb(222, 226, 230, 0.3);
            "
          >
            <span>{{ chat.chatDetail }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="input-group mb-3">
      <textarea
        v-model="message"
        type="text"
        class="form-control"
        placeholder="請輸入..."
        style="overflow: auto; resize: none"
        ref="inputArea"
        @focus="scrollMoveToPresent"
      ></textarea>
      <div class="send-btn" @click="sendMessage">
        <i class="fas fa-play"></i>
      </div>
    </div>
  </div>
</template>

<script>
import chatAPI from "../apis/chat";
import { Toast } from "../utils/helpers";

export default {
  props: {
    chattingTo: {
      require: false,
    },
    index: {
      require: false,
    },
  },

  data() {
    return {
      userAvatar: this.$store.state.currentUser.avatar,
      chats: [],
      message: "",
    };
  },

  created() {
    this.fetchChats();
  },

  updated() {
    this.scrollMoveToPresent();
  },

  sockets: {
    receiveMsg(data) {
      if (
        data.id === this.chattingTo.chatterId &&
        data.talkingTo === this.$store.state.currentUser.id
      ) {
        data.isUserMsg =
          data.id === this.$store.state.currentUser.id ? true : false;

        delete data.id;
        delete data.talkingTo;

        this.chats.push(data);
      }
    },
  },

  watch: {
    chats() {
      this.$refs.inputArea.focus();
      this.scrollMoveToPresent();
    },
  },

  methods: {
    async fetchChats() {
      try {
        if (this.chattingTo.chatterId === this.$store.state.currentUser.id) {
          throw new Error();
        }

        const { data } = await chatAPI.getChats({
          chatter_id: this.chattingTo.chatterId,
        });
        this.chats = data;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試！",
        });
      }
    },

    async sendMessage() {
      const data = {
        chatDetail: this.message,
        chatterAvatar: this.$store.state.currentUser.avatar,
        id: this.$store.state.currentUser.id,
        talkingTo: this.chattingTo.chatterId,
        createdAt: new Date(),
      };

      this.$socket.emit("send", data);

      data.isUserMsg =
        data.id === this.$store.state.currentUser.id ? true : false;

      delete data.id;
      delete data.talkingTo;

      await chatAPI.postChat({
        chatter_id: this.chattingTo.chatterId,
        content: this.message,
      });

      this.chats.push(data);
      this.message = "";
    },

    scrollMoveToPresent() {
      this.$refs.contents.scrollTo({
        top: this.$refs.contents.scrollTop + 1000,
        behavior: "smooth",
      });
    },

    closeArea() {
      this.$emit("closeArea", this.chattingTo.chatterName);
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },
  },
};
</script>

<style scoped>
.container {
  height: 300px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.title {
  background-color: #70b6e6;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom: 2px #e9e9e9 solid;
  color: white;
  text-align: start;
  font-weight: bold;
}

.close-btn:hover {
  cursor: pointer;
}

.contents {
  position: relative;
  background: white;
  height: 225px;
  overflow: auto;
}
.contents::-webkit-scrollbar {
  display: none;
}

.chats {
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: 15px;
  padding: 4px 10px;
  text-align: initial;
}

.form-control:focus {
  box-shadow: none;
}

.form-control:focus::placeholder {
  color: transparent;
}

textarea::-webkit-scrollbar {
  display: none;
}

.send-btn {
  position: absolute;
  z-index: 999;
  top: 50%;
  right: 5%;
}

.send-btn:hover {
  color: #70b6e6;
  cursor: pointer;
}
</style>