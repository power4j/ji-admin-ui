<template>
  <div>
    <div style="height: 400px">
      <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners"
      >
        <div slot="header">
          <el-button size="mini" :disabled="disableAdd" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
          <!-- 同一个页面下 多个toolbar 需要设置storage名称，否则列设置保存会有冲突-->
          <crud-toolbar  :search=null
                         :columns="crud.columns"
                         @refresh="doRefresh()"
                         storage="dictItem"
                         @columns-filter-changed="handleColumnsFilterChanged"/>

        </div>
      </d2-crud-x>
    </div>
  </div>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { dict as dictApi, dictItem as dictItemApi } from '../../../api/dict'

/**
 * 子表格当成一个普通组件来被父表格引用
 */
export default {
  name: 'DictItem',
  mixins: [d2CrudPlus.crud],
  props: {
    dictCode: {
      required: true
    }
  },
  watch: {
    dictCode (value) {
      this.doRefresh()
    }
  },
  computed: {
    disableAdd () {
      return !this.hasPermissions('sys:dict:edit')
    }
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      return dictApi.getItemList(this.dictCode).then(ret => {
        const list = ret.data
        // hack pageResponse
        ret.data = {
          current: 1,
          size: 10000,
          total: 10000,
          records: list
        }
        return ret
      })
    },
    addRequest (row) {
      return dictItemApi.addObj(row)
    },
    updateRequest (row) {
      return dictItemApi.updateObj(row)
    },
    delRequest (row) {
      return dictItemApi.delObj(row.id)
    }
  }
}
</script>
