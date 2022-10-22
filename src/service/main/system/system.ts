import type { IDataType } from '@/service/types'
import request from '../../index'

export function getPageList(pageUrl: string, queryInfo: any) {
  return request.post<IDataType>({
    url: pageUrl,
    data: queryInfo
  })
}

export function getPageListById(pageUrl: string) {
  return request.get({
    url: pageUrl
  })
}

export function deletePageData(pageUrl: string) {
  return request.delete<IDataType>({
    url: pageUrl
  })
}

export function createPageData(pageUrl: string, newData: any) {
  return request.post<IDataType>({
    url: pageUrl,
    data: newData
  })
}

export function editPageData(pageUrl: string, editData: any) {
  return request.patch<IDataType>({
    url: pageUrl,
    data: editData
  })
}
