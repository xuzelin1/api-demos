<template>
  <div class="scroll-list">
    <ul>
      <li class="virtual-item" v-for="item in listData" :key="item.key">
        {{ item.value }}
      </li>
      <div class="end-tag"></div>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';

export default defineComponent({
  name: 'scrollListView',
  setup() {
    const listData: any[] = reactive([]);
    onMounted(() => {
      for(let i = 0; i < 10; i++) {
        listData.push({
          key: i,
          value: i,
        })
      }
      console.log(listData)
      const options = {
        root: document.querySelector('#viewport'),
        rootMargin: '0px',
        threshold: 1.0
      };

      const callback = (entries: any[]) => {
        entries.forEach((entry: any) => {
          if (entry.isIntersecting && entry.intersectionRatio === 1) {
            const len = listData.length;
            for(let i = listData.length; i < len + 10; i++) {
              listData.push({
                key: i,
                value: i,
              })
            }
          }
          // console.log(entry);
        });
      }

      const observer = new IntersectionObserver(callback, options);
      observer.observe(document.querySelector('.end-tag')!);
    })
    return {
      listData,
    }
  }
})
</script>

<style lang="scss" scoped>
.scroll-list {

  width: 100%;
  height: 100%;
  overflow: scroll;
}
li {
  display: block;
  height: 150px;
  line-height: 250px;
  border-bottom: 1px solid #efefef;
  border-left: 1px solid #efefef;
  padding-left: 15px;
}
</style>