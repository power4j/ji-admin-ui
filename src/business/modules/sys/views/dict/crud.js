import { dict as dictApi } from '@/business/modules/sys/api/dict'

export const crudOptions = (vm) => {
  const validateDictCode = (rule, value, callback) => {
    if (value) {
      dictApi.countByCode(value, vm.getEditForm().id).then(ret => {
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
      height: '100%'
    },
    formOptions: {
      type: 'dialog'
    },
    rowHandle: {
      width: 180,
      view: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:dict:view')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:dict:edit')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:dict:del')
        }
      },
      custom: [
        {
          thin: true,
          text: null,
          type: 'primary',
          size: 'small',
          emit: 'itemEdit',
          icon: 'el-icon-s-flag',
          disabled: () => {
            return !vm.hasPermissions('sys:dict:edit')
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
        title: '字典名称',
        key: 'name',
        search: { disabled: false }, // 开启查询
        form: {
          rules: [{ required: true, message: '此项必填' }, { max: 40, message: '长度 40 个字符' }]
        }
      },
      {
        title: '字典代码',
        key: 'code',
        form: {
          rules: [{ required: true, message: '此项必填' }, { min: 2, max: 40, message: '长度在 2 到 40 个字符' }, { validator: validateDictCode }]
        },
        editForm: {
          component: {
            disabled: true
          }
        }
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
