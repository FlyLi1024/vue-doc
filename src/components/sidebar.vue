<template>
  <div class="">
    <transition :name="$parent.bodyWidth < 768 ? 'fade' : ''">
      <div class="sidebar-mask" v-show="$parent.showSidebar" @click="$parent.showSidebar = false"></div>
    </transition>

    <transition :name="$parent.bodyWidth < 768 ? 'slide-left' : ''">
      <div class="sidebar" v-show="$parent.showSidebar">
        <div class="sidebar-rows">
          <div class="sidebar-item" :class="{ actv: curTagName === 'introduction' }">
            <a @click="ToPage('')">介绍指南</a>
          </div>
          <div class="sidebar-item" :class="{ actv: curTagName === 'quickstart' }">
            <a @click="ToPage('quickstart')">快速上手</a>
          </div>
          <div class="sidebar-item" :class="{ actv: curTagName === 'changelog' }">
            <a @click="ToPage('changelog')">版本日记 (v{{ version }})</a>
          </div>
        </div>
        <div class="sidebar-rows" v-for="(items, indexs) in sidebarList" :key="indexs">
          <div class="sidebar-title">{{ items.category }}</div>
          <div class="sidebar-item" :class="{ actv: curTagName === item.component }" v-for="(item, index) in items.children" :key="index">
            <a @click="ToPage(item.component)">{{ item.component }} {{ item.title }}</a>
          </div>
          <!-- <div class="sidebar-item actv">icon 图标</div> -->
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
const { sidebar } = require('../../config/sidebar');
const { version } = require('../../package.json');
export default {
  data() {
    return {
      sidebarList: sidebar,
      curTagName: '',
      version: version
    };
  },
  mounted() {},
  methods: {
    ToPage(path) {
      document.documentElement.scrollTop = 0;
      this.$router.push(`/${path}`);
    }
  },
  watch: {
    $route: {
      handler(newV, oldV) {
        this.curTagName = newV.name;
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
@import '../style/var.less';
@import '../style/animation.less';
.sidebar {
  display: block;
  position: fixed;
  z-index: 99;
  bottom: 0;
  top: 0;
  margin-top: 70px;
  overflow: auto;
  width: 272px;
  padding: 50px 0;
  background: #fff;
  border-right: 1px solid #eaecef;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  &-mask {
    display: none;
  }
  &-rows {
    width: 100%;
  }
  &-title {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    padding-left: 30px;
    box-sizing: border-box;
    line-height: 40px;
  }
  &-item {
    height: 42px;
    line-height: 42px;
    padding-left: 50px;
    box-sizing: border-box;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    border-right: 2px solid transparent;
    a {
      display: block;
      text-decoration: none;
      color: rgba(0, 0, 0, 0.65);
    }
    &.actv {
      color: @sidebar-actv-color;
      background: @sidebar-actv-background-color;
      border-right-color: @sidebar-actv-border-color;
      a {
        color: inherit;
      }
    }
    &:hover {
      cursor: pointer;
      color: @sidebar-hover-color;
      background: @sidebar-hover-background-color;
      a {
        color: inherit;
      }
    }
  }
}

@media (max-width: 768px) {
  .sidebar {
    // display: none;
    width: auto;
    padding: 20px 0;
    &-mask {
      display: block;
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.45);
    }
    &-item {
      padding: 0 50px;
    }
  }
}
</style>
