<template>
  <div class="layout">
    <div class="login_form">
      <img src="../assets/logo.png" alt="logo" />
      <div v-if="errs.length > 0">
        <div class="alert alert-danger" role="alert">
          <span v-for="(err, index) in errs" :key="index">{{ err }}</span>
        </div>
      </div>
      <form id="login_form" @submit.prevent="handleSubmit" class="title_form">
        <b-form-group
          id="tendangnhap"
          label="Ten dang nhap"
          label-for="input_tendangnhap"
        >
          <b-form-input
            id="input_tendangnhap"
            name="tendangnhap"
            v-model="$v.user.tendangnhap.$model"
            :state="validateState('tendangnhap')"
            aria-describedby="tendangnhap-feedback"
          ></b-form-input>

          <b-form-invalid-feedback id="tendangnhap-feedback"
            >This is a required field and must be at least 3
            characters.</b-form-invalid-feedback
          >
        </b-form-group>
        <b-form-group
          id="matkhau"
          label="Mat khau"
          label-for="input_matkhau"
        >
          <b-form-input
            id="input_matkhau"
            name="matkhau"
            v-model="$v.user.matkhau.$model"
            :state="validateState('matkhau')"
            aria-describedby="matkhau-feedback"
          ></b-form-input>

          <b-form-invalid-feedback id="matkhau-feedback"
            >This is a required field and must be at least 3
            characters.</b-form-invalid-feedback
          >
        </b-form-group>
        <button type="submit">Dang nhap</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { validationMixin } from "vuelidate"
import { required, minLength } from "vuelidate/lib/validators"
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
  mixins:[validationMixin],
  validations:{
    user:{
      tendangnhap:{
        required,
        minLength: minLength(3)
      },
      matkhau:{
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
    ...mapActions("user", ["setUsers"]),
    ...mapGetters("user", ["getUsers"]),
    handleSubmit() {
      this.validateSubmit()
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
        this.$router.push(this.$route.query.redirect || "/home");
      }
    },

    validateState(name){
      const {$dirty, $error}=this.$v.user[name];
      return $dirty?!$error:null
    },
    
    validateSubmit(){
      this.$v.user.$touch();
      if(this.$v.user.$anyError){
        return;
      }
    }
  },
  created() {
    this.setUsers();
  },
  beforeRouteEnter(to, from, next) {
    let user = JSON.parse(sessionStorage.getItem("user_authen"));
    let path = localStorage.getItem("path");
    if (user && path) {
      next(path);
    } else {
      next();
    }
  },
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
