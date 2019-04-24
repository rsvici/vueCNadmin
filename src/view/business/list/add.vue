<template>
  <div>
    <Card>
      <Form
        :model="formItem"
        :label-width="100"
      >
        <!-- 第一页 -->

        <FormItem label="商场名称 : ">
          <Input
            v-model="formItem.name"
            placeholder="请输入商场名称"
          />
        </FormItem>

        <FormItem label="商场描述 : ">
          <Input
            v-model="formItem.description"
            placeholder="请输入商场描述"
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

        <!-- 上传图片 -->
        <FormItem label="商场封面 : ">
          <div
            class="demo-upload-list"
            v-if="formItem.url"
          >
            <template>
              <img :src="formItem.url">
              <div class="demo-upload-list-cover">
                <Icon
                  type="ios-eye-outline"
                  @click.native="handleView(formItem.url)"
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
            :max-size="20480"
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
            title="商圈封面"
            v-model="visible"
          >
            <img
              :src="formItem.url"
              v-if="visible"
              style="width: 100%"
            >
          </Modal>
        </FormItem>

        <FormItem label="商场详情 : ">
          <VueUeditorWrap
            v-model="formItem.content"
            :config="myConfig"
            :key="1"
          ></VueUeditorWrap>
        </FormItem>

        <FormItem>
          <Button
            style="margin-left: 10px"
            type="success"
            @click="referingForm"
          >提交</Button>
          <Button
            style="margin-left: 10px"
            @click="cancelForm"
          >取消</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>
import { routeEqual } from "@/libs/util";
import { postAddTradingArea } from "@/api/data";
const VueUeditorWrap = require("vue-ueditor-wrap");
export default {
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      longitudeX:'',
      longitudeY:'',
      formItem: {
        isShoppingMall:'0',
        name: "", // 名称
        url: "", // 图片url
        type: "", // 商圈类型
        description: "", //描述
        longitude: "", //经纬度
        content: "" //详情富文本内容
      },
      // 上传图片
      visible: false,
      msg: "", //
      myConfig: {
        // 百度富文本
        autoHeightEnabled: true,
        initialFrameHeight: 400,
        initialFrameWidth: "60%",
        UEDITOR_HOME_URL: "./UEditor/",
        serverUrl: "http://www.appsun.com.cn/CLMAP/ueditor/dispatch"
      }
    };
  },
  methods: {
    handleView() {
      this.visible = true;
    },
    handleSuccess(res, file) {
      console.log(res);
      this.formItem.url = res.data;
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "图片格式不正确，请选择JPG或PNG。"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件大小超过限制",
        desc: "请上传不超过2M的图片。"
      });
    },
    referingForm() {
      // 提交
      var that = this;
      this.formItem.longitude=[this.longitudeX,this.longitudeY].join(',');
      var newTradingArea = this.formItem;
      // console.log(newTradingArea)
      postAddTradingArea(newTradingArea).then(res => {
        // console.log(res);
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
    this.formItem.type = this.$route.query.busnissId;
    // this.formItem.type = 3;
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
