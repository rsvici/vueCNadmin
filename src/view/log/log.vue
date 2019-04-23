<template>
  <div>
    <Card>
      <tables
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
    </Card>
  </div>
</template>
<script>
import Tables from "_c/tables";
import { getLogList } from "@/api/data";
import { formatDate } from "@/libs/formatdate";

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
        { title: "模块", key: "module" },
        { title: "方法", key: "method" },
        { title: "状态描述", key: "statusDesc" },
        { title: "操作人昵称", key: "args" },
        { title: "ip", key: "ip" },
        {
          title: "时间",
          key: "createTime",
          render: (h, params) => {
            return h(
              "div",
              formatDate(new Date(params.row.createTime), "yyyy-MM-dd hh:mm")
            );
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
      //分页
      this.getLogListFun(event);
    },
    getLogListFun(pageNo) {
      getLogList({
        pageSize: 15,
        pageNo
      }).then(res => {
        this.tableData = res.data.data.parameterType;
        this.total=res.data.data.totalRecord;
      });
    }
  },
  mounted() {
    this.getLogListFun(1);
  }
};
</script>
