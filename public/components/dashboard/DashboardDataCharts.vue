<template>
  <div id="main" style="width: 100%;height: 500px;"></div>
</template>

<script>
  import Echarts from 'echarts/lib/echarts';
  // 引入柱状图
  import 'echarts/lib/chart/bar';
  import 'echarts/lib/chart/line';
  // 引入提示框和标题组件
  import 'echarts/lib/component/tooltip';
  import 'echarts/lib/component/title';
  import 'echarts/lib/component/singleAxis';

  export default {
    mounted() {
      function randomData() {
        now = new Date(+now + oneDay);
        value = value + Math.random() * 21 - 10;
        return {
          name: now.toString(),
          value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value)
          ]
        }
      }
      var data = [];
      var now = +new Date(2016, 12, 23);
      var oneDay = 24 * 3600 * 1000;
      var value = Math.random() * 1000;
      for (var i = 0; i < 1000; i++) {
        data.push(randomData());
      }

      var option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: true
          }
        },
        series: [{
          name: '模拟数据',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: data
        }]
      };

      var myChart = Echarts.init(document.getElementById('main'));

      myChart.setOption(option);

      setInterval(function () {

        for (var i = 0; i < 5; i++) {
          data.shift();
          data.push(randomData());
        }

        myChart.setOption({
          series: [{
            data: data
          }]
        });
      }, 1000);

    }
  }
</script>

<style>

</style>