<template>
  <section class="content">
    <form id="create_user">
      <div class="layout_form">
        <div>
          <label class="title_form">Ten dang nhap</label>
          <b-form-input placeholder="Tao ten dang nhap"></b-form-input>
        </div>
        <div>
          <label class="title_form">Ten nhan vien</label>
          <b-form-input placeholder="Nhap ten"></b-form-input>
        </div>
        <div>
          <label class="title_form">Ho nhan vien</label>
          <b-form-input placeholder="Nhap ho"></b-form-input>
        </div>
      </div>
      <div></div>
    </form>
  </section>
</template>
<script>
export default {
  name: "create_user",
};
</script>
<style scoped>
.layout_form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 15px;
}

.layout_form div:nth-child(2) {
  grid-row: 2;
  grid-column: 1;
}

.layout_form div:last-child {
  grid-row: 2;
  grid-column: 2;
}
</style>