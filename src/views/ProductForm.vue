<template>
  <section class="content">
    <!-- @submit.prevent="handleSubmit" -->
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
            >This is a required field and must be at least 4 characters and most
            15 characters.</b-form-invalid-feedback
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
          <b-button type="submit" variant="success">Submit</b-button>
          <b-button class="ml-2" variant="success"
            ><router-link to="/home/product">Huy</router-link></b-button
          >
        </div>
      </div>
    </b-form>
  </section>
</template>
<script>
import { validationMixin } from "vuelidate";
import GetDate from '../get_date_mixin';
import {
  required,
  minLength,
  maxLength,
  numeric,
} from "vuelidate/lib/validators";
import { mapActions } from "vuex";
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
    };
  },
  mixins: [validationMixin,GetDate],
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
    ...mapActions("product", ["addProduct", "updateProduct"]),
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
      if (this.disabled) {
        this.sanpham.ngaycapnhapganday = this.getDate();
        this.updateProduct(this.sanpham);
      } else {
        this.createProduct();
      }
    },

    handleSubmit() {
      this.$v.sanpham.$touch();
      if (this.$v.sanpham.$anyError) {
        return;
      }
      this.save();
      this.$router.push("/home/product");
    }
  },

  created() {
    let sanpham = JSON.parse(localStorage.getItem("product"));
    if (sanpham) {
      this.sanpham = sanpham;
      this.disabled = true;
    }

  },

  beforeDestroy() {
    localStorage.removeItem("product");
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