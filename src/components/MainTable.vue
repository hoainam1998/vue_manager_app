clear<template>
  <section class="content">
    <div class="manipulation">
      <div>
        <h2>Danh sach {{ objData.title }}</h2>
        <b-button variant="success" v-if="show_">
          <router-link :to="`${objData.name}/create-${objData.name}`">
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
              <b-button variant="info" @click.prevent="reset">Dat lai</b-button>
            </b-input-group-append>
          </b-input-group>
        </form>
      </div>
    </div>
    <!-- table -->
    <b-table
      id="my-table"
      :items="objData.data"
      :fields="fields_visible(objData.fields)"
      :per-page="perPage"
      :current-page="currentPage"
      small
    >
      <template #cell(gia)="data">
        {{
          parseInt(data.value).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })
        }}
      </template>

      <template #cell(tendaydu)="data">
        {{ data.value.ho }} {{ data.value.ten }}
      </template>

      <template #cell(thaotac)="row">
        <button class="update" @click="show(row.item)">
          <i class="fas fa-edit"></i>
        </button>
      </template>
    </b-table>
    <!-- table -->
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
      perPage: 20,
      options: [
        { value: 20, text: "20" },
        { value: 50, text: "50" },
        { value: 100, text: "100" },
      ],
      currentPage: 1,
      show_: false,
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
      this.objData.setItem(item);
      this.objData.showDetail(item.id);
    },

    searchItem() {
      let value_search = document.querySelector("#search").value;
      this.objData.search(value_search);
      document.querySelector("#search").value=''
    },

    reset() {
      this.objData.reset();
    },

    fields_visible(fields) {
      let user = JSON.parse(sessionStorage.getItem("user_authen"));
      if (!user.admin) {
        return fields.filter((item) => item.key !== "thaotac");
      }
      return fields;
    },
  },
  created() {
    let user = JSON.parse(sessionStorage.getItem("user_authen"));
    if (user.admin) {
      this.show_ = true;
    }
  },
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