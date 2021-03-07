<template>
  <d2-container :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">资源管理
    </template>
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      @add-sub-resource="handleAddSubResource"
    >

      <div slot="header">
        <el-button slot="header"  v-permission="'sys:resource:add'" size="mini" type="primary" @click="addRootRow"><i class="el-icon-plus"/> 新增</el-button>

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
import * as resApi from '../../api/resource'

export default {
  name: 'Resource',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
    }
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest () {
      return resApi.getChildren(0).then(ret => {
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
    clearResourceTreeDictCache () {
      d2CrudPlus.util.dict.clear('/permission/manager/resource/tree')
    },
    addRequest (row) {
      this.clearResourceTreeDictCache()
      return resApi.addObj(row)
    },
    updateRequest (row) {
      this.clearResourceTreeDictCache()
      return resApi.updateObj(row).then(ret => {
        return ret
      })
    },
    delRequest (row) {
      this.clearResourceTreeDictCache()
      return resApi.delObj(row.id)
    },
    infoRequest (row) {
      return resApi.getObj(row.id)
    },
    addAfter (row) {
      this.doAfterRowChange(row)
      this.reloadNode(row.parentId)
    },
    delAfter (row) {
      this.doAfterRowChange(row)
      this.reloadNode(row.parentId)
    },
    editAfter (row) {
      this.doAfterRowChange(row)
      this.reloadNode(row.parentId)
    },
    handleAddSubResource ({ index, row }) {
      this.addRow({ parentId: row.id })
    },
    addRootRow () {
      this.addRow({ parentId: 0 })
    },
    setUnload (row) {
      // 设置节点为未加载状态
      const data = this.getD2Crud().$refs.elTable.store.states.treeData
      if (data != null) {
        const item = data[row.parentId]
        if (item != null) {
          item.loaded = false
          item.expanded = false
        }
      }
    },
    loadChildren (row, treeNode, resolve) {
      resApi.getChildren(row.id).then(ret => { resolve(ret.data) })
    },
    reloadNode (id) {
      // 局部刷新,触发加载节点
      // const { lazyTreeNodeMap, treeData } = this.getD2Crud().$refs.elTable.store.states
      // this.$set(lazyTreeNodeMap, id, [])

      resApi.getChildren(id).then(ret => {
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
