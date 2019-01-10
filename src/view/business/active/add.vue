<template>
  <div>
    <Card>
      <Form
        :model="formItem"
        :label-width="100"
      >
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

        <!-- 富文本 -->
        <FormItem>
        
         
        </FormItem>

        <FormItem>
          <Button type="primary">提交</Button>
          <Button style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>
import VueUeditorWrap from 'vue-ueditor-wrap';
export default {
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      formItem: {
        acitveName: "", //名称
        activeDec: "", //简介
        date: "", //时间
        acitveAddress: "", //地点
        activeSelectType: "",
        activeRadioType1: "0",
        activeRadioType2: "0",
        buyTirckUrl: "",

        radio: "male",
        checkbox: [],
        switch: true,
        time: "",
        slider: [20, 50],
        textarea: ""
      },
      options1: {
        shortcuts: [
          {
            text: "1 周",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            }
          },
          {
            text: "1个月",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              return [start, end];
            }
          },
          {
            text: "3个月",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              return [start, end];
            }
          }
        ]
      },
      msg: "",
      myConfig: {
        autoHeightEnabled: false,
        initialFrameHeight: 200,
        initialFrameWidth: "100%",
        UEDITOR_HOME_URL: "/UEditor/",
        serverUrl: "http://35.201.165.105:8000/controller.php"
      }
    };
  },
   methods: {
    // 添加自定义按钮
    addCustomButtom (editorId) {
      window.UE.registerUI('test-button', function (editor, uiName) {
        // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作
        editor.registerCommand(uiName, {
          execCommand: function () {
            editor.execCommand('inserthtml', `<span>这是一段由自定义按钮添加的文字</span>`);
          }
        });

        // 创建一个 button
        var btn = new window.UE.ui.Button({
          // 按钮的名字
          name: uiName,
          // 提示
          title: '鼠标悬停时的提示文字',
          // 需要添加的额外样式，可指定 icon 图标，图标路径参考常见问题 2
          cssRules: "background-image: url('/test-button.png') !important;background-size: cover;",
          // 点击时执行的命令
          onclick: function () {
            // 这里可以不用执行命令，做你自己的操作也可
            editor.execCommand(uiName);
          }
        });

        // 当点到编辑内容上时，按钮要做的状态反射
        editor.addListener('selectionchange', function () {
          var state = editor.queryCommandState(uiName);
          if (state === -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
          } else {
            btn.setDisabled(false);
            btn.setChecked(state);
          }
        });

        // 因为你是添加 button，所以需要返回这个 button
        return btn;
      }, 0 /* 指定添加到工具栏上的哪个位置，默认时追加到最后 */, editorId /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */);
    },
    // 添加自定义弹窗
    addCustomDialog (editorId) {
      window.UE.registerUI('test-dialog', function (editor, uiName) {
        // 创建 dialog
        var dialog = new window.UE.ui.Dialog({
          // 指定弹出层中页面的路径，这里只能支持页面，路径参考常见问题 2
          iframeUrl: '/customizeDialogPage.html',
          // 需要指定当前的编辑器实例
          editor: editor,
          // 指定 dialog 的名字
          name: uiName,
          // dialog 的标题
          title: '这是一个自定义的 Dialog 浮层',
          // 指定 dialog 的外围样式
          cssRules: 'width:600px;height:300px;',
          // 如果给出了 buttons 就代表 dialog 有确定和取消
          buttons: [
            {
              className: 'edui-okbutton',
              label: '确定',
              onclick: function () {
                dialog.close(true);
              }
            },
            {
              className: 'edui-cancelbutton',
              label: '取消',
              onclick: function () {
                dialog.close(false);
              }
            }
          ]
        });

        // 参考上面的自定义按钮
        var btn = new window.UE.ui.Button({
          name: 'dialog-button',
          title: '鼠标悬停时的提示文字',
          cssRules: `background-image: url('/test-dialog.png') !important;background-size: cover;`,
          onclick: function () {
            // 渲染dialog
            dialog.render();
            dialog.open();
          }
        });

        return btn;
      }, 0 /* 指定添加到工具栏上的那个位置，默认时追加到最后 */, editorId /* 指定这个UI是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */);
    }
  }
};
</script>

