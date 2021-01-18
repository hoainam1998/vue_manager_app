<template>
  <section class="content">
    <div class="manipulation">
      <div>
        <h2>Danh sach nguoi dung</h2>
        <button class="create_user">Tao nguoi dung</button>
      </div>
      <div>
        <input type="number" class="form-control" v-model="perPage" />
        <div class="search">
          <input type="text" />
          <button>tim kiem</button>
        </div>
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
      <template #cell(thao_tac)="row">
        <button class="update" @click="show(row.item)" >
           <i class="fas fa-edit"></i>
        </button>

        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
      </template>
      </b-table>
    
    <div class="pagination_table">
      <div>
        <span>{{currentPage}}</span>-<span>{{ totalPage }}</span> /tong so <span>{{ totalPage }}</span>
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
  name: "Table",
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      fields: [
        { key: "id", thClass: "d-none", tdClass: "d-none" },
        "ten_day_du",
        "ten_dang_nhap",
        "ngay_duoc_tao",
        "trang_thai",
        "thao_tac",
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
    ...mapActions("user", ["setUsers"]),
    show(item){
        console.log(item)
    }
  },
  async created() {
    await this.setUsers();
    this.users = this.$store.getters["user/getUsers"];
  },
};
</script>
<style scoped>
.content {
  background: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 8px;
  border-radius: 5px;
}

.manipulation div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.create_user {
  background: var(--maincolor);
  width: 150px;
  border: none;
  outline: none;
  border-radius: 4px;
  color: white;
}

input[type="number"] {
  width: 100px;
  height: 35px;
}

.search input {
  outline: none;
  height: 30px;
  border: 1.5px solid #bdc3c7;
  padding-left: 7px;
}

.search button {
  background: var(--maincolor);
  color: white;
  text-transform: capitalize;
  outline: none;
  padding: 3.5px 5px;
  border: none;
}

tbody tr td:last-child {
  color: var(--maincolor);
  padding-left: 50px;
}

.pagination_table {
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.active {
  background: var(--maincolor) !important;
}

.update {
    background: transparent;
    border: none;
    outline: none;
    color: var(--maincolor);
}
</style>