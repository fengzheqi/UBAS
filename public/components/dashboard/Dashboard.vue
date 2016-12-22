<template>
  <div id="dashbord" class="clearfix">
    <div>{{$route.query.appId}}</div>
    <dashboard-data></dashboard-data>
    <dashboard-data-charts></dashboard-data-charts>
    <dashboard-data-lists></dashboard-data-lists>
  </div>
</template>

<script>
  import DashboardData from './DashboardData.vue';
  import DashboardDataCharts from './DashboardDataCharts.vue';
  import DashboardDataLists from './DashboardDataLists.vue';

  export default {
    components: {DashboardData, DashboardDataCharts, DashboardDataLists}
  }
</script>

<style>

</style>