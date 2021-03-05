<template>
  <div class="flex-page">
    <div class="flex-page-item flex-page-item-first">
      <transition-group name="list" tag="div" class="flex-items">
        <div v-for="(item, index) in list" :key="item" @click="removeItem(index)">
          <div class="flex-item" v-if="list.includes(item)"></div>
        </div>
      </transition-group>
    </div>
    <hr />

    <div class="flex-page-item flex-page-item-second">
      <div class="main">
        <span class="change-btn" @click="sideShow = !sideShow">收起/展开</span>
      </div>
      <transition name="side">
        <div class="side" v-show="sideShow"></div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/runtime-core";

export default defineComponent({
  name: 'Flex',
  setup() {
    const list = reactive([1, 2, 3, 4]);
    const sideShow = ref(true);

    const removeItem = (index: number) => {
      list.splice(index, 1);
    }

    return {
      list,
      removeItem,
      sideShow,
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
    flex: 0.0001 !important;
  }
  .list-enter-to, .list-leave {
    flex: 2;
  }
}

.flex-page-item-second {
  display: flex;
  height: 300px;
  width: 100%;

  .main {
    flex-grow: 2;
    background-color: royalblue;

    .change-btn {
      color: #fff;
      background-color: skyblue;
    }
  }
  .side {
    flex-grow: 1;
    background-color: sandybrown;
  }

  .side-enter-active, .side-leave-active {
    transition: flex-grow 1.5s ease-in-out;
  }
  .side-enter, .side-leave-to {
    width: 0 !important;
    flex-grow: 0.00001 !important;
  }
  .side-enter-to, .side-leave {
    width: 100% !important;
    flex-grow: 1 !important;
  }
}
</style>