<template>
  <div class="businesslist">
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
    </Card>
  </div>
</template>
<script>
import Tables from "_c/tables";
import { getTableData } from "@/api/data";
import imgurl1 from "@/assets/images/nav3_1.png"
import imgurl2 from "@/assets/images/nav3_2.png"
import imgurl3 from "@/assets/images/nav3_3.png"
import imgurl4 from "@/assets/images/nav3_4.png"
import imgurl5 from "@/assets/images/nav3_5.png"

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
      columns: [
        {
          title: "商场名称",
          key: "title",
          className: "tabletitle",
          render: (h, params) => {
            // console.log(params.row.title);
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.goMarket(params.index);
                  }
                }
              },
              params.row.title
            );
          }
        },
        {
          title: "商场封面",
          key: "imgurl",
          render: (h, params) => {
            // console.log(params.row.title);
            return h("img", {
              attrs: {
                src: params.row.imgurl
              },
              style: {
                height: "80px",
                'margin-top':'5px',
              }
            });
          }
        },
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
        {
          title: "百丽宫影城",
          imgurl:imgurl1,
          dec: "345",
          mapposition: "345"
        },
        {
          title: "尚嘉中心",
          imgurl:imgurl2,
          dec: "2234",
          mapposition: "3345"
        },
        {
          title: "玫瑰坊商业街",
          imgurl: imgurl3,
          dec: "2344",
          mapposition: "3465"
        },
        {
          title: "巴黎春天新宁店",
          imgurl: imgurl4,
          dec: "2234",
          mapposition: "3345"
        },
        {
          title: "龙之梦购物中心",
          imgurl: imgurl5,
          dec: "2354",
          mapposition: "7345"
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
    goMarket(index) {
      console.log(index);
      this.$router.push({ name: "market", query: { marketId: index } });
    }
  },
  mounted() {
    // console.log(this.busnissId);
    this.tableData = this.tableDataobj;
    getTableData().then(res => {
      // this.tableData = res.data;
      // console.log(res);
    });
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
