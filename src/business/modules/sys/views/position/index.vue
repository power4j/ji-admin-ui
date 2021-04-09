<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <template slot="header">角色管理
        </template>
        <d2-crud-x
                ref="d2Crud"
                size="mini"
                v-bind="_crudProps"
                v-on="_crudListeners"
                @permit="permitHandle"
        >
            <div slot="header" class="d2-mb-5">

            </div>

          <div slot="header">
            <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />

            <el-button v-permission="'sys:position:add'" size="mini" type="primary" @click="addRow"><i class="el-icon-plus"/>新增</el-button>

            <crud-toolbar :search.sync="crud.searchOptions.show"
                          :compact.sync="crud.pageOptions.compact"
                          :columns="crud.columns"
                          @refresh="doRefresh()"
                          @columns-filter-changed="handleColumnsFilterChanged"/>
          </div>

        </d2-crud-x>
    </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import * as positionApi from '../../api/position'
export default {
  name: 'sys-position-list-view',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      list: [],
      listLoading: true,
      form: {}
    }
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      return positionApi.getPage(query)
    },
    addRequest (row) {
      return positionApi.addObj(row)
    },
    updateRequest (row) {
      return positionApi.updateObj(row)
    },
    delRequest (row) {
      return positionApi.delObj(row.id)
    },
    permitHandle (event) {
      // TODO ...
      console.log('permitHandle', event.row.id)
      this.$confirm('此功能正在开发中', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    }
  }
}
</script>
