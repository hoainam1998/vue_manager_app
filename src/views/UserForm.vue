<template>
  <MainForm
    :trangthai.sync="user.trangthai"
    :is_update="disabled"
    :handle_create="handle_create"
    :is_load="is_users_load"
    :checkbox_value="checkbox_trangthai_infor"
    :handleSubmit="handleSubmit"
    :to="'/home/user'"
  >
    <b-col cols="6"
      ><InputComponent
        :input_infor="input_tendangnhap_infor"
    /></b-col>
    <b-col cols="6"></b-col>
    <b-col cols="6"
      ><InputComponent
        :input_infor="input_tennhanvien_infor"
    /></b-col>
    <b-col cols="6"
      ><InputComponent
        :input_infor="input_honhanvien_infor"
    /></b-col>
    <b-modal centered id="bv-modal-example" hide-footer hide-header>
      <h4 class="text-center">
        Ten dang nhap {{ user.tendangnhap }} da ton tai.
      </h4>
      <b-button
        variant="primary"
        class="mt-3"
        block
        @click="$bvModal.hide('bv-modal-example')"
        >Close Me</b-button
      >
    </b-modal>
  </MainForm>
</template>
<script>
import InputInfor from "../input_infor";
import { validationMixin } from "vuelidate";
import GetDate from "../get_date_mixin";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapGetters } = createNamespacedHelpers("user");
import { v4 } from "uuid";
import MainForm from "../components/MainForm";
import InputComponent from "../components/InputComponent";
export default {
  name: "UserForm",
  components: {
    MainForm,
    InputComponent,
  },
  mixins: [validationMixin, GetDate],
  provide() {
    return {
      $v: this.$v,
    };
  },
  data() {
    return {
      user: {
        tendangnhap: "",
        tennhanvien: "",
        honhanvien: "",
        trangthai: "Da nghi",
      },
      disabled: false,
      updated: true,
      handle_create: false,

      input_tendangnhap_infor: InputInfor.input_tendangnhap_infor,
      input_tennhanvien_infor: InputInfor.input_tennhanvien_infor,
      input_honhanvien_infor: InputInfor.input_honhanvien_infor,
      checkbox_trangthai_infor: InputInfor.checkbox_trangthai_user_infor,
    };
  },
  computed: {
    is_users_load() {
      if (this.$route.params.id) {
        return this.get_is_users_load();
      } else {
        return false;
      }
    },

    process_create_user() {
      return this.get_is_users_load();
    },
  },
  watch: {
    process_create_user(new_value) {
      this.handle_create = new_value;
    },

    handle_create(new_value) {
      if (!new_value) {
        this.createUser();
      }
    },
  },
  validations: {
    user: {
      tendangnhap: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(15),
      },
      tennhanvien: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(15),
      },
      honhanvien: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(6),
      },
    },
  },

  methods: {
    ...mapActions([
      "addUser",
      "updateUser",
      "setUserById",
      "setUser",
      "check_user_existed",
    ]),
    ...mapGetters([
      "getUser",
      "getUsers",
      "get_is_users_load",
      "get_user_existed",
    ]),

    handleSubmit() {
      this.$v.user.$touch();
      if (this.$v.user.$anyError) {
        return;
      }
      this.save();
    },

    check_user_existed_() {
      this.check_user_existed(this.user.tendangnhap);
      let user_existed = this.get_user_existed();
      return user_existed;
    },

    save() {
      try {
        if (this.disabled) {
          this.updateUser_();
        } else {
          if (this.process_create_user) {
            this.handle_create = true;
          } else {
            this.createUser();
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    },

    createUser() {
      if (this.check_user_existed_()) {
        this.$bvModal.show('bv-modal-example')
      } else {
        const user_obj = {
          id: v4(),
          power: "user",
          tendangnhap: this.user.tendangnhap,
          matkhau: "123456",
          tendaydu: { ho: this.user.honhanvien, ten: this.user.tennhanvien },
          ngayduoctao: this.getDate(),
          trangthai: this.user.trangthai,
        };
        this.addUser(user_obj);
        this.$router.push("/home/user");
      }
    },

    updateUser_() {
      let user = JSON.parse(JSON.stringify(this.getUser()));
      const user_update = {
        ...user,
        tendaydu: { ho: this.user.honhanvien, ten: this.user.tennhanvien },
        trangthai: this.user.trangthai,
      };
      this.updateUser(user_update);
      this.$router.push("/home/user");
    },

    getUserById() {
      let user = this.getUser();
      if (!user) {
        this.setUserById(this.$route.params.id);
      }
    },

    getUser_show() {
      this.getUserById();
      try {
        let user = JSON.parse(JSON.stringify(this.getUser()));
        if (user) {
          this.user.tendangnhap = user.tendangnhap;
          (this.user.honhanvien = user.tendaydu.ho),
            (this.user.tennhanvien = user.tendaydu.ten),
            (this.user.trangthai = user.trangthai);
          this.disabled = true;
        }
      } catch (err) {
        console.log(err.message);
      }
    },
  },

  created() {
    if (typeof this.$route.params.id !== "undefined") {
      this.getUser_show();
    }
  },

  updated() {
    if (!this.is_users_load && this.updated && this.$route.params.id) {
      this.getUser_show();
      this.updated = false;
    }
  },

  beforeDestroy() {
    this.setUser(null);
  },
};
</script>
