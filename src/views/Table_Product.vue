<template>
  <section class="content">
    <div class="manipulation">
      <div>
        <h2>Danh sach san pham</h2>
        <b-button variant="success" v-if="is_show">
          <router-link to="product/create_product">Tao san pham</router-link>
        </b-button>
      </div>
      <div class="mb-3">
        <b-form-select :options="options" v-model="perPage"></b-form-select>
        <form @submit.prevent="search()">
          <b-input-group prepend="Ten san pham" class="mt-3">
            <b-form-input id="search"></b-form-input>
            <b-input-group-append>
              <b-button variant="outline-success" type="submit"
                >Tim kiem</b-button
              >
              <b-button variant="info" @click.prevent="reset">Dat lai</b-button>
            </b-input-group-append>
          </b-input-group>
        </form>
      </div>
    </div>
    <div>
      <!-- <b-table
        sticky-header
        head-variant="light"
        :items="products"
        :per-page="perPage"
        :current-page="currentPage"
        :fields="fields_visible"
      >
        <template #cell(gia)="data">
          {{
            data.value.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })
          }}
        </template>
        <template #cell(thaotac)="row">
          <button class="update" @click="show(row.item)">
            <i class="fas fa-edit"></i>
          </button>
        </template>
      </b-table> -->

      <CustomTable :items="products" :fields="fields">
        <template #cell(gia)="data">
          {{
            data.value.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })
          }}
        </template>
        <template #cell(thaotac)="row">
          <button class="update" @click="show(row.item)">
            <i class="fas fa-edit"></i>
          </button>
        </template>
      </CustomTable>
      
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
    </div>
  </section>
</template>
<script>
import CustomTable from '../components/Custom_table'
export default {
  name: "Table_Product",
  components: {
    CustomTable
  },
  data() {
    return {
      perPage: 20,
      currentPage: 1,
      products: [],
      options:[{value:20,text: "20"},{value:50,text: "50"},{value:100,text: "100"}],
      fields: [
        { key: "id", thClass: "d-none", tdClass: "d-none" },
        { key: "tensanpham", label: "Tên Sản Phẩm" },
        { key: "ngaytao", label: "Ngày Tạo" },
        { key: "ngaycapnhapganday", label: "Ngày Cập Nhập Gần Đây" },
        { key: "gia", label: "Giá" },
        { key: "trangthai", label: "Trạng Thái" },
        { key: "thaotac", label: "Thao Tac" },
      ],
    };
  },
  computed: {
    rows() {
      return this.products.length;
    },
    totalPage() {
      return Math.ceil(this.products.length / this.perPage);
    },
    fields_visible() {
      let user = JSON.parse(sessionStorage.getItem("user_authen"));
      if (!user.admin) {
        return this.fields.filter((item) => item.key !== "thaotac");
      }
      return this.fields;
    },
    is_show(){
      let user = JSON.parse(sessionStorage.getItem("user_authen"));
      return user.admin
    }
  },
  methods: {
    show(item) {
      // this.$store.dispatch("product/setSpecificProduct", item);
      // this.$router.push("product/create_product");
     alert(item.tensanpham)
    },
    search() {
      let value_search = document.querySelector("#search").value;
      this.$store.dispatch("product/search", value_search);
      this.products = this.$store.getters["product/getListProductSearch"];
    },
    reset() {
      this.products = this.$store.getters["product/getProducts"];
    },
  },
  async created() {
    this.products = this.$store.getters["product/getProducts"];
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

a,
a:hover {
  text-decoration: none;
  color: white;
}
</style>