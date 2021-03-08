<template>
  <crud-container :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">
      <el-form ref="searchForm" :model="searchFrom" size="mini" label-width="140px" label-position="left">
        <el-form-item label="请先选择授权用户">
          <el-select
            v-model="searchFrom.uid"
            filterable
            clearable
            remote
            :remote-method="searchUser"
            @change="userChanged"
            placeholder="请输入用户名"
            :loading="searchUserLoading">
            <el-option
              v-for="item in userOption"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.username }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </template>
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
    >
      <div slot="header">
        <el-button size="mini" :disabled="disableAdd" type="primary" @click="addRow()"><i class="el-icon-plus"/>添加授权</el-button>
        <crud-toolbar :search=null v-bind="_crudToolbarProps" v-on="_crudToolbarListeners" storage="UserRoleEditor"/>
      </div>
    </d2-crud-x>
  </crud-container>
</template>

<script>
import * as grantApi from '../../api/role-grant'
import * as userApi from '../../api/user'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'sys-role-grant',
  components: {},
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      searchUserLoading: false,
      userOption: [],
      roleList: [],
      manageRoleList: [],
      searchFrom: {
        uid: null
      }
    }
  },
  computed: {
    disableAdd: function () {
      return !this.searchFrom.uid || !this.hasPermissions('sys:role:grant')
    }
  },
  methods: {
    initAfter () {
      userApi.getRoleList({ grantType: 1 }).then(ret => { this.manageRoleList = ret.data })
    },
    searchUser (username) {
      userApi.getPage({ username: username }).then(ret => { this.userOption = ret.data.records })
    },
    userChanged (user) {
      if (user) {
        this.doRefresh()
      }
    },
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      const page = {
        current: 1,
        size: 10000
      }
      if (!this.searchFrom.uid) {
        return Promise.resolve({ code: 0, data: { ...page, total: 0, records: [] } })
      } else {
        return grantApi.getListByUserId(this.searchFrom.uid, query).then(ret => {
          const list = ret.data
          ret.data = {
            ...page,
            total: 10000,
            records: list
          }
          return ret
        })
      }
    },
    addRequest (row) {
      return grantApi.addObj({ ...row, userId: this.searchFrom.uid }).then(ret => {
        row.id = ret.data
        return { row: row }
      })
    },
    updateRequest (row) {
      return grantApi.updateObj(row).then(ret => {
        return { row }
      })
    },
    delRequest (row) {
      return grantApi.delObj(row.id)
    }
  }
}
</script>
