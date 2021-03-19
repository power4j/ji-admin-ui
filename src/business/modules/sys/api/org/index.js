import { request } from '@/api/service'
const prefix = '/sys/org'

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

export function getTree (query) {
  return request({
    url: prefix + '/tree/all',
    method: 'get',
    params: query
  })
}

export function getChildren (id) {
  return request({
    url: prefix + `/tree/children?pid=${id}`,
    method: 'get'
  })
}

export function countCode (code, excludeId) {
  return request({
    url: prefix + '/counter/code',
    method: 'get',
    params: {
      value: code,
      excludeId: excludeId === undefined ? '' : excludeId
    }
  })
}
