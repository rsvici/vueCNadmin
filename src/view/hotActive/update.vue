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

          <!-- banner -->
          <FormItem label="首页banner ，申请热门必填 : ">
            <div
              class="demo-upload-list"
              v-if="formItem.activityUrl"
            >
              <template>
                <img :src="formItem.activityUrl">
                <div class="demo-upload-list-cover">
                  <Icon
                    type="ios-eye-outline"
                    @click.native="handleViewBanner(formItem.activityUrl)"
                  ></Icon>
                </div>
              </template>
            </div>
            <!-- 上传 -->
            <Upload
              ref="upload"
              :show-upload-list="false"
              :on-success="handleBannerSuccess"
              :format="['jpg','jpeg','png','webp']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              multiple
              type="drag"
              action="/CLMAP/upload/uploadFile"
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
              title="banner"
              v-model="visibleBanner"
            >
              <img
                :src="formItem.activityUrl"
                v-if="visibleBanner"
                style="width: 100%"
              >
            </Modal>
          </FormItem>

          <!-- 上传图片 -->
          <FormItem label="活动图 : ">
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
              :format="['jpg','jpeg','png','webp']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              multiple
              type="drag"
              action="/CLMAP/upload/uploadFile"
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
              title="活动图"
              v-model="visible"
            >
              <img
                :src="formItem.coverUrl"
                v-if="visible"
                style="width: 100%"
              >
            </Modal>
          </FormItem>

          <FormItem label=" 属性: ">
            <Input
              v-model="formItem.labelThree"
              placeholder="请输入属性"
            />
          </FormItem>

          <FormItem label="活动发布时间 : ">
            <DatePicker
              type="datetime"
              placeholder="活动发布时间"
              style="width: 200px"
              v-model="formItem.releaseTime"
            ></DatePicker>
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

          <FormItem label="地点 : ">
            <Input
              v-model="formItem.place"
              placeholder="请输入活动地点"
            />
          </FormItem>

          <FormItem label="经度坐标: ">
            <Input
              v-model="longitudeX"
              placeholder="请输入经度坐标"
            />
          </FormItem>

          <FormItem label="纬度坐标 : ">
            <Input
              v-model="longitudeY"
              placeholder="请输入纬度坐标"
            />
          </FormItem>

          <FormItem label="类型">
            <Select v-model="formItem.activityType">
              <Option value="0">话剧</Option>
              <Option value="1">电影</Option>
              <Option value="2">活动</Option>
              <Option value="3">运动</Option>
              <Option value="4">...</Option>
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
            <FormItem label="描述一 : ">
              <Input
                v-model="actionInfo.name"
                type="text"
                placeholder="请输入描述一"
              />
            </FormItem>
            <FormItem label="描述二 : ">
              <Input
                v-model="actionInfo.role"
                type="text"
                placeholder="请输入描述二"
              />
            </FormItem>

            <!-- 上传图片 -->
            <FormItem label="列表图片 : ">
              <div
                class="demo-upload-list"
                v-if="actionInfo.url"
              >
                <template>
                  <img :src="actionInfo.url">
                  <div class="demo-upload-list-cover">

                  </div>
                </template>
              </div>
              <!-- 上传 -->
              <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="handleActionSuccess"
                :format="['jpg','jpeg','png','webp']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                multiple
                type="drag"
                action="/CLMAP/upload/uploadFile"
                style="display: inline-block;width:120px;"
              >
                <div style="width: 120px;height:120px;line-height: 120px;">
                  <Icon
                    type="ios-camera"
                    size="30"
                  ></Icon>
                </div>
              </Upload>

            </FormItem>

            <FormItem>
              <Button
                type="info"
                @click="addActionInfo"
              >添加</Button>
            </FormItem>
          </Card>

          <FormItem
            label="活动列表 : "
            style="margin-top:30px;"
          >
            <Table
              border
              :columns="columns"
              :data="columnsdata"
            >
            </Table>
          </FormItem>

          <!-- 多图显示 -->
          <!-- 上传图片 -->
          <FormItem label="多图显示 : ">
            <div
              class="demo-upload-list"
              v-for="(item,index) in uploadImageList"
              v-bind:key="index"
            >
              <template>
                <img :src="item">
                <div class="demo-upload-list-cover">
                  <Icon
                    type="ios-eye-outline"
                    @click.native="handleViewImageList(item)"
                  ></Icon>
                  <Icon
                    type="ios-trash-outline"
                    @click.native="handleRemoveImageList(index)"
                  ></Icon>
                </div>
              </template>

            </div>
            <!-- 上传 -->
            <Upload
              ref="upload"
              :show-upload-list="false"
              :on-success="ImageListSuccess"
              :format="['jpg','jpeg','png','webp']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              type="drag"
              action="/CLMAP/upload/uploadFile"
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
              title="多图显示"
              v-model="imageListVisible"
            >
              <img
                :src="showuploadImage"
                v-if="imageListVisible"
                style="width: 100%"
              >
            </Modal>
          </FormItem>

          <FormItem label="跳转链接 : ">
            <Input
              v-model="formItem.ticketLink"
              type="url"
              placeholder="请输入购票URL格式:http://xxx.xxx.xxx"
            />
          </FormItem>

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
            >修改</Button>
            <Button
              style="margin-left: 10px"
              @click="cancelForm"
            >取消</Button>
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
import { postUpdActivity, getActivityList } from "@/api/data";
import { routeEqual } from "@/libs/util";
const VueUeditorWrap = require("vue-ueditor-wrap");
export default {
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      // 多图上传
      imageListVisible: false, // 是否显示图片
      uploadImageList: [], // 图片数组
      showuploadImage: [], // 显示图片
      longitudeX: "",
      longitudeY: "",
      showWebNum: 0, // 显示页面
      formItem: {
        name: "", // 名称
        introduction: "", // 简介
        tradingAreaId: "", // 商户id
        activityUrl: "", // banner
        coverUrl: "", // 封面
        activityBeginTime: "", // 开始时间
        activityEndTime: "", // 结束时间
        place: "", // 地点
        activityType: "", // 活动类型
        type: "1", // 类型
        labelOne: "0", // 标签
        labelTow: "0", // 标签
        ticketLink: "", // 购票链接
        activityDec: "", // 活动详情
        labelThree: "", // 属性
        longitude: "" // 经纬度
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
        initialFrameWidth: 500,
        UEDITOR_HOME_URL: "./UEditor/",
        serverUrl: "http://www.appsun.com.cn/CLMAP/ueditor/dispatch"
      },
      // 上传图片
      visible: false,
      visibleBanner: false,
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
    handleViewBanner() {
      this.visibleBanner = true;
    },
    // banner上传成功
    handleBannerSuccess(res, file) {
      console.log(res);
      this.formItem.activityUrl = res.data;
    },
    // 图片上传成功
    handleSuccess(res, file) {
      console.log(res);
      this.formItem.coverUrl = res.data;
    },
    // 活动列表上传成功
    handleActionSuccess(res, file) {
      console.log(res);
      this.actionInfo.url = res.data;
    },

    // 多图显示上传
    handleViewImageList(item) {
      // 显示图片
      this.imageListVisible = true;
      this.showuploadImage = item;
    },
    ImageListSuccess(res, file) {
      this.uploadImageList.push(res.data);
      console.log(this.uploadImageList);
    },
    handleRemoveImageList(index) {
      // 删除指定图片
      this.uploadImageList.splice(index, 1);
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
      this.columnsdata.splice(rowindex, 1);
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
      this.formItem.longitude = [this.longitudeX, this.longitudeY].join(",");
      this.formItem.still = this.uploadImageList.join(",");
      var newTradingArea = this.formItem;
      // console.log(newTradingArea)
      postUpdActivity(newTradingArea).then(res => {
        console.log(res);
        that.cancelForm();
      });
    },

    // 返回上一页
    cancelForm() {
      this.$store.state.app.tagNavList = this.$store.state.app.tagNavList.filter(
        item => !routeEqual(this.$route, item)
      );
      this.$router.go(-1);
    },
    // 获取活动信息
    getActiveInfo(id) {
      var that = this;
      getActivityList({
        id
      }).then(res => {
        that.formItem = res.data.data.parameterType[0];
        if (that.formItem.activityBeginTime > 1000) {
          that.formItem.activityBeginTime = new Date(
            that.formItem.activityBeginTime
          );
        }
        if (that.formItem.activityEndTime > 1000) {
          that.formItem.activityEndTime = new Date(
            that.formItem.activityEndTime
          );
        }

        if (that.formItem.releaseTime > 1000) {
          that.formItem.releaseTime = new Date(
            that.formItem.releaseTime
          );
        }

        this.longitudeX = this.formItem.longitude.split(",")[0];
        this.longitudeY = this.formItem.longitude.split(",")[1];
        if (that.formItem.still) {
          that.uploadImageList = that.formItem.still.split(",");
        } else {
          that.uploadImageList = [];
        }
        that.columnsdata = that.formItem.activityDetail;
      });
    }
  },
  mounted() {
    this.getActiveInfo(this.$route.query.activeId);
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
