import axios from 'axios'
import Adapter from 'axios-mock-adapter'
import { get } from 'lodash'
import util from '@/libs/util'
import qs from 'qs'
import { errorLog, errorCreate, errorMsg } from './tools'
import store from '@/store'
import { MessageBox } from 'element-ui'

/**
 * @description 创建请求实例
 */
function createService () {
  // 创建一个 axios 实例
  const service = axios.create()
  // 请求拦截
  service.interceptors.request.use(
    config => {
      if (config.method === 'get') {
        config.paramsSerializer = function (params) {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        }
      }
      return config
    },
    error => {
      // 发送失败
      console.log(error)
      return Promise.reject(error)
    }
  )
  // 响应拦截
  service.interceptors.response.use(
    response => {
      // dataAxios 是 axios 返回数据中的 data
      const apiResponse = response.data
      // 这个状态码是和后端约定的
      const { code } = apiResponse
      // 根据 code 进行判断
      if (code === undefined) {
        // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
        return apiResponse
      } else {
        // 有 code 代表这是一个后端接口 可以进行进一步的判断
        switch (code) {
          case 0:
            // 0 代表没有错误
            // 可能结果还需要code和msg进行后续处理，返回整个 apiResponse
            return apiResponse
          case 401:
            return
          default:
            // 不是正确的 code
            errorMsg(apiResponse.msg)
            errorCreate(`${apiResponse.msg}: ${response.config.url}`)
            break
        }
      }
    },
    error => {
      const status = get(error, 'response.status')
      switch (status) {
        case 400: error.message = '400 - 请求错误'; break
        case 401: error.message = '401 - 未授权，请登录'; break
        case 403: error.message = '403 - 拒绝访问'; break
        case 404: error.message = `404 - 请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '408 - 请求超时'; break
        case 500: error.message = '500 - 服务器内部错误'; break
        case 501: error.message = '501 - 服务未实现'; break
        case 502: error.message = '502 - 网关错误'; break
        case 503: error.message = '503 - 服务不可用'; break
        case 504: error.message = '504 - 网关超时'; break
        case 505: error.message = '505 - HTTP版本不受支持'; break
        default: break
      }
      const msg = get(error, 'response.data.msg')
      if (msg) {
        error.message = `${error.message}  (${msg})`
      }
      if (error.code === 'ECONNABORTED') {
        errorMsg('请求失败,请检查网络', 10000)
      }
      errorLog(error)
      if (status === 401) {
        MessageBox.confirm('您没有登录，或者登录会话已经过期。', '请登录', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('d2admin/account/logout', { confirm: false }).then(() => {})
        })
      } else {
        errorMsg(error.message)
      }
      return Promise.reject(error)
    }
  )
  return service
}

/**
 * @description 创建请求方法
 * @param {Object} service axios 实例
 */
function createRequestFunction (service) {
  return function (config) {
    const token = util.cookies.get('token')
    const configDefault = {
      headers: {
        'x-api-token': token,
        'Content-Type': get(config, 'headers.Content-Type', 'application/json')
      },
      timeout: process.env.VUE_APP_API_TIMEOUT,
      baseURL: process.env.VUE_APP_API,
      data: {}
    }
    return service(Object.assign(configDefault, config))
  }
}

// 用于真实网络请求的实例和请求方法
export const service = createService()
export const request = createRequestFunction(service)

// 用于模拟网络请求的实例和请求方法
export const serviceForMock = createService()
export const requestForMock = createRequestFunction(serviceForMock)

// 网络请求数据模拟工具
export const mock = new Adapter(serviceForMock)
