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

export default {
  name: "wechatlist",
  components: {
    Tables
  },
  // 路由传入的值
  props: {
    busnissId: {
      type: String,
      default: "1"
    }
  },
  data() {
    return {
      columns: [
        { title: "商场名称", key: "title" },
        { title: "商场封面", key: "imgurl" },
        { title: "地图经纬度", key: "mapposition" },
        { title: "描述", key: "dec" },
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
      tableDataobj: [
        [
          {
            title: "中山公园1",
            imgurl: "234",
            dec: "345",
            mapposition: "345"
          },
          {
            title: "中山公园2",
            imgurl: "2234",
            dec: "2234",
            mapposition: "3345"
          },
          {
            title: "中山公园3",
            imgurl: "2344",
            dec: "2344",
            mapposition: "3465"
          },
          {
            title: "中山公园4",
            imgurl: "2234",
            dec: "2234",
            mapposition: "3345"
          },
          {
            title: "中山公园5",
            imgurl: "2354",
            dec: "2354",
            mapposition: "7345"
          }
        ],
        [
          {
            title: "新虹桥商圈1",
            imgurl: "234",
            dec: "345",
            mapposition: "345"
          },
          {
            title: "新虹桥商圈2",
            imgurl: "2234",
            dec: "2234",
            mapposition: "3345"
          },
          {
            title: "新虹桥商圈3",
            imgurl: "2344",
            dec: "2344",
            mapposition: "3465"
          },
          {
            title: "新虹桥商圈4",
            imgurl: "2234",
            dec: "2234",
            mapposition: "3345"
          },
          {
            title: "新虹桥商圈5",
            imgurl: "2354",
            dec: "2354",
            mapposition: "7345"
          }
        ],
        [
          {
            title: "临空商圈1",
            imgurl: "234",
            dec: "345",
            mapposition: "345"
          },
          {
            title: "临空商圈2",
            imgurl: "2234",
            dec: "2234",
            mapposition: "3345"
          },
          {
            title: "临空商圈3",
            imgurl: "2344",
            dec: "2344",
            mapposition: "3465"
          },
          {
            title: "临空商圈4",
            imgurl: "2234",
            dec: "2234",
            mapposition: "3345"
          },
          {
            title: "临空商圈5",
            imgurl: "2354",
            dec: "2354",
            mapposition: "7345"
          }
        ]
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
    console.log(this.busnissId);
    this.tableData = this.tableDataobj[this.busnissId];
    getTableData().then(res => {
      // this.tableData = res.data;
      console.log(res);
    });
  },
  "on-row-click": (data, index) => {
    console.log(data, index);
  }
};
</script>
