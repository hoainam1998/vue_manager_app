<template>
  <MainTable :objData="users">
    <template v-slot:create="{ data }">
      <b-button variant="success">
        <router-link :to="`${data.name}/create-${data.name}`">
          Tao {{ data.title }}</router-link
        >
      </b-button>
    </template>
  </MainTable>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MainTable from "../components/MainTable";

export default {
  name: "Container",
  components: {
    MainTable,
  },
  data() {
    return {
      users: {
        data: [],
        name: "user",
        title: "nguoi dung",
        search: this.searchUsers,
        reset: this.resetUsers,
        setItem: this.setSpecificUser_,
        showDetail: this.showDetailUpdateUser,
        fields: [
          { key: "id", thClass: "d-none", tdClass: "d-none" },
          { key: "tendaydu", label: "Tên Đầy Đủ" },
          { key: "tendangnhap", label: "Tên Đăng Nhập" },
          { key: "ngayduoctao", label: "Ngày Được Tạo" },
          { key: "trangthai", label: "Trạng Thái" },
          { key: "thaotac", label: "Thao Tác" },
        ],
      },
    };
  },
  methods: {
    ...mapActions("user", ["searchUser"]),
    ...mapGetters("user", ["getUsers", "getUserSearched"]),

    setDataUser() {
      this.users.data = this.getUsers();
    },

    searchUsers(valueSearch) {
      this.searchUser(valueSearch);
      let users = this.getUserSearched();
      this.users.data = users;
    },

    resetUsers() {
      let users = this.getUsers();
      this.users.data = users;
    },

    setSpecificUser_(user) {
      localStorage.setItem("user", JSON.stringify(user));
    },

    showDetailUpdateUser(id) {
      this.$router.push("user/update-user/" + id);
    },
  },
  created() {
    this.setDataUser();
  },
};
</script>