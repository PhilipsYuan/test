<template>
<div>
  <order-list></order-list>
  <time-select></time-select>
</div>
</template>

<script>
import orderList from "./src/orderList.vue";
import timeSelect from "./src/timeSelect.vue";

export default {
  name: "app",
  components: { orderList, timeSelect },
}
</script>

<style scoped>

</style>