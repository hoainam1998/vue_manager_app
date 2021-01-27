<template>
  <Table id="my-table"
    :items="items"
    :fields="fields"
    :per-page="perPage"
    :current-page="currentPage"
    :striped="true"
  ></Table>
</template>

<script>
import Table from './Table';
export default {
  name: "CustomTable",
  components: {Table},
  props: ["fields", "items","perPage","currentPage"],
};
</script>