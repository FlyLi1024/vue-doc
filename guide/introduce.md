## 组件编写

1. **所有组件** 必须用`px`作为单位，可省略但不可用 rem 作为单位，包括 props 传入的，具体转换参考`icon`组件。
2. 新增的组件须在`types/component.d.ts`添加组件类型，不然 ts 引入无法找到模块。
3. 新增的组件样式须在`packages/style/component.less`中导入，否则无法生效。

## 文档编写

#### 必须与左侧导

1. 右侧导航需要用 `###` 作为标题才显示。
2. 左侧导航组件根据 `src/module.js` 配置。
3. 文档 mardown 语法可以参考 `button.md` 组件的语法。
4. 文档命名必须与左侧导航名称一致，否则找不到页面。
5. 需要控制文档里的布局样式可以在`doc/style/index.less`中编写，作好哪个组件备注。
6. 文档中可使用组件库中所有的组件，也可使用 vue 部分语法运算，例如<span v-pre>`{{1+2}}`</span>。

## 自定义 mardown 语法

#### 新增 emjoy 图标

:star: :+1: :open_umbrella: :shamrock:
<a href="https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json" target="_blank">所有图标在这里</a>

#### 自定义引用

> 有一点需要注意，只有函数声明（function declaration）会被加入到变量对象中，而函数表达式（function expression）会被忽略。有一点需要注意，只有函数声明（function declaration）会被加入到变量对象中，而函数表达式（function expression）会被忽略。

#### 自定义内容块

::: tip tip
这是一个 tip
:::

::: success success
这是一个 success
:::

::: warning warning
这是一个 warning
:::
::: info info
这是一个 info
:::

::: danger danger
这是一个 danger
:::

#### 可嵌套

::: tip 嵌套代码

```html
<kad-button type="default" round>默认按钮</kad-button>
<kad-button type="primary" round>主要按钮</kad-button>
<kad-button type="info" round>信息按钮</kad-button>
<kad-button type="danger" round>危险按钮</kad-button>
<kad-button type="warning" round>警告按钮</kad-button>
```

:::

### 自定义代码块

`这是一个小的代码块`、`code`

```html
<kad-button type="default" round>默认按钮</kad-button>
<kad-button type="primary" round>主要按钮</kad-button>
<kad-button type="info" round>信息按钮</kad-button>
<kad-button type="danger" round>危险按钮</kad-button>
<kad-button type="warning" round>警告按钮</kad-button>
```

### 自定义表格

| 参数    | 说明               | 类型      | 默认值    |
| ------- | ------------------ | --------- | --------- |
| type    | 类型               | `string`  | `default` |
| loading | 是否显示为加载状态 | `boolean` | `false`   |
| loading | 是否显示为加载状态 | `boolean` | `false`   |

### 自定义 demo 展示

```html
<template>
  <div @click="ToastAnim('kad-fade')">kad-fade</div>
  <div type="default" @click="ToastAnim('kad-pop')">kad-pop</div>
  <div type="primary" @click="ToastAnim('kad-flipX')">kad-flipX</div>
  <div type="info" @click="ToastAnim('kad-spin')">kad-spin</div>
  <div type="danger" @click="ToastAnim('kad-fold')">kad-fold</div>
  <div type="warning" @click="ToastAnim('kad-scale')">kad-scale</div>
</template>
<script>
  export default {
    methods: {
      ToastAnim(anim) {
        this.$ktoast({
          content: '自定义显示动画',
          anim
        });
      }
    }
  };
</script>
```
