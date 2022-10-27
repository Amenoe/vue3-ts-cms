<template>
  <div class="pie-echart">
    <BaseEchart :options="options"></BaseEchart>
  </div>
</template>

<script setup lang="ts">
import BaseEchart from '@/baseui/echart/echart.vue'
import { convertData } from '../utils/convert-data'
import type { IEchartData } from '../type'
import type { EChartsOption } from 'echarts'

const props = defineProps<{
  mapData: IEchartData[]
}>()

const options = computed<EChartsOption>(() => {
  return {
    backgroundColor: '#fff',
    title: {
      text: '全国销量统计',
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return params.name + ' : ' + params.value[2]
      }
    },
    //左侧的热力图
    visualMap: {
      min: 0,
      max: 60000,
      left: 20,
      bottom: 20,
      calculable: true,
      text: ['高', '低'],
      inRange: {
        color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)']
      },
      textStyle: {
        color: '#fff'
      }
    },
    //地理编码
    geo: {
      map: 'china',
      roam: true, //是否开启地图缩放和拖拽
      emphasis: {
        areaColor: '#f4cccc',
        borderColor: 'rgb(9, 54, 95)',
        itemStyle: {
          areaColor: '#f4cccc'
        }
      }
    },
    series: [
      //绘制地图的数据
      {
        name: '销量',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(props.mapData),
        symbolSize: 12,
        emphasis: {
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      },
      //绘制地图
      {
        type: 'map',
        map: 'china',
        geoIndex: 0,
        aspectScale: 0.75,
        tooltip: {
          show: false
        }
      }
    ]
  }
})
</script>

<style lang="scss" scoped></style>
