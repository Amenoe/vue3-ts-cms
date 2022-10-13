import type { IDataType } from '@/service/types'
import request from '../../index'

export function getPageList(pageUrl: string, queryInfo: any) {
  console.log(pageUrl, queryInfo)
  return request.post<IDataType>({
    url: pageUrl,
    data: queryInfo
  })
}

export function deletePageData(pageUrl: string) {
  return request.delete<IDataType>({
    url: pageUrl
  })
}
