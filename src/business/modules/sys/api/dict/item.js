import { request } from '@/api/service'
const prefix = '/sys/dictionary/items'

export function addObj (obj) {
  return request({
    url: prefix,
    method: 'post',
    data: obj
  })
}

export function updateObj (obj) {
  return request({
    url: prefix,
    method: 'put',
    data: obj
  })
}
export function delObj (id) {
  return request({
    url: prefix + `/${id}`,
    method: 'delete'
  })
}

export function getObj (id) {
  return request({
    url: prefix + `/${id}`,
    method: 'get'
  })
}

export function countByValue (dictId, itemValue, excludeId) {
  const query = { dictId: dictId }
  if (excludeId !== undefined) {
    query.excludeId = excludeId
  }
  return request({
    url: prefix + `/counter/values/${itemValue}`,
    method: 'get',
    params: query
  })
}
