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
            autocomplete="on"
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
import { mapActions,mapGetters } from "vuex";
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
    ...mapGetters('user',['getUsers']),
    handleSubmit() {
      let errs = [];
      let list_user_authen = this.getUsers();
      const tendangnhap_exist = list_user_authen.findIndex(
        (user) => user.tendangnhap === this.user.tendangnhap
      );

      const matkhau_exist = list_user_authen.findIndex(
        (user) => user.matkhau === this.user.matkhau
      );

      if (tendangnhap_exist === -1) {
        errs.push("Ten dang nhap khong dung!");
      } else if (matkhau_exist === -1) {
        errs.push("Mat khau khong dung!");
      } 

      if (errs.length > 0) {
        this.errs = errs;
      } else {
        let user_authen = list_user_authen.find(
          (user) =>
            user.tendangnhap === this.user.tendangnhap &&
            user.matkhau === this.user.matkhau
        );
        sessionStorage.setItem("user_authen", JSON.stringify(user_authen));
        this.$router.push(this.$route.query.redirect || '/home')
      }
    },
  },
  async created(){
     await this.setUsers()
  },
  beforeRouteEnter(to,from,next){
    let user=JSON.parse(sessionStorage.getItem('user_authen'));
    let path=localStorage.getItem('path')
    if(user && path){
      next(path)
    }else {
      next()
    }
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
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
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
