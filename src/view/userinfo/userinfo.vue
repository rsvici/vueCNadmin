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
    </Card>
  </div>
</template>
<script>
import Tables from "_c/tables";
import { getUserList } from "@/api/data";
import { formatDate } from "@/libs/formatdate";
export default {
  name: "wechatlist",
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: "openid", key: "openid" },
        { title: "手机号", key: "phone" },
        { title: "出生日期", key: "birthday" },
        {
          title: "地址",
          key: "",
          render: (h, params) => {
            console.log(params);
            return h(
              "div",params.row.province+params.row.city+params.row.county+params.row.live
            );
          }
        },
        {
          title: "创建时间",
          key: "createDate",
          render: (h, params) => {
            console.log(params);
            return h(
              "div",
              formatDate(new Date(params.row.createDate), "yyyy-MM-dd hh:mm")
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
      console.log(event);
    },
    show(index) {
      // 查看
      this.$Modal.info({
        title: "User Info",
        content: `Name`
      });
    },
    remove(index) {
      // 删除
      console.log(index);
    }
  },
  mounted() {
    console.log(getUserList);
    getUserList().then(res => {
      this.tableData = res.data.data.parameterType;
      console.log(res);
    });
  }
};
</script>
