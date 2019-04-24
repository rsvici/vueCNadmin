<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
.size {
  width: 100%;
  height: 100%;
}
html,
body {
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
.ivu-input-wrapper {
  textarea.ivu-input {
    font-size: 12px;
  }
}
.ivu-table-cell img{
  height:100%!important;
  width:100%!important;
  max-width:100px!important;
}
</style>
