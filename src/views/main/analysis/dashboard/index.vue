<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <card title="分类商品数量(饼图)">
          <template #content>
            <PieEchart :pie-data="categoryGoodsCount"></PieEchart>
          </template>
        </card>
      </el-col>
      <el-col :span="10">
        <card title="不同城市商品销量">
          <template #content>
            <MapEchart :map-data="goodsAdressSale"></MapEchart>
          </template>
        </card>
      </el-col>
      <el-col :span="7">
        <card title="分类商品数量(玫瑰图)">
          <template #content>
            <RoseEchart :rose-data="categoryGoodsCount"></RoseEchart>
          </template>
        </card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <card title="分类商品的销量">
          <template #content>
            <LineEchart v-bind="categoryGoodsSale"></LineEchart>
          </template> </card
      ></el-col>
      <el-col :span="12">
        <card title="分类商品的收藏">
          <template #content>
            <BarEchart v-bind="categoryGoodsFavor"></BarEchart>
          </template> </card
      ></el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import card from '@/baseui/card/card.vue'
import {
  LineEchart,
  PieEchart,
  RoseEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts/index'
import useAnalysisStore from '@/stores/modules/analysis'
//store
const analysisSotre = useAnalysisStore()
analysisSotre.getDashboardDataAction()
//图标数据
//分类商品数
const categoryGoodsCount = computed(() => {
  return analysisSotre.categoryGoodsCount.map((item: any) => {
    return { name: item.name, value: item.goodsCount }
  })
})

//分类商品销售
const categoryGoodsSale = computed(() => {
  const labels: string[] = []
  const values: any[] = []

  const categoryGoodsSale = analysisSotre.categoryGoodsSale
  for (const item of categoryGoodsSale) {
    labels.push(item.name)
    values.push(item.goodsCount)
  }
  return { labels, values }
})

//分类商品收藏
const categoryGoodsFavor = computed(() => {
  const labels: string[] = []
  const values: any[] = []

  const categoryGoodsFavor = analysisSotre.categoryGoodsFavor
  for (const item of categoryGoodsFavor) {
    labels.push(item.name)
    values.push(item.goodsFavor)
  }
  return { labels, values }
})

//地区商品销售
const goodsAdressSale = computed(() => {
  return analysisSotre.goodsAdressSale.map((item: any) => {
    return { name: item.address, value: item.count }
  })
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 12px;
}
</style>
