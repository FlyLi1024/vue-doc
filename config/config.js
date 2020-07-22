const sidebar = require('./sidebar');

module.exports = {
  base: '/',
  title: 'vue-doc',
  description: '基于vue2.x的前端通用组件库文档',
  dest: 'dist',
  alias: {
    '@': 'src/'
  },
  markdown: {
    lineNumbers: false
  },
  themeConfig: {
    nav: [
      {
        title: '主页',
        router: '',
        link: ''
      },
      {
        title: '组件',
        router: '',
        link: ''
      },
      {
        title: '示例',
        router: '',
        link: ''
      },
      {
        title: '页面',
        router: '',
        link: ''
      },
      {
        title: 'gitlab',
        router: '',
        link: ''
      }
    ],
    sidebar
  }
};
