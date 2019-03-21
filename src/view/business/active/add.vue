<template>
  <div>
    <Card>
      <Form
        :model="formItem"
        :label-width="100"
      >
        <!-- 第一页 -->
        <div v-show="showWebNum==0">
          <FormItem label="名称 : ">
            <Input
              v-model="formItem.name"
              placeholder="请输入活动名称"
            />
          </FormItem>
          <FormItem label="简介 : ">
            <Input
              v-model="formItem.introduction"
              type="textarea"
              :autosize="{minRows: 2,maxRows:10}"
              placeholder="请输入活动简介"
            />
          </FormItem>

          <!-- 上传图片 -->
          <FormItem label="封面 : ">
            <div
              class="demo-upload-list"
              v-if="formItem.coverUrl"
            >
              <template>
                <img :src="formItem.coverUrl">
                <div class="demo-upload-list-cover">
                  <Icon
                    type="ios-eye-outline"
                    @click.native="handleView(formItem.coverUrl)"
                  ></Icon>
                </div>
              </template>
            </div>
            <!-- 上传 -->
            <Upload
              ref="upload"
              :show-upload-list="false"
              :on-success="handleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              multiple
              type="drag"
              action="http://www.appsun.com.cn/CLMAP/upload/uploadFile"
              style="display: inline-block;width:120px;"
            >
              <div style="width: 120px;height:120px;line-height: 120px;">
                <Icon
                  type="ios-camera"
                  size="30"
                ></Icon>
              </div>
            </Upload>

            <!-- 图片大图 -->
            <Modal
              title="封面"
              v-model="visible"
            >
              <img
                :src="formItem.coverUrl"
                v-if="visible"
                style="width: 100%"
              >
            </Modal>
          </FormItem>

          <FormItem label="活动时间 : ">
            <DatePicker
              type="datetime"
              placeholder="开始时间"
              style="width: 200px"
              v-model="formItem.activityBeginTime"
            ></DatePicker>
            - 至 -
            <DatePicker
              type="datetime"
              placeholder="结束时间"
              style="width: 200px"
              v-model="formItem.activityEndTime"
            ></DatePicker>
          </FormItem>

          <!-- <FormItem label="活动时间 : ">
            <DatePicker
              type="datetimerange"
              placement="bottom-start"
              placeholder="选择时间"
              style="width: 285px"
              v-model="formItem.activityBeginTime"
            ></DatePicker>
          </FormItem> -->

          <FormItem label="地点 : ">
            <Input
              v-model="formItem.place"
              placeholder="请输入活动地点"
            />
          </FormItem>
          <FormItem label="类型">
            <Select v-model="formItem.activityType">
              <Option value="0">话剧</Option>
              <Option value="1">电影</Option>
              <Option value="2">演唱会</Option>
              <Option value="3">...</Option>
            </Select>
          </FormItem>
          <FormItem label="标签1">
            <RadioGroup v-model="formItem.labelOne">
              <Radio label="0">文化/体育</Radio>
              <Radio label="1">购物</Radio>
              <Radio label="2">餐饮/美食</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="标签2">
            <RadioGroup v-model="formItem.labelTow">
              <Radio label="0">乐文</Radio>
              <Radio label="1">乐影</Radio>
              <Radio label="2">乐动</Radio>
              <Radio label="3">乐演</Radio>
            </RadioGroup>
          </FormItem>

          <!-- 选择页面 -->
          <FormItem>
            <Button
              type="info"
              @click="showWebNum+=1"
            >下一页</Button>
          </FormItem>
        </div>

        <!-- 第二页 -->
        <div v-show="showWebNum==1">
          <Card style="width:60%;margin-left:100px;">
            <FormItem label="人员姓名 : ">
              <Input
                v-model="actionInfo.name"
                type="text"
                placeholder="请输入人员姓名"
              />
            </FormItem>
            <FormItem label="饰演角色 : ">
              <Input
                v-model="actionInfo.role"
                type="text"
                placeholder="请输入饰演角色"
              />
            </FormItem>

            <!-- 上传图片 -->
            <FormItem label="人员头像 : ">
              <div
                class="demo-upload-list"
                v-if="actionInfo.url"
              >
                <template>
                  <img :src="actionInfo.url">
                  <div class="demo-upload-list-cover">
                    <Icon
                      type="ios-eye-outline"
                      @click.native="handleView(actionInfo.url)"
                    ></Icon>
                  </div>
                </template>
              </div>
              <!-- 上传 -->
              <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="handleActionSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                multiple
                type="drag"
                action="http://www.appsun.com.cn/CLMAP/upload/uploadFile"
                style="display: inline-block;width:120px;"
              >
                <div style="width: 120px;height:120px;line-height: 120px;">
                  <Icon
                    type="ios-camera"
                    size="30"
                  ></Icon>
                </div>
              </Upload>

              <!-- 图片大图 -->
              <Modal
                title="人员头像"
                v-model="visible"
              >
                <img
                  :src="actionInfo.url"
                  v-if="visible"
                  style="width: 100%"
                >
              </Modal>
            </FormItem>

            <FormItem>
              <Button
                type="info"
                @click="addActionInfo"
              >添加</Button>
            </FormItem>
          </Card>

          <FormItem
            label="演员列表 : "
            style="margin-top:30px;"
          >
            <Table
              border
              :columns="columns"
              :data="columnsdata"
            >
            </Table>
          </FormItem>

          <FormItem label="购票连接(可选) : ">
            <Input
              v-model="formItem.ticketLink"
              type="url"
              placeholder="请输入购票URL格式:http://xxx.xxx.xxx"
            />
          </FormItem>
          <!-- 多选 -->
          <!-- <FormItem label="Checkbox">
          <CheckboxGroup v-model="formItem.checkbox">
            <Checkbox label="Eat"></Checkbox>
            <Checkbox label="Sleep"></Checkbox>
            <Checkbox label="Run"></Checkbox>
            <Checkbox label="Movie"></Checkbox>
          </CheckboxGroup>
          </FormItem> -->
          <!-- 选择页面 -->
          <FormItem>
            <Button
              type="info"
              @click="showWebNum-=1"
            >上一页</Button>
            <Button
              style="margin-left:10px"
              type="info"
              @click="showWebNum+=1"
            >下一页</Button>
          </FormItem>
        </div>

        <!-- 富文本 -->
        <div v-show="showWebNum==2">
          <FormItem label="详情简介 : ">
            <VueUeditorWrap
              v-model="formItem.activityDec"
              :config="myConfig"
              :key="1"
            ></VueUeditorWrap>
          </FormItem>

          <FormItem>
            <Button
              type="info"
              @click="showWebNum-=1"
            >上一页</Button>
            <Button
              style="margin-left: 10px"
              type="success"
              @click="addActivty"
            >提交</Button>
            <Button style="margin-left: 10px">取消</Button>
          </FormItem>
        </div>

        <FormItem>
          <Steps :current="showWebNum">
            <Step title="步骤1"></Step>
            <Step title="步骤2"></Step>
            <Step title="步骤3"></Step>
          </Steps>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>
import { postAddactivity } from "@/api/data";
const VueUeditorWrap = require("vue-ueditor-wrap");
import { routeEqual } from "@/libs/util";
export default {
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      showWebNum: 0, // 显示页面
      formItem: {
        name: "", // 名称
        introduction: "", // 简介
        tradingAreaId: "", //商户id
        coverUrl: "", //封面
        activityBeginTime: "", // 开始时间
        activityEndTime: "", //结束时间
        place: "", // 地点
        activityType: "", //活动类型
        type: "1", //类型
        labelOne: "0", //标签
        labelTow: "0", //标签
        ticketLink: "", //购票链接
        activityDec: "" //活动详情
      },
      actionInfo: {
        name: "",
        role: "",
        url: ""
      },
      myConfig: {
        // 百度富文本
        autoHeightEnabled: true,
        initialFrameHeight: 400,
        initialFrameWidth: "60%",
        UEDITOR_HOME_URL: "./UEditor/",
        serverUrl: "http://www.appsun.com.cn/GZUSER/ueditor/dispatch"
      },
      // 上传图片
      visible: false,
      // 表格
      columns: [
        {
          title: "图片",
          key: "url",
          render: (h, params) => {
            // console.log(params.row.title);
            return h("img", {
              attrs: {
                src: params.row.url
              },
              style: {
                height: "80px",
                width: "80px",
                "margin-top": "5px"
              }
            });
          }
        },
        {
          title: "描述一",
          key: "name"
        },
        {
          title: "描述二",
          key: "role"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.talbeRemove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      columnsdata: []
    };
  },
  methods: {
    handleView() {
      this.visible = true;
    },
    // 图片上传成功
    handleSuccess(res, file) {
      console.log(res);
      this.formItem.coverUrl = res.data;
    },
    // 演员列表上传成功
    handleActionSuccess(res, file) {
      console.log(res);
      this.actionInfo.url = res.data;
    },
    // 上传文件错误
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "图片格式不正确，请选择JPG或PNG。"
      });
    },
    // 上传超过限制
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件大小超过限制",
        desc: "请上传不超过2M的图片。"
      });
    },
    // 删除列表
    talbeRemove(rowindex) {
      console.log(rowindex);
      this.columnsdata.splice(rowindex, 1);
      console.log(this.columnsdata);
    },
    // 添加角色列表
    addActionInfo() {
      console.log(this.formItem);
      this.columnsdata.push(this.actionInfo);
      this.actionInfo = {
        name: "",
        role: "",
        url: ""
      };
    },
    // 添加活动
    addActivty() {
      var that = this;
      this.formItem.activityDetail = this.columnsdata;
      console.log(this.formItem);
      var newTradingArea = this.formItem;
      // console.log(newTradingArea)
      postAddactivity(newTradingArea).then(res => {
        console.log(res);
        that.cancelForm();
      });
    },
    cancelForm() {
      this.$store.state.app.tagNavList = this.$store.state.app.tagNavList.filter(
        item => !routeEqual(this.$route, item)
      );
      this.$router.go(-1);
    }
  },
  mounted() {
    this.formItem.tradingAreaId = Number(this.$route.query.activeId);
  },
  watch: {
    msg(val) {
      console.log(val);
    }
  }
};
</script>
<style>
.demo-upload-list {
  display: inline-block;
  height: 120px;
  min-width: 80px;
  text-align: center;
  line-height: 120px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 30px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
