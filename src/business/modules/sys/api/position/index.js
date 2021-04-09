import { request } from '@/api/service'
const prefix = '/sys/position'

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

export function getAll () {
  return request({
    url: prefix + '/all',
    method: 'get'
  })
}

export function countByCode (code, excludeId) {
  return request({
    url: prefix + '/counter/code',
    method: 'get',
    params: {
      value: code,
      excludeId: excludeId === undefined ? '' : excludeId
    }
  })
}
