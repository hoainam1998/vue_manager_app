<template>
  <main class="content">
    <div class="background"></div>
    <h1>404 page not found</h1>
  </main>
</template>
<script>
export default {
  name: "PageNotFound",
};
</script>
<style scoped>
.content {
  height: 100vh;
  position: relative;

}

.background {
  background: url('../assets/pexels-photo-814499.jpeg') no-repeat;
  background-size: cover;
  filter: blur(8px);
  height: 100%;
}

.content h1{
  color: #e74c3c;
  font-size: 100px;
  text-align: center;
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  text-transform: uppercase;
  z-index: 2;
  width: 80%;
  border: 4px solid  #e74c3c;
}
</style>