<template>
  <MainTable :objData="objData" />
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
        data: [],
        name:'user',
        title: "nguoi dung",
        search: this.searchUsers,
        reset: this.resetUsers,
        setItem: this.setSpecificUser_,
        getSpecificItem: this.getSpecificUser,
        fields: [
          { key: "id", thClass: "d-none", tdClass: "d-none" },
          { key: "tendaydu", label: "Tên Đầy Đủ" },
          { key: "tendangnhap", label: "Tên Đăng Nhập" },
          { key: "ngayduoctao", label: "Ngày Được Tạo" },
          { key: "trangthai", label: "Trạng Thái" },
          { key: "thaotac", label: "Thao Tác" },
        ],
      },
      products: {
        data: [],
        name: 'product',
        title: "san pham",
        search: this.searchProducts,
        reset: this.resetProducts,
        setItem: this.setSpecificProduct_,
        getSpecificItem:this.getSpecificProduct,
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

      objData: {},
    };
  },
  methods: {
    ...mapActions("user", ["searchUser","setSpecificUser"]),
    ...mapGetters("user", ["getUsers", "getUserSearched","getSpecificUser"]),
    ...mapActions("product", ["searchProduct","setSpecificProduct"]),
    ...mapGetters("product", ["getProducts", "getProductSearched","getSpecificProduct"]),
    setItem() {
      let { name } = this.$route.params;
      if (name === "user") {
        this.users.data = this.getUsers();
        this.objData = this.users;
      } else {
        this.products.data = this.getProducts();
        this.objData = this.products;
      }
    },

    searchProducts(valueSearch) {
      this.searchProduct(valueSearch);
      let products = this.getProductSearched();
      this.products.data = products;
      this.objData = this.products;
    },

    searchUsers(valueSearch) {
      this.searchUser(valueSearch);
      let users = this.getUserSearched();
      this.users.data = users;
      this.objData = this.users;
    },

    resetProducts() {
      let products = this.getProducts();
      this.products.data = products;
      this.objData = this.products;
    },

    resetUsers() {
      let users = this.getUsers();
      this.users.data = users;
      this.objData = this.users;
    },

    setSpecificProduct_(product){
      this.setSpecificProduct(product)
    },

    setSpecificUser_(user){
      this.setSpecificUser(user)
    }
    
  },
  created() {
    this.setItem();
  },
  beforeRouteLeave(to, from, next) {
    let condition = 1;
    if (condition < 0) { console.log(to + " " + from + " " + next); }
    this.setItem();
    next()
  }
};
</script>