<template>
  <section class="content">
    <b-alert show variant="danger" v-if="err">{{ err }}</b-alert>
    <!-- @submit.prevent="handleSubmit" -->
    <form id="create_user" @submit.prevent="handleSubmit">
      <div class="layout_form">
        <div>
          <label class="title_form" ID>Ten dang nhap</label>
          <input
            type="text"
            class="form-control"
            :disabled="disabled"
            placeholder="Tao ten nhap"
            id="tendangnhap"
          />
        </div>
        <div>
          <label class="title_form">Ten nhan vien</label>
          <input type="text" class="form-control" placeholder="Nhap ho" id="ten" />
        </div>
        <div>
          <label class="title_form">Ho nhan vien</label>
          <input type="text" class="form-control" placeholder="Nhap ten" id="ho"/>
        </div>
      </div>
      <div class="my-2">
        <b-form-checkbox
          name="trangthai_checkbox"
          value="Dang lam"
          unchecked-value="Da nghi"
          v-model="defaultUser.trangthai"
        >
          Trang thai
        </b-form-checkbox>
      </div>
      <div class="group_button">
        <b-button variant="success" class="mr-2" type="submit">{{
          disabled ? "Cap nhap" : "Tao"
        }}</b-button>
        <b-button variant="success"
          ><router-link to="/home">Huy</router-link></b-button
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
      err: "",
      disabled: false,
      defaultUser:{
        id: "",
        trangthai: "Da nghi",
        tendangnhap: "",
        tendaydu: {ten: "",ho: ""},
      }
    };
  },
  methods: {
    ...mapActions("user", ["addListUsers", "updateListUsers"]),
    createUser() {
      let date = new Date();
      let day =
        `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()},` +
        `${date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        })}`;

      const user_obj = {
        id: v4(),
        power: "user",
        tendangnhap: this.defaultUser.tendangnhap,
        matkhau: "matkhau",
        tendaydu: this.defaultUser.tendaydu,
        ngayduoctao: day,
        trangthai: this.defaultUser.trangthai,
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

    updateUser() {
      const update_User = {
        id: this.defaultUser.id,
        tendaydu: this.defaultUser.tendaydu,
        trangthai: this.defaultUser.trangthai,
      };
      this.updateListUsers(update_User);
    },

    handleSubmit() {
        this.defaultUser.tendangnhap= document.querySelector('#tendangnhap').value,
        this.defaultUser.tendaydu={
          ten: document.querySelector('#ten').value,
          ho: document.querySelector('#ho').value,
        }
        console.log(this.defaultUser)

      if (this.disabled === false) {
        console.log("create");
        this.createUser();
      } else {
        console.log("update");
        this.updateUser();
      }
      this.$router.push("/home");
    },
  },
  mounted() {
    let user_toUpdate = this.$store.getters["user/getSpecificUser"];
    if (user_toUpdate.id) {
      document.querySelector('#tendangnhap').value=user_toUpdate.tendangnhap;
      document.querySelector('#ho').value=user_toUpdate.tendaydu.ho;
      document.querySelector("#ten").value=user_toUpdate.tendaydu.ten
      this.defaultUser.trangthai=user_toUpdate.trangthai
      this.defaultUser.id=user_toUpdate.id;

      this.disabled = true;
    }
  },
  beforeDestroy() {
    this.$store.dispatch("user/setSpecificUser", {});
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

.btn-success {
  padding: 0;
}
</style>