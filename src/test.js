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
  beforeRouteEnter(to,from,next){
    console.log('create user')
    next()
  }
};