<template>
  <div class="layout">
    <Header></Header>
    <Sidebar></Sidebar>
    <div class="container">
      <router-view></router-view>
      <div class="anchor" v-if="anchorList.length > 0">
        <div class="list">
          <div class="item" v-for="(item, index) in anchorList" :key="index" :class="['item-' + item.anchor, { actv: scrollTop >= item.top - 130 }]" @click.prevent="custormAnchor(item.id)">
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div class="elevator">
        <!-- <div class="elevator-item">item</div> -->
        <div class="elevator-item">
          <to-top-one theme="outline" size="30" fill="#333" :strokeWidth="2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import { ToTopOne } from '@icon-park/vue';
export default {
  data() {
    return {
      bodyWidth: '',
      showSidebar: false,
      anchorList: [],
      scrollTop: 0,
      scrollTop1: 0
    };
  },
  components: {
    Header,
    Sidebar,
    ToTopOne
  },
  mounted() {
    this.SetSidebar();
    window.addEventListener('resize', this.SetSidebar());
    document.querySelector('.container').onscroll = () => {
      this.scrollTop = document.querySelector('.container').scrollTop;
    };
  },
  destroyed() {
    window.removeEventListener('resize', this.SetSidebar());
  },
  watch: {
    $route: {
      handler(newV, oldV) {
        this.$nextTick(function () {
          const anchorArr = document.querySelectorAll('.heading-title');
          this.anchorList = [...anchorArr].map((item, index) => {
            return {
              id: item.id,
              anchor: item.getAttribute('anchor'),
              name: item.innerText,
              top: document.querySelector(`#${item.id}`).offsetTop
            };
          });
        });
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    SetSidebar() {
      this.bodyWidth = document.body.clientWidth;
      if (this.bodyWidth > 768) {
        this.showSidebar = true;
      } else {
        this.showSidebar = false;
      }
    },
    custormAnchor(id) {
      const content = document.querySelector('.container'); // 获取滚动页面元素
      const el = document.getElementById(`${id}`); // 获取对应id的标签元素
      this.scrollTop = content.scrollTop; // 获取当前页面离顶部的距离
      let end = el.offsetTop - 70; // 获取目标元素离顶部的距离（这里的80是减去了我顶部消息栏的高度，大家可以不用管）
      let each = this.scrollTop > end ? (-1 * Math.abs(this.scrollTop - end)) / 20 : Math.abs(this.scrollTop - end) / 20; // 考虑滚动方向并计算总共需要滚动的距离，同时将距离平分成20份
      let count = 0; // 记录滚动次数
      let timer = setInterval(() => {
        // 设置定时器，滚动20次
        if (count < 20) {
          this.scrollTop = content.scrollTop += each;
          count++;
        } else {
          clearInterval(timer);
        }
      }, 10);
    }
  }
};
</script>
<style lang="less">
@import '../style/index.less';
.layout {
  color: #515151;
  display: flex;
  flex-direction: column;
  height: 100%;
  .container {
    flex: 1;
    overflow: auto;
    padding: 20px 20px 100px 320px;
    @media (max-width: 768px) {
      padding: 50px 10px 10px;
    }
    .anchor {
      position: fixed;
      right: 20px;
      top: 150px;
      z-index: 99;
      flex-shrink: 0;
      width: 250px;
      background: #fff;
      @media (max-width: 768px) {
        display: none;
      }

      .list {
        background: fade(@theme-color, 10%);
        font-size: 14px;
        box-sizing: border-box;
        padding: 10px;
        .item {
          position: relative;
          color: #666;
          line-height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          transition: 0.2s ease-out;
          padding: 0 10px;
          border-left: 5px solid transparent;
          box-sizing: border-box;
          &.item-h1,
          &.item-h2 {
            font-weight: bold;
            font-size: 16px;
          }
          &.item-h3 {
            font-size: 14px;
            text-indent: 1em;
          }
          &.item-h4,
          &.item-h5,
          &.item-h6 {
            display: none;
          }
          span {
            color: #666;
            text-decoration: none;
          }
          &::after {
            position: absolute;
            left: 0;
            top: 0;
            content: '';
            width: 5px;
            height: 90%;
            transition: 0.3s ease-out;
            transform: translateY(-100%);
            background: fade(@theme-color, 80%);
          }

          &:hover,
          &.actv {
            &:after {
              transform: translateY(0);
              border-radius: 10px;
            }
          }
        }
      }
    }
    .elevator {
      position: fixed;
      right: 30px;
      bottom: 10px;
      width: 40px;
      background: #eee;
      text-align: center;
      &-item {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
      }
    }
  }
}
</style>
