<template>
    <main>
        <Menu />
        <MainContent />
        <h1>home</h1>
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
};
</script>
<style scoped>
main {
    display: grid;
    grid-template-columns: 15% 85%;
    background: #ecf0f1;
}
</style>