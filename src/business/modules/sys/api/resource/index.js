import { request } from '@/api/service'
const prefix = '/sys/resources'

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

export function countName (name, excludeId) {
  return request({
    url: prefix + '/counter/name',
    method: 'get',
    params: {
      value: name,
      excludeId: excludeId === undefined ? '' : excludeId
    }
  })
}

export function countPath (path, excludeId) {
  return request({
    url: prefix + '/counter/path',
    method: 'get',
    params: {
      value: path,
      excludeId: excludeId === undefined ? '' : excludeId
    }
  })
}
