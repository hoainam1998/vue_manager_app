<template>
  <section class="content">
    <div class="manipulation">
      <div>
        <h2>Danh sach {{ objData.title }}</h2>
        <!-- button create-->
        <b-button variant="success" v-if="is_admin">
          <router-link :to="`${objData.name}/create-${objData.name}`">
            Tao {{ objData.title }}</router-link
          >
        </b-button>
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
      :items="items_"
      :fields="objData.fields"
      :perPage="perPage"
      :currentPage="currentPage"
      :busy="is_load"
      v-bind="$attrs"
      v-on="$listeners"
      custom-prop="any"
    >
      <template #cell(thaotac)="data" v-if="is_admin">
        <button class="update" @click="show(data.item)">
          <i class="fas fa-edit"></i>
        </button>
      </template>

      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>

      <template v-for="(_, name) in $scopedSlots" v-slot:[name]="slotData">
        <slot :name="name" v-bind="slotData" />
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
import auth from "../auth_mixin";
export default {
  name: "MainTable",
  props: {
    objData: {
      name: String,
      title: String,
      search: Function,
      reset: Function,
      setItem: Function,
      showDetail: Function,
      fields: Array,
    },
    items: Array,
    is_load: Boolean,
  },
  mixins: [auth],
  data() {
    return {
      perPage: 20,
      currentPage: 1,
      options: [
        { value: 20, text: "20" },
        { value: 50, text: "50" },
        { value: 100, text: "100" },
      ],
      search_value: "",
      items_: [],
      updated: true,
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
    totalPage() {
      return Math.ceil(this.items.length / this.perPage);
    },
  },
  methods: {
    show(item) {
      this.objData.setItem_andShow(item);
    },

    searchItem() {
      this.items_ = this.objData.search(this.search_value);
      this.search_value = "";
    },

    reset() {
      this.items_=this.objData.reset();
    },
  },
  created() {
    this.items_ = this.items;
    this.auth();
    if (!this.is_admin) {
      this.objData.fields = this.objData.fields.filter(
        (item) => item.key !== "thaotac"
      );
    }
  },
  updated() {
    if (this.items_.length === 0 && this.updated) {
      this.items_ = this.items;
      this.updated=false;
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