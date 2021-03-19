<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <template slot="header">
          报表管理
        </template>
        <d2-crud-x
                ref="d2Crud"
                @onDesign="handleDesign"
                @onPreview="handlePreview"
                @onExport="handleExport"
                v-bind="_crudProps"
                v-on="_crudListeners">
          <div slot="header">
            <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />

            <el-button slot="header" v-permission="'sys:ureports:design'" size="mini" type="primary" @click="openDesigner"><i class="el-icon-plus"/>新增</el-button>

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
import util from '@/libs/util.js'
import { mapActions, mapState } from 'vuex'
import * as urFileApi from '../../api/ureport-file'
export default {
  name: 'UrFile',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      cronPopover: false
    }
  },
  computed: {
    ...mapState('d2admin/page', [
      'opened'
    ])
  },
  methods: {
    ...mapActions('d2admin/page', [
      'currentSet'
    ]),
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      return urFileApi.getPage(query)
    },
    delRequest (row) {
      return urFileApi.delFile(row.file)
    },
    openDesigner () {
      this.openDesignerPage()
    },
    handleDesign (event) {
      this.openDesignerPage(event.row.file)
    },
    openDesignerPage (file) {
      const designerPage = this.opened.filter(item => item.name === 'ureport-designer')[0]
      if (designerPage) {
        let msg = '你已经打开了设计视图,是刷新设计视图？'
        if (designerPage.params.file) {
          msg = `你正在编辑【${designerPage.params.file}】,是刷新设计视图？`
        }
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({
            name: 'ureport-designer',
            params: {
              file: file
            }
          })
        })
      } else {
        this.$router.push({
          name: 'ureport-designer',
          params: {
            file: file
          }
        })
      }
    },
    handlePreview (event) {
      this.$router.push({
        name: 'ureport-preview',
        params: {
          file: event.row.file
        }
      })
    },
    handleExport (event) {
      const token = util.cookies.get('token')
      const url = '//' + window.location.host + `${process.env.VUE_APP_API}/sys/ur-files/export/file/${event.row.file}?x-api-token=${token}&x-api-token=${util.cookies.get('token')}`
      util.open(url)
    }
  }
}
</script>
