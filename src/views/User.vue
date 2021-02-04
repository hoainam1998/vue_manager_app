<template>
  <MainTable :objData="users">
    <template #cell(tendaydu)="data">
        {{ data.value.ho }} {{ data.value.ten }}
    </template>
  </MainTable>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MainTable from "../components/MainTable";
export default {
  name: "Container",
  components: {
    MainTable
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
        getValueAfterLoaded: this.getValueAfterLoaded_,
        fields: [
          { key: "id", thClass: "d-none", tdClass: "d-none" },
          { key: "tendaydu", label: "Tên Đầy Đủ" },
          { key: "tendangnhap", label: "Tên Đăng Nhập" },
          { key: "ngayduoctao", label: "Ngày Được Tạo" },
          { key: "trangthai", label: "Trạng Thái" },
          { key: "thaotac", label: "Thao Tác" },
        ]
      },
    };
  },
  methods: {
    ...mapActions("user", ["searchUser","setUser"]),
    ...mapGetters("user", ["getUsers", "getUserSearched","getValueAfterLoaded"]),

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
     this.setUser(user);
    },

    showDetailUpdateUser(id) {
      this.$router.push("user/update-user/" + id);
    },

    getValueAfterLoaded_(){
      this.getValueAfterLoaded();
    }
  },
  created() {
    this.setDataUser();
  },
};
</script>