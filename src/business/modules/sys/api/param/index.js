import { request } from '@/api/service'
const prefix = '/sys/param'

export function getPage (query) {
  return request({
    url: prefix + '/page',
    method: 'get',
    params: query
  })
}

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

export function getByKey (key) {
  return request({
    url: prefix + `/key/${key}`,
    method: 'get'
  })
}

export function countByKey (key, excludeId) {
  return request({
    url: prefix + '/counter/key',
    method: 'get',
    params: {
      value: key,
      excludeId: excludeId === undefined ? '' : excludeId
    }
  })
}
