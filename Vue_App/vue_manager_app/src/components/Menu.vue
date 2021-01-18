<template>
  <section class="menu">
    <img src="../assets/logo.png" alt="logo" />
    <ul class="main_list">
      <li>
        <span >Cai dat<i class="fas fa-caret-down"></i></span>
        <ul class="sub_list">
          <li>Nguoi dung</li>
          <li>San pham</li>
        </ul>
      </li>
      <li>Quan li</li>
    </ul>
  </section>
</template>
<script>
export default {
  name: "Menu"
};
</script>
<style scoped>
.main_list > li::before {
  margin-right: 0.5rem;
}

.main_list > li:first-child::before {
  font-family: "FontAwesome";
  content: "\f013";
}

.main_list > li:last-child::before {
  font-family: "FontAwesome";
  content: "\f1ec";
}

.menu {
  height: 100vh;
  background: var(--maincolor);
  padding: 2rem 0;
}

.menu img {
  display: block;
  margin: 0 auto;
  width: 60px;
}

.main_list {
  color: white;
  margin-top: 15px;
  padding: 0 1rem;
}

.main_list li {
  width: 100%;
  padding: 10px 0;
}

.main_list >li:first-child {
    padding:0;
}

.fa-caret-down {
  float: right;
}
</style>