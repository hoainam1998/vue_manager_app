<template>
  <MainTable :objData="products" :items="getProducts_" :is_load="is_products_load">
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
import { mapActions, mapGetters } from "vuex";
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
        setItem_andShow: this.setSpecificProduct_andShow,
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
      }
    };
  },
  computed:{
    getProducts_(){
      return this.getProducts()
    },

    is_products_load(){
      return this.get_is_products_load()
    }
  },
  methods: {
    ...mapActions("product", ["searchProduct","setProduct"]),
    ...mapGetters("product", ["getProducts", "getProductSearched","get_is_products_load"]),

    searchProducts(valueSearch) {
      this.searchProduct(valueSearch);
      let products = this.getProductSearched();
      return products;
    },

    resetProducts() {
      let products = this.getProducts();
      return products;
    },

    setSpecificProduct_andShow(product) {
     this.setProduct(product);
     this.$router.push("product/update-product/" + product.id);
    }
  }
};
</script>
<style scoped>
</style>