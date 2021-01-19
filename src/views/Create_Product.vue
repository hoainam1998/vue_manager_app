<template>
  <section class="content">
    <b-alert show variant="danger" v-if="err">{{ err }}</b-alert>
    <form id="create_user" @submit.prevent="handleSubmit">
      <div class="layout_form">
        <div>
          <label class="title_form">Ten san pham</label>
          <b-form-input
            placeholder="Tao ten san pham"
            required
            v-model="product.tensanpham"
          ></b-form-input>
        </div>
        <div>
          <label class="title_form">Gia san pham</label>
          <b-form-input
            placeholder="Nhap gia san pham"
            required
            v-model="product.giasanpham"
          ></b-form-input>
        </div>
      </div>
      <div class="my-2">
        <b-form-checkbox
          name="trangthai_checkbox"
          value="Hoat dong"
          unchecked-value="Ko hoat dong"
          v-model="product.trangthai"
          :disabled="disabled"
        >
          Trang thai
        </b-form-checkbox>
      </div>
      <div class="group_button">
        <b-button variant="success" class="mr-2" type="submit"> Tao </b-button>
        <b-button variant="success">
          <router-link :to="{ name: 'product_table' }"
            >Huy</router-link
          ></b-button
        >
      </div>
    </form>
  </section>
</template>
<script>
import { mapActions } from "vuex";
import { v4 } from "uuid";
export default {
  name: "Create_Product",
  data() {
    return {
      product: {
        tensanpham: "",
        giasanpham: "",
        trangthai: "Ko hoat dong",
      },
      disabled: false,
      err: "",
    };
  },
  methods: {
    ...mapActions("product", ["createProducts"]),
    createProduct() {
      let date = new Date();
      let day =
        `${date.getDate()}/${date.getMonth()}/${date.getFullYear()},` +
        `${date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        })}`;

      if (parseInt(this.product.giasanpham).toString() === "NaN") {
        this.err = "Gia san pham phai la so";
      } else {
        const product = {
          id: v4(),
          tensanpham: this.product.tensanpham,
          ngaytao: day,
          ngaycapnhapganday: day,
          gia: parseInt(this.product.giasanpham),
          trangthai: this.product.trangthai,
        };

        this.createProducts(product);
        this.$router.push('/home/product')
      }
    },

    updateProduct() {},

    handleSubmit() {
      if (this.disabled === false) {
        this.createProduct();
      }
    },
  },
  created() {
    let product = this.$store.getters["product/setSpecificProduct"];
    if (typeof product !== "undefined") {
      this.disabled = true;
      this.product = product;
    }
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

.group_button {
  display: flex;
  justify-content: flex-end;
}

.group_button button {
  width: 150px;
}

a,
a:hover {
  color: white;
  text-decoration: none;
  display: block;
}
</style>