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
              v-if="imageUrl"
            >
              <template>
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
                :src="imageUrl"
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
          <Card style="width:60%;margin-left:100px;">
            <FormItem label="人员姓名 : ">
              <Input
                v-model="actionInfo.actionName0"
                type="text"
                placeholder="请输入人员姓名"
              />
            </FormItem>
            <FormItem label="饰演角色 : ">
              <Input
                v-model="actionInfo.actionName1"
                type="text"
                placeholder="请输入饰演角色"
              />
            </FormItem>

            <!-- 上传图片 -->
            <FormItem label="人员头像 : ">
              <div
                class="demo-upload-list"
                v-if="actionInfo.actionUrl"
              >
                <template>
                  <img :src="actionInfo.actionUrl">
                  <div class="demo-upload-list-cover">
                    <Icon
                      type="ios-eye-outline"
                      @click.native="handleView(actionInfo.actionUrl)"
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
                  :src="actionInfo.actionUrl"
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
              v-model="formItem.buyTirckUrl"
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
        buyTirckUrl: ''
      },
      actionInfo: {
        actionName0: '',
        actionName1: '',
        actionUrl: ''
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
        UEDITOR_HOME_URL: './UEditor/',
        serverUrl: 'http://www.appsun.com.cn/GZUSER/ueditor/dispatch'
      },
      // 上传图片
      imageUrl: '',
      visible: false,
      // 表格
      columns: [
        {
          title: '图片',
          key: 'actionUrl',
          render: (h, params) => {
            // console.log(params.row.title);
            return h('img', {
              attrs: {
                src: params.row.actionUrl
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
          key: 'actionName0'
        },
        {
          title: '描述二',
          key: 'actionName1'
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
                '删除'
              )
            ])
          }
        }
      ],
      columnsdata: [
        {
          actionUrl: imgurl5,
          actionName0: '1',
          actionName1: '1'
        }
      ]
    }
  },
  methods: {
    handleView () {
      this.visible = true
    },
    handleSuccess (res, file) {
      console.log(res)
      this.imageUrl = 'https://thinkjs.org/static/img/new/logo.png?v=0cb0b'
    },
    handleActionSuccess (res, file) {
      console.log(res)
      this.actionInfo.actionUrl = 'https://thinkjs.org/static/img/new/logo.png?v=0cb0b'
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
    talbeRemove (rowindex) {
      console.log(rowindex)
    },
    addActionInfo () {
      console.log(this.formItem)
      this.columnsdata.push(this.actionInfo)
      this.actionInfo = {
        actionName0: '',
        actionName1: '',
        actionUrl: ''
      }
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
