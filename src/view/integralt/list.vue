<!--
 * @Descripttion: 
 * @Version: 
 * @Author: rsvici
 * @Date: 2019-04-23 18:50:36
 -->
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
import Tables from "_c/tables";
import { getIntegralList } from "@/api/data";
import { postdelIntegralt, postGenerateCode } from "@/api/data";
import { formatIntegraltStatus } from "@/libs/formatdate";
export default {
  name: "wechatlist",
  components: {
    Tables
  },
  data() {
    return {
      // 分页
      current: 1,
      total: 0,
      // 表格
      columns: [
        {
          title: "名称",
          key: "name"
        },
        {
          title: "商品封面",
          key: "integralUrl",
          render: (h, params) => {
            // console.log(params.row.title);
            return h("img", {
              attrs: {
                src: params.row.integralUrl
              },
              style: {
                height: "80px",
                "margin-top": "5px"
              }
            });
          }
        },
        { title: "积分价格", key: "integralPrice" },
        {
          title: "库存",
          key: "inventory"
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            return h("div", formatIntegraltStatus(params.row.status));
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
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.postGenerateCodeFun(params);
                    }
                  }
                },
                "生成code"
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
      this.getIntegralListFun(event);
    },
    remove(params) {
      // 删除
      console.log(params.row.id, params);
      postdelIntegralt({
        id: params.row.id
      }).then(res => {
        this.tableData.splice(params.index, 1);
      });
    },
    // 生成随机码
    postGenerateCodeFun(params) {
      postGenerateCode({
        id: params.row.id
      }).then(res => {
        this.$Message.info("生成code成功");
      });
    },
    updateInfo(params) {
      // 修改页面
      // console.log(params);
      this.$router.push({
        name: "integraltUpdate",
        params: { wechatDate: params.row }
      });
    },
    routerPushAddWechat() {
      console.log(this.$route.params.marketId);
      this.$router.push({
        name: "integraltAdd"
      });
    },
    getIntegralListFun(pageNo) {
      var that = this;
      getIntegralList({
        pageSize: 15,
        pageNo
      }).then(res => {
        that.tableData = res.data.data.parameterType;
        that.total = res.data.data.totalRecord;
      });
    }
  },
  mounted() {
    this.getIntegralListFun(1);
  }
};
</script>
