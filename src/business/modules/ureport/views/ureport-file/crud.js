export const crudOptions = (vm) => {
  return {
    options: {
      height: '100%'
    },
    rowHandle: {
      dropdown: {
        atLeast: 4,
        size: 'mini',
        text: '更多',
        type: 'success',
        icon: 'el-icon-more'
      },
      width: 200,
      view: {
        show: false
      },
      edit: {
        show: false
      },
      remove: {
        thin: true,
        text: '删除',
        size: 'mini',
        disabled () {
          return !vm.hasPermissions('sys:ureports:del')
        }
      },
      custom: [
        {
          thin: true,
          text: '报表编辑',
          type: 'success',
          size: 'mini',
          emit: 'onDesign',
          icon: 'fa fa-pencil-square-o',
          disabled () {
            return !vm.hasPermissions('sys:ureports:design')
          }
        },
        {
          thin: true,
          text: '报表预览',
          type: 'success',
          size: 'mini',
          emit: 'onPreview',
          icon: 'fa fa-file-text-o',
          disabled () {
            return !vm.hasPermissions('sys:ureports:preview')
          }
        },
        {
          thin: true,
          text: '报表导出',
          type: 'success',
          size: 'mini',
          emit: 'onExport',
          icon: 'fa fa-file-text-o',
          disabled () {
            return !vm.hasPermissions('sys:ureports:export')
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
        title: '报表文件',
        key: 'file',
        search: {
          disabled: false
        }
      },
      {
        title: '创建时间',
        key: 'createAt',
        width: 200,
        form: { disabled: true }
      },
      {
        title: '修改时间',
        key: 'updateAt',
        width: 200,
        form: { disabled: true }
      }
    ]
  }
}
