<template>
  <section class="content">
    <b-overlay :show="is_load" rounded="sm">
      <b-form @submit.prevent="handleSubmit">
        <b-container fluid class="title_form">
          <b-row>

            <template v-for="(_, name) in $scopedSlots">
              <slot :name="name">{{ name }}</slot>
            </template>

            <b-col cols="8">
              <b-form-checkbox
                id="trangthai"
                name="trangthai_checkbox"
                :value="checkbox_value.checked"
                :unchecked-value="checkbox_value.unchecked"
                v-model="trangthai_computed"
              >
                Trang thai
              </b-form-checkbox>
            </b-col>
            <b-col cols="4">
              <div class="btn_group_layout">
                <b-overlay
                  rounded
                  opacity="0.6"
                  spinner-small
                  spinner-variant="primary"
                  class="d-inline-block"
                  :show="handle_create"
                >
                  <b-button type="submit" variant="success" :disabled="handle_create">
                    {{is_update ? "Cap nhap" : "Tao"}}
                  </b-button>
                </b-overlay>
                <b-button class="ml-2" variant="success">
                  <router-link :to="to">Huy</router-link>
                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </b-form>
    </b-overlay>
  </section>
</template>
<script>
export default {
  name: "MainForm",
  props: {
    trangthai: String,
    is_update: Boolean,
    handle_create: Boolean,
    is_load: Boolean,
    handleSubmit: Function,
    to: String,
    checkbox_value: {
      checked: String,
      unchecked: String
    }
  },
  computed: {
    trangthai_computed: {
      get() {
        return this.trangthai;
      },

      set(newvalue) {
        this.$emit("update:trangthai", newvalue);
      },
    },
  },
};
</script>