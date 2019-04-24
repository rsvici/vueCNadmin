<template>
    <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
export default {
  name: 'serviceRequests',
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  mounted () {
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        top: '3%',
        left: '1.2%',
        right: '1%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '乐演',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
            color: '#2d8cf0'
          }},
          data: [120, 132, 101, 134, 0, 0, 0]
        },
        {
          name: '乐影',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
            color: '#10A6FF'
          }},
          data: [257, 358, 278, 234, 0, 0, 0]
        },
        {
          name: '热门',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
            color: '#0C17A6'
          }},
          data: [379, 268, 354, 269, 0, 0, 0]
        },
        {
          name: '精彩',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
            color: '#4608A6'
          }},
          data: [320, 332, 301, 334, 0, 0, 0]
        },
       
      ]
    }
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
