<template>
  <section class="menu">
    <img src="../assets/logo.png" alt="logo" />
    <ul class="main_list">
      <li>
        <span v-b-toggle.collapse-1 class="toggle_link">Cai dat<i class="fas fa-caret-down"></i></span>
        <b-collapse id="collapse-1">
        <ul class="sub_list">
          <li v-if="is_admin">
            <router-link to="/home/user">Nguoi dung</router-link>
          </li>
          <li><router-link to="/home/product">San pham</router-link></li>
        </ul>
        </b-collapse>
      </li>
      <li>Quan li</li>
    </ul>
  </section>
</template>
<script>
import auth from '../auth_mixin';
export default {
  name: "Menu",
  mixins:[auth],
  created() {
    this.auth();
  },
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
  min-height: 100vh;
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

.main_list > li:first-child {
  padding: 0;
}

.fa-caret-down {
  float: right;
}

.sub_list a {
  color: white;
  text-decoration: none;
}

.toggle_link {
  outline: none;
}
</style>