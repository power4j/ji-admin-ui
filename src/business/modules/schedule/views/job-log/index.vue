<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <template slot="header">
          任务执行日志
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
          <span slot="PaginationPrefixSlot" class="prefix" >
            <el-button class="square" size="mini" title="批量删除"   @click="batchDelete" icon="el-icon-delete" :disabled="!batchDeleteEnabled"  />
          </span>
        </d2-crud-x>
    </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import * as jobLogApi from '../../api/job-log'
export default {
  name: 'schedule-job-log',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
    }
  },
  computed: {
    batchDeleteEnabled: function () {
      return this.hasPermissions('sys:job-log:del') && this.multipleSelection
    }
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      return jobLogApi.getPage(query)
    },
    batchDelRequest (ids) {
      return jobLogApi.delBatch(ids)
    }
  }
}
</script>
