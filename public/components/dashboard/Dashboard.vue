<template>
  <div id="dashbord" class="clearfix">
    <dashboard-data :pv="pv" :uv="uv" :ip="ip"></dashboard-data>
    <dashboard-data-charts :dataCharts="dataCharts"></dashboard-data-charts>
    <dashboard-data-lists :dataLists="dataLists"></dashboard-data-lists>
  </div>
</template>

<script>
  import DashboardData from './DashboardData.vue';
  import DashboardDataCharts from './DashboardDataCharts.vue';
  import DashboardDataLists from './DashboardDataLists.vue';

  export default {
    components: {DashboardData, DashboardDataCharts, DashboardDataLists},
    data() {
      return {
        pv:'',
        uv:'',
        ip:'',
        dataCharts:'',
        dataLists:[]
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData() {
        this.$http.get('/app/dashboard').then((response)=>{
          this.pv = response.body.pv;
          this.uv = response.body.uv;
          this.ip = response.body.ip;
          this.dataLists = response.body.visitors;
        },(response)=>{
          console.log(response)
        })
      }
    },
    created() {
      this.fetchData();
    }
  }
</script>

<style>

</style>