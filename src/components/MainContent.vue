<template>
  <section class="main_content">
    <UserInfor />
    <router-view></router-view>
  </section>
</template>
<script>
import UserInfor from "./UserInfor";
export default {
  name: "MainContent",
  components: {
    UserInfor,
  },
};
</script>
<style scoped>
.main_content {
  display: flex;
  flex-direction: column;
  padding: 0 15px;
}
</style>