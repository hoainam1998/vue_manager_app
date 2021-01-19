<template>
  <section class="content">
    <b-alert show variant="danger" v-if="err">{{ err }}</b-alert>
    <form id="create_user" @submit.prevent="handleSubmit">
      <div class="layout_form">
        <div>
          <label class="title_form">Ten dang nhap</label>
          <b-form-input
            placeholder="Tao ten dang nhap"
            v-model="newUser.ten_dang_nhap"
            required
            :disabled="this.disabled"
          ></b-form-input>
        </div>
        <div>
          <label class="title_form">Ten nhan vien</label>
          <b-form-input
            placeholder="Nhap ten"
            v-model="newUser.ten_day_du.ten"
            required
          ></b-form-input>
        </div>
        <div>
          <label class="title_form">Ho nhan vien</label>
          <b-form-input
            placeholder="Nhap ho"
            v-model="newUser.ten_day_du.ho"
            required
          ></b-form-input>
        </div>
      </div>
      <div class="my-2">
        <b-form-checkbox
          name="trangthai_checkbox"
          value="dang lam"
          unchecked-value="da nghi"
          v-model="newUser.trang_thai"
        >
          Trang thai
        </b-form-checkbox>
      </div>
      <div class="group_button">
        <b-button variant="success" class="mr-2" type="submit">{{
          disabled ? "Cap nhap" : "Tao"
        }}</b-button>
        <b-button variant="success">
          <router-link :to="{ name: 'user_table' }">Huy</router-link></b-button
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
        ten_day_du: { ho: "", ten: "" },
        ten_dang_nhap: "",
        trang_thai: "dang lam",
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
        `${date.getDate()}/${date.getMonth()}/${date.getFullYear()},` +
        `${date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        })}`;
      const user_obj = {
        id: v4(),
        power: "user",
        ten_dang_nhap: this.newUser.ten_dang_nhap,
        matkhau: "matkhau",
        ten_day_du: this.newUser.ten_day_du,
        ngay_duoc_tao: day,
        trang_thai: this.newUser.trang_thai,
      };

      let index = this.$store.getters["user/getUsers"].findIndex(
        (user) => user.ten_dang_nhap === user_obj.ten_dang_nhap
      );

      if (index !== -1) {
        this.err = "Ten dang nhap da ton tai";
      } else {
        this.addListUsers(user_obj);
        location.href = "#/home";
      }
    },

    updateUser(){
      const update_User={
        id: this.newUser.id,
        ten_day_du: this.newUser.ten_day_du,
        trang_thai: this.newUser.trang_thai
      }
      this.updateListUsers(update_User);
      location.href = "#/home";
    },

    handleSubmit() {
      if (this.disabled === false) {
        this.createUser();
      }else {
        this.updateUser()
      }
    },
  },
  created() {
    let user_toUpdate = this.$store.getters["user/getSpecificUser"];
    if (user_toUpdate.id) {
      this.newUser = user_toUpdate;
      this.disabled = true;
    }
  },
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

a,
a:hover {
  color: white;
  text-decoration: none;
  display: block;
}
</style>