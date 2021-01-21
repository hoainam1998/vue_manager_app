<template>
  <section class="content">
    <b-alert show variant="danger" v-if="err">{{ err }}</b-alert>
    <form id="create_user" @submit.prevent="handleSubmit">
      <div class="layout_form">
        <div>
          <label class="title_form">Ten dang nhap</label>
          <b-form-input
            placeholder="Tao ten dang nhap"
            v-model="newUser.tendangnhap"
            required
            :disabled="disabled"
          ></b-form-input>
        </div>
        <div>
          <label class="title_form">Ten nhan vien</label>
          <b-form-input
            placeholder="Nhap ten"
            v-model="newUser.tendaydu.ten"
            required
          ></b-form-input>
        </div>
        <div>
          <label class="title_form">Ho nhan vien</label>
          <b-form-input
            placeholder="Nhap ho"
            v-model="newUser.tendaydu.ho"
            required
          ></b-form-input>
        </div>
      </div>
      <div class="my-2">
        <b-form-checkbox
          name="trangthai_checkbox"
          value="Dang lam"
          unchecked-value="Da nghi"
          v-model="newUser.trangthai"
        >
          Trang thai
        </b-form-checkbox>
      </div>
      <div class="group_button">
        <b-button variant="success" class="mr-2" type="submit">{{
          disabled ? "Cap nhap" : "Tao"
        }}</b-button>
        <b-button variant="success">
          <router-link to="/home">Huy</router-link></b-button
        >
      </div>
    </form>
  </section>
</template>
<script>
import { v4 } from "uuid";
import { mapActions } from "vuex";
export default {
  name: "create_user",
  data() {
    return {
      newUser: {
        tendaydu: { ho: "", ten: "" },
        tendangnhap: "",
        trangthai: "Da nghi",
      },
      err: "",
      disabled: false,
    };
  },
  methods: {
    ...mapActions("user", ["addListUsers","updateListUsers"]),
    createUser() {
      let date = new Date();
      let day =
        `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()},` +
        `${date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        })}`;
        
      const user_obj = {
        id: v4(),
        power: "user",
        tendangnhap: this.newUser.tendangnhap,
        matkhau: "matkhau",
        tendaydu: this.newUser.tendaydu,
        ngayduoctao: day,
        trangthai: this.newUser.trangthai,
      };

      let index = this.$store.getters["user/getUsers"].findIndex(
        (user) => user.tendangnhap === user_obj.tendangnhap
      );

      if (index !== -1) {
        this.err = "Ten dang nhap da ton tai";
      } else {
        this.addListUsers(user_obj);
      }
    },

    updateUser(){
      const update_User={
        id: this.newUser.id,
        tendaydu: this.newUser.tendaydu,
        trangthai: this.newUser.trangthai
      }
      this.updateListUsers(update_User);
      this.$store.dispatch('user/setSpecificUser',{})
    },

    handleSubmit() {
      if (this.disabled === false) {
        this.createUser();
      }else {
        this.updateUser()
      }
      this.$router.push('/home')
    },
  },
  created() {
    let user_toUpdate = this.$store.getters["user/getSpecificUser"];
    if (user_toUpdate.id) {
      this.newUser = user_toUpdate;
      this.disabled = true;
    }
  },
  beforeDestroy(){
    this.$store.dispatch('user/setSpecificUser',{});
    console.log(this.$store.getters['user/getSpecificUser']);
  }
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

.group_button {
  display: flex;
  justify-content: flex-end;
}

.group_button button {
  width: 150px;
}

.btn-success {
  padding: 0;
}
</style>