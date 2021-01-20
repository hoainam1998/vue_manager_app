<template>
  <section class="content">
    <div class="manipulation">
      <div>
        <h2>Danh sach san pham</h2>
        <b-button variant="success">
          <router-link to="product/create_product">Tao san pham</router-link>
        </b-button>
      </div>
      <div class="mb-3">
        <input type="number" class="form-control" v-model="perPage" />
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
      <b-table
        sticky-header
        head-variant="light"
        :items="products"
        :per-page="perPage"
        :current-page="currentPage"
        :fields="fields"
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
    </div>
  </section>
</template>
<script>
export default {
  name: "Table_Product",
  data() {
    return {
      perPage: 2,
      currentPage: 1,
      products: [],
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
    totalPage(){
        return Math.ceil(this.products.length/this.perPage)
    }
  },
  methods: {
    show(item) {
      this.$store.dispatch('product/setSpecificProduct',item);
      this.$router.push('product/create_product')
    },
    search(){
        let value_search=document.querySelector('#search').value;
        this.$store.dispatch('product/search',value_search)
        this.products=this.$store.getters['product/getListProductSearch'];
    },
    reset(){
        this.products=this.$store.getters['product/getProducts'];
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

input[type="number"] {
  width: 100px;
  height: 35px;
}

a,
a:hover {
  text-decoration: none;
  color: white;
}
</style>