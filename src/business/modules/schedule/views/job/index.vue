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
          <template slot="cronFormSlot" slot-scope="scope">
            <div class="cron">
              <el-popover v-model="cronPopover">
                <cron @change="handleCronChange" @close="cronPopover=false" i18n="cn"></cron>
                <el-input slot="reference" @click="cronPopover=true" v-model="scope.form.cron" placeholder="请输入定时策略"></el-input>
              </el-popover>
            </div>
          </template>
        </d2-crud-x>
    </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { cron } from 'vue-cron'
import * as jobApi from '../../api/job'
export default {
  name: 'schedule-job',
  mixins: [d2CrudPlus.crud],
  components: { cron },
  data () {
    return {
      cronPopover: false
    }
  },
  methods: {
    handleCronChange (text) {
      this.getEditForm().cron = text
    },
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
      this.$confirm('是否继续操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        jobApi.pauseJob(event.row.id).then(() => this.doRefresh())
      })
    },
    resumeJob (event) {
      this.$confirm('是否继续操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        jobApi.resumeJob(event.row.id).then(() => this.doRefresh())
      })
    },
    scheduleNow (event) {
      this.$confirm('是否继续操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        jobApi.scheduleNow(event.row.id).then(() => this.doRefresh())
      })
    }
  }
}
</script>
