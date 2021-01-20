import { dictItem as dictItemApi } from '@/business/modules/sys/api/dict'

export const crudOptions = (vm) => {
  const validateDictValue = (rule, value, callback) => {
    if (value) {
      dictItemApi.countByValue(vm.getEditForm().dictId, value, vm.getEditForm().id).then(ret => {
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
    formOptions: {
      appendToBody: true // 子表格必须 否则弹出对话框无法显示最顶层
    },
    options: {
      height: '100%', // 子表格必须设置高度， 你也可以在这里设置100%，然后给子表格外面包一层有高度的div
      highlightCurrentRow: true,
      border: true
    },
    pagination: false, // 隐藏翻页
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
          return !vm.hasPermissions('sys:dict:edit')
        }
      }
    },
    columns: [
      {
        title: 'id',
        key: 'id',
        form: { component: { show: false } }, // 添加和编辑表单不显示
        view: { component: { show: true } }, // 查看表单显示
        show: false // 是否隐藏列
      },
      {
        title: 'dictId',
        key: 'dictId',
        form: { component: { show: false } }, // 添加和编辑表单不显示
        view: { component: { show: true } }, // 查看表单显示
        show: false // 是否隐藏列
      },
      {
        title: '展示标签',
        key: 'label',
        form: {
          rules: [{ required: true, message: '此项必填' }, { max: 240, message: '长度 240 个字符' }]
        }
      },
      {
        title: '选项值',
        key: 'value',
        form: {
          rules: [{ required: true, message: '此项必填' }, { max: 240, message: '长度 240 个字符' }, { validator: validateDictValue }]
        }
      },
      {
        title: '备注',
        key: 'remarks',
        form: {
          rules: [{ min: 0, max: 20, message: '长度 20 个字符', trigger: 'blur' }]
        }
      }
    ]
  }
}
