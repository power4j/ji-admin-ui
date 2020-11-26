import { request } from '@/api/service'
const prefix = '/sys/role/grantee'

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

export function getListByUserId (uid, query) {
  return request({
    url: prefix + `/users/${uid}`,
    method: 'get',
    params: query
  })
}
export function getRoleListByUserId (uid, query) {
  return request({
    url: prefix + `/user/${uid}/role-list`,
    method: 'get',
    params: query
  })
}

/**
 * 获取角色权限资源
 * @param roleId
 * @returns {*}
 * @constructor
 */
export function getPermission (roleId) {
  return request({
    url: prefix + `/${roleId}/resource`,
    method: 'get'
  })
}

/**
 * 授权
 * @param roleId
 * @param resourceIds
 * @returns {*}
 * @constructor
 */
export function permit (roleId, resourceIds) {
  return request({
    url: prefix + `/${roleId}/resource`,
    method: 'post',
    data: resourceIds
  })
}
