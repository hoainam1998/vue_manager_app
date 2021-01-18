<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
*,*:before,*:after {
  margin: 0; padding: 0;
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

.title_form {
  display: block;
  color: #27ae60;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
