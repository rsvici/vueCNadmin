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
import { getTableData } from "@/api/data";
import { formatDate } from "@/libs/formatdate";

export default {
  name: "wechatlist",
  components: {
    Tables
  },
  data() {
    return {
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
      tableData: [
        {
          id: "0003688f3d3a46a1854e91e1d689bedd",
          module: "用户管理",
          method: "用户登录",
          statusDesc: "执行成功!",
          args: "{username : admin;}",
          userId: null,
          userNickname: null,
          ip: "180.168.221.14",
          createTime: 1520819180000
        },
        {
          id: "0012400ea8c64d7091c02987e7a9208a",
          module: "用户管理",
          method: "用户登录",
          statusDesc: "执行成功!",
          args: "{username : test;}",
          userId: null,
          userNickname: null,
          ip: "192.168.1.6",
          createTime: 1539849894000
        },
        {
          id: "0013c07917604cacbc759b5ae33a8bfe",
          module: "内容管理",
          method: "添加内容",
          statusDesc: "执行成功!",
          args:
            "{data : com.gzuser.medicine.wx.request.MenuSubstanceAddRequest@6f34c3b5;}",
          userId: null,
          userNickname: null,
          ip: "116.231.225.97",
          createTime: 1540948636000
        },
        {
          id: "0016dfc0a8f447cc995d0de01bed3acd",
          module: "文章管理",
          method: "添加文章",
          statusDesc: "执行成功!",
          args:
            "{data : com.gzuser.medicine.user.request.ArticleRequest@5ad4b5a9;}",
          userId: null,
          userNickname: null,
          ip: "192.168.0.139",
          createTime: 1540371683000
        },
        {
          id: "00173f2adc394062adcdb5a8c569e024",
          module: "用户管理",
          method: "用户登录",
          statusDesc: "执行成功!",
          args: "{username : admin;}",
          userId: null,
          userNickname: null,
          ip: "116.231.226.49",
          createTime: 1520592358000
        },
        {
          id: "0042a01278b7402487989de506e40d2f",
          module: "用户管理",
          method: "用户登录",
          statusDesc: "执行成功!",
          args: "{username : admin;}",
          userId: null,
          userNickname: null,
          ip: "116.231.229.249",
          createTime: 1522031012000
        },
        {
          id: "0055d483df7748dabedf7e81f5eacd49",
          module: "用户管理",
          method: "用户登录",
          statusDesc: "执行成功!",
          args: "{username : admin;}",
          userId: null,
          userNickname: null,
          ip: "192.168.1.6",
          createTime: 1539848256000
        },
        {
          id: "009bddb011c947338caadaeb488705c6",
          module: "用户管理",
          method: "用户登录",
          statusDesc: "执行成功!",
          args: "{username : admin;}",
          userId: null,
          userNickname: null,
          ip: "192.168.1.1",
          createTime: 1547012886000
        },
        {
          id: "00b53d3a120c4bd9bc7b589a0f5024e3",
          module: "用户管理",
          method: "用户登录",
          statusDesc: "执行成功!",
          args: "{username : admin;}",
          userId: null,
          userNickname: null,
          ip: "116.231.226.49",
          createTime: 1519793656000
        },
        {
          id: "01223c4431be4d73996aaa0a3c134588",
          module: "用户管理",
          method: "用户登录",
          statusDesc: "执行成功!",
          args: "{username : admin;}",
          userId: null,
          userNickname: null,
          ip: "116.231.226.161",
          createTime: 1523435072000
        },
        {
          id: "01308c449d7941b6be91b6c135890358",
          module: "用户管理",
          method: "用户登录",
          statusDesc: "执行成功!",
          args: "{username : admin;}",
          userId: null,
          userNickname: null,
          ip: "116.231.226.49",
          createTime: 1519724607000
        },
        {
          id: "014921479f0e4119b762af2899889c9d",
          module: "内容管理",
          method: "修改内容",
          statusDesc: "执行成功!",
          args:
            "{data : com.gzuser.medicine.wx.request.MenuSubstanceUpdateRequest@334ee0b6;}",
          userId: null,
          userNickname: null,
          ip: "192.168.1.6",
          createTime: 1539916724000
        },
        {
          id: "015c7ef5ca544bbfa250bcd3ff0bced9",
          module: "内容管理",
          method: "删除内容",
          statusDesc: "执行成功!",
          args: "{id : 11f20d7dcc1846dfa40e6df8039a7d91;}",
          userId: null,
          userNickname: null,
          ip: "192.168.1.6",
          createTime: 1539829209000
        },
        {
          id: "01d9481133894785b98e4504943c8e59",
          module: "内容管理",
          method: "修改内容",
          statusDesc: "执行成功!",
          args:
            "{data : com.gzuser.medicine.wx.request.MenuSubstanceUpdateRequest@7159585b;}",
          userId: null,
          userNickname: null,
          ip: "116.231.225.97",
          createTime: 1540953418000
        },
        {
          id: "01ea9d82e8494a6da8c61faf151fa43e",
          module: "内容管理",
          method: "添加内容",
          statusDesc: "执行成功!",
          args:
            "{data : com.gzuser.medicine.wx.request.MenuSubstanceAddRequest@50b413e7;}",
          userId: null,
          userNickname: null,
          ip: "192.168.0.139",
          createTime: 1540458396000
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
