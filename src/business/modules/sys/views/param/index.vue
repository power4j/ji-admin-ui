<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <template slot="header">
          参数配置
        </template>
        <d2-crud-x
                ref="d2Crud"
                v-bind="_crudProps"
                v-on="_crudListeners">
          <div slot="header">
            <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />

            <el-button slot="header" v-permission="'sys:param:add'" size="mini" type="primary" @click="addRow"><i class="el-icon-plus"/>新增</el-button>

            <crud-toolbar :search="crud.searchOptions.show"
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
import * as paramApi from '../../api/param'
export default {
  name: 'sys-param',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
    }
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      return paramApi.getPage(query)
    },
    addRequest (row) {
      return paramApi.addObj(row)
    },
    updateRequest (row) {
      return paramApi.updateObj(row)
    },
    delRequest (row) {
      return paramApi.delObj(row.id)
    },
    infoRequest (row) {
      return paramApi.getObj(row.id)
    }
  }
}
</script>
