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
import { getTableData } from '@/api/data'

export default {
  name: "wechatlist",
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: "用户名", key: "username" },
        { title: "手机号", key: "tel" },
        { title: "出生日期", key: "birth" },
        { title: "微信id", key: "openid" },
        { title: "积分", key: "point" },
      ],
      tableData: [
        {
          username: "张1三",
          tel: "17331119413",
          birth: "2018-10-21",
          point:'30',
          openid:'12XXXX123'
        }, {
          username: "张2三",
          tel: "17331119413",
          birth: "2018-10-21",
          point:'30',
          openid:'12XXXX123'
        }, {
          username: "张3三",
          tel: "17331119413",
          birth: "2018-10-21",
          point:'30',
          openid:'12XXXX123'
        }, {
          username: "张4三",
          tel: "17331119413",
          birth: "2018-10-21",
          point:'30',
          openid:'12XXXX123'
        }, {
          username: "张5三",
          tel: "17331119413",
          birth: "2018-10-21",
          point:'30',
          openid:'12XXXX123'
        }
      ]
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
    getTableData().then(res => {
      // this.tableData = res.data;
      console.log(res);
    });
  }
};
</script>
