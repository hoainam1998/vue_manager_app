<template>
  <div class="layout">
    <div class="login_form">
      <img src="../assets/logo.png" alt="logo" />
      <div v-if="errs.length > 0">
        <div class="alert alert-danger" role="alert">
          <span v-for="(err, index) in errs" :key="index">{{ err }}</span>
        </div>
      </div>
      <form id="login_form" @submit.prevent="handleSubmit">
        <div>
          <label>Ten dang nhap</label>
          <input
            type="text"
            name="tendanhnhap"
            placeholder="vd:hoainam"
            v-model="user.tendangnhap"
            required
          />
        </div>
        <div>
          <label>Mat khau</label>
          <input type="password" name="matkhau" v-model="user.matkhau" required/>
        </div>
        <button type="submit">Dang nhap</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      user: {
        tendangnhap: "",
        matkhau: "",
      },
      errs: [],
    };
  },
  methods: {
    ...mapActions("user", ["setUsers"]),
    handleSubmit() {
      let errs = [];
      let list_user_authen = this.$store.getters["user/getUsers"];
      const tendangnhap_exist = list_user_authen.findIndex(
        (user) => user.ten_dang_nhap === this.user.tendangnhap
      );
      const matkhau_exist = list_user_authen.findIndex(
        (user) => user.matkhau === this.user.matkhau
      );
      if (tendangnhap_exist === -1) {
        errs.push("Ten dang nhap khong dung!");
      } else if (matkhau_exist === -1) {
        errs.push("Mat khau khong dung!");
      } else {
        let user_authen = list_user_authen.find(
          (user) =>
            user.ten_dang_nhap === this.user.tendangnhap &&
            user.matkhau === this.user.matkhau
        );
        sessionStorage.setItem("user_authen", JSON.stringify(user_authen));
      }
      if (errs.length > 0) {
        this.errs = errs;
      } else {
        location.href = "#/home";
      }
    },
  },
  async created(){
     await this.setUsers();
  }
};
</script>

<style scoped>
.layout {
  height: 100vh;
  position: relative;
}

.login_form {
  padding: 1.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20%;
  transform: translate(-50%, -50%);
}

.login_form img {
  display: block;
  margin: 0 auto;
}

#login_form div {
  margin-bottom: 1rem;
}

#login_form div label {
  display: block;
  color: #27ae60;
  font-weight: bold;
  margin-bottom: 10px;
}

#login_form div input {
  height: 35px;
  border: 1.5px solid #2c3e50;
  border-radius: 4px;
  outline: none;
  padding-left: 6px;
  font-size: 18px;
  width: 100%;
}

button[type="submit"] {
  background: #27ae60;
  outline: none;
  padding: 10px 0;
  text-align: center;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  width: 100%;
  cursor: pointer;
}

button[type="submit"]:hover {
  background: #2ecc71;
}
</style>
