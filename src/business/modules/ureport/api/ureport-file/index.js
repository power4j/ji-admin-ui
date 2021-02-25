import { request } from '@/api/service'
const prefix = '/sys/ur-files'

export function getPage (query) {
  return request({
    url: prefix + '/page',
    method: 'get',
    params: query
  })
}

export function delFile (fileName) {
  return request({
    url: prefix + `/file/${fileName}`,
    method: 'delete'
  })
}
