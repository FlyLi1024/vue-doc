import Vue from 'vue';
import Doc from './view/layout.vue';
import router from './route/index';
import Prism from 'prismjs';

Vue.config.productionTip = false;

router.afterEach((route) => {
  Vue.nextTick(() => {
    Prism.highlightAll();
  });
});

new Vue({
  router,
  render: (h) => h(Doc)
}).$mount('#app');
