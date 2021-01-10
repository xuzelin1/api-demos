<template>
  <div class="scroll-list" :class="!isEnd ? 'list-end' : null">
    <ul>
      <li class="virtual-item" v-for="item in listData" :key="item.key">
        {{ item.value }}
      </li>
      <div class="end-tag"></div>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';

export default defineComponent({
  name: 'scrollListView',
  setup() {
    const listData: any[] = reactive([]);
    const isEnd = ref(false);
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
          if (!entry.isIntersecting || entry.intersectionRatio <= 1) {
            isEnd.value = false;
          }
          if (entry.isIntersecting && entry.intersectionRatio === 1) {
            const len = listData.length;
            // for(let i = listData.length; i < len + 10; i++) {
            //   listData.push({
            //     key: i,
            //     value: i,
            //   })
            // }
            if (len >= 20) {
              isEnd.value = true;
            } else {
              isEnd.value = false;
              for(let i = listData.length; i < len + 10; i++) {
                listData.push({
                  key: i,
                  value: i,
                })
              }
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
      isEnd,
    }
  }
})
</script>

<style lang="scss" scoped>
.scroll-list {

  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
li {
  display: block;
  height: 150px;
  line-height: 250px;
  border-bottom: 1px solid #efefef;
  border-left: 1px solid #efefef;
  padding-left: 15px;
}

.list-end {
  box-shadow: 0 -46px 30px -41px #ff8c1a inset;
}
</style>