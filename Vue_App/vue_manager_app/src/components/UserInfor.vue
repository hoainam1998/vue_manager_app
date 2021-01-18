<template>
  <section class="user_infor_layout">
    <div class="user_box">
        <img src="../assets/user.svg" alt="logo" />
        <span>user<i class="fas fa-caret-down"></i></span>
    </div>
  </section>
</template>
<script>
export default {
  name: "Userinfor",
  created(){
    console.log(JSON.parse(sessionStorage.getItem('user_authen')))
  }
};
</script>
<style scoped>
 .user_infor_layout {
    width: 100%;
    background: white;
    border-radius: 4px;
    margin-bottom: 15px;
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
    margin-right: .5rem;
    width: 35px;
}

.fa-caret-down {
    margin-left: 5px;
}
</style>