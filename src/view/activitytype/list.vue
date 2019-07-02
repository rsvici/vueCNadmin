<template>
  <div>
    <Card>
      <Table
        ref="tables"
        editable
        :data="tableData"
        :columns="columns"
      />
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page
            :total="total"
            :current="current"
            @on-change="changePage"
          ></Page>
        </div>
      </div>
      <Button
        style="margin: 10px 0;"
        type="primary"
        @click="exportExcel"
      >导出为Csv文件</Button>
      <Button
        style="margin: 10px 20px;padding:10px 30px;"
        type="success"
        @click="routerPushAddWechat"
      >添加</Button>
    </Card>
  </div>
</template>
<script>
import Tables from '_c/tables'
import { getActivitytypelList } from '@/api/data'
import { postdelActivitytype } from '@/api/data'

export default {
  name: 'wechatlist',
  components: {
    Tables
  },
  data () {
    return {
      // 分页
      current: 1,
      total: 0,
      // 表格
      columns: [
        { title: '活动类型名称', key: 'typeName' },
        {
          title: '活动类型图标',
          key: 'typeIcon',
          render: (h, params) => {
            // console.log(params.row.title);
            return h('img', {
              attrs: {
                src: params.row.typeIcon
              },
              style: {
                'max-height': '60px!important',
                'max-width': '60px!important',
                'margin-top': '5px'
              }
            })
          }
        },
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
                    marginRight: '5px',
                    width:'auto'
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
    changePage (event) {
      // 分页
      this.getIntegralListFun(event)
    },
    remove (params) {
      // 删除
      console.log(params.row.id, params)
      postdelActivitytype({
        id: params.row.id
      }).then(res => {
        this.tableData.splice(params.index, 1)
      })
    },
    updateInfo (params) {
      // 修改页面
      // console.log(params);
      this.$router.push({
        name: 'activitytypeUpdate',
        params: { wechatDate: params.row }
      })
    },
    routerPushAddWechat () {
      console.log(this.$route.params.marketId)
      this.$router.push({
        name: 'activitytypeAdd'
      })
    },
    getIntegralListFun (pageNo) {
      var that = this
      getActivitytypelList({
        pageSize: 15,
        pageNo
      }).then(res => {
        that.tableData = res.data.data.parameterType
        that.total = res.data.data.totalRecord
      })
    }
  },
  mounted () {
    this.getIntegralListFun(1)
  }
}
</script>
