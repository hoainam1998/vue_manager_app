<template>
  <MainTable :objData="products" :items="getProducts_" :is_loaded="get_is_product_loaded_">
    <template #cell(gia)="data">
      {{
        parseInt(data.value).toLocaleString("it-IT", {
          style: "currency",
          currency: "VND"
        })
      }}
    </template>
  </MainTable>
</template>
<script>
import { mapActions, mapGetters , mapMutations} from "vuex";
import MainTable from "../components/MainTable";
export default {
  name: "Product",
  components: { MainTable },
  data() {
    return {
      products: {
        name: "product",
        title: "san pham",
        search: this.searchProducts,
        reset: this.resetProducts,
        setItem: this.setSpecificProduct_,
        showDetail: this.showDetailUpdateProduct,
        getValueAfterLoaded: this.getValueAfterLoaded_,
        fields: [
          { key: "id", thClass: "d-none", tdClass: "d-none" },
          { key: "tensanpham", label: "Tên Sản Phẩm" },
          { key: "ngaytao", label: "Ngày Tạo" },
          { key: "ngaycapnhapganday", label: "Ngày Cập Nhập Gần Đây" },
          { key: "gia", label: "Giá" },
          { key: "trangthai", label: "Trạng Thái" },
          { key: "thaotac", label: "Thao Tac" },
        ],
      },
    };
  },
  computed:{
    getProducts_(){
      return this.getProducts();
    },

    get_is_product_loaded_(){
      return this.get_is_product_loaded()
    }
  },
  methods: {
    ...mapActions("product", ["searchProduct","setProduct"]),
    ...mapGetters("product", ["getProducts", "getProductSearched","get_is_product_loaded"]),
    ...mapMutations('product',['setProducts']),

    searchProducts(valueSearch) {
      this.searchProduct(valueSearch);
      let products = this.getProductSearched();
      this.products.data = products;
    },

    resetProducts() {
      let products = this.getProducts();
      this.products.data = products;
    },

    setSpecificProduct_(product) {
     this.setProduct(product);
    },

    showDetailUpdateProduct(id) {
      this.$router.push("product/update-product/" + id);
    }
  }
};
</script>
<style scoped>
</style>