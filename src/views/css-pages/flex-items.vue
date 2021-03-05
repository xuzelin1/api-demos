<template>
  <div class="flex-page">
    <div class="flex-page-item flex-page-item-first">
      <transition-group name="list" tag="div" class="flex-items">
        <div v-for="(item, index) in list" :key="item" @click="removeItem(index)">
          <div class="flex-item" v-if="list.includes(item)"></div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/runtime-core";

export default defineComponent({
  name: 'Flex',
  setup() {
    const list = reactive([1, 2, 3, 4]);

    const removeItem = (index: number) => {
      list.splice(index, 1);
    }

    return {
      list,
      removeItem,
    }
  }
})
</script>

<style lang="scss" scoped>
.flex-page-item {
  display: flex;
}

.flex-page-item-first {
  width: 100%;
  .flex-items {
    display: flex;
    width: 100%;

    div {
      flex: 2;
      // width: 25%;
      height: 150px;
      background-color: #666;
      margin: 0 10px;
    }
  }

  .list-enter-active, .list-leave-active {
    transition: all 1.5s ease-in-out;
  }
  .list-enter, .list-leave-to {
    // opacity: 0;
    // transform: translateY(30px);
    flex: 0.0001 !important;
  }
  .list-enter-to, .list-leave {
    // opacity: 0;
    // transform: translateY(30px);
    flex: 2;
  }
}
</style>