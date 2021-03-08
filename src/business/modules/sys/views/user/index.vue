<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <template slot="header">
          用户管理
        </template>
        <d2-crud-x
                ref="d2Crud"
                v-bind="_crudProps"
                v-on="_crudListeners">
          <div slot="header">
            <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />

            <el-button slot="header" v-permission="'sys:user:add'" size="mini" type="primary" @click="addRow"><i class="el-icon-plus"/>新增</el-button>

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
import * as userApi from '../../api/user'
export default {
  name: 'sys-user',
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
      return userApi.getPage(query)
    },
    addRequest (row) {
      return userApi.addObj(row)
    },
    updateRequest (row) {
      return userApi.updateObj(row)
    },
    delRequest (row) {
      return userApi.delObj(row.id)
    },
    infoRequest (row) {
      return userApi.getObj(row.id)
    }
  }
}
</script>
