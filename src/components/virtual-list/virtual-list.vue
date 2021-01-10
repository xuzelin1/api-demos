<template>
  <div class="m-virtual-list" ref="virtualList">
    <div class="u-transform-panel" :style="{ height: listHeight + 'px' }"></div>
    <ul :style="{ transform: getTransform }">
      <!-- <li id="first-item"></li> -->
      <li
        class="virtual-item"
        v-for="(item, index) in visiualData"
        :key="item.key"
        :id="index === 0 ? 'first-item' : index === visiualData.length - 1 ? 'last-item' : null"
      >
        {{ item.value }}
      </li>
      <!-- <li id="last-item"></li> -->
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, reactive, ref } from 'vue'

const options = {
	// root: document.querySelector('#viewport'),
	// rootMargin: '0px',
	// threshold: 1.0
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

    const firstItemId = 'first-item';
    const lastItemId = 'last-item';

    const listData: any[] = reactive([]);
    const visiualData = computed(() => {
      return listData.slice(start.value, Math.min(end.value, listData.length));
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
      //   if (entry.isIntersecting && entry.intersectionRatio === 1) {
      //     let scrollTop = (virtualList.value as any).scrollTop;
      //     startOffset.value = scrollTop - (scrollTop % itemSize.value);
      //     start.value = Math.floor(scrollTop / itemSize.value);
      //     end.value = start.value + visibleCount.value;
      //     console.log(start.value, end.value, listData.length);
      //     console.log(scrollTop, itemSize.value, scrollTop % itemSize.value, startOffset);

      //     // if (end.value + 1 >= listData.length) {
      //     //   const len = listData.length;
      //     //   for(let i = listData.length; i < len + 10; i++) {
      //     //     listData.push({
      //     //       key: i,
      //     //       value: i,
      //     //     })
      //     //   }
      //     // }
      // }
        if (entry.target.id === firstItemId) {

          // const currentY = entry.boundingClientRect.top;
          // const currentRatio = entry.intersectionRatio;
          // const isIntersecting = entry.isIntersecting;

          // console.log('first', currentY, currentRatio, isIntersecting)
        } else if (entry.target.id === lastItemId) {

          const currentY = entry.boundingClientRect.top;
          const currentRatio = entry.intersectionRatio;
          const isIntersecting = entry.isIntersecting;
          console.log('last', currentY, currentRatio, isIntersecting)

          if (isIntersecting) {
            console.log('last', currentY, currentRatio, isIntersecting)

            let scrollTop = (virtualList.value as any).scrollTop;
            startOffset.value = scrollTop - (scrollTop % itemSize.value);
            start.value = Math.floor(scrollTop / itemSize.value);
            end.value = start.value + visibleCount.value + 1;
          }
        }
      });
    }

    onMounted(() => {
      const container = document.querySelector('.m-virtual-list');
      screenHeight.value = container?.clientHeight || 0;
      end.value = start.value + visibleCount.value + 1;
      const observer =  new IntersectionObserver(endCallback, options);

      const firstItem = document.getElementById(firstItemId);
      const lastItem = document.getElementById(lastItemId);

      // 观察列表第一个以及最后一个元素
      observer.observe(firstItem!);
      observer.observe(lastItem!);
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

// #first-item,
// #last-item {
//   height: 0;
// }

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