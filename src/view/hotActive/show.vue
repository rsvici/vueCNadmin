<template>

  <Card>
    <Form
      :model="formItem"
      :label-width="100"
    >

      <FormItem label="名称 : ">
        <Input
          v-model="formItem.name"
          placeholder="请输入活动名称"
          readonly="readonly"
        />
      </FormItem>
      <FormItem label="简介 : ">
        <Input
          v-model="formItem.introduction"
          type="textarea"
          :autosize="{minRows: 2,maxRows:10}"
          placeholder="请输入活动简介"
          readonly="readonly"
        />
      </FormItem>

      <!-- banner -->
      <FormItem label="banner : ">
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

      <FormItem label=" 电影属性: ">
        <Input
          v-model="formItem.labelThree"
          placeholder="请输入电影属性"
          readonly="readonly"
        />
      </FormItem>

      <FormItem label="活动时间 : ">
        <DatePicker
          type="datetime"
          placeholder="开始时间"
          style="width: 200px"
          v-model="formItem.activityBeginTime"
          readonly="readonly"
        ></DatePicker>
        - 至 -
        <DatePicker
          type="datetime"
          placeholder="结束时间"
          style="width: 200px"
          v-model="formItem.activityEndTime"
          readonly="readonly"
        ></DatePicker>
      </FormItem>

      <FormItem label="地点 : ">
        <Input
          v-model="formItem.place"
          placeholder="请输入活动地点"
          readonly="readonly"
        />
      </FormItem>

      <FormItem label="地点坐标: ">
        <Input
          v-model="formItem.longitude"
          placeholder="请输入经度坐标"
          readonly="readonly"
        />
      </FormItem>

      <FormItem label="类型">
        <Select
          v-model="formItem.activityType"
          disabled="disabled"
        >
          <Option value="0">话剧</Option>
          <Option value="1">电影</Option>
          <Option value="2">演唱会</Option>
          <Option value="3">...</Option>
        </Select>
      </FormItem>
      <FormItem label="标签1">
        <RadioGroup
          v-model="formItem.labelOne"
          disabled="disabled"
        >
          <Radio label="0">文化/体育</Radio>
          <Radio label="1">购物</Radio>
          <Radio label="2">餐饮/美食</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="标签2">
        <RadioGroup
          v-model="formItem.labelTow"
          disabled="disabled"
        >
          <Radio label="0">乐文</Radio>
          <Radio label="1">乐影</Radio>
          <Radio label="2">乐动</Radio>
          <Radio label="3">乐演</Radio>
        </RadioGroup>
      </FormItem>

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

      <!-- 剧照 -->
      <!-- 上传图片 -->
      <FormItem
        label="剧照 : "
        v-if="uploadImageList[0]"
      >
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
            </div>
          </template>

        </div>
        <!-- 图片大图 -->
        <Modal
          title="剧照"
          v-model="imageListVisible"
        >
          <img
            :src="showuploadImage"
            v-if="imageListVisible"
            style="width: 100%"
          >
        </Modal>
      </FormItem>

      <FormItem label="购票连接(可选) : ">
        <Input
          v-model="formItem.ticketLink"
          type="url"
          placeholder="请输入购票URL格式:http://xxx.xxx.xxx"
          readonly="readonly"
        />
      </FormItem>

      <FormItem label="详情简介 : ">
        <VueUeditorWrap
          v-model="formItem.activityDec"
          :config="myConfig"
          :key="1"
          readonly="readonly"
        ></VueUeditorWrap>
      </FormItem>

      <FormItem>

        <Button
          style="margin-left: 10px"
          @click="cancelForm"
        >关闭</Button>
      </FormItem>

    </Form>
  </Card>

</template>
<script>
import { getActivityList } from '@/api/data'
import { routeEqual } from '@/libs/util'
const VueUeditorWrap = require('vue-ueditor-wrap')
export default {
  components: {
    VueUeditorWrap
  },
  data () {
    return {
      // 剧照
      imageListVisible: false, // 是否显示图片
      uploadImageList: [], // 图片数组
      showuploadImage: [], // 显示图片

      // 审核
      check: {
        auditDesc: '',
        auditStatus: '',
        Id: ''
      },
      showWebNum: 0, // 显示页面
      formItem: {
        name: '', // 名称
        introduction: '', // 简介
        tradingAreaId: '', // 商户id
        coverUrl: '', // 封面
        activityBeginTime: '', // 开始时间
        activityEndTime: '', // 结束时间
        place: '', // 地点
        activityType: '', // 活动类型
        type: '1', // 类型
        labelOne: '0', // 标签
        labelTow: '0', // 标签
        ticketLink: '', // 购票链接
        activityDec: '' // 活动详情
      },
      actionInfo: {
        name: '',
        role: '',
        url: ''
      },
      myConfig: {
        // 百度富文本
        autoHeightEnabled: true,
        initialFrameHeight: 400,
        initialFrameWidth: '60%',
        UEDITOR_HOME_URL: './UEditor/',
        serverUrl: 'http://www.appsun.com.cn/GZUSER/ueditor/dispatch'
      },
      // 上传图片
      visible: false,
      visibleBanner: false,
      // 表格
      columns: [
        {
          title: '图片',
          key: 'url',
          render: (h, params) => {
            // console.log(params.row.title);
            return h('img', {
              attrs: {
                src: params.row.url
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
          key: 'name'
        },
        {
          title: '描述二',
          key: 'role'
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
      columnsdata: []
    }
  },
  methods: {
    handleView () {
      this.visible = true
    },
    handleViewBanner () {
      this.visibleBanner = true
    },
    handleViewImageList (item) {
      // 显示图片
      this.imageListVisible = true
      this.showuploadImage = item
    },
    cancelForm () {
      this.$store.state.app.tagNavList = this.$store.state.app.tagNavList.filter(
        item => !routeEqual(this.$route, item)
      )
      this.$router.go(-1)
    },
    getActiveInfo (id) {
      var that = this
      getActivityList({
        id
      }).then(res => {
        that.formItem = res.data.data.parameterType[0]
        that.formItem.activityBeginTime = new Date(
          that.formItem.activityBeginTime
        )
        that.formItem.activityEndTime = new Date(that.formItem.activityEndTime)

        that.uploadImageList = that.formItem.still.split(',')

        that.columnsdata = that.formItem.activityDetail
      })
    }
  },

  mounted () {
    this.getActiveInfo(this.$route.query.activeId)
  },
  watch: {}
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
