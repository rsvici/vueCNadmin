<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="数据分析"></chart-pie>
        </Card>
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="每周用户活跃量"/>
        </Card>
      </i-col>
    </Row>
    <Row>
      <Card shadow>
        <example style="height: 310px;"/>
      </Card>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      inforCardData: [
        { title: '总用户量', icon: 'md-person-add', count: 2037, color: '#2d8cf0' },
        { title: '累计点击', icon: 'md-locate', count: '24679', color: '#19be6b' },
        { title: '分享统计', icon: 'md-share', count: 235, color: '#ed3f14' },
        { title: '新增活动', icon: 'md-chatbubbles', count: 81, color: '#E46CBB' },
        { title: '新增页面', icon: 'md-map', count: 18, color: '#9A66E4' }
      ],
      pieData: [
        {value: 2037, name: '总用户量'},
        {value: 24679, name: '累计点击'},
        {value: 235, name: '分享统计'},
        {value: 81, name: '新增活动'},
        {value: 18, name: '新增页面'}
      ],
      barData: {
        Mon: 292,
        Tue: 442,
        Wed: 233,
        Thu: 333,
        Fri: 673,
        Sat: 793,
        Sun: 711
      }
    }
  },
  mounted () {
    //
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
