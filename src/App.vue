<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions , mapMutations} from "vuex";
export default {
  name: "App",
  methods: {
    ...mapActions("user", ["getUsersFromAPI"]),
    ...mapActions("product", ["getProductsFromAPI"]),
    ...mapMutations('product',['setProducts']),
    ...mapMutations('user',['setUsers'])
  },
  created() {
    this.getUsersFromAPI().then(res=>setTimeout(()=>this.setUsers(res.data),8000))
    this.getProductsFromAPI().then(res=>setTimeout(()=>this.setProducts(res.data),10000))
  }
};
</script>

<style>
*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul {
  list-style: none;
}

:root {
  --maincolor: #27ae60;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.content {
  background: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 8px;
  border-radius: 5px;
}

.title_form label {
  display: block;
  color: #27ae60;
  font-weight: bold;
  margin-bottom: 10px;
}

.update {
  background: transparent;
  border: none;
  outline: none;
  color: var(--maincolor);
}

.pagination_table {
  display: flex;
  justify-content: space-between;
  align-content: center;
}

a,
a:hover {
  color: white !important;
  text-decoration: none !important;
  display: block;
}

.btn_group_layout {
  display: flex;
  justify-content: flex-end;
}

.btn_group_layout .btn-success {
  width: 120px;
}
</style>
