import { dict as dictApi } from '../../../sys/api/dict'

export const crudOptions = (vm) => {
  return {
    options: {
      height: '100%'
    },
    rowHandle: {
      dropdown: {
        atLeast: 1,
        size: 'mini',
        text: '更多',
        type: 'success',
        icon: 'el-icon-more'
      },
      width: 200,
      view: {
        thin: true,
        text: '详情',
        size: 'mini',
        disabled () {
          return !vm.hasPermissions('sys:job:view')
        }
      },
      edit: {
        thin: true,
        text: '修改',
        size: 'mini',
        disabled () {
          return !vm.hasPermissions('sys:job:edit')
        }
      },
      remove: {
        thin: true,
        text: '删除',
        size: 'mini',
        disabled () {
          return !vm.hasPermissions('sys:job:del')
        }
      },
      custom: [
        {
          thin: true,
          text: '停止调度',
          type: 'success',
          size: 'mini',
          emit: 'pauseJob',
          icon: 'fa fa-stop-circle-o',
          disabled () {
            return !vm.hasPermissions('sys:job:action')
          }
        },
        {
          thin: true,
          text: '恢复调度',
          type: 'success',
          size: 'mini',
          emit: 'resumeJob',
          icon: 'fa fa-random',
          disabled () {
            return !vm.hasPermissions('sys:job:action')
          }
        },
        {
          thin: true,
          text: '立即调度',
          type: 'success',
          size: 'mini',
          emit: 'scheduleNow',
          icon: 'fa fa-bolt',
          disabled () {
            return !vm.hasPermissions('sys:job:action')
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
        title: '任务Bean',
        key: 'taskBean',
        form: {
          rules: [{ required: true, message: '请填写任务Bean' }, { max: 240, message: '长度 240 个字符', trigger: 'blur' }]
        },
        width: 270
      },
      {
        title: '作业组',
        key: 'groupName',
        search: {
          disabled: false
        },
        form: {
          rules: [{ max: 20, message: '长度 20 个字符', trigger: 'blur' }]
        },
        width: 150
      },
      {
        title: '状态',
        key: 'status',
        type: 'select',
        align: 'center',
        width: 100,
        search: { disabled: false },
        dict: {
          url: 'sys_job_status',
          getData: (url, dict) => {
            return dictApi.getItemList('sys_job_status').then(ret => { return ret.data })
          }
        },
        form: {
          rules: [{ required: true, message: '请选择状态' }]
        }
      },
      {
        title: '调度计划',
        key: 'cron',
        form: {
          // component: { name: 'cron-input' },
          slot: true,
          rules: [{ required: true, message: '请填写调度计划' }, { max: 40, message: '长度 40 个字符', trigger: 'blur' }]
        },
        width: 200
      },
      {
        title: 'MisFire策略',
        key: 'misFirePolicy',
        type: 'select',
        align: 'center',
        dict: {
          url: 'sys_job_mf_policy',
          getData: (url, dict) => {
            return dictApi.getItemList('sys_job_mf_policy').then(ret => { return ret.data })
          }
        },
        form: {
          span: 24,
          rules: [{ required: true, message: '请选择' }]
        }
      },
      {
        title: '失败重试',
        key: 'failRecover',
        type: 'dict-switch', // switch包装组件，支持dict，并且单元格使用tag展示
        dict: { data: [{ value: true, label: '开启' }, { value: false, label: '关闭' }] },
        align: 'center',
        width: 100
      },
      {
        title: '任务参数',
        key: 'param',
        form: {
          component: {
            props: {
              type: 'textarea',
              autosize: { minRows: 2, maxRows: 4 }
            }
          },
          span: 24,
          rules: [{ max: 250, message: '长度 250 个字符', trigger: 'blur' }]
        },
        show: false
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
        title: '创建时间',
        key: 'createAt',
        type: 'datetime',
        form: { disabled: true }, // 表单配置
        sortable: 'custom',
        show: false
      },
      {
        title: '创建者',
        key: 'createBy',
        align: 'center',
        width: 100
      },
      {
        title: '修改时间',
        key: 'updateAt',
        type: 'datetime',
        width: 100,
        form: { disabled: true }, // 表单配置
        sortable: 'custom',
        show: false
      },
      {
        title: '修改者',
        key: 'updateBy',
        align: 'center',
        width: 100
      }
    ]
  }
}
