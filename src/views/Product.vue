<template>
  <MainTable :objData="products">
    <template #cell(gia)="data">
      {{
        parseInt(data.value).toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
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
  components: {
    MainTable
  },
  data() {
    return {
      products: {
        data: [],
        name: "product",
        title: "san pham",
        search: this.searchProducts,
        reset: this.resetProducts,
        setItem: this.setSpecificProduct_,
        showDetail: this.showDetailUpdateProduct,
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
  methods: {
    ...mapActions("product", ["searchProduct"]),
    ...mapGetters("product", ["getProducts", "getProductSearched"]),

    setDataProduct() {
      this.products.data = this.getProducts();
    },

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
      localStorage.setItem("product", JSON.stringify(product));
    },

    showDetailUpdateProduct(id) {
      this.$router.push("product/update-product/" + id);
    }
  },
  created() {
    this.setDataProduct();
  },
};
</script>
<style scoped>
</style>