<template>
  <div class="m-virtual-list" ref="virtualList">
    <div class="u-transform-panel" :style="{ height: listHeight + 'px' }"></div>
    <ul :style="{ transform: getTransform }">
      <div class="tag"></div>
      <li class="virtual-item" v-for="item in visiualData" :key="item.key">
        {{ item.value }}
      </li>
      <div class="tag"></div>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, reactive, ref } from 'vue'

const options = {
	root: document.querySelector('#viewport'),
	rootMargin: '0px',
	threshold: 1.0
};

export default defineComponent({
  setup() {
    const virtualList = ref(null)
    // 可视区域开始
    let start = ref(0);
    // 可视区域结束
    let end = ref(10);
    // 偏移量
    let startOffset = ref(0);
    //可视区域高度
    let screenHeight = ref(0)
    // 高度
    const itemSize = ref(200)

    const listData: any[] = reactive([]);
    const visiualData = computed(() => {
      return listData.slice(start.value, Math.min(end.value,listData.length));
    })

    const listHeight = computed(() => {
      return listData.length * itemSize.value;
    })

    const getTransform = computed(() => {
      return `translate3d(0,${startOffset.value}px,0)`;
    })

    const visibleCount = computed(() => {
      return Math.ceil(screenHeight.value / itemSize.value);
    })

    const endCallback = (entries: any[]) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting && entry.intersectionRatio === 1) {
          let scrollTop = (virtualList.value as any).scrollTop;
          startOffset.value = scrollTop - (scrollTop % itemSize.value);
          start.value = Math.floor(scrollTop / itemSize.value);
          end.value = start.value + visibleCount.value;
          console.log(start.value, end.value, listData.length);
          console.log(scrollTop, itemSize.value, scrollTop % itemSize.value, startOffset);

          // if (end.value + 1 >= listData.length) {
          //   const len = listData.length;
          //   for(let i = listData.length; i < len + 10; i++) {
          //     listData.push({
          //       key: i,
          //       value: i,
          //     })
          //   }
          // }
        }
      });
    }
    onMounted(() => {
      const container = document.querySelector('.m-virtual-list');
      screenHeight.value = container?.clientHeight || 0;
      end.value = start.value + visibleCount.value;
      const endObserver =  new IntersectionObserver(endCallback, options);
      const tags = document.querySelectorAll('.tag');
      tags.forEach((tag) => {
        endObserver.observe(tag);
      })
    })
    onBeforeMount(() => {
      for(let i = 0; i < 100000; i++) {
        listData.push({
          key: i,
          value: i,
        })
      }
    })
    return {
      listData,
      visiualData,
      listHeight,
      getTransform,
      virtualList,
      itemSize,
    }
  }
})
</script>

<style lang="scss" scoped>
ul {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
}
  li {
    display: block;
    height: 250px;
    line-height: 250px;
    border-bottom: 1px solid #efefef;
    border-left: 1px solid #efefef;
    padding-left: 15px;
  }

  .m-virtual-list {
    position: relative;
    height: 100%;
    overflow: auto;
  }

  .u-transform-panel {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
   }
</style>