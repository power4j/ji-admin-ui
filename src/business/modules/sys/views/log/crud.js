import { roDict as dictApi } from '../../../sys/api/dict'

export const crudOptions = (vm) => {
  return {
    options: {
      height: '100%' // 表格高度100%, 使用toolbar必须设置
    },
    rowHandle: {
      // columnHeader: '操作',
      width: 180,
      view: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:log:view')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled () {
          return true // !vm.hasPermissions('sys:log:edit')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled () {
          return true // !vm.hasPermissions('sys:log:del')
        }
      }
    },
    columns: [
      {
        title: 'id',
        key: 'id',
        width: 70,
        form: { component: { show: false } }, // 添加和编辑表单不显示
        view: { component: { show: true } }, // 查看表单显示
        show: false // 是否隐藏列
      },
      {
        title: '模块',
        key: 'module',
        search: { disabled: false }, // 开启查询
        sortable: 'custom'
      },
      {
        title: '名称',
        key: 'apiTag',
        form: {
          component: {
            props: {
              type: 'textarea',
              autosize: { minRows: 2, maxRows: 4 }
            }
          }
        }
      },
      {
        title: '用户名',
        key: 'username'
      },
      {
        title: '访问来源',
        key: 'location'
      },
      {
        title: 'HTTP方法',
        key: 'method',
        type: 'select',
        align: 'center',
        width: 100,
        search: { disabled: false },
        dict: {
          url: 'http_method_name',
          getData: (url, dict) => {
            return dictApi.getItemList('http_method_name').then(ret => { return ret.data })
          }
        }
      },
      {
        title: '路径',
        key: 'path'
      },
      {
        title: '访问时间',
        key: 'accessAt'
      },
      {
        title: '耗时(毫秒)',
        key: 'duration'
      },
      {
        title: 'API响应码',
        key: 'responseCode'
      },
      {
        title: 'URL参数',
        key: 'query',
        form: { disabled: true },
        sortable: 'custom',
        show: false
      },
      {
        title: '用户ID',
        key: 'uid',
        form: { disabled: true },
        sortable: 'custom',
        show: false
      },
      {
        title: '异常',
        key: 'ex',
        form: { disabled: true },
        sortable: 'custom',
        show: false
      },
      {
        title: '异常信息',
        key: 'exMsg',
        show: false
      }
    ]
  }
}
