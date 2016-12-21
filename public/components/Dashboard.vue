<template>
  <div id="dashbord" class="clearfix">
    <dashboard-data></dashboard-data>
    <dashboard-data-charts></dashboard-data-charts>
    <dashboard-data-lists></dashboard-data-lists>
  </div>
</template>

<script>
  import DashboardData from './dashboard/DashboardData.vue';
  import DashboardDataCharts from './dashboard/DashboardDataCharts.vue';
  import DashboardDataLists from './dashboard/DashboardDataLists.vue';

  export default {
    components: {DashboardData, DashboardDataCharts, DashboardDataLists}
  }
</script>

<style>

</style>