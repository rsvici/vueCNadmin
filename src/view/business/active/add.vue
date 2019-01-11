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
              v-model="formItem.acitveName"
              placeholder="请输入活动名称"
            />
          </FormItem>
          <FormItem label="简介 : ">
            <Input
              v-model="formItem.activeDec"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="请输入活动简介"
            />
          </FormItem>

          <!-- 上传图片 -->
          <FormItem label="封面 : ">
            <div
              class="demo-upload-list"
              v-for="item in uploadList"
              :key="item.id"
            >
              <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon
                    type="ios-eye-outline"
                    @click.native="handleView(item.url)"
                  ></Icon>
                  <Icon
                    type="ios-trash-outline"
                    @click.native="handleRemove(item)"
                  ></Icon>
                </div>
              </template>
              <template v-else>
                <Progress
                  v-if="item.showProgress"
                  :percent="item.percentage"
                  hide-info
                ></Progress>
              </template>
            </div>
            <Upload
              ref="upload"
              :show-upload-list="false"
              :default-file-list="defaultList"
              :on-success="handleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
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
            <Modal
              title="图片"
              v-model="visible"
            >
              <img
                :src="imgUrl"
                v-if="visible"
                style="width: 100%"
              >
            </Modal>
          </FormItem>

          <FormItem label="活动时间 : ">
            <DatePicker
              type="datetimerange"
              :options="options1"
              placement="bottom-start"
              placeholder="选择时间"
              style="width: 285px"
              v-model="formItem.date"
            ></DatePicker>
          </FormItem>
          <FormItem label="地点 : ">
            <Input
              v-model="formItem.acitveAddress"
              placeholder="请输入活动地点"
            />
          </FormItem>
          <FormItem label="类型">
            <Select v-model="formItem.activeSelectType">
              <Option value="1">话剧</Option>
              <Option value="2">电影</Option>
              <Option value="3">演唱会</Option>
              <Option value="4">...</Option>
            </Select>
          </FormItem>
          <FormItem label="标签1">
            <RadioGroup v-model="formItem.activeRadioType1">
              <Radio label="0">文化/体育</Radio>
              <Radio label="1">购物</Radio>
              <Radio label="2">餐饮/美食</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="标签2">
            <RadioGroup v-model="formItem.activeRadioType2">
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
          <FormItem label="演唱会人员 : ">
            <Input
              v-model="formItem.activeDec"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="请输入演唱会人员介绍信息"
            />
          </FormItem>
          <!-- 上传图片 -->
          <FormItem label="人员图片 : ">
            <div
              class="demo-upload-list"
              v-for="item in uploadList"
              :key="item.id"
            >
              <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon
                    type="ios-eye-outline"
                    @click.native="handleView(item.url)"
                  ></Icon>
                  <Icon
                    type="ios-trash-outline"
                    @click.native="handleRemove(item)"
                  ></Icon>
                </div>
              </template>
              <template v-else>
                <Progress
                  v-if="item.showProgress"
                  :percent="item.percentage"
                  hide-info
                ></Progress>
              </template>
            </div>
            <Upload
              ref="upload"
              :show-upload-list="false"
              :default-file-list="defaultList"
              :on-success="handleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
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
            <Modal
              title="图片"
              v-model="visible"
            >
              <img
                :src="imgUrl"
                v-if="visible"
                style="width: 100%"
              >
            </Modal>
          </FormItem>

          <FormItem label="购票连接(可选) : ">
            <Input
              v-model="formItem.buyTirckUrl"
              type="url"
              placeholder="请输入购票URL格式:http://xxx.xxx.xxx"
            />
          </FormItem>

          <FormItem label="演员列表 : ">
            <Table
              border
              :columns="columns"
              :data="columnsdata"
            >
            </Table>
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
              v-model="msg"
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
import imgurl5 from '@/assets/images/nav3_5.png'
const VueUeditorWrap = require('vue-ueditor-wrap')
export default {
  components: {
    VueUeditorWrap
  },
  data () {
    return {
      showWebNum: 0, // 显示页面
      formItem: {
        acitveName: '', // 名称
        activeDec: '', // 简介
        date: '', // 时间
        acitveAddress: '', // 地点
        activeSelectType: '',
        activeRadioType1: '0',
        activeRadioType2: '0',
        buyTirckUrl: '',

        radio: 'male',
        checkbox: [],
        switch: true,
        time: '',
        slider: [20, 50],
        textarea: ''
      },
      options1: {
        // 选择时间
        shortcuts: [
          {
            text: '1 周',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              return [start, end]
            }
          },
          {
            text: '1个月',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              return [start, end]
            }
          },
          {
            text: '3个月',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              return [start, end]
            }
          }
        ]
      },
      msg: '', // 富文本内容
      myConfig: {
        // 百度富文本
        autoHeightEnabled: true,
        initialFrameHeight: 400,
        initialFrameWidth: '60%',
        UEDITOR_HOME_URL: '/UEditor/',
        serverUrl: 'http://www.appsun.com.cn/GZUSER/ueditor/dispatch'
      },
      // 上传图片
      defaultList: [{
        url: imgurl5
      }],
      visible: false,
      uploadList: [], // 更新列表
      imgUrl: '', // 图片url
      // 表格
      columns: [
        {
          title: '图片',
          key: 'imgUrl',
          render: (h, params) => {
            // console.log(params.row.title);
            return h('img', {
              attrs: {
                src: imgurl5
              },
              style: {
                height: '80px',
                width: '80px',
                'margin-top': '5px'
              }
            })
          }
        },
        {
          title: '描述一',
          key: 'dec1'
        },
        {
          title: '描述二',
          key: 'dec2'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.talbeRemove(params.index)
                    }
                  }
                },
                'Delete'
              )
            ])
          }
        }
      ],
      columnsdata: [
        {
          imgUrl: imgurl5,
          dec1: '1',
          dec2: '1'
        }
      ]
    }
  },
  methods: {
    handleView (imgUrl) {
      this.imgUrl = imgUrl
      this.visible = true
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess (res, file) {
      console.log(res)
      file.url = res.data
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
    handleBeforeUpload () {
      const check = this.uploadList.length < 5
      if (!check) {
        this.$Notice.warning({
          title: '超过上传上限'
        })
      }
      return check
    },
    talbeRemove (rowindex) {
      console.log(rowindex)
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  },
  watch: {
    msg (val) {
      console.log(val)
    }
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
