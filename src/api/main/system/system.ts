import request from '@/api'
//请求页面数据列表
export function getPageListData(url: string, queryInfo: any) {
  request.request({
    method: 'post',
    url: url,
    data: queryInfo
  })
}
