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
import Tables from "_c/tables";
import { getTableData } from "@/api/data";
import imgurl1 from "@/assets/images/nav3_1.png";
import imgurl2 from "@/assets/images/nav3_2.png";
import imgurl3 from "@/assets/images/nav3_3.png";
import imgurl4 from "@/assets/images/nav3_4.png";
import imgurl5 from "@/assets/images/nav3_5.png";

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
      columns: [
        {
          title: "活动名称",
          key: "title"
        },
        {
          title: "封面",
          key: "imgurl",
          render: (h, params) => {
            // console.log(params.row.title);
            return h("img", {
              attrs: {
                src: params.row.imgurl
              },
              style: {
                height: "80px",
                "margin-top": "5px"
              }
            });
          }
        },
        { title: "简介", key: "dec" },
        { title: "时间", key: "time" },
        { title: "类型", key: "type" },
        { title: "标签", key: "type1" },
        {
          title: "审核状态",
          key: "checkType",
          filters: [
            {
              label: "通过",
              value: "通过"
            },
            {
              label: "未通过",
              value: "未通过"
            },
            {
              label: "未审核",
              value: "未审核"
            }
          ],
          filterMethod(value, row) {
            return row.checkType.indexOf(value) > -1;
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
        {
          title: "百丽宫影城活动1",
          imgurl: imgurl1,
          dec: "345",
          time: "345",
          type: "123",
          type1: "123",
          checkType: "通过"
        },
        {
          title: "百丽宫影城活动2",
          imgurl: imgurl2,
          dec: "2234",
          time: "3345",
          type: "123",
          type1: "123",
          checkType: "未审核"
        },
        {
          title: "百丽宫影城活动3",
          imgurl: imgurl3,
          dec: "2344",
          time: "3465",
          type: "123",
          type1: "123",
          checkType: "未通过"
        },
        {
          title: "百丽宫影城活动4",
          imgurl: imgurl4,
          dec: "2234",
          time: "3345",
          type: "123",
          type1: "123",
          checkType: "通过"
        },
        {
          title: "百丽宫影城活动5",
          imgurl: imgurl5,
          dec: "2354",
          time: "7345",
          type: "123",
          type1: "123",
          checkType: "通过"
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
    },
    // 去添加
    routerPushAddActiveInfo() {
      console.log(this.$route.params.activeId);
      this.$router.push({
        name: "activeAdd",
        params: { activeId: this.$route.params.activeId }
      });
    }
  },
  mounted() {
    // console.log(this.busnissId);
    this.tableData = this.tableDataobj;
    this.activeId = this.$route.params.activeId;

    // getTableData().then(res => {
    //   // this.tableData = res.data;
    //   // console.log(res);
    // });
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

