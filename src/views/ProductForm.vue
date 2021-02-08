<template>
  <section class="content">
    <b-overlay :show="is_products_load" rounded="sm">
      <b-form @submit.stop.prevent="handleSubmit">
        <div class="layout_form title_form">
          <b-form-group
            id="example-input-group-1"
            label="Ten san pham"
            label-for="example-input-1"
          >
            <b-form-input
              id="example-input-1"
              name="example-input-1"
              aria-describedby="input-1-live-feedback"
              v-model="$v.sanpham.tensanpham.$model"
              :state="validateState('tensanpham')"
              :disabled="disabled"
            ></b-form-input>

            <b-form-invalid-feedback id="input-1-live-feedback"
              >This is a required field and must be at least 4 characters and
              most 15 characters.</b-form-invalid-feedback
            >
          </b-form-group>
          <b-form-group
            id="example-input-group-1"
            label="Gia san pham"
            label-for="example-input-1"
          >
            <b-form-input
              id="example-input-1"
              name="example-input-1"
              aria-describedby="input-1-live-feedback"
              v-model="$v.sanpham.gia.$model"
              :state="validateState('gia')"
            ></b-form-input>

            <b-form-invalid-feedback id="input-1-live-feedback"
              >This is a required field and must be at least 4 characters and is
              number.</b-form-invalid-feedback
            >
          </b-form-group>
        </div>

        <div class="displayflex">
          <b-form-checkbox
            id="checkbox-1"
            name="trangthai_checkbox"
            v-model="sanpham.trangthai"
            value="Hoat dong"
            unchecked-value="Ko hoat dong"
          >
            Trang thai
          </b-form-checkbox>
          <div>
            <b-button type="submit" variant="success">
              {{ disabled ? "Cap nhap" : "Tao" }}
            </b-button>
            <b-button class="ml-2" variant="success"
              ><router-link to="/home/product">Huy</router-link></b-button
            >
          </div>
        </div>
      </b-form>
    </b-overlay>
  </section>
</template>
<script>
import { validationMixin } from "vuelidate";
import GetDate from "../get_date_mixin";
import {
  required,
  minLength,
  maxLength,
  numeric,
} from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
import { v4 } from "uuid";
export default {
  name: "Create_Product",
  data() {
    return {
      sanpham: {
        tensanpham: "",
        gia: "",
        trangthai: "Ko hoat dong",
      },
      disabled: false,
      updated: true,
    };
  },
  computed: {
    is_products_load() {
      return this.get_is_products_load();
    },
  },
  mixins: [validationMixin, GetDate],
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

    validateState(name) {
      const { $dirty, $error } = this.$v.sanpham[name];
      return $dirty ? !$error : null;
    },

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
    },

    save() {
      try {
        if (this.disabled) {
          this.sanpham.ngaycapnhapganday = this.getDate();
          this.updateProduct(this.sanpham);
        } else {
          this.createProduct();
        }
        this.$router.push("/home/product");
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
        console.log(sanpham)
        if (sanpham) {
          this.sanpham = sanpham;
          this.disabled = true;
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  },

  created() {
    if(this.$route.params.id){
      this.getProduct_show();
    }
    
  },

  updated() {
    console.log(this.is_products_load)
    if (this.is_products_load && this.updated && this.$route.params.id) {
      this.getProduct_show();
      this.updated = false;
    }
  },

  beforeDestroy() {
    this.setProduct(null);
  },
};
</script>
<style scoped>
.layout_form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 15px;
}

a,
a:hover {
  color: white;
  text-decoration: none;
  display: block;
}

.btn-success {
  width: 120px;
}
</style>