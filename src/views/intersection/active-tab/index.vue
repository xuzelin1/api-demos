<template>
  <div class="m-active-tab">
    <div class="m-nav-list">
      <div class="u-nav-item" :class="nav.name" v-for="nav in navs" :key="nav.name" :data-name="nav.name">
        {{ nav.label }}
      </div>
    </div>
    <div class="m-product-panel">
      <div class="m-category-list" v-for="category in products" :key="category.name" :data-name="category.name">
        <div class="u-category-label">
          {{ category.label }}
        </div>
        <div class="m-product-list">
          <div class="u-product" v-for="product in category.products" :key="product">
            {{ product }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive } from 'vue'
import { productsList, navsList } from './config';

export default {
  // products: products,
  // navs: navs,
  setup() {
    const products = reactive(productsList);
    const navs = reactive(navsList);

    onMounted(() => {
      // 初始化观察者
      const options = {
        threshold: 1
      }

      const changeNav = (entries: any[]) => {
        entries.forEach((entry) => {
          // 检查元素发生了碰撞
          if(entry.boundingClientRect.top <= 0) {
            console.log(entry);
            // 删除旧的 active 样式类
            const activeNav = document.querySelector('.active');
            activeNav && activeNav.classList.remove('active');
            // 取得满足条件的目标元素 id
            const name = entry.target.dataset.name;
            // 找到匹配的元素并添加类名
            const newNav = document.querySelector(`.${name}`);
            newNav && newNav.classList.add('active');
          }
        });
      }

      const observer = new IntersectionObserver(changeNav, options);

      // 指定目标元素
      const sections = document.querySelectorAll('.m-category-list');
      sections.forEach((section) => {
        observer.observe(section);
      });
    })

    return {
      navs,
      products,
    }
  }
}
</script>

<style lang="scss" scoped>
.m-active-tab {
  display: flex;
}
.m-nav-list {
  flex: 1;
  text-align: center;
  line-height: 30px;

  .u-nav-item {
    &.active {
      color: red;
    }
  }
}
.m-category-list {
  padding: 20px;

  &::after {
    content: '';
    clear: both;
    display: block;
  }
}
.u-category-label {
  line-height: 50px;
  text-align: center;
}
.m-product-panel {
  flex: 5;
  overflow-y: scroll;
  height: 100vh;

  .m-product-list {
    width: 100%;
  }

  .u-product {
    width: 33%;
    height: 100px;
    float: left;
    line-height: 100px;
    text-align: center;
    border: 1px solid #efefef;
  }
}
</style>