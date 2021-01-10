<template>
  <div class="m-intersection-demo">
    <div
      class="u-lazy-img-panel"
      v-for="lazy in lazyImageList"
      :key="lazy"
    >
      <img
        class="lazy-image"
        width=620
        height=316
        :data-src="lazy"
        alt=""
      >
    </div>
  </div>
</template>

<script lang="ts">
import observer from '@/utils/img-load';
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'lazyImage',
  setup() {
    const lazyImageList = [
      'https://game.gtimg.cn/images/lol/act/img/skin/big121000.jpg',
      'https://game.gtimg.cn/images/lol/act/img/skin/big121003.jpg',
      'https://game.gtimg.cn/images/lol/act/img/skin/big121004.jpg',
      'https://game.gtimg.cn/images/lol/act/img/skin/big121011.jpg',
      'https://game.gtimg.cn/images/lol/act/img/skin/big121060.jpg',
      'https://game.gtimg.cn/images/lol/act/img/skin/big121002.jpg',
      'https://game.gtimg.cn/images/lol/act/img/skin/big121001.jpg',
    ]
    onMounted(() => {
      const lazyImageList = document.querySelectorAll('.lazy-image');
      lazyImageList.forEach((lazyImage) => {
        observer.observe(lazyImage);
      });
    })
    return {
      lazyImageList,
    }
  }
})
</script>

<style lang="scss">
.m-intersection-demo {
  overflow-y: scroll;
  height: 100%;
}
  #test {
    background-color: violet;
    width: 200px;
    height: 400px;
  }
  .u-lazy-img-panel {
    padding: 40px 20px;;
  }
</style>