<template>
  <div class="activelist">
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
            :page-size="15"
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
import { getCommentList, postCommentHide } from "@/api/data";
import { formatDate } from "@/libs/formatdate";
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
      // 分页
      current: 1,
      total: 0,

      // 表单
      columns: [
        {
          title: "活动名称",
          key: "activityName"
        },
        {
          title: "活动简介",
          key: "introduction",
          ellipsis: true
        },
        { title: "评论内容", key: "commentDes" },
        {
          title: "评论时间",
          key: "commentTime",
          render: (h, params) => {
            return h(
              "div",
              formatDate(new Date(params.row.commentTime), "yyyy-MM-dd hh:mm")
            );
          }
        },
        { title: "用户名", key: "nickname" },
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
                      this.remove(params.row.id);
                    }
                  }
                },
                "隐藏"
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
    show(index) {
      // 查看
      this.$Modal.info({
        title: "User Info",
        content: `Name`
      });
    },
    changePage(event) {
      // 分页
      this.getCommentListFun(event);
    },
    remove(id) {
      // 删除
      postCommentHide({
       id
      }).then(res => {
       this.getCommentListFun(1);
      });
    },
    // 置顶
    commentGoTop() {},
    getCommentListFun(pageNo) {
      var that = this;
      getCommentList({
        pageSize: 15,
        pageNo
      }).then(res => {
        that.tableData = res.data.data.parameterType;
        that.total = res.data.data.totalRecord;
      });
    }
  },
  mounted() {
    this.getCommentListFun(1);
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
