<template>
  <div id="dashboard-data" class="row">
    <section class="col-md-4">
      <div>
        <i class="fa fa-users" aria-hidden="true"></i>
        <span>PV</span>
        <span class="float-right" v-text="pv"></span>
      </div>
    </section>
    <section class="col-md-4">
      <div>
        <i class="fa fa-user" aria-hidden="true"></i>
        <span>UV</span>
        <span class="float-right" v-text="uv"></span>
      </div>
    </section>
    <section class="col-md-4">
      <div>
        <i class="fa fa-globe" aria-hidden="true"></i>
        <span>IP</span>
        <span class="float-right" v-text="ip"></span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ['pv', 'uv', 'ip']
}
</script>

<style lang="less">
  #dashboard-data section {
    margin-top: -20px;
  }
  #dashboard-data div {
    padding: 20px 30px;
    font-size: 24px;
    background: #fff;
    margin: 10px;
    border-radius: 5px;
  }
  .float-right {
    float: right;
  }
</style>