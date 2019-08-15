<!--
 * @Descripttion: 
 * @version: 
 * @Author: rsvici
 * @Date: 2019-04-23 18:50:11
 * @LastEditors: rsvici
 * @LastEditTime: 2019-04-23 18:50:11
 -->
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
    <Modal
      v-model="applyActivityModal"
      title="是否在首页轮播显示"
      @on-ok="applyActivityok"
    >
      <Form
        :model="applyActivity"
        :label-width="100"
      >
          <Select v-model="applyActivity.hotAudit">
            <Option value="1">通过</Option>
            <Option value="0">拒绝</Option>
          </Select>
      </Form>
    </Modal>
  </div>
</template>
<script>
import Tables from "_c/tables";
import { getActivityList, postDelActivity,postApplyActivityAudit } from "@/api/data";
import {
  formatDate,
  formatApplyActivityAudit,
  formatType,
  formatLabelOne,
  formatLabelTow
} from "@/libs/formatdate";
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
      // 申请
      applyActivityModal: false,
      applyActivity: {
        id: "",
        hotAudit: 1
      },
      // 分页
      current: 1,
      total: 0,
      // 表格
      columns: [
        {
          title: "活动名称",
          key: "name"
        },
        {
          title: "banner",
          key: "activityUrl",
          render: (h, params) => {
            // console.log(params.row.title);
            return h("img", {
              attrs: {
                src: params.row.activityUrl
              },
              style: {
                height: "80px",
                "margin-top": "5px"
              }
            });
          }
        },
        // {
        //   title: "简介",
        //   key: "introduction",
        //   ellipsis: true
        // },
        {
          title: "时间",
          key: "activityBeginTime",
          render: (h, params) => {
            return h(
              "div",
              formatDate(new Date(params.row.activityBeginTime), "yyyy-MM-dd")
            );
          }
        },
        {
          title: "标签1",
          key: "labelOne",
          render: (h, params) => {
            return h("div", formatLabelOne(params.row.labelOne));
          }
        },
        {
          title: "标签2",
          key: "labelTow",
          render: (h, params) => {
            return h("div", formatLabelTow(params.row.labelTow));
          }
        },
        {
          title: "申请状态",
          key: "hotAudit",
          render: (h, params) => {
            return h("div", formatApplyActivityAudit(params.row.hotAudit));
          },
          filters: [
            {
              label: "未审核",
              value: false
            },
            {
              label: "通过",
              value: true
            }
          ],
          filterMethod(value, row) {
            return row.hotAudit.indexOf(value) > -1;
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
                      this.show(params.row.id);
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
                      this.applyActivityAuditStatus(params.row.id);
                    }
                  }
                },
                "审核"
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
                      this.remove(params);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      tableData: [],
      type: ""
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
      // 分页
      this.getActivityListFun(this.type, event);
    },
    show(activeId) {
      // 查看
      this.$router.push({
        path: "/hotActiveShow",
        query: { activeId }
      });
    },
    applyActivityok() {
      console.log(this.applyActivity);
      postApplyActivityAudit(this.applyActivity).then(res => {
        this.getActivityListFun(1);
      });
    },
    // 审核热门
    applyActivityAuditStatus(id) {
      this.applyActivityModal = true;
      this.applyActivity.id = id;
    },
    remove(item) {
      // 删除
      postDelActivity({
        id: item.row.id
      }).then(res => {
        this.getActivityListFun(this.type, 1);
      });
    },
    showCheck(content) {
      console.log(1);
      if (content && content != 0) {
        this.$Modal.info({
          title: "审核反馈",
          content
        });
      }
    },
    getActivityListFun(type, pageNo) {
      var that = this;
      getActivityList({
        pageSize: 15,
        type,
        pageNo
      }).then(res => {
        that.tableData = res.data.data.parameterType;
      });
    }
  },
  watch: {
    // 时时监听路由的改变
    $route: function(to, from) {
      // this.$store.dispatch('pageNumberReset');    //当路由改变时，将文章列表当前第几页的信息重置为第1页
      if (to.path != "/index") {
        var type,
          routerName = this.$route.name;
        switch (routerName) {
          case "HBanner":
            type = 1;
            break;
          case "HFindWonderful":
            type = 2;
            break;
          case "HhotSpace":
            type = 3;
            break;
          case "HGame":
            type = 4;
            break;
        }
        this.type = type;
        this.getActivityListFun(type, 1);
      }
    }
  },
  mounted() {
    var type,
      routerName = this.$route.name;
    switch (routerName) {
      case "HBanner":
        type = 1;
        break;
      case "HFindWonderful":
        type = 2;
        break;
      case "HhotSpace":
        type = 3;
        break;
      case "HGame":
        type = 4;
        break;
    }
    this.type = type;
    this.getActivityListFun(type, 1);
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
  .background {
    background-color: #f1f1f1;
    border-color: #eee;
    color: #999;
  }
}
</style>
