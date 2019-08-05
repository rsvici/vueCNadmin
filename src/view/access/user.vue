<template>
  <div>
    <Card>
      <tables
        ref="tables"
        editable
        v-model="tableData"
        :columns="columns"
      />
      <Button
        style="margin: 10px 20px;padding:10px 30px;"
        type="success"
        @click="routerPushAddWechat"
      >添加</Button>

      <!-- 添加修改信息 -->
      <Modal
        v-model="addUpdateUserInfoBol"
        :title="modalTitle"
        @on-ok="addUpdateUserInfoOk"
      >
        <Form
          :model="addUpdateUserInfoObj"
          :label-width="100"
        >
          <FormItem label="用户名称 : ">
            <Input
              v-model="addUpdateUserInfoObj.username"
              placeholder="请输入用户名称"
            />
          </FormItem>
          <FormItem label="用户密码 : ">
            <Input
              v-model="addUpdateUserInfoObj.password"
              placeholder="请输入用户密码"
            />
          </FormItem>
          <FormItem label="活动模块">
            <Select v-model="addUpdateUserInfoObj.role">
              <Option
                v-for="item in selectRoleList"
                :value="item.roleId"
                :key="item.roleId"
              >{{item.roleName}}</Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>

    </Card>
  </div>
</template>
<script>
import Tables from '_c/tables'
import {
  sysUserList,
  saveUserInfo,
  updateUserInfo,
  deleteUserInfo,
  getRoleList,
  sysUserInfo
} from '@/api/user'

export default {
  name: 'wechatlist',
  components: {
    Tables
  },
  data () {
    return {
      modalTitle: '添加用户',
      selectRoleList: [], // 角色信息
      // 添加角色
      addUpdateUserInfoBol: false,
      addUpdateUserInfoObj: {
        username: '',
        password: '',
        role: ''
      },
      // 分页
      current: 1,
      total: 0,
      // 表格
      columns: [
        { title: '用户名称', key: 'username' },
        { title: '用户密码', key: 'password' },
        {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          searchable: 'false',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.updateInfo(params)
                    }
                  }
                },
                '修改'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.remove(params)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      tableData: []
    }
  },
  methods: {
    exportExcel () {
      // 导出csv
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      })
    },
    // 确认修改
    addUpdateUserInfoOk () {
      if (this.addUpdateUserInfoObj.userId) {
        updateUserInfo(this.addUpdateUserInfoObj).then(res => {
          this.getSysUserListFun()
        })
      } else {
        saveUserInfo(this.addUpdateUserInfoObj).then(res => {
          this.getSysUserListFun()
        })
      }
    },

    // 删除
    remove (params) {
      deleteUserInfo({
        userId: params.row.userId
      }).then(res => {
        this.tableData.splice(params.index, 1)
      })
    },
    // 修改
    updateInfo (params) {
      this.modalTitle = '修改用户';
      sysUserInfo({userId:params.row.userId}).then(res => {
        console.log(res)
      })
      this.addUpdateUserInfoBol = true;
      this.addUpdateUserInfoObj = params.row;
    },
    // 添加
    routerPushAddWechat () {
      this.modalTitle = '添加用户';
      this.addUpdateUserInfoObj={
        username: '',
        password: '',
        role: ''
      }
      this.addUpdateUserInfoBol = true
    },
    // 获取用户列表
    getSysUserListFun () {
      var that = this
      sysUserList({}).then(res => {
        that.tableData = res.data.data.parameterType
      })
    },
    // 获取角色列表
    getRoleListFun () {
      var that = this
      getRoleList({}).then(res => {
        that.selectRoleList = res.data.data.parameterType
      })
    }
  },
  mounted () {
    this.getSysUserListFun()
    this.getRoleListFun()
  }
}
</script>
