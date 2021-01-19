<template>
  <section class="content">
    <div class="manipulation">
      <div>
        <h2>Danh sach nguoi dung</h2>
        <b-button variant="success">
          <router-link to="create_user" class="create_user">
            Tao nguoi dung</router-link
          >
        </b-button>
      </div>
      <div class="mb-3">
        <input type="number" class="form-control" v-model="perPage" />
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
      <template #cell(ten_day_du)="data">
        {{ data.value.ho }} {{ data.value.ten }}
      </template>
      <template #cell(thao_tac)="row">
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
      perPage: 5,
      currentPage: 1,
      fields: [
        { key: "id", thClass: "d-none", tdClass: "d-none" },
        { key: "ten_day_du", label: "Tên Đầy Đủ" },
        { key: "ten_dang_nhap", label: "Tên Đăng Nhập" },
        { key: "ngay_duoc_tao", label: "Ngày Được Tạo" },
        { key: "trang_thai", label: "Trạng Thái" },
        { key: "thao_tac", label: "Thao Tác" },
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
      location.href = "#/home/create_user";
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
    console.log(this.users);
  },
};
</script>
<style scoped>
.manipulation div {
  display: flex;
  justify-content: space-between;
}

.create_user {
  display: block;
  width: 150px;
  border: none;
  outline: none;
  border-radius: 4px;
  color: white;
  text-decoration: none;
}

input[type="number"] {
  width: 100px;
  height: 35px;
}

</style>