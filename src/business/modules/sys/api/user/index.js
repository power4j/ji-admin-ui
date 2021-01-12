import { request } from '@/api/service'
import { cloneDeep } from 'lodash'
const prefix = '/sys'

export function getPage (query) {
  return request({
    url: prefix + '/users/page',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: prefix + '/users',
    method: 'post',
    data: obj
  })
}

export function updateObj (obj) {
  if (!obj.password) {
    obj = cloneDeep(obj)
    delete obj.password
  }
  return request({
    url: prefix + '/users',
    method: 'put',
    data: obj
  })
}

export function delObj (id) {
  return request({
    url: prefix + `/users/${id}`,
    method: 'delete',
    params: { id }
  })
}

export function getObj (id) {
  return request({
    url: prefix + `/users/${id}`,
    method: 'get'
  })
}
export function countUsername (username, excludeId) {
  return request({
    url: prefix + `/users/counter/username/${username}`,
    method: 'get',
    params: excludeId === undefined ? {} : { excludeId: excludeId }
  })
}

export function getMenuTree () {
  return request({
    url: prefix + '/user/menu/tree',
    method: 'get'
  })
}

export function getRoleList (param) {
  return request({
    url: prefix + '/user/roles',
    method: 'get',
    params: param
  })
}
