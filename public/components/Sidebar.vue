<template>
  <div class="sidebar-menu toggle-others fixed">

    <div class="sidebar-menu-inner">

      <header class="logo-env">

        <!-- logo -->
        <div class="logo">
          <a href="dashboard-1.html" class="logo-expanded">
            <img src="/assets/images/logo@2x.png" width="80" alt="" />
          </a>

          <a href="dashboard-1.html" class="logo-collapsed">
            <img src="/assets/images/logo-collapsed@2x.png" width="40" alt="" />
          </a>
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

      <ul id="main-menu" class="main-menu">
        <!-- add class "multiple-expanded" to allow multiple submenus to open -->
        <!-- class "auto-inherit-active-class" will automatically add "active" class for parent elements who are marked already with class "active" -->
        <li class="opened active">
          <a href="#">
            <i class="fa-dashboard"></i>
            <span class="title">主面板</span>
          </a>
        </li>
        <li>
          <a href="layout-variants.html">
            <i class="fa-area-chart"></i>
            <span class="title">页面分析</span>
          </a>
          <ul>
            <li>
              <a href="layout-variants.html">
                <span class="title">受访页面</span>
              </a>
            </li>
            <li>
              <a href="layout-collapsed-sidebar.html">
                <span class="title">热力图</span>
              </a>
            </li>
            <li>
              <a href="layout-static-sidebar.html">
                <span class="title">流向图</span>
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="ui-panels.html">
            <i class="fa-users"></i>
            <span class="title">访客分析</span>
          </a>
          <ul>
            <li>
              <a href="ui-panels.html">
                <span class="title">地域分布</span>
              </a>
            </li>
            <li>
              <a href="ui-buttons.html">
                <span class="title">系统环境</span>
              </a>
            </li>
            <li>
              <a href="ui-tabs-accordions.html">
                <span class="title">来源分析</span>
              </a>
            </li>
            <li>
              <a href="ui-modals.html">
                <span class="title">终端设备</span>
              </a>
            </li>
            <li>
              <a href="ui-breadcrumbs.html">
                <span class="title">停留时间</span>
              </a>
            </li>
            <li>
              <a href="ui-blockquotes.html">
                <span class="title">新老用户</span>
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="mailbox-main.html">
            <i class="fa-gears"></i>
            <span class="title">定制分析</span>
          </a>
          <ul>
            <li>
              <a href="mailbox-main.html">
                <span class="title">自定义埋点</span>
              </a>
            </li>
            <li>
              <a href="mailbox-compose.html">
                <span class="title">漏斗模型</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>

    </div>

  </div>
</template>

<script>

</script>

<style lang="less">

</style>