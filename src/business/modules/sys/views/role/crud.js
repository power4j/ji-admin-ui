import { dict as dictApi } from '../../api/dict'
import * as roleApi from '../../api/role'

export const crudOptions = (vm) => {
  const validateRoleNameame = (rule, value, callback) => {
    if (value) {
      roleApi.countByCode(value, vm.getEditForm().id).then(ret => {
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
      width: 180,
      view: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:role:view')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:role:edit')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:role:del')
        }
      },
      custom: [
        {
          thin: true,
          text: null,
          type: 'warning',
          size: 'small',
          emit: 'permit',
          icon: 'el-icon-s-flag',
          disabled () {
            return !vm.hasPermissions('sys:role:permit')
          }
        }
      ]
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
        title: '角色代码',
        key: 'code',
        search: { disabled: false, component: { props: { clearable: true } } }, // 开启查询
        form: {
          rules: [{ required: true, message: '此项必填' }, { max: 20, message: '长度 20 个字符' }, { validator: validateRoleNameame }]
        },
        sortable: 'custom'
      },
      {
        title: '角色名称',
        key: 'name',
        form: {
          rules: [{ required: true, message: '此项必填' }, { max: 20, message: '长度 20 个字符', trigger: 'blur' }]
        },
        sortable: 'name'
      },
      {
        title: '状态',
        key: 'status',
        type: 'select',
        align: 'center',
        width: 100,
        search: { disabled: false },
        dict: {
          url: 'sys_role_status',
          getData: (url, dict) => {
            return dictApi.getItemList('sys_role_status').then(ret => { return ret.data })
          }
        },
        form: {
          rules: [{ required: true, message: '请选择状态' }]
        }
      },
      {
        title: '创建时间',
        key: 'createAt',
        sortable: 'create_at',
        type: 'datetime',
        form: { disabled: true }
      },
      {
        title: '更新时间',
        key: 'updateAt',
        sortable: 'update_at',
        type: 'datetime',
        form: { disabled: true } // 表单配置
      }
    ]
  }
}
