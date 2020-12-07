<template>
  <div class="doc">
    <Header></Header>
    <Sidebar></Sidebar>
    <div class="layout">
      <div id="flyli" class="default">
        <!-- {{ showSidebar }} -->
        <router-view></router-view>
      </div>
      <div class="anchor" v-if="anchorList.length > 0">
        <div class="list">
          <div class="item" v-for="(item, index) in anchorList" :key="index" :class="'item-' + item.anchor">
            <a @click.prevent="custormAnchor(item.id)">{{ item.name }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/header';
import Sidebar from '../components/sidebar';
export default {
  data() {
    return {
      bodyWidth: '',
      showSidebar: false,
      anchorList: []
    };
  },
  components: {
    Header,
    Sidebar
  },
  mounted() {
    this.bodyWidth = document.body.clientWidth;
    if (this.bodyWidth > 768) {
      this.showSidebar = true;
    } else {
      this.showSidebar = false;
    }
    window.addEventListener('resize', () => {
      this.bodyWidth = document.body.clientWidth;
      if (this.bodyWidth > 768) {
        this.showSidebar = true;
      } else {
        this.showSidebar = false;
      }
    });
  },
  destroyed() {
    window.removeEventListener('resize');
  },
  methods: {},
  watch: {
    $route: {
      handler(newV, oldV) {
        this.$nextTick(function () {
          const anchorArr = document.querySelectorAll('.heading-title');
          this.anchorList = [...anchorArr].map((item, index) => {
            return {
              id: item.id,
              anchor: item.getAttribute('anchor'),
              name: item.innerText
            };
          });
        });
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    custormAnchor(anchorName) {
      let anchorElement = document.getElementById(anchorName);
      anchorElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      // document.documentElement.scrollTop = anchorElement.offsetTop - 80;
    }
  }
};
</script>
<style lang="less">
@import '../style/index.less';
.doc {
  color: #515151;
  .layout {
    padding: 100px 20px 100px 330px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    @media (max-width: 768px) {
      padding: 50px 10px 10px;
    }
    #flyli {
      flex: 1;
    }

    .anchor {
      flex-shrink: 0;
      width: 350px;

      @media (max-width: 768px) {
        display: none;
      }

      .list {
        position: fixed;
        right: 20px;
        top: 150px;
        z-index: 99;
        width: 200px;
        font-size: 14px;
        box-sizing: border-box;
        padding: 10px 0;
        .item {
          color: #666;
          line-height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          transition: 0.2s ease-out;
          padding: 0 10px;
          &.item-h1,
          &.item-h2 {
            font-weight: bold;
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
          a {
            color: #666;
            text-decoration: none;
          }

          &:hover {
            a {
              color: @anchor-hover-color;
            }
          }
        }
      }
    }
  }
}
</style>
