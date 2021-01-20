<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <template slot="header">
          任务管理
        </template>
        <d2-crud-x
                ref="d2Crud"
                @pauseJob="pauseJob"
                @resumeJob="resumeJob"
                @scheduleNow="scheduleNow"
                v-bind="_crudProps"
                v-on="_crudListeners">
          <div slot="header">
            <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />

            <el-button slot="header" v-permission="'sys:job:add'" size="mini" type="primary" @click="addRow"><i class="el-icon-plus"/>新增</el-button>

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
import * as jobApi from '../../api/job'
export default {
  name: 'Job',
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
      return jobApi.getPage(query)
    },
    addRequest (row) {
      return jobApi.addObj(row)
    },
    updateRequest (row) {
      return jobApi.updateObj(row)
    },
    delRequest (row) {
      return jobApi.delObj(row.id)
    },
    infoRequest (row) {
      return jobApi.getObj(row.id)
    },
    pauseJob (event) {
      jobApi.pauseJob(event.row.id)
    },
    resumeJob (event) {
      jobApi.resumeJob(event.row.id)
    },
    scheduleNow (event) {
      jobApi.scheduleNow(event.row.id)
    }
  }
}
</script>
