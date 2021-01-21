<template>
  <section class="content">
    <div class="manipulation">
      <div>
        <h2>Danh sach nguoi dung</h2>
        <b-button variant="success">
          <router-link to="home/create_user" class="create_user">
            Tao nguoi dung</router-link
          >
        </b-button>
      </div>
      <div class="mb-3">
        <b-form-select :options="options" v-model="perPage"></b-form-select>
        <form @submit.prevent="search()">
          <b-input-group prepend="Ten day du" class="mt-3">
            <b-form-input id="search"></b-form-input>
            <b-input-group-append>
              <b-button variant="outline-success" type="submit">Tim kiem</b-button>
              <b-button variant="info" @click.prevent="reset">Dat lai</b-button>
            </b-input-group-append>
          </b-input-group>
        </form>
      </div>
    </div>
    <b-table
      id="my-table"
      :items="users"
      :per-page="perPage"
      :current-page="currentPage"
      :fields="fields"
      small
    >
      <template #cell(tendaydu)="data">
        {{ data.value.ho }} {{ data.value.ten }}
      </template>
      <template #cell(thaotac)="row">
        <button class="update" @click="show(row.item)">
          <i class="fas fa-edit"></i>
        </button>
      </template>
    </b-table>

    <div class="pagination_table">
      <div>
        <span>{{ currentPage }}</span>
        -<span>{{ totalPage }}</span> /tong so <span>{{ totalPage }}</span>
      </div>
      <div>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Table_User",
  data() {
    return {
      perPage: 20,
      currentPage: 1,
      options:[{value: 20, text: "20"},{value: 50, text: "50"},{value: 100, text: "100"}],
      fields: [
        { key: "id", thClass: "d-none", tdClass: "d-none" },
        { key: "tendaydu", label: "Tên Đầy Đủ" },
        { key: "tendangnhap", label: "Tên Đăng Nhập" },
        { key: "ngayduoctao", label: "Ngày Được Tạo" },
        { key: "trangthai", label: "Trạng Thái" },
        { key: "thaotac", label: "Thao Tác" },
      ],
      users: [],
    };
  },
  computed: {
    rows() {
      return this.users.length;
    },
    totalPage() {
      return Math.ceil(this.users.length / this.perPage);
    },
  },
  methods: {
    ...mapActions("user", ["setUsers", "setSpecificUser", "searchUser"]),
    show(item) {
      this.setSpecificUser(item);
      this.$router.push('home/create_user')
    },

    search() {
      let value_search = document.querySelector("#search").value;
      this.searchUser(value_search);
      this.users = this.$store.getters["user/getUserSearched"];
    },

    reset(){
      this.users = this.$store.getters["user/getUsers"];
    }
  },
  created() {
    this.users = this.$store.getters["user/getUsers"];
  },
};
</script>
<style scoped>
.manipulation div {
  display: flex;
  justify-content: space-between;
}

.custom-select {
  width: 100px;
}
</style>