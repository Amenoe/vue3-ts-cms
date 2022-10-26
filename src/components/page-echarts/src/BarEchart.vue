<template>
  <div class="bar-echart">
    <BaseEchart :options="options"></BaseEchart>
  </div>
</template>

<script setup lang="ts">
import BaseEchart from '@/baseui/echart/echart.vue'
import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'

const props = defineProps<{
  labels: string[]
  values: any[]
}>()

const options = computed<EChartsOption>(() => {
  return {
    tooltip: {
      //触发类型
      trigger: 'axis',
      //坐标轴指示器配置项
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    xAxis: {
      data: props.labels,
      axisTick: {
        show: false //不显示坐标轴刻度
      },
      axisLine: {
        show: false //是否显示坐标轴轴线
      },
      z: 10 //X 轴所有图形的 zlevel 值。
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999' //y轴标签颜色
      }
    },
    dataZoom: [
      {
        type: 'inside' //开启内置型组件缩放
      }
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },

    series: [
      {
        type: 'bar',
        showBackground: true,
        //普通状态渐变
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        //高亮状态渐变
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: props.values
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
