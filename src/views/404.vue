<template>
  <main>
    <div class="background"></div>
    <div class="content">
      <h1>404 page not found</h1>
      <router-link type="button" class="btn btn-primary" to="/home"
        >Home</router-link
      >
    </div>
  </main>
</template>
<script>
export default {
  name: "PageNotFound",
};
</script>
<style scoped>
main {
  height: 100vh;
  position: relative;
}

.background {
  background: url("../assets/pexels-photo-814499.jpeg") no-repeat;
  background-size: cover;
  filter: blur(8px);
  height: 100%;
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 80%;
  border: 4px solid #e74c3c;
  background: transparent;
  text-align: center;
}

.content h1 {
  color: #e74c3c;
  font-size: 100px;
  text-transform: uppercase;
}
</style>