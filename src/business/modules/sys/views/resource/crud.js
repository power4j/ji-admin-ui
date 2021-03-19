import { roDict as dictApi } from '../../api/dict'
import * as resApi from '../../api/resource'
import util from '@/libs/util.js'

export const crudOptions = (vm) => {
  const validatePath = (rule, value, callback) => {
    if (value) {
      if (!util.str.isURL(value) && !value.startsWith('/')) {
        callback(new Error('请输入URL(以"http[s]"开头)或者路径(以"/"开头)'))
      } else {
        resApi.countPath(value, vm.getEditForm().id).then(ret => {
          if (ret.data > 0) {
            callback(new Error(`${value} 不能使用`))
          } else {
            callback()
          }
        })
      }
    } else {
      callback()
    }
  }
  const validateComponent = (rule, value, callback) => {
    if (value) {
      if (!util.str.isURL(value) && !value.startsWith('/')) {
        callback(new Error('请输入URL(以"http[s]"开头)或者路径(以"/"开头)'))
      } else {
        callback()
      }
    } else {
      callback()
    }
  }
  const validateName = (rule, value, callback) => {
    if (value) {
      resApi.countName(value, vm.getEditForm().id).then(ret => {
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
    formGroup: {
      type: 'collapse',
      accordion: false,
      groups: {
        base: {
          title: '基础配置',
          disabled: false,
          show: true,
          columns: ['type', 'title', 'icon', 'permission', 'sort', 'parentId']
        },
        route: {
          title: '路由配置',
          disabled: false,
          show: true,
          columns: ['name', 'cache', 'path', 'component']
        }
      }
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
            },
            show: ({ key, value, form }) => {
              return form.type !== '2'
            }
          },
          rules: [{ max: 240, message: '长度 240 个字符', trigger: 'blur' }, { validator: validateName, trigger: 'blur' }]
        },
        width: 240
      },
      {
        title: '路由缓冲',
        key: 'cache',
        type: 'select',
        dict: { data: [{ value: true, label: '开启' }, { value: false, label: '关闭' }] },
        align: 'center',
        width: 120
      },
      {
        title: '权限绑定',
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
              placeholder: '/permission/resource'
            },
            span: 24,
            show: ({ key, value, form }) => {
              return form.type !== '2'
            }
          },
          helper: '可以是URL(http://xxx.com)或者路径(/xx/yy/zz)',
          rules: [{ max: 240, message: '长度 240 个字符', trigger: 'blur' }, { validator: validatePath, trigger: 'blur' }]
        }
      },
      {
        title: 'UI组件',
        key: 'component',
        sortable: true,
        form: {
          component: {
            props: {
              placeholder: 'permission/resource'
            },
            span: 24,
            show: ({ key, value, form }) => {
              return form.type !== '2'
            }
          },
          helper: '可以是URL(http://xxx.com)或者组件文件路径(/path/to/file)',
          rules: [{ max: 240, message: '长度 240 个字符', trigger: 'blur' }, { validator: validateComponent, trigger: 'blur' }]
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
        type: 'radio',
        align: 'center',
        width: 180,
        dict: {
          url: 'sys_resource_type',
          getData: (url, dict, { form, component }) => {
            return dictApi.getItemList('sys_resource_type').then(ret => { return ret.data })
          }
        },
        form: {
          component: {
            props: {
              type: 'el-radio-button',
              elProps: {
                size: 'small'
              }
            },
            on: {
              change (event) {
                if (event.scope.form.type === '2') {
                  event.scope.form.name = ''
                  event.scope.form.path = ''
                  event.scope.form.component = ''
                }
              }
            }
          },
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
          },
          rules: [{ required: true, message: '请选父节点' }]
        },
        width: 220
      }
    ]
  }
}
