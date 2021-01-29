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
            v-model="$v.user.tendangnhap.$model"
            :state="validateState('tendangnhap')"
            :disabled="disabled"
          ></b-form-input>

          <b-form-invalid-feedback id="input-1-live-feedback"
            >This is a required field and must be at least 4 characters and most
            15 characters.</b-form-invalid-feedback
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
            v-model="$v.user.tendaydu.ten.$model"
            :state="validateState('ten')"
          ></b-form-input>

          <b-form-invalid-feedback id="input-1-live-feedback"
            >This is a required field and must be at least 2 characters and most
            15 characters.</b-form-invalid-feedback
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
            v-model="$v.user.tendaydu.ho.$model"
            :state="validateState('ho')"
          ></b-form-input>

          <b-form-invalid-feedback id="input-1-live-feedback"
            >This is a required field and must be at least 2 characters and most
            6 characters.</b-form-invalid-feedback
          >
        </b-form-group>
      </div>

      <div class="displayflex">
        <b-form-checkbox
          id="checkbox-1"
          name="trangthai_checkbox"
          v-model="user.trangthai"
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
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapGetters } = createNamespacedHelpers("user");
import { v4 } from "uuid";
export default {
  name: "UserForm",
  data() {
    return {
      user: {
        tendangnhap: "",
        tendaydu: { ten: "", ho: "" },
        trangthai: "Da nghi",
      },
      disabled: false,
    };
  },
  methods: {
    ...mapActions(["addUser", "setSpecificUser", "updateUser","setUsers","setReload"]),
    ...mapGetters(["getSpecificUser"]),
    validateState(name) {
      if (name === "ho" || name === "ten") {
        const { $dirty, $error } = this.$v.user.tendaydu[name];
        return $dirty ? !$error : null;
      } else {
        const { $dirty, $error } = this.$v.user[name];
        return $dirty ? !$error : null;
      }
    },

    handleSubmit() {
      this.$v.user.$touch();
      if (this.$v.user.$anyError) {
        return;
      }

      this.save();
      this.setReload();
    },
    save() {
      try {
        if (this.disabled) {
          this.updateUser_();
        } else {
          this.createUser();
        }
        this.$router.push("/home/user");
      } catch (err) {
        console.log(err)
      }
    },

    createUser() {
      let date = new Date();
      let day =
        `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} , ` +
        `${date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        })}`;
      const user_obj = {
        id: v4(),
        power: "user",
        tendangnhap: this.user.tendangnhap,
        matkhau: "123456",
        tendaydu: this.user.tendaydu,
        ngayduoctao: day,
        trangthai: this.user.trangthai,
      };

      this.addUser(user_obj);
    },

    updateUser_() {
      this.updateUser(this.user);
    },
  },
  created() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.user = user;
      this.disabled = true;
    }
  },
  beforeDestroy() {
    localStorage.removeItem("user");
  },
  mixins: [validationMixin],
  validations: {
    user: {
      tendangnhap: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(15),
      },
      tendaydu: {
        ten: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(15),
        },
        ho: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(6),
        },
      },
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

</style>