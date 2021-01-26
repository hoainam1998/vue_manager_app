<template>
  <Table
    :items="items"
    :fields="fields"
    :striped="true"
  ></Table>
</template>

<script>
import Table from './Table';
export default {
  components: {Table},

  props: ["fields", "items"],
};
</script>