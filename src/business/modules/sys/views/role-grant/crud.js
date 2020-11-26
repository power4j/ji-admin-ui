import * as roleApi from '../../api/role'
import { dict as dictApi } from '../../api/dict'
export const crudOptions = (vm) => {
  const validateRoleGrant = (rule, value, callback) => {
    if (value) {
      if (vm.manageRoleList.findIndex(role => role.id === vm.getEditForm().roleId) === -1) {
        callback(new Error('权限不足'))
      } else {
        callback()
      }
    } else {
      callback()
    }
  }
  return {
    pageOptions: {
      compact: true // 是否紧凑型页面
    },
    options: {
      lineEdit: {
        validation: true // 行编辑是否需要校验
      },
      height: '100%' // 表格高度100%, 使用toolbar必须设置
    },
    pagination: false, // 隐藏翻页
    formOptions: {
      draggable: false,
      fullscreen: false,
      size: '50%',
      saveRemind: true,
      defaultSpan: 12 // 默认的表单 span
    },
    rowHandle: {
      width: 260,
      fixed: 'right',
      view: {
        show: false
      },
      edit: {
        show: true,
        disabled () {
          return !vm.hasPermissions('sys:role:grant')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:role:revoke')
        }
      }
    },
    columns: [
      {
        title: 'ID',
        key: 'id',
        width: 90,
        form: {
          disabled: true
        },
        disabled: true // 是否隐藏列
      },
      {
        title: '用户',
        key: 'userId',
        form: {
          disabled: true
        },
        disabled: true // 是否隐藏列
      },
      {
        title: '角色',
        key: 'roleId',
        sortable: true,
        minWidth: 100,
        type: 'select',
        dict: {
          url: 'sys_role_list',
          getData: (url, dict) => {
            return roleApi.getAll().then(ret => ret.data.map(o => { return { ...o, value: o.id, label: o.name } }))
          }
        },
        form: {
          rules: [{ required: true, message: '此项必填' }, { validator: validateRoleGrant, trigger: 'change' }]
        }
      },
      {
        title: '授权类型',
        key: 'grantType',
        sortable: true,
        search: { disabled: false },
        type: 'select',
        dict: {
          url: 'sys_role_grant_type',
          getData: (url, dict) => {
            return dictApi.getItemList('sys_role_grant_type').then(ret => { return ret.data })
          }
        },
        form: {
          rules: [{ required: true, message: '此项必填' }]
        },
        minWidth: 100
      }
    ]
  }
}
