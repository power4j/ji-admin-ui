import { dict as dictApi } from '../../api/dict'
import * as resApi from '../../api/resource'

export const crudOptions = (vm) => {
  return {
    rowHandle: {
      view: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('sys:resource:view')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled: () => {
          return !vm.hasPermissions('sys:resource:edit')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled: () => {
          return !vm.hasPermissions('sys:resource:del')
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
            return !vm.hasPermissions('sys:resource:add')
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
        title: '显示名称',
        key: 'title',
        sortable: true,
        form: {
          rules: [{ required: true, message: '此项必填' }, { min: 1, max: 20, message: '长度 20 个字符', trigger: 'blur' }],
          component: {
            props: {
              placeholder: '显示名称'
            }
          }
        },
        width: 240
      },
      {
        title: '图标',
        key: 'icon',
        sortable: false,
        type: 'icon-selector',
        width: 60
      },
      {
        title: '路由名称',
        key: 'name',
        sortable: true,
        form: {
          component: {
            props: {
              placeholder: '路由的名称'
            }
          },
          rules: [{ required: true, message: '此项必填' }, { max: 240, message: '长度 240 个字符', trigger: 'blur' }]
        },
        width: 240
      },
      {
        title: '权限代码',
        key: 'permission',
        sortable: true,
        search: {},
        form: {
          component: {
            props: {
              placeholder: 'aaa:bbb:ccc'
            }
          }
        },
        rules: [{ max: 240, message: '长度 240 个字符', trigger: 'blur' }],
        width: 240
      },
      {
        title: '路由地址',
        key: 'path',
        sortable: true,
        form: {
          component: {
            props: {
              placeholder: 'permission/resource'
            }
          }
        },
        rules: [{ max: 240, message: '长度 240 个字符', trigger: 'blur' }]
      },
      {
        title: 'UI组件',
        key: 'component',
        sortable: true,
        form: {
          helper: '最顶层的菜单必须配置为layoutHeaderAside。子菜单配置组件路径，例如/permission/views/resource',
          rules: [{ max: 240, message: '长度 240 个字符', trigger: 'blur' }]
        },
        width: 180
      },
      {
        title: '排序',
        key: 'sort',
        sortable: true,
        width: 120
      },
      {
        title: '资源类型',
        key: 'type',
        type: 'select',
        align: 'center',
        width: 180,
        dict: {
          url: 'sys_menu_type',
          getData: (url, dict) => {
            return dictApi.getItemList('sys_menu_type').then(ret => { return ret.data })
          }
        },
        form: {
          rules: [{ required: true, message: '此项必填' }]
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
          label: 'title',
          url: 'sys_menu_tree',
          getData: (url, dict) => {
            return resApi.getTree({ showRoot: true }).then(ret => { return ret.data })
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
          }
        },
        rules: [{ required: true, message: '请选父节点' }],
        width: 220
      }
    ]
  }
}
