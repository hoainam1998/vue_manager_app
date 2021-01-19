<template>
    <main>
        <Menu />
        <MainContent />
    </main>
</template>
<script>
import Menu from "../components/Menu"
import MainContent from '../components/MainContent'
export default {
  name: "Home",
  components: {
    Menu,
    MainContent
  },
  methods:{
    auth_user(){
      let sessionUser=JSON.parse(sessionStorage.getItem("user_authen"));
      if(sessionUser===null){
        location.href="/"
      }
    }
  },
  created(){
    this.auth_user();
  }
};
</script>
<style scoped>
main {
    display: grid;
    grid-template-columns: 15% 85%;
    background: #ecf0f1;
}
</style>