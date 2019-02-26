<template>
  <div>
    <Card>
      <tables
        ref="tables"
        editable
        v-model="tableData"
        :columns="columns"
      />
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page
            :total="200"
            :current="1"
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
import { getMatrixList } from '@/api/data'
import { postdelMatrix } from '@/api/data'

export default {
  name: 'wechatlist',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { title: '公众号名称', key: 'name' },
        { title: '公众号链接', key: 'officialCcountsUrl' },
        {
          title: '公众号封面',
          key: 'imageUrl',
          render: (h, params) => {
            // console.log(params.row.title);
            return h('img', {
              attrs: {
                src: params.row.imageUrl
              },
              style: {
                height: '80px',
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
    changePage (event) {
      // 分页
      console.log(event)
    },
    remove (params) {
      // 删除
      console.log(params.row.id, params)
      postdelMatrix({
        id: params.row.id
      }).then(res => {
        this.tableData.splice(params.index, 1)
      })
    },
    updateInfo (params) {
      // 修改页面
      // console.log(params);
      this.$router.push({
        name: 'wechatUpdate',
        params: { wechatDate: params.row }
      })
    },
    routerPushAddWechat () {
      console.log(this.$route.params.marketId)
      this.$router.push({
        name: 'wechatAdd'
      })
    }
  },
  mounted () {
    getMatrixList({
      pageSize: 15,
      pageNo: 1
    }).then(res => {
      this.tableData = res.data.data.parameterType
      console.log(res)
    })
  }
}
</script>
