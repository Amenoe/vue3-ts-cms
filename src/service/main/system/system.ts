import request from '../../index'

export function getPageList(pageUrl: string, queryInfo: any) {
  console.log(pageUrl, queryInfo)
  return request.post({
    url: pageUrl,
    data: queryInfo
  })
}
