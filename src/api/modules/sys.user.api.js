export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
   * @description 登录
   * @param {Object} data 登录携带的信息
   */
  SYS_USER_LOGIN (data = {}) {
    const param = (({ reqToken, code }) => ({ reqToken, code }))(data)
    const body = (({ username, password }) => ({ username, password }))(data)
    return request({
      headers: { 'x-api-token': '' },
      url: '/login',
      method: 'post',
      data: body,
      params: param
    })
  }
})
