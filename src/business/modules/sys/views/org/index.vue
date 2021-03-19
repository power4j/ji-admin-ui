<template>
  <d2-container :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">{{this.$route.meta.title}}
    </template>
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      @add-sub-resource="handleAddSubResource"
    >

      <div slot="header">
        <el-button slot="header"  v-permission="'sys:org:add'" size="mini" type="primary" @click="addRootRow"><i class="el-icon-plus"/> 新增</el-button>

        <crud-toolbar :search=null
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
import * as orgApi from '../../api/org'

export default {
  name: 'sys-org-list-view',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
    }
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    async pageRequest () {
      return orgApi.getChildren(1).then(ret => {
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
    clearOrgTreeDictCache () {
      d2CrudPlus.util.dict.clear('sys_org_tree')
    },
    addRequest (row) {
      this.clearOrgTreeDictCache()
      return orgApi.addObj(row)
    },
    updateRequest (row) {
      this.clearOrgTreeDictCache()
      return orgApi.updateObj(row).then(ret => {
        return ret
      })
    },
    delRequest (row) {
      this.clearOrgTreeDictCache()
      return orgApi.delObj(row.id)
    },
    infoRequest (row) {
      return orgApi.getObj(row.id)
    },
    addAfter (row) {
      this.doAfterRowChange(row)
      // this.reloadNode(row.parentId)
    },
    delAfter (row) {
      this.doAfterRowChange(row)
      // this.reloadNode(row.parentId)
    },
    editAfter (row) {
      this.doAfterRowChange(row)
      // this.reloadNode(row.parentId)
    },
    handleAddSubResource ({ index, row }) {
      this.addRow({ parentId: row.id })
    },
    addRootRow () {
      this.addRow({ parentId: '1' })
    },
    loadChildren (row, treeNode, resolve) {
      orgApi.getChildren(row.id).then(ret => { resolve(ret.data) })
    },
    reloadNode (id) {
      // 局部刷新,触发加载节点
      // const { lazyTreeNodeMap, treeData } = this.getD2Crud().$refs.elTable.store.states
      // this.$set(lazyTreeNodeMap, id, [])

      orgApi.getChildren(id).then(ret => {
        this.$set(this.getD2Crud().$refs.elTable.store.states.lazyTreeNodeMap, id, ret.data)
        /* this.$set(this.getD2Crud().$refs.elTable.store.states.lazyTreeNodeMap, id, ret.data)
        this.$set(treeData[id], 'loading', false)
        this.$set(treeData[id], 'loaded', true)
        this.$set(treeData[id], 'expanded', true)
        if (ret.data.length) {
          this.$set(lazyTreeNodeMap, id, ret.data)
        } else {
          treeData[id].hasChildren = false
        } */
      })
    }
  }
}
</script>
