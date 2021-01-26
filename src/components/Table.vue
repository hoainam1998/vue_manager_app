
<script>
export default {
    name: "Table",
    props: [
          'items',
          'fields'
        ],
  render(h) {
    return h('b-table', {
       props: Object.assign(this.$attrs, this.$props),
      slots: this.$parent.$slots,
      scopedSlots: this.$parent.$scopedSlots,
      on: {
        //'row-clicked': (item, index, event) => alert('clicked ' + index)
      }
    });
  }
}
</script>
<style scoped>

</style>