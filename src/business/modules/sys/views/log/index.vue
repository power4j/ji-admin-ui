<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <template slot="header">
          访问日志
        </template>
        <d2-crud-x
                ref="d2Crud"
                v-bind="_crudProps"
                v-on="_crudListeners">
          <div slot="header">
            <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />

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
import * as crudApi from '../../api/log'
export default {
  name: 'sys-log',
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
      return crudApi.getPage(query)
    },
    addRequest (row) {
      return crudApi.addObj(row)
    },
    updateRequest (row) {
      return crudApi.updateObj(row)
    },
    delRequest (row) {
      return crudApi.delObj(row.id)
    },
    infoRequest (row) {
      return crudApi.getObj(row.id)
    }
  }
}
</script>
