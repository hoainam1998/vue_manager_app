<template>
  <section class="content">
    <div class="manipulation">
      <div>
        <h2>Danh sach {{ objData.title }}</h2>
        <b-button variant="success">
          <router-link :to="`user/create-${objData.name}`">
            Tao {{ objData.title }}</router-link
          >
        </b-button>
      </div>
      <div class="mb-3">
        <b-form-select :options="options" v-model="perPage"></b-form-select>
        <form @submit.prevent="searchItem">
          <b-input-group prepend="Ten day du" class="mt-3">
            <b-form-input id="search"></b-form-input>
            <b-input-group-append>
              <b-button variant="outline-success" type="submit"
                >Tim kiem</b-button
              >
              <b-button variant="info" @click.prevent="reset"
                >Dat lai</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </form>
      </div>
    </div>

    <b-table
      id="my-table"
      :items="objData.data"
      :fields="objData.fields"
      :per-page="perPage"
      :current-page="currentPage"
      small
    >
      <template #cell(tendaydu)="data">
        {{ data.value.ho }} {{ data.value.ten }}
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
  </section>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "MainTable",
  props: ["objData"],
  data() {
    return {
      perPage: 2,
      options: [
        { value: 2, text: "2" },
        { value: 5, text: "5" },
        { value: 10, text: "10" },
      ],
      currentPage: 1,
    };
  },
  computed: {
    rows() {
      return this.objData.data.length;
    },
    totalPage() {
      return Math.ceil(this.objData.data.length / this.perPage);
    },
  },
  methods: {
    ...mapActions("user", ["setUsers", "setSpecificUser", "searchUser"]),
    ...mapGetters("user", ["getUsers", "getUserSearched"]),
    ...mapActions("product", ["searchProduct"]),
    ...mapGetters("product", ["getListProductSearch", "getProducts"]),
    show(item) {
      // this.setSpecificUser(item);
      // this.$router.push("user/create_user");
      this.objData.setItem(item);
    },

    searchItem() {
      let value_search = document.querySelector("#search").value;
      this.objData.search(value_search);
    },

    reset() {
      this.objData.reset();
    },
  },
  created(){
    let item=this.objData.getSpecificItem();
    console.log(item)
  }
};
</script>
<style scoped>
.manipulation div {
  display: flex;
  justify-content: space-between;
}

.custom-select {
  width: 100px;
}
</style>