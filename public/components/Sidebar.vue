<template>
  <div class="sidebar-menu toggle-others fixed">

    <div class="sidebar-menu-inner">

      <header class="logo-env">

        <!-- logo -->
        <div class="logo">
          <router-link :to="{path:'/'}" class="logo-expanded">
            <img src="/assets/images/logo@2x.png" width="80" alt="" />
          </router-link>

          <router-link :to="{path:'/app',query:{appId:$route.query.appId}}" class="logo-expanded">
            <!--<img src="/assets/images/logo-collapsed@2x.png" width="40" alt="" />-->
          </router-link>
        </div>

        <!-- This will toggle the mobile menu and will be visible only on mobile devices -->
        <div class="mobile-menu-toggle visible-xs">
          <a href="#" data-toggle="user-info-menu">
            <i class="fa-bell-o"></i>
            <span class="badge badge-success">7</span>
          </a>

          <a href="#" data-toggle="mobile-menu">
            <i class="fa-bars"></i>
          </a>
        </div>
      </header>

      <el-menu default-active="2" class="sidebar-nav-menu">
        <!-- 主面板 -->
        <el-menu-item index="1" class="nav-item">
          <router-link :to="{path:'/app',query:{appId:$route.query.appId}}"><i class="fa-dashboard"></i><span class="title">主面板</span></router-link>
        </el-menu-item>
        <!-- end 主面板 -->

        <!-- 页面分析 -->
        <el-submenu index="2">
          <template slot="title"><i class="fa-area-chart"></i><span class="title">页面分析</span></template>

          <el-menu-item index="2-1">
            <router-link :to="{path:'app/visitPage',query:{appId:$route.query.appId}}"><span class="title">受访页面</span></router-link>
          </el-menu-item>
          <el-menu-item index="2-2">
            <router-link :to="{path:'app/thermalMap',query:{appId:$route.query.appId}}"><span class="title">热力图</span></router-link>
          </el-menu-item>
          <el-menu-item index="2-3">
            <router-link :to="{path:'app/flowMap',query:{appId:$route.query.appId}}"><span class="title">流向图</span></router-link>
          </el-menu-item>
        </el-submenu>
        <!-- end 页面分析 -->

        <!-- 访客分析 -->
        <el-submenu index="3">
          <template slot="title"> <i class="fa-users"></i><span class="title">访客分析</span></template>
          <el-menu-item index="3-1">
            <router-link :to="{path:'app/location',query:{appId:$route.query.appId}}"><span class="title">地域分布</span></router-link>
          </el-menu-item>

          <el-menu-item index="3-2">
            <router-link :to="{path:'app/location',query:{appId:$route.query.appId}}"><span class="title">系统环境</span></router-link>
          </el-menu-item>

          <el-menu-item index="3-3">
            <router-link :to="{path:'app/origin',query:{appId:$route.query.appId}}"><span class="title">来源分析</span></router-link>
          </el-menu-item>

          <el-menu-item index="3-4">
            <router-link :to="{path:'app/terminal',query:{appId:$route.query.appId}}"><span class="title">终端设备</span></router-link>
          </el-menu-item>

          <el-menu-item index="3-5">
            <router-link :to="{path:'app/standTime',query:{appId:$route.query.appId}}"><span class="title">停留时间</span></router-link>
          </el-menu-item>

          <el-menu-item index="3-6">
            <router-link :to="{path:'app/newVisitor',query:{appId:$route.query.appId}}"><span class="title">新老用户</span></router-link>
          </el-menu-item>
        </el-submenu>
        <!-- end 访客分析 -->

        <!-- 定制分析 -->
        <el-submenu index="4">
          <template slot="title"> <i class="fa-gears"></i><span class="title">定制分析</span></template>

          <el-menu-item index="4-1">
            <router-link :to="{path:'app/buryPoint',query:{appId:$route.query.appId}}"><span class="title">自定义埋点</span></router-link>
          </el-menu-item>

          <el-menu-item index="4-2">
            <router-link :to="{path:'app/funnelChart',query:{appId:$route.query.appId}}"><span class="title">漏斗模型</span></router-link>
          </el-menu-item>
        </el-submenu>
        <!-- end 定制分析 -->
      </el-menu>
    </div>

  </div>
</template>

<script>
export default {

}

</script>

<style lang="less">
  .sidebar-nav-menu {
    background: #2c2e2f;
    padding:20px 40px;
  }
  .sidebar-nav-menu .active .title {
    color: #fff;
  }

  .sidebar-nav-menu a {
   color:#979898;
  }

  .sidebar-nav-menu .el-menu-item,
  .sidebar-nav-menu .el-submenu__title {
    background: #2c2e2f;
    color:#979898;
    border-bottom:1px solid #313437 ;
  }
  .sidebar-nav-menu .el-menu-item:hover,
  .sidebar-nav-menu .el-submenu__title:hover,
  .sidebar-nav-menu .el-menu-item a:hover,
  .sidebar-nav-menu .el-submenu__title a:hover {
    background: #2c2e2f;
    color: #fff;
  }

  .el-menu-item i,
  .el-submenu__title i {
    margin-left: -16px;
  }

  .title {
    display: inline-block;
    margin-left: 15px;
  }
</style>