<template>
  <div class="m-intersection-demo">
    <virtual-list :listData="listData"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import VirtualList from '@/components/virtual-list';

export default defineComponent({
  name: 'virtualListView',
  components: {
    VirtualList,
  },
  setup() {
    const listData: { key: number; value: number; }[] = [];
    onMounted(() => {
      for(let i = 0; i < 100; i++) {
        listData.push({
          key: i,
          value: i,
        })
      }
    })
    return {
      listData,
    }
  }
})
</script>

<style lang="scss">
.m-intersection-demo {
  height: 100%;
}
</style>