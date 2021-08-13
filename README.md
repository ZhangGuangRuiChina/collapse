# z-collapse

## Introduction

- z-collapse 是一个基于Vue的十分轻型的收缩/展开的动画效果组件。

- 适用场景：需要对显示隐藏的元素添加动画效果。如高级搜索、侧边菜单栏、侧边联系客服系列功能栏等功能模块的收缩/展开。

- 以便懒惰的前端程序员敷衍老板/产品经理提出的需求
 
## Install
```bash
# install package
npm install z-collapse --save
```

## Show me your code
```vue
<template>
  <div id="home">
      <collapse timing=".3">
        <header v-show="showHeader">Header</header>
      </collapse>
      <main>
        <collapse direction="horizontal" timing=".3">
          <aside v-if="showAside">Aside</aside>
        </collapse>
        <article>
          <el-button @click="showHeader = !showHeader">HEADER</el-button>
          <el-button @click="showAside = !showAside">ASIDE</el-button>
        </article>
      </main>
  </div>
</template>

<script>
import collapse from 'z-collapse';
export default {
  components: { collapse },
  data() {
    return {
      showHeader: true,
      showAside: false
    }
  }
}
</script>

<style>
#home {
  margin: auto;
  text-align: center;
  height: 100vh;
  vertical-align: center;
  display: flex;
  flex-direction: column;
}
main {
  flex: 1;
  display: flex;
  flex-direction: row;
}
article {
  margin: auto;
}
header {
  padding: 20px;
  background: #58bc58;
}
aside {
  padding: 50px;
  background: pink;
}
</style>
```
## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| direction | 收展方向 | String | vertical/horizontal | vertical |
| timing | 收展时间 | Number | —— | 0.3 |

