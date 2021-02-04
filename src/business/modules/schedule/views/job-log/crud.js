export const crudOptions = (vm) => {
  return {
    options: {
      height: '100%'
    },
    formOptions: {
      labelWidth: '150px'
    },
    selectionRow: {
      align: 'center',
      width: 46
    },
    rowHandle: {
      width: 80,
      view: {
        thin: true,
        text: '详情',
        size: 'mini',
        disabled () {
          return !vm.hasPermissions('sys:job-log:view')
        }
      },
      edit: false,
      remove: false
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
        title: '执行ID',
        key: 'executionId',
        width: 200
      },
      {
        title: '任务Bean',
        key: 'taskBean',
        width: 270
      },
      {
        title: '作业组',
        key: 'groupName',
        width: 150
      },
      {
        title: '执行结果',
        key: 'success',
        type: 'select',
        align: 'center',
        width: 100,
        search: { disabled: false },
        dict: { data: [{ value: true, label: '正常', color: 'success' }, { value: false, label: '失败', color: 'danger' }] }
      },
      {
        title: '任务描述',
        key: 'shortDescription',
        width: 150,
        show: false
      },
      {
        title: '开始时间(UTC)',
        key: 'startTime',
        width: 150
      },
      {
        title: '结束时间(UTC)',
        key: 'endTime',
        width: 150
      },
      {
        title: '耗时(毫秒)',
        key: 'executeMs',
        width: 100
      },
      {
        title: '触发源',
        key: 'fireBy',
        width: 80
      },
      {
        title: '异常',
        key: 'ex',
        form: { disabled: true },
        sortable: 'custom'
      },
      {
        title: '异常信息',
        key: 'exMsg',
        show: false
      }
    ]
  }
}
