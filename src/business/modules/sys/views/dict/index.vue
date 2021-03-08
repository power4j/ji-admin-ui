<template>
  <d2-container>
    <template slot="header">字典维护</template>
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      @itemEdit="handleItemEdit"
    >
      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" @search-data-change="handleSearchDataChange"  />
        <el-button size="mini" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
        <crud-toolbar :search.sync="crud.searchOptions.show"
                      :columns="crud.columns"
                      @refresh="doRefresh()"
                      @columns-filter-changed="handleColumnsFilterChanged"/>
      </div>
    </d2-crud-x>
    <el-dialog ref="itemDialog" :title="itemDialog"
               :visible.sync="dialogDictItemVisible">
      <dict-item ref="dictItem" :dictCode="editingDict ? editingDict.code : null"></dict-item>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="dialogDictItemVisible = false">关闭
        </el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { dict as dictApi } from '../../api/dict'
import DictItem from './dict-item'

export default {
  name: 'sys-dict',
  mixins: [d2CrudPlus.crud],
  components: { DictItem },
  data () {
    return {
      editingDict: null,
      dialogDictItemVisible: false
    }
  },
  computed: {
    itemDialog () {
      return this.editingDict ? `编辑字典项: ${this.editingDict.name}` : '编辑字典项'
    }
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      return dictApi.getPage(query)
    },
    addRequest (row) {
      return dictApi.addObj(row)
    },
    updateRequest (row) {
      return dictApi.updateObj(row)
    },
    delRequest (row) {
      return dictApi.delObj(row.id)
    },
    handleItemEdit (event) {
      this.editingDict = event.row
      this.dialogDictItemVisible = true
    }
  }
}
</script>
