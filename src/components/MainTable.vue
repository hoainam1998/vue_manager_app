<template>
  <section class="content">
    <div class="manipulation">
      <div>
        <h2>Danh sach {{ objData.title }}</h2>
        <!-- button create-->
        <slot name="create" v-bind:data="objData" v-if="is_admin"></slot>
        <!-- button create-->
      </div>
      <div class="mb-3">
        <b-form-select :options="options" v-model="perPage"></b-form-select>
        <form @submit.prevent="searchItem">
          <b-input-group prepend="Ten day du" class="mt-3">
            <b-form-input v-model="search_value"></b-form-input>
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
      :fields="objData.fields"
      :per-page="perPage"
      :current-page="currentPage"
      small
    >
      <template #cell(tendaydu)="data">
        {{data.value.ho}}{{data.value.ten}}
      </template>
      <template #cell(gia)="data">
        {{
          data.value.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })
        }}
      </template>
      <template #cell(thaotac)="row" v-if="is_admin">
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
  props: {
    objData: {
      data: Array,
      name: String,
      title: String,
      search: Function,
      reset: Function,
      setItem: Function,
      showDetail: Function,
      fields: Array,
    },
  },
  data() {
    return {
      perPage: 20,
      options: [
        { value: 20, text: "20" },
        { value: 50, text: "50" },
        { value: 100, text: "100" },
      ],
      currentPage: 1,
      search_value: "",
      is_admin: false,
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
      this.objData.search(this.search_value);
      this.search_value = "";
    },
    reset() {
      this.objData.reset();
    }
  },
  created() {
    let user = JSON.parse(sessionStorage.getItem("user_authen"));
    if (user.admin) {
      this.is_admin = true;
    }
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