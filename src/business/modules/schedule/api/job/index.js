import { request } from '@/api/service'
const prefix = '/sys/jobs'

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

export function scheduleNow (id) {
  return request({
    url: `/sys/job/${id}/action/trigger`,
    method: 'post'
  })
}

export function pauseJob (id) {
  return request({
    url: `/sys/job/${id}/action/pause`,
    method: 'post'
  })
}

export function resumeJob (id) {
  return request({
    url: `/sys/job/${id}/action/resume`,
    method: 'post'
  })
}
