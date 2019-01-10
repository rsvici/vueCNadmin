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

        <FormItem>
          <Button type="primary">提交</Button>
          <Button style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>
export default {
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
      }
    };
  }
};
</script>

