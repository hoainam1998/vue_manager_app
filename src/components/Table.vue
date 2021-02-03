<script>
export default {
  props: ["items", "fields", "per-page", "current-page"],
  render(h) {
    return h("b-table", {
      props: Object.assign(this.$attrs, this.$props),
      slots: this.$parent.$slots,
      scopedSlots: this.$parent.$scopedSlots,
    });
  },
};
</script>