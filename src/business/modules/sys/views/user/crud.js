import { mobileValidator } from 'el-phone-number-input'
import { dict as dictApi } from '../../api/dict'
import * as userApi from '../../api/user'

export const crudOptions = (vm) => {
  const validateUsername = (rule, value, callback) => {
    if (value) {
      userApi.countUsername(value, vm.getEditForm().id).then(ret => {
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
          return false// !vm.hasPermissions('sys:user:view')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:user:edit')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:user:del')
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
        title: '用户名',
        key: 'username',
        search: { disabled: false }, // 开启查询
        form: {
          // editDisabled: true,
          rules: [{ required: true, message: '请输入用户名' }, { max: 20, message: '长度 20 个字符', trigger: 'blur' }, { validator: validateUsername, trigger: 'blur' }]
        },
        sortable: 'custom'
      },
      {
        title: '密码',
        key: 'password',
        form: {
          component: {
            props: {
              autocomplete: 'off',
              showPassword: true
            }
          }
        },
        addForm: {
          rules: [{ required: true, message: '请输入密码' }, { max: 20, message: '长度 20 个字符', trigger: 'blur' }]
        },
        editForm: {
          component: {
            props: {
              placeholder: '填写则修改密码'
            }
          }
        },
        view: { // 查看对话框组件的单独配置
          disabled: true
        },
        disabled: true
      },
      {
        title: '姓名',
        key: 'name',
        form: {
          rules: [{ max: 20, message: '长度 20 个字符', trigger: 'blur' }]
        }
      },
      {
        title: '手机号',
        key: 'mobilePhone',
        width: 150,
        form: {
          rules: [{ required: true, message: '请输入手机号' }, { validator: mobileValidator, message: '手机号不正确' }]
        }
      },
      {
        title: '邮箱',
        key: 'mail',
        form: { // 表单配置
          rules: [{ required: false, message: '请输入邮箱' }, { min: 6, max: 20, message: '长度在 6 到 20 个字符' }, { type: 'email', message: '请输入正确的邮箱' }]
        },
        sortable: 'custom'
      },
      {
        title: '状态',
        key: 'status',
        type: 'select',
        align: 'center',
        width: 100,
        search: { disabled: false },
        dict: {
          url: 'sys_user_status',
          getData: (url, dict) => {
            return dictApi.getItemList('sys_user_status').then(ret => { return ret.data })
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
      },
      {
        title: '创建时间',
        key: 'createIn',
        type: 'daterange',
        search: {
          width: 240,
          disabled: false,
          component: {
            props: { format: 'yyyy-MM-dd', 'value-format': 'yyyy-MM-dd' }
          }
        }, // 开启查询
        form: { disabled: true }, // 添加和编辑表单禁用
        view: { disabled: true }, // 查看表单不禁用
        disabled: true // 是否禁用列
      },
      {
        title: '备注',
        key: 'remarks',
        form: {
          rules: [{ min: 0, max: 20, message: '长度 20 个字符', trigger: 'blur' }]
        },
        show: false
      }
    ]
  }
}
