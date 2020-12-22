import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import Not from '@src/view/404.vue';
import Changelog from '@guide/changelog.md';
import Quickstart from '@guide/installation.md';
import Introduction from '@guide/introduce.md';
const { sidebar } = require('../../config/sidebar');

const DemoList = sidebar.map((item) => {
  return item.children.map((sitem) => {
    return sitem.component;
  });
});

const DemoRouter = [].concat.apply([], DemoList).map((item) => {
  return {
    path: '/' + item,
    name: item,
    component: () => import(`@guide/${item}.md`)
  };
});

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      name: 'Not',
      component: Not
    },
    {
      path: '/',
      name: 'introduction',
      component: Introduction
    },
    {
      path: '/quickstart',
      name: 'quickstart',
      component: Quickstart
    },
    {
      path: '/changelog',
      name: 'changelog',
      component: Changelog
    },
    ...DemoRouter
  ]
});
