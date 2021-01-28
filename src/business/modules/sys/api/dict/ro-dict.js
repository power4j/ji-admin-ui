import { request } from '@/api/service'
const prefix = '/sys/immutable-dictionaries'
/**
 * 获取常量字典
 * @param code
 * @returns {*}
 */
export function getItemList (code) {
  return request({
    url: prefix + `/code/${code}`,
    method: 'get'
  })
}
