<template>
  <div class="activelist">
    <Card>
      <Tables
        ref="tables"
        editable
        searchable
        search-place="top"
        v-model="tableData"
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
        @click="routerPushAddActiveInfo"
      >添加</Button>
    </Card>
  </div>
</template>
<script>
import Tables from "_c/tables";
import { getActivityList, postDelActivity } from "@/api/data";
import {
  formatDate,
  formatCheck,
  formatType,
  formatLabelOne,
  formatLabelTow
} from "@/libs/formatdate";
export default {
  name: "activelist",
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
      total: 0,
      // biaoge
      columns: [
        {
          title: "活动名称",
          key: "name"
        },
        {
          title: "封面",
          key: "coverUrl",
          render: (h, params) => {
            // console.log(params.row.title);
            return h("img", {
              attrs: {
                src: params.row.coverUrl
              },
              style: {
                height: "80px",
                "margin-top": "5px"
              }
            });
          }
        },
        { title: "简介", key: "introduction", ellipsis: true },
        {
          title: "时间",
          key: "activityBeginTime",
          render: (h, params) => {
            return h(
              "div",
              formatDate(
                new Date(params.row.activityBeginTime),
                "yyyy-MM-dd hh:mm"
              )
            );
          }
        },
        {
          title: "类型",
          key: "activityType",
          render: (h, params) => {
            return h("div", formatType(params.row.activityType));
          }
        },
        {
          title: "标签1",
          key: "labelOne",
          render: (h, params) => {
            return h("div", formatLabelOne(params.row.labelOne));
          }
        },
        {
          title: "标签2",
          key: "labelTow",
          render: (h, params) => {
            return h("div", formatLabelTow(params.row.labelTow));
          }
        },
        {
          title: "审核状态",
          key: "auditStatus",
          render: (h, params) => {
            return h("div", formatCheck(params.row.auditStatus));
          },
          filters: [
            {
              label: "通过",
              value: "1"
            },
            {
              label: "未通过",
              value: "2"
            },
            {
              label: "未审核",
              value: "0"
            }
          ],
          filterMethod(value, row) {
            return row.auditStatus.indexOf(value) > -1;
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
                      this.show(params.row.id);
                    }
                  }
                },
                "查看"
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
                      this.update(params.row.id);
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
      this.getActivityListFun(event);
    },
    show(activeId) {
      // 查看
      this.$router.push({
        path: "/activeShwo",
        query: { activeId }
      });
    },
    update(activeId) {
      this.$router.push({
        path: "/activeUpdata",
        query: { activeId }
      });
    },
    remove(item) {
      // 删除
      postDelActivity({
        id: item.row.id
      }).then(res => {
        this.getActivityListFun(1);
      });
    },
    // 去添加
    routerPushAddActiveInfo() {
      console.log(this.$route.query.tradingAreaId);
      this.$router.push({
        path: "/activeAdd",
        query: { tradingAreaId: this.$route.query.tradingAreaId }
      });
    },
    getActivityListFun(pageNo) {
      var that = this;
      getActivityList({
        tradingAreaId: this.$route.query.tradingAreaId,
        pageSize: 15,
        pageNo
      }).then(res => {
        that.tableData = res.data.data.parameterType;
      });
    }
  },
  mounted() {
    this.getActivityListFun(1);
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
</style>
