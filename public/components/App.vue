<template>
  <div id="app" class="page-container">
    <sidebar></sidebar>

    <div class="main-content">
      <main-nav></main-nav>
      <app-list></app-list>
      <dashboard></dashboard>
      <button @click="testHttp">test</button>
      <div id="main" style="width: auto;height: 500px;"></div>
    </div>
  </div>
</template>

<script>
  import AppList from './AppList.vue';
  import Sidebar from './Sidebar.vue';
  import MainNav from './MainNav.vue';
  import Dashboard from './Dashboard.vue';


  export default {
    methods: {
      testHttp() {
        this.$http.get('/app', {path:"1"}).then((response)=>{
          console.log(response);
        }, (response)=>{
          console.log(response);
        })
      }
    },
    components: {
      Sidebar, MainNav, Dashboard, AppList
    }
  }
</script>

<style lang="less">

</style>