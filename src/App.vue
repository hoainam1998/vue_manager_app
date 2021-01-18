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
</style>
