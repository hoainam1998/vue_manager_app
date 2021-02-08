<template>
  <section class="user_infor_layout">
    <div class="user_box" @click="show_boxInfor">
      <img src="../assets/user.svg" alt="logo" />
      <span>{{ this.username }}<i class="fas fa-caret-down"></i></span>
      <ul class="box_infor" v-if="show">
        <li>Ho so</li>
        <li @click="logout($event)">Thoat</li>
      </ul>
    </div>
  </section>
</template>
<script>
export default {
  name: "Userinfor",
  data() {
    return {
      username: "",
      show: false
    };
  },
  methods: {
    show_boxInfor() {
      this.show=!this.show;
    },
    logout($event){
      $event.stopPropagation();
      sessionStorage.removeItem('user_authen');
      this.$router.push('/')
    }
  },
  created() {
    let user_auth = JSON.parse(sessionStorage.getItem("user_authen"));
    if (user_auth) {
      this.username = user_auth.tendangnhap;
    }
  },
};
</script>
<style scoped>
.user_infor_layout {
  width: 100%;
  background: white;
  border-radius: 4px;
  margin: 12px 0;
  position: relative;
}

.user_box {
  padding: 1.5rem 2rem;
  display: flex;
  align-content: center;
  float: right;
  cursor: pointer;
}

.user_box span {
  padding-top: 6px;
}

.user_box img {
  margin-right: 0.5rem;
  width: 35px;
}

.fa-caret-down {
  margin-left: 5px;
}

.box_infor {
  border-radius: 4px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: absolute;
  bottom: -27px;
  margin: 0; padding: 0;
  background: white;
  width: 120px;
  text-align: center;
}
</style>