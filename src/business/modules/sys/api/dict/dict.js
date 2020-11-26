import { request } from '@/api/service'
const prefix = '/sys/dictionaries'

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

export function countByCode (code, excludeId) {
  return request({
    url: prefix + `/counter/code/${code}`,
    method: 'get',
    params: excludeId === undefined ? {} : { excludeId: excludeId }
  })
}

export function getItemList (code) {
  return request({
    url: prefix + `/code/${code}`,
    method: 'get'
  })
}
