<template>
  <section class="content">
    <b-alert show variant="danger" v-if="err">{{ err }}</b-alert>
    <form id="create_user" @submit.prevent="handleSubmit">
      <div class="layout_form">
        <div>
          <label class="title_form">Ten san pham</label>
         <input class="form-control" type="text" id="ten" :disabled="disabled" placeholder="Nhap ten san pham"/>
        </div>
        <div>
          <label class="title_form">Gia san pham</label>
          <input class="form-control" type="text" id="gia" placeholder="Nhap gia san pham"/>
        </div>
      </div>
      <div class="my-2">
        <b-form-checkbox
          name="trangthai_checkbox"
          value="Hoat dong"
          unchecked-value="Ko hoat dong"
          v-model="product.trangthai"
        >
          Trang thai
        </b-form-checkbox>
      </div>
      <div class="group_button">
        <b-button variant="success" class="mr-2" type="submit">
          {{ disabled ? "Cap nhap" : "Tao" }}
        </b-button>
        <b-button variant="success">
          <router-link to="/home/product"> Huy</router-link> 
        </b-button>
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
        id: "",
        tensanpham: "",
        gia: "",
        trangthai: "Ko hoat dong",
      },
      disabled: false,
      err: "",
    };
  },
  methods: {
    ...mapActions("product", ["createProducts", "updateProducts"]),
    createProduct() {
      const product = {
        id: v4(),
        tensanpham: this.product.tensanpham,
        ngaytao: this.getDate(),
        ngaycapnhapganday: this.getDate(),
        gia: parseInt(this.product.gia),
        trangthai: this.product.trangthai,
      };
      this.createProducts(product);
    },

    updateProduct() {
      const updateProduct = {
        id: this.product.id,
        gia: parseInt(this.product.gia),
        trangthai: this.product.trangthai,
        ngaycapnhapganday: this.getDate(),
      };
      this.updateProducts(updateProduct);
      this.$store.dispatch("product/setSpecificProduct", {});
    },

    handleSubmit() {
      this.product.gia=document.querySelector('#gia').value;
      this.product.tensanpham=document.querySelector('#ten').value;
      if (this.check_isNumber(this.product.gia)) {
        if (this.disabled === false) {
          this.createProduct();
        } else {
          this.updateProduct();
        }
        this.$router.push("/home/product");
      } else {
        this.err = "Gia san pham phai la so!";
      }
    },
    getDate() {
      let date = new Date();
      let day =
        `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()},` +
        `${date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        })}`;
      return day;
    },
    check_isNumber(gia) {
      gia = gia.toString();
      for (let char of gia) {
        if (parseInt(char).toString() === "NaN") {
          return false;
        }
      }
      return true;
    },
  },
  mounted(){
    let product = this.$store.getters["product/getSpecificProduct"];
    if (typeof product.id !== "undefined") {
      this.disabled = true;
      document.querySelector('#ten').value=product.tensanpham;
      document.querySelector('#gia').value=product.gia;
      this.product.trangthai=product.trangthai;
      this.product.id=product.id;
    }
  },
  beforeDestroy() {
    this.$store.dispatch("product/setSpecificProduct", {});
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

.btn-success {
  padding: 0;
}
</style>