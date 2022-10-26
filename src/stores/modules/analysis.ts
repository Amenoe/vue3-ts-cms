import { defineStore } from 'pinia'
import {
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale,
  getGoodsAddressSale
  // getAmountList
} from '@/service/main/analysis/analysis'

const useAnalysisStore = defineStore('analysis', {
  state: (): {
    categoryGoodsCount: any[]
    categoryGoodsSale: any[]
    categoryGoodsFavor: any[]
    goodsAdressSale: any[]
  } => {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      goodsAdressSale: []
    }
  },
  getters: {},
  actions: {
    async getDashboardDataAction() {
      const categoryCountResult = await getCategoryGoodsCount()
      this.categoryGoodsCount = categoryCountResult
      const categoryGoodsFavorResult = await getCategoryGoodsFavor()
      this.categoryGoodsFavor = categoryGoodsFavorResult
      const categoryGoodsSaleResult = await getCategoryGoodsSale()
      this.categoryGoodsSale = categoryGoodsSaleResult
      const goodsAdressSaleResult = await getGoodsAddressSale()
      this.goodsAdressSale = goodsAdressSaleResult
    }
  }
})

export default useAnalysisStore
