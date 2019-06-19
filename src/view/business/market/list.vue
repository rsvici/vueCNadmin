<template>
  <div class="businesslist">
    <Card>
      <Tables
        ref="tables"
        editable
        search-place="top"
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
        @click="routerPushAddActiveInfo"
      >添加</Button>
    </Card>
  </div>
</template>
<script>
import Tables from '_c/tables'
import { getTradingAreaList } from '@/api/data'
import { postdelTradingArea } from '@/api/data'
import { formatDate } from '@/libs/formatdate'
import imgurl1 from '@/assets/images/nav3_1.png'
import imgurl2 from '@/assets/images/nav3_2.png'
import imgurl3 from '@/assets/images/nav3_3.png'
import imgurl4 from '@/assets/images/nav3_4.png'
import imgurl5 from '@/assets/images/nav3_5.png'

export default {
  name: 'wechatlist',
  components: {
    Tables
  },
  // 路由传入的值
  props: {
    busnissId: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      columns: [
        {
          title: '商户名称',
          key: 'name',
          className: 'tabletitle',
          render: (h, params) => {
            // console.log(params.row.title);
            return h(
              'a',
              {
                on: {
                  click: () => {
                    this.goMarket(params)
                  }
                }
              },
              params.row.name
            )
          }
        },
        {
          title: '商户名称',
          key: 'url',
          render: (h, params) => {
            // console.log(params.row.title);
            return h('img', {
              attrs: {
                src: params.row.url
              },
              style: {
                height: '80px',
                'margin-top': '5px'
              }
            })
          }
        },
        { title: '描述', key: 'description' },
        {
          title: '创建时间',
          key: 'createDate',
          render: (h, params) => {
            return h(
              'div',
              formatDate(new Date(params.row.createDate), 'yyyy-MM-dd hh:mm')
            )
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
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params)
                    }
                  }
                },
                '查看详情'
              ),
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
    // 导出csv
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      })
    },
    // 分页
    changePage (event) {
      console.log(event)
    },
    // 查看详细信息
    show (params) {
      console.log(params.row.content)
      this.$Modal.info({
        title: params.row.name,
        scrollable: true,
        closable: true,
        content: params.row.content
      })
    },
    // 删除
    remove (params) {
      console.log(params.row.id, params)
      // return;
      postdelTradingArea({
        id: params.row.id
      }).then(res => {
        this.tableData.splice(params.index, 1)
      })
    },
    // 修改页面
    updateInfo (query) {
      console.log(query)
      this.$router.push({
        path: '/marketUpdate',
        query: { shopData: query.row }
      })
    },
    // 去子页面
    goMarket (item) {
      console.log(item.row.id)
      this.$router.push({ path: '/active', query: {activeId: item.row.id } })
    },

    // 去添加
    routerPushAddActiveInfo () {
      this.$router.push({
        path: '/marketAdd',
        query: { marketId: this.$route.query.marketId }
      })
    }
  },
  mounted () {
    // 商场id
    console.log(this.$route.query.marketId)

    // 获取商户列表
    getTradingAreaList({
      type: this.$route.query.marketId,
      isShoppingMall: 1
    }).then(res => {
      this.tableData = res.data.data.parameterType
      // console.log(res);
    })
  }
}
</script>
<style lang="less">
tbody {
  .tabletitle {
    color: -webkit-link;
    text-decoration: underline;
    cursor: pointer;
  }
}
.ivu-modal-confirm-body {
  p {
    word-wrap: break-word;
  }
}
</style>
