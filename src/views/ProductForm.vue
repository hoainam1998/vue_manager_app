<template>
  <main>
    <MainForm
      :trangthai.sync="sanpham.trangthai"
      :is_update="disabled"
      :handle_create="handle_create"
      :is_load="is_products_load"
      :checkbox_value="checkbox_trangthai_infor"
      :handleSubmit="handleSubmit"
      :to="'/home/product'"
    >
      <b-col cols="6">
        <InputComponent
          :input_infor="input_tensanpham_infor"
          :disabled="disabled"
        />
      </b-col>

      <b-col cols="6">
        <InputComponent
          :input_infor="input_gia_infor"
        />
      </b-col>
    </MainForm>
  </main>
</template>
<script>
import InputInfor from "../input_infor";
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  numeric
} from "vuelidate/lib/validators";
import GetDate from "../get_date_mixin";
import { mapActions, mapGetters } from "vuex";
import { v4 } from "uuid";
import MainForm from "../components/MainForm";
import InputComponent from "../components/InputComponent";
export default {
  name: "Create_Product",
  components: {
    MainForm,
    InputComponent,
  },
  data() {
    return {
      sanpham: {
        tensanpham: "",
        gia: "",
        trangthai: "Ko hoat dong",
      },
      updated: true,
      handle_create: false,
      disabled: false,

      input_tensanpham_infor: InputInfor.input_tensanpham_infor,
      input_gia_infor: InputInfor.input_giasanpham_infor,
      checkbox_trangthai_infor: InputInfor.checkbox_trangthai_sanpham_infor
    };
  },
  computed: {
    is_products_load() {
      if (this.$route.params.id) {
        return this.get_is_products_load();
      } else {
        return false;
      }
    },

    process_create_product() {
      return this.get_is_products_load();
    }
  },

  watch: {
    process_create_product(new_value) {
      this.handle_create = new_value;
    },

    handle_create(new_value) {
      if (!new_value) {
        this.createProduct();
      }
    },
  },
  mixins: [validationMixin, GetDate],
  provide() {
    return {
      $v: this.$v,
    };
  },
  validations: {
    sanpham: {
      tensanpham: {
        required,
        minLength: minLength(4),
      },
      gia: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(8),
        numeric,
      },
    },
  },
  methods: {
    ...mapActions("product", [
      "addProduct",
      "updateProduct",
      "setProductById",
      "setProduct",
    ]),
    ...mapGetters("product", [
      "getProduct",
      "get_is_products_load",
      "getProducts",
    ]),

    createProduct() {
      const product = {
        id: v4(),
        tensanpham: this.sanpham.tensanpham,
        ngaytao: this.getDate(),
        ngaycapnhapganday: this.getDate(),
        gia: parseInt(this.sanpham.gia),
        trangthai: this.sanpham.trangthai,
      };
      this.addProduct(product);
      this.$router.push("/home/product");
    },

    updateProduct_(sanpham) {
      this.updateProduct(sanpham);
      this.$router.push("/home/product");
    },

    save() {
      try {
        if (this.disabled) {
          this.sanpham.ngaycapnhapganday = this.getDate();
          this.updateProduct_(this.sanpham);
        } else {
          if (this.process_create_product) {
            this.handle_create = true;
          } else {
            this.createProduct();
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    },

    handleSubmit() {
      this.$v.sanpham.$touch();
      if (this.$v.sanpham.$anyError) {
        return;
      }
      this.save();
    },

    getProductById() {
      let product = this.getProduct();
      if (!product) {
        this.setProductById(this.$route.params.id);
      }
    },

    getProduct_show() {
      this.getProductById();
      try {
        let sanpham = JSON.parse(JSON.stringify(this.getProduct()));
        if (sanpham) {
          this.sanpham = sanpham;
          this.disabled = true;
        }
      } catch (err) {
        console.log(err.message);
      }
    },
  },

  created() {
    if (typeof this.$route.params.id !== "undefined") {
      this.getProduct_show();
    }
  },

  updated() {
    if (!this.is_products_load && this.updated && this.$route.params.id) {
      this.getProduct_show();
      this.updated = false;
    }
  },

  beforeDestroy() {
    this.setProduct(null);
  },
};
</script>
