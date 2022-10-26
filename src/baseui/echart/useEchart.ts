import * as echarts from 'echarts'
// 注册中国地图
import chinaJson from './data/china.json'
echarts.registerMap('china', chinaJson as any)

export function useEchart(el: HTMLElement) {
  const echartInstance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  const setSize = () => {
    echartInstance.resize()
  }

  //根据窗口调整echart图形大小
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOptions,
    setSize
  }
}
