<template>
 <div id="dashboard-data-lists">
    <el-table :data="dataLists" border style="width: 100%" ref="table">
      <el-table-column
          type="index"
          width="50">
      </el-table-column>
      <el-table-column
          prop="system"
          label="系统"
          resizable
          show-overflow-tooltip
          min-width="100">
      </el-table-column>
      <el-table-column
          prop="ip"
          label="IP地址"
          resizable
          show-overflow-tooltip
          min-width="100">
      </el-table-column>
      <el-table-column
          prop="timestamp"
          label="时间"
          resizable
          show-overflow-tooltip
          min-width="100"
          :formatter="timeFormat">
      </el-table-column>

    </el-table>
 </div>
</template>

<script>
  export default {
    props: ['dataLists'],
    methods: {
      timeFormat(row, column) {
        let time = new Date(parseInt(row.timestamp));
       let timeFormat = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+' ' + time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
        return timeFormat;
      }

    }
  }
</script>

<style>

</style>