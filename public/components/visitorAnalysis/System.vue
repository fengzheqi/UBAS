<template>
  <div id="system">
    <div id="main" style="width: 100%;height: 800px;"></div>
  </div>
</template>

<script>
  import Echarts from 'echarts/lib/echarts';
  import Pie from 'echarts/lib/chart/pie';

  export default {
    mounted() {
      let option = {
        backgroundColor: '#2c343c',

        title: {
          text: 'Customized Pie',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },

        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series : [
          {
            name:'访问来源',
            type:'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data:[
              {value:335, name:'直接访问'},
              {value:310, name:'邮件营销'},
              {value:274, name:'联盟广告'},
              {value:235, name:'视频广告'},
              {value:400, name:'搜索引擎'}
            ].sort(function (a, b) { return a.value - b.value}),
            roseType: 'angle',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      var myChart = Echarts.init(document.getElementById('main'));
      myChart.setOption(option);
    }
  }
</script>