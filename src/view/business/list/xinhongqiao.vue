<!--
 * @Descripttion: 
 * @Version: 
 * @Author: rsvici
 * @Date: 2019-04-23 18:49:16
 -->
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
            :total="totalPage"
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
        @click="routerPushAddActiveInfo"
      >添加</Button>
    </Card>
  </div>
</template>
<script>
import Tables from "_c/tables";
import { getTradingAreaList } from "@/api/data";
import { postdelTradingArea } from "@/api/data";
import { formatDate } from "@/libs/formatdate";

export default {
  name: "wechatlist",
  components: {
    Tables
  },
  // 路由传入的值
  props: {
    busnissId: {
      type: String,
      default: "0"
    }
  },
  data() {
    return {
      // 分页
      current: 1,
      totalPage: 0,
      // 表格
      columns: [
        {
          title: "商场名称",
          key: "name",
          className: "tabletitle",
          render: (h, params) => {
            // console.log(params.row.title);
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.goMarket(params.row.id);
                  }
                }
              },
              params.row.name
            );
          }
        },
        {
          title: "商场封面",
          key: "url",
          render: (h, params) => {
            // console.log(params.row.title);
            return h("img", {
              attrs: {
                src: params.row.url
              },
              style: {
                height: "80px",
                "margin-top": "5px"
              }
            });
          }
        },
        { title: "地图经纬度", key: "longitude" },
        { title: "描述", key: "description", ellipsis: true },
        {
          title: "创建时间",
          key: "createDate",
          render: (h, params) => {
            return h(
              "div",
              formatDate(new Date(params.row.createDate), "yyyy-MM-dd hh:mm")
            );
          }
        },
        {
          title: "操作",
          key: "action",
          width: 250,
          align: "center",
          searchable: "false",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params);
                    }
                  }
                },
                "查看详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.updateInfo(params);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.remove(params);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      tableData: []
    };
  },
  methods: {
    exportExcel() {
      // 导出csv
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      });
    },
    changePage(event) {
      // 分页
      console.log(event);
      this.getTradingAreaListFun(event);
    },
    show(params) {
      console.log(params.row.content);
      // 查看
      this.$Modal.info({
        title: params.row.name,
        scrollable: true,
        closable: true,
        content: params.row.content
      });
    },
    remove(params) {
      // 删除
      console.log(params.row.id, params);
      // return;
      postdelTradingArea({
        id: params.row.id
      }).then(res => {
        this.tableData.splice(params.index, 1);
      });
    },
    updateInfo(query) {
      // 修改页面
      console.log(query);
      this.$router.push({
        path: "/busnissUpdate",
        query: { shopData: query.row }
      });
    },
    goMarket(index) {
      console.log(index);
      this.$router.push({ path: "/active", query: { tradingAreaId: index } });
    },
    // 去添加
    routerPushAddActiveInfo() {
      this.$router.push({
        path: "/busnissAdd",
        query: { busnissId: 1 }
      });
    },
    getTradingAreaListFun(pageNo) {
      var that = this;
      getTradingAreaList({
        type: 1,
        isShoppingMall: 0,
        pageSize: 15,
        pageNo
      }).then(res => {
        that.tableData = res.data.data.parameterType;
        that.totalPage = res.data.data.totalPage;
        // console.log(res);
      });
    }
  },
  mounted() {
    this.getTradingAreaListFun(1);
  }
};
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
  padding-left: 0px;
  p {
    word-wrap: break-word;
  }
  img {
    width: 100%;
  }
}
</style>
