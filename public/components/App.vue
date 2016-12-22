<template>
  <div id="app" class="page-container">
    <sidebar></sidebar>

    <div class="main-content">
      <!-- 头部导航 -->
      <main-nav></main-nav>
      <!--面包屑-->
      <breadcrumb></breadcrumb>

      <transition name="fade">
      <router-view></router-view>
      </transition>

      <!-- 页脚 -->
      <main-footer></main-footer>
    </div>
  </div>
</template>

<script>
  import Sidebar from './Sidebar.vue';
  import MainNav from './MainNav.vue';
  import Breadcrumb from './Breadcrumb.vue';
  import MainFooter from './MainFooter.vue';

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
      Sidebar, MainNav, Breadcrumb, MainFooter
    }
  }
</script>

<style lang="less">

</style>