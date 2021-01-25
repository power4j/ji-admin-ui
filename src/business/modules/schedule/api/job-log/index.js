import { request } from '@/api/service'
const prefix = '/sys/job-logs'

export function getPage (query) {
  return request({
    url: prefix + '/page',
    method: 'get',
    params: query
  })
}

export function delBatch (idList) {
  return request({
    url: prefix,
    method: 'delete',
    data: idList
  })
}
