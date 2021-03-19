import { dict as dictApi } from '../../api/dict'
import * as orgApi from '../../api/org'

export const crudOptions = (vm) => {
  const validateCode = (rule, value, callback) => {
    if (value) {
      orgApi.countCode(value, vm.getEditForm().id).then(ret => {
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
    rowHandle: {
      view: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:org:view')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled: () => {
          return !vm.hasPermissions('sys:org:edit')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled: () => {
          return !vm.hasPermissions('sys:org:del')
        }
      },
      custom: [
        {
          thin: true,
          text: null,
          type: 'primary',
          size: 'small',
          emit: 'add-sub-resource',
          icon: 'el-icon-plus',
          disabled: () => {
            return !vm.hasPermissions('sys:org:add')
          }
        }
      ],
      width: 180,
      fixed: 'right'
    },
    pagination: false, // 隐藏翻页
    options: {
      height: '100%', // 表格高度100%, 使用toolbar必须设置
      highlightCurrentRow: true,
      lazy: true,
      load: vm.loadChildren
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
        title: '名称',
        key: 'name',
        sortable: true,
        form: {
          rules: [{ required: true, message: '此项必填' }, { min: 1, max: 40, message: '长度 20 个字符', trigger: 'blur' }],
          component: {
            props: {
              placeholder: '显示名称'
            }
          }
        },
        width: 240
      },
      {
        title: '组织代码',
        key: 'code',
        sortable: true,
        form: {
          component: {
            props: {
              placeholder: '组织代码必须唯一'
            }
          },
          rules: [{ required: true, message: '此项必填' }, { max: 240, message: '长度 20 个字符', trigger: 'blur' }, { validator: validateCode, trigger: 'blur' }]
        },
        width: 240
      },
      {
        title: '排序',
        key: 'sort',
        sortable: true,
        width: 120
      },
      {
        title: '标签',
        key: 'tag',
        type: 'select',
        align: 'center',
        width: 180,
        dict: {
          url: 'sys_org_tags',
          getData: (url, dict, { form, component }) => {
            return dictApi.getItemList('sys_org_tags').then(ret => { return ret.data })
          }
        },
        sortable: true
      },
      {
        title: '父节点',
        key: 'parentId',
        sortable: true,
        type: 'tree-selector',
        dict: {
          isTree: true,
          value: 'id',
          label: 'name',
          url: 'sys_org_tree',
          getData: (url, dict) => {
            return orgApi.getTree({ showRoot: true }).then(ret => { return ret.data })
          }
        },
        form: {
          component: {
            props: {
              multiple: false,
              elProps: {
                defaultExpandAll: true
              },
              dict: { cache: false }
            }
          },
          rules: [{ required: true, message: '请选父节点' }]
        },
        width: 220
      },
      {
        title: '备注',
        key: 'remarks',
        form: {
          component: {
            span: 24
          },
          rules: [{ min: 0, max: 20, message: '长度 40 个字符', trigger: 'blur' }]
        },
        show: false
      }
    ]
  }
}
