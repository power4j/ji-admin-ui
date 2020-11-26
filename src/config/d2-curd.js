/**
 * see http://d2-crud-plus.docmirror.cn/d2-crud-plus/
 */
function getCrudOption () {
  return {
    format: {
      page: { // page接口返回的数据结构配置，
        request: {
          current: 'current',
          size: 'size'
        },
        response: {
          current: 'current', // 当前页码 ret.data.current
          size: 'size', // 当前页码 ret.data.current
          // size: (data) => { return data.size }, // 每页条数，ret.data.size, 你也可以配置一个方法，自定义返回
          total: 'total', // 总记录数 ret.data.total
          records: 'records' // 列表数组 ret.data.records
        }
      }
    },
    options: {
      stripe: true,
      border: true,
      highlightCurrentRow: false, // 是否高亮选中行
      size: 'mini',
      // 表格高度100%, 使用toolbar必须设置
      // 要想去掉el-table自身的滚动条，内容高度撑开
      // 可以配置 height:null,maxHeight:null,然后用空方法覆盖reComputeCrudHeight(){}
      height: '100%',
      maxHeight: 'auto'
    },
    pageOptions: {
      compact: true
    },
    formOptions: {
      type: 'dialog', // 默认对话框模式，drawer 抽屉模式
      nullToBlankStr: true, // 提交修改表单时，将undefinded的数据修改为空字符串''，可以解决无法清空字段的问题
      defaultSpan: 12 // 默认的表单 span
    },
    viewOptions: {
      disabled: false,
      componentType: 'row' // 【form,row】 表单组件 或 行组件展示
    },
    searchOptions: { // 查询配置参数, 支持el-form的配置参数
      size: 'mini',
      show: true, // 是否显示搜索工具条
      disabled: false, // 是否禁用搜索工具条
      debounce: { // 自动查询防抖,debounce:false关闭自动查询
        wait: 500 // 延迟500毫秒
      },
      searchAfterReset: true, // 点击重置后是否立即查询
      buttons: {
        search: { // 配置false，隐藏按钮
          thin: false, // 瘦模式，thin=true 且 text=null 可以设置方形按钮节省位置
          text: '搜索', // 按钮文字， null= 取消文字，↓↓↓↓也可以传入一个方法↓↓↓↓
          // text(scope){return 'xx'}
          type: 'warning', // 按钮类型
          icon: 'el-view', // 按钮图标，↓↓↓↓也可以传入一个方法↓↓↓↓
          // icon(scope){return 'xx'}
          size: 'mini', // 按钮大小
          circle: false, // 圆形按钮 ，需要thin=true,且text=null
          show: true, // 是否显示按钮，↓↓↓↓也可以传入一个方法根据数据决定该按钮是否显示↓↓↓↓↓↓↓↓
          // show(index,row){return row.status==='xxx'}
          disabled: false, // 是否禁用，↓↓↓↓也可以传入一个方法根据数据决定该按钮是否禁用↓↓↓↓
          // disabled(index,row){return row.status==='xxx'}
          order: 1 // 排序号，数字小，排前面
        },
        reset: {} // 同上
      }
    },
    pagination: { // 翻页配置,更多配置参考el-pagination
      currentPage: 1,
      pageSize: 20,
      total: 1,
      storage: true // 本地保存用户每页条数修改，刷新不会丢失该修改，false=关闭
      // storage:'keysuffix'// 传入字符串，将会给保存的key增加一个后缀，用于区分同一个页面下多个crud
    },
    rowHandle: {
      dropdown: { // 操作列折叠
        atLeast: 5, // 至少x个以上的按钮才会被折叠
        text: '更多', // dropdown按钮文字
        type: 'warn'
      },
      columnHeader: '操作',
      width: 180,
      view: {
        thin: true,
        text: null
      },
      edit: {
        thin: true,
        text: null
      },
      remove: {
        thin: true,
        text: null
      }
    }
  }
}

export { getCrudOption }
