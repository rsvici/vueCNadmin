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
          <FormItem label="角色名称 : ">
            <Input
              v-model="addUpdateUserInfoObj.roleName"
              placeholder="请输入角色名称"
            />
          </FormItem>
          <FormItem label="备注 : ">
            <Input
              v-model="addUpdateUserInfoObj.remark"
              placeholder="请输入备注"
            />
          </FormItem>
          <FormItem label="选择菜单">
            <CheckboxGroup v-model="addUpdateUserInfoObj.menuIds">
              <Checkbox label="1">首页</Checkbox>
              <Checkbox label="2">微信矩阵</Checkbox>
              <Checkbox label="3">积分管理</Checkbox>
              <Checkbox label="17">活动类型</Checkbox>
              <Checkbox label="18">注册用户</Checkbox>
              <Checkbox label="20">审核列表</Checkbox>
              <Checkbox label="21">评论管理</Checkbox>
              <Checkbox label="22">热门活动</Checkbox>
              <Checkbox label="23">热门商圈</Checkbox>
              <Checkbox label="24">权限管理</Checkbox>
              <Checkbox label="25">日志管理</Checkbox>
              <Checkbox label="26">管理商场</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="选择商场">
            <CheckboxGroup v-model="addUpdateUserInfoObj.tradingAreaId">
              <Checkbox
                v-for="item in TradingAreaList"
                :label="item.id"
                :key="item.id"
              >{{item.name}}</Checkbox>
            </CheckboxGroup>
          </FormItem>
        </Form>
      </Modal>

    </Card>
  </div>
</template>
<script>
import Tables from '_c/tables'
import {
  getRoleList,
  saveSysMenuInfo,
  updateSysMenuInfo,
  deleteSysMenuInfo
} from '@/api/user'
import { getTradingAreaList } from '@/api/data'
export default {
  name: 'wechatlist',
  components: {
    Tables
  },
  data () {
    return {
      TradingAreaList: [], // 商圈列表
      modalTitle: '添加角色',
      selectRoleList: [], // 角色信息
      // 添加角色
      addUpdateUserInfoBol: false,
      addUpdateUserInfoObj: {
        roleName: '',
        remark: '',
        menuIds: [],
        tradingAreaId: []
      },
      // 分页
      current: 1,
      total: 0,
      // 表格
      columns: [
        { title: '角色名称', key: 'roleName' },
        { title: '描述', key: 'remark' },
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
    // 确认修改添加
    addUpdateUserInfoOk () {
      if (this.addUpdateUserInfoObj.roleId) {
        updateSysMenuInfo(this.addUpdateUserInfoObj).then(res => {
          this.getRoleListFun()
        })
      } else {
        saveSysMenuInfo(this.addUpdateUserInfoObj).then(res => {
          this.getRoleListFun()
        })
      }
    },
    // 删除
    remove (params) {
      deleteSysMenuInfo({
        userId: params.row.userId
      }).then(res => {
        this.tableData.splice(params.index, 1)
      })
    },
    // 修改
    updateInfo (params) {
      this.modalTitle = '修改角色'
      this.addUpdateUserInfoBol = true
      this.addUpdateUserInfoObj = params.row
    },
    // 添加
    routerPushAddWechat () {
      this.modalTitle = '添加角色'
      this.addUpdateUserInfoObj={
        roleName: '',
        remark: '',
        menuIds: [],
        tradingAreaId: []
      },
      this.addUpdateUserInfoBol = true
    },
    // 获取角色列表
    getRoleListFun () {
      var that = this
      getRoleList({}).then(res => {
        that.tableData = res.data.data.parameterType
      })
    },
    getTradingAreaListFun () {
      var that = this
      getTradingAreaList({}).then(res => {
        that.TradingAreaList = res.data.data.parameterType
      })
    }
  },
  mounted () {
    this.getRoleListFun()
    this.getTradingAreaListFun()
  }
}
</script>
