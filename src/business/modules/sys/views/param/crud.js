import { dict as dictApi } from '../../api/dict'
import * as paramApi from '../../api/param'

export const crudOptions = (vm) => {
  const validateParamKey = (rule, value, callback) => {
    if (value) {
      paramApi.countByKey(value, vm.getEditForm().id).then(ret => {
        if (ret.data > 0) {
          callback(new Error(`${value} 不能使用`))
        } else {
          callback()
        }
      })
    } else {
      callback()
    }
  }
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
          return !vm.hasPermissions('sys:param:view')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:param:edit')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:param:del')
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
        title: '参数名称',
        key: 'paramKey',
        search: { disabled: false }, // 开启查询
        form: {
          rules: [{ required: true, message: '请输入参数名称' }, { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }, { validator: validateParamKey, trigger: 'blur' }]
        },
        sortable: 'custom'
      },
      {
        title: '参数值',
        key: 'paramValue',
        form: {
          component: {
            props: {
              type: 'textarea',
              autosize: { minRows: 2, maxRows: 4 }
            }
          },
          rules: [{ required: true, message: '请输入参数值' }, { max: 2000, message: '长度 2000 个字符', trigger: 'blur' }]
        }
      },
      {
        title: '备注',
        key: 'remarks',
        form: {
          rules: [{ min: 0, max: 20, message: '长度 20 个字符', trigger: 'blur' }]
        },
        show: false
      },
      {
        title: '状态',
        key: 'status',
        type: 'select',
        align: 'center',
        width: 100,
        search: { disabled: false },
        dict: {
          url: 'sys_param_status',
          getData: (url, dict) => {
            return dictApi.getItemList('sys_param_status').then(ret => { return ret.data })
          }
        },
        form: {
          rules: [{ required: true, message: '请选择状态' }]
        }
      },
      {
        title: '创建时间',
        key: 'createAt',
        type: 'datetime',
        form: { disabled: true }, // 表单配置
        sortable: 'custom'
      },
      {
        title: '修改时间',
        key: 'updateAt',
        type: 'datetime',
        width: 100,
        form: { disabled: true }, // 表单配置
        sortable: 'custom'
      }
    ]
  }
}
