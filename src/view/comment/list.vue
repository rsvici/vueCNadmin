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
        { title: "简介", key: "dec" },
        { title: "时间", key: "time" },
        { title: "评论内容", key: "type" },
        { title: "评论人", key: "type1" },
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
                      this.commentGoTop(params.index);
                    }
                  }
                },
                "置顶"
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
          title: "百丽宫影城商户1",
          imgurl: imgurl1,
          dec: "345",
          time: "345",
          type: "123",
          type1: "123"
        },
        {
          title: "尚嘉中心商户2",
          imgurl: imgurl2,
          dec: "2234",
          time: "3345",
          type: "123",
          type1: "123"
        },
        {
          title: "玫瑰坊商业街商户3",
          imgurl: imgurl3,
          dec: "2344",
          time: "3465",
          type: "123",
          type1: "123"
        },
        {
          title: "巴黎春天新宁店商户4",
          imgurl: imgurl4,
          dec: "2234",
          time: "3345",
          type: "123",
          type1: "123"
        },
        {
          title: "龙之梦购物中心商户5",
          imgurl: imgurl5,
          dec: "2354",
          time: "7345",
          type: "123",
          type1: "123"
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
    show(index) {
      // 查看
      this.$Modal.info({
        title: "User Info",
        content: `Name`
      });
    },
    changePage(event) {
      //分页
      console.log(event);
    },
    remove(index) {
      // 删除
      console.log(index);
    },
    // 置顶
    commentGoTop() {
     
    }
  },
  mounted() {
    // console.log(this.busnissId);
    this.tableData = this.tableDataobj;
    // this.marketId = this.$route.params.marketId;

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

