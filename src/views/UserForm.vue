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
            ><router-link to="/home/user">Huy</router-link></b-button
          >
        </div>
      </div>
    </b-form>
  </section>
</template>

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
        trangthai: "Da nghi",
      }
    };
  },
  methods: {
    ...mapActions(['addUser']),
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
  },
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