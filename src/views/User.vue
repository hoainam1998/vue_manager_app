<template>
  <MainTable
    :objData="users"
    :items="this.getUser_"
    :is_load="is_users_load"
  >
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
    MainTable,
  },
  data() {
    return {
      users: {
        name: "user",
        title: "nguoi dung",
        search: this.searchUsers,
        reset: this.resetUsers,
        setItem_andShow: this.setSpecificUser_andShow,
        getValueAfterLoaded: this.getValueAfterLoaded_,
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
  computed: {
    getUser_() {
      return this.getUsers();
    },
    is_users_load() {
      return this.get_is_users_load();
    },
  },
  methods: {
    ...mapActions("user", ["searchUser", "setUser"]),
    ...mapGetters("user", [
      "getUsers",
      "getUserSearched",
      "get_is_users_load"
    ]),

    searchUsers(valueSearch) {
      this.searchUser(valueSearch);
      let users = this.getUserSearched();
      return users;
    },

    resetUsers() {
      let users = this.getUsers();
      return users;
    },

    setSpecificUser_andShow(user) {
      this.setUser(user);
      this.$router.push("user/update-user/" + user.id);
    }
  }
};
</script>