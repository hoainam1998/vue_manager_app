<template>
    <Table :items="items" :fields="fields" :per-page="perPage" :current-page="currentPage" />
</template>
<script>
import Table from './Table'
export default {
    name: "CustomTable",
    components: {
        Table
    },
    props:['items','fields','perPage','currentPage']
}
</script>