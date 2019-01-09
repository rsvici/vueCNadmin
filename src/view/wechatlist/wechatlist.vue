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
        { title: "公众号名称", key: "title" },
        { title: "公众号链接", key: "url" },
        { title: "公众号封面", key: "imgurl" },
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
                      this.show(params.index);
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
                      this.show(params.index);
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
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      tableData: [
        {
          title: "123",
          url: "234",
          imgurl: "345"
        },
        {
          title: "1213",
          url: "2234",
          imgurl: "3345"
        },
        {
          title: "1253",
          url: "2344",
          imgurl: "3465"
        },
        {
          title: "1213",
          url: "2234",
          imgurl: "3345"
        },
        {
          title: "1423",
          url: "2354",
          imgurl: "7345"
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
