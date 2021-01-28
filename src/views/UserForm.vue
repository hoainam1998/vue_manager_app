<template>
  <section class="content">
    <!-- @submit.prevent="handleSubmit" -->
    <b-form @submit.stop.prevent="handleSubmit">
      <div class="layout_form title_form">
        <b-form-group
          id="example-input-group-1"
          label="Ten dang nhap"
          label-for="example-input-1"
        >
          <b-form-input
            id="example-input-1"
            name="example-input-1"
            aria-describedby="input-1-live-feedback"
            v-model="$v.form.tendangnhap.$model"
            :state="validateState('tendangnhap')"
          ></b-form-input>

          <b-form-invalid-feedback id="input-1-live-feedback"
            >This is a required field and must be at least 4
            characters.</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group
          id="example-input-group-1"
          label="Ten nhan vien"
          label-for="example-input-1"
        >
          <b-form-input
            id="example-input-1"
            name="example-input-1"
            aria-describedby="input-1-live-feedback"
            v-model="$v.form.tennhanvien.$model"
            :state="validateState('tennhanvien')"
          ></b-form-input>

          <b-form-invalid-feedback id="input-1-live-feedback"
            >This is a required field and must be at least 4
            characters.</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group
          id="example-input-group-1"
          label="Ho nhan vien"
          label-for="example-input-1"
        >
          <b-form-input
            id="example-input-1"
            name="example-input-1"
            aria-describedby="input-1-live-feedback"
            v-model="$v.form.honhanvien.$model"
            :state="validateState('honhanvien')"
          ></b-form-input>

          <b-form-invalid-feedback id="input-1-live-feedback"
            >This is a required field and must be at least 4
            characters.</b-form-invalid-feedback
          >
        </b-form-group>
      </div>

      <div class="displayflex">
        <b-form-checkbox
          id="checkbox-1"
          name="trangthai_checkbox"
          v-model="form.trangthai"
          value="Dang lam"
          unchecked-value="Da nghi"
        >
          Trang thai
        </b-form-checkbox>
        <div>
          <b-button type="submit" variant="success">Submit</b-button>
          <b-button class="ml-2" variant="success"
            ><router-link to="home/user">Huy</router-link></b-button
          >
        </div>
      </div>
    </b-form>
  </section>
</template>
<script>
// import { v4 } from "uuid";
// import { mapActions } from "vuex";
// export default {
//   name: "create_user",
//   data() {
//     return {
//       err: "",
//       disabled: false,
//       defaultUser:{
//         id: "",
//         trangthai: "Da nghi",
//         tendangnhap: "",
//         tendaydu: {ten: "",ho: ""},
//       }
//     };
//   },
//   methods: {
//     ...mapActions("user", ["addListUsers", "updateListUsers"]),
//     createUser() {
//       let date = new Date();
//       let day =
//         `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()},` +
//         `${date.toLocaleString("en-US", {
//           hour: "numeric",
//           minute: "numeric",
//           second: "numeric",
//           hour12: true,
//         })}`;

//       const user_obj = {
//         id: v4(),
//         power: "user",
//         tendangnhap: this.defaultUser.tendangnhap,
//         matkhau: "matkhau",
//         tendaydu: this.defaultUser.tendaydu,
//         ngayduoctao: day,
//         trangthai: this.defaultUser.trangthai,
//       };

//       let index = this.$store.getters["user/getUsers"].findIndex(
//         (user) => user.tendangnhap === user_obj.tendangnhap
//       );

//       if (index !== -1) {
//         this.err = "Ten dang nhap da ton tai";
//       } else {
//         this.addListUsers(user_obj);
//       }
//     },
//     updateUser() {
//       const update_User = {
//         id: this.defaultUser.id,
//         tendaydu: this.defaultUser.tendaydu,
//         trangthai: this.defaultUser.trangthai,
//       };
//       this.updateListUsers(update_User);
//     },

//     handleSubmit() {
//         this.defaultUser.tendangnhap= document.querySelector('#tendangnhap').value,
//         this.defaultUser.tendaydu={
//           ten: document.querySelector('#ten').value,
//           ho: document.querySelector('#ho').value,
//         }
//         console.log(this.defaultUser)

//       if (this.disabled === false) {
//         console.log("create");
//         this.createUser();
//       } else {
//         console.log("update");
//         this.updateUser();
//       }
//       this.$router.push("/home");
//     },
//   },
//   mounted() {
//     let user_toUpdate = this.$store.getters["user/getSpecificUser"];
//     if (user_toUpdate.id) {
//       document.querySelector('#tendangnhap').value=user_toUpdate.tendangnhap;
//       document.querySelector('#ho').value=user_toUpdate.tendaydu.ho;
//       document.querySelector("#ten").value=user_toUpdate.tendaydu.ten
//       this.defaultUser.trangthai=user_toUpdate.trangthai
//       this.defaultUser.id=user_toUpdate.id;

//       this.disabled = true;
//     }
//   },
//   beforeDestroy() {
//     this.$store.dispatch("user/setSpecificUser", {});
//   },
//   beforeRouteEnter(to,from,next){
//     console.log('create user')
//     next()
//   }
// };
</script>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import {createNamespacedHelpers} from 'vuex'
const {mapActions} =createNamespacedHelpers('user')
import { v4 } from "uuid";
export default {
  name: "UserForm",
  data() {
    return {
      form: {
        tendangnhap: "",
        tennhanvien: "",
        honhanvien: "",
        trangthai: "Nghi lam",
      },
    };
  },
  methods: {
    ...mapActions(['addUser']),
    handleSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      this.save();
      console.log("ok");
    },
    save() {
      this.createUser();
    },
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
        tendangnhap: this.form.tendangnhap,
        matkhau: "123456",
        tendaydu: {ten:this.form.tennhanvien,ho:this.form.honhanvien},
        ngayduoctao: day,
        trangthai: this.form.trangthai,
      };

      this.addUser(user_obj)
    },
    updateUser(){
      console.log('user')
    }
  },
  mixins: [validationMixin],
  validations: {
    form: {
      tendangnhap: {
        required,
        minLength: minLength(4),
      },
      tennhanvien: {
        required,
        minLength: minLength(2),
      },
      honhanvien: {
        required,
        minLength: minLength(2)
      }
    },
  },
  validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
  }
};
</script>
<style scoped>
.layout_form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
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
  width: 100px;
}

.displayflex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>