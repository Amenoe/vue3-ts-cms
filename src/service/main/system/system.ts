import request from '../../index'

export function getPageList(pageUrl: string, queryInfo: any) {
  return request.post({
    url: pageUrl,
    data: queryInfo
  })
}
