<template>
  <div>
    <Card>
      <Form
        :model="formItem"
        :label-width="100"
      >
        <!-- 第一页 -->

        <FormItem label="活动类型名称 : ">
          <Input
            v-model="formItem.typeName"
            placeholder="请输入活动类型名称"
          />
        </FormItem>

        <!-- 上传图片 -->
        <FormItem label="活动类型图标 : ">
          <div
            class="demo-upload-list"
            v-if="formItem.typeIcon"
          >
            <template>
              <img :src="formItem.typeIcon">
              <div class="demo-upload-list-cover">
                <Icon
                  type="ios-eye-outline"
                  @click.native="handleView(formItem.typeIcon)"
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
            title="活动类型图标"
            v-model="visible"
          >
            <img
              :src="formItem.typeIcon"
              v-if="visible"
              style="width: 100%"
            >
          </Modal>
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
import { routeEqual } from '@/libs/util'
import { postUpdActivitytype } from '@/api/data'
export default {
  data () {
    return {
      formItem: {
        id: '',
        typeName: '', // 名称
        typeIcon: '' // 图片url
      },
      // 上传图片
      visible: false
    }
  },
  methods: {
    handleView () {
      this.visible = true
    },
    handleSuccess (res, file) {
      console.log(res)
      this.formItem.typeIcon = res.data
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '图片格式不正确，请选择JPG或PNG。'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '文件大小超过限制',
        desc: '请上传不超过2M的图片。'
      })
    },
    referingForm () {
      // 提交
      var that = this
      var newMatrixInfo = this.formItem
      console.log(newMatrixInfo)
      postUpdActivitytype(newMatrixInfo).then(res => {
        console.log(res)
        that.cancelForm()
      })
    },
    cancelForm () {
      this.$store.state.app.tagNavList = this.$store.state.app.tagNavList.filter(
        item => !routeEqual(this.$route, item)
      )
      this.$router.go(-1)
    }
  },
  mounted () {
    console.log(this.$route.params.wechatDate)
    this.formItem = this.$route.params.wechatDate
  }
}
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
