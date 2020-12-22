<template>
  <div class="doc-header" v-if="$parent.bodyWidth > 768">
    <div class="logo">
      <span>VUE-DOC</span>
    </div>
    <div class="search">
      <input type="text" placeholder="待开发中..." />
    </div>
    <div class="nav">
      <div class="doc-nav">
        <div class="item"><a href="https://tstres.360kad.com/kad_design/doc/index.html">主页</a></div>
        <div class="item"><a href="https://tstres.360kad.com/kad_design/doc/index.html">组件</a></div>
        <div class="item"><a href="https://tstres.360kad.com/kad_design/demo/index.html" target="_blank">示例</a></div>
        <div class="item"><a href="https://tstres.360kad.com/kad_design/demo/#/pages/index" target="_blank">页面</a></div>
        <div class="item"><a href="https://gitlab.360kad.com/kad2.0/packages/kad-design" target="_blank">gitlab</a></div>
      </div>
    </div>
  </div>
  <!-- <div class="mobile-header" v-if="$parent.bodyWidth <= 768">
      <div class="sidebar-btn" @click="SwitchSide">
        <svg size="40" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512" style="fill: rgb(255, 255, 255);">
          <path d="M96 241h320v32H96zm0-96h320v32H96zm0 192h320v32H96z"></path>
        </svg>
      </div>
      <div class="title">VUE-DOC</div>
      <div class="nav-btn" @click="SwitchNav">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="width: 50px; height: 40px;">
          <circle cx="15" cy="20" r="2" stroke-width="2" fill="#fff" />
          <circle cx="25" cy="20" r="2" stroke-width="2" fill="#fff" />
          <circle cx="35" cy="20" r="2" stroke-width="2" fill="#fff" />
        </svg>
      </div>
      <div class="mobile-nav">
        <transition name="fade">
          <div class="mask" @click="SwitchNav" v-show="showNav"></div>
        </transition>
        <transition name="slide-right">
          <div class="doc-nav" v-show="showNav">
            <div class="item"><a href="https://tstres.360kad.com/kad_design/doc/index.html">主页</a></div>
            <div class="item"><a href="https://tstres.360kad.com/kad_design/doc/index.html">组件</a></div>
            <div class="item"><a href="https://tstres.360kad.com/kad_design/demo/index.html" target="_blank">示例</a></div>
            <div class="item"><a href="https://tstres.360kad.com/kad_design/demo/#/pages/index" target="_blank">页面</a></div>
            <div class="item"><a href="https://gitlab.360kad.com/kad2.0/packages/kad-design" target="_blank">gitlab</a></div>
          </div>
        </transition>
      </div>
    </div> -->
</template>
<script>
export default {
  data() {
    return {
      showNav: false
    };
  },
  methods: {
    SwitchNav() {
      this.showNav = !this.showNav;
    },
    SwitchSide() {
      this.$parent.showSidebar = !this.$parent.showSidebar;
    }
  }
};
</script>
<style lang="less" scoped>
@import '../style/var.less';
@import '../style/animation.less';

.doc-header {
  // position: fixed;
  // top: 0;
  // left: 0;
  // right: 0;
  // z-index: 100;
  background: #fff;
  height: 70px;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #eaecef;
  box-shadow: 0 0 10px #eaecef;
  display: flex;
  align-items: center;

  .logo {
    flex-shrink: 0;
    width: 272px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    padding: 0 20px;
    box-sizing: border-box;
    border-right: 1px solid #eaecef;
    font-size: 24px;
    color: @logo-color;
    font-weight: 400;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      display: block;
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }
  }
  .search {
    flex-shrink: 0;
    width: 300px;
    padding: 0 10px;
    height: 70px;
    line-height: 70px;
    padding-left: 20px;
    box-sizing: border-box;
    input {
      width: 80%;
      height: 30px;
      line-height: 30px;
      border: 1px solid #eaecef;
      font-size: 12px;
      padding: 0 10px;
      box-sizing: border-box;
      border-radius: 20px;
      outline: none;
      transition: 0.15s ease-out;
      &:focus {
        border: 1px solid @search-focus-border-color;
      }
    }
  }
  .nav {
    flex: 1;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 100px;
    color: #a1a1a1;
  }
}
.mobile-header {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 10;
  height: 40px;
  color: #fff;
  background: @mobile-header-background-color;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .sidebar-btn {
    flex-shrink: 0;
    width: 50px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .title {
    flex: 1;
    font-size: 18px;
    text-align: center;
  }
  .nav-btn {
    flex-shrink: 0;
    width: 50px;
    height: 40px;
    line-height: 40px;
  }
}
.doc-nav {
  display: flex;
  .item {
    font-size: 14px;
    height: 70px;
    line-height: 70px;
    cursor: pointer;
    white-space: nowrap;
    transition: 0.3s cubic-bezier(0.51, 1.65, 0.37, 0.66);
    a {
      display: block;
      padding: 0 20px;
      color: #a1a1a1 !important;
      text-decoration: none;
    }
    &:hover {
      box-shadow: 0 10px 10px 2px #ddd;
      a {
        color: @nav-hover-color !important;
      }
    }
  }
}
@media (max-width: 768px) {
  .doc-header {
    display: none;
  }
  .mobile-nav {
    .mask {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
    }
  }
  .doc-nav {
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 200px;
    background: #fff;
    overflow-y: auto;
    .item {
      width: 100%;
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #eee;
      text-align: center;
      &:hover {
        box-shadow: none;
      }
    }
  }
}
</style>
