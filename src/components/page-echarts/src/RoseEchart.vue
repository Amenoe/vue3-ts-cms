<template>
  <div class="rose-echart">
    <BaseEchart :options="options"></BaseEchart>
  </div>
</template>

<script setup lang="ts">
import BaseEchart from '@/baseui/echart/echart.vue'
import type { IEchartData } from '../type'
import type { EChartsOption } from 'echarts'

const props = defineProps<{
  roseData: IEchartData[]
}>()

const options = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal'
    },
    series: [
      {
        type: 'pie',
        radius: ['10%', '120%'],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData,
        label: {
          show: false
        },
        top: 100
      }
    ]
  }
})
</script>

<style lang="scss" scoped></style>
