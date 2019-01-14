<template>
  <div>
    <Card>
      <Form
        :model="formItem"
        :label-width="100"
      >
        <!-- 第一页 -->

        <FormItem label="公众号名称 : ">
          <Input
            v-model="formItem.name"
            placeholder="请输入公众号名称"
          />
        </FormItem>

        <FormItem label="公众号URL : ">
          <Input
            v-model="formItem.officialcountsUrl"
            placeholder="请输入公众号URL"
          />
        </FormItem>

        <!-- 上传图片 -->
        <FormItem label="缩略图 : ">
          <div
            class="demo-upload-list"
           v-if="imageUrl">
            <template >
              <img :src="imageUrl">
              <div class="demo-upload-list-cover">
                <Icon
                  type="ios-eye-outline"
                  @click.native="handleView(imageUrl)"
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
            action="http://www.appsun.com.cn/GZUSER/substance/uploadFile"
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
            title="公众号封面"
            v-model="visible"
          >
            <img
              :src="imageUrl"
              v-if="visible"
              style="width: 100%"
            >
          </Modal>
        </FormItem>

        <FormItem>
          <Button
            style="margin-left: 10px"
            type="success"
          >提交</Button>
          <Button style="margin-left: 10px">取消</Button>
        </FormItem>

      </Form>
    </Card>
  </div>
</template>
<script>
const VueUeditorWrap = require("vue-ueditor-wrap");
export default {
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      formItem: {
        name: "", // 名称
        imageUrl: "", // 图片url
        officialcountsUrl: "", // 公众号url
      },
      // 上传图片
      imageUrl:'',
      visible: false,
    };
  },
  methods: {
    handleView() {
      this.visible = true;
    },
    handleSuccess(res, file) {
      console.log(res);
      this.imageUrl ='https://thinkjs.org/static/img/new/logo.png?v=0cb0b';
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
    }
  },
  mounted() {
   
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
