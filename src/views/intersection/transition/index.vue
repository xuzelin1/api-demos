<template>
  <div class="transition-page">
    <div class="box-container" v-for="(item, index) in 3" :key="item">
      <div class="box" :class="'box' + index"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: 'Transition',
  setup() {
    onMounted(() => {
      const options = {
        root: document.querySelector('#viewport'),
        rootMargin: '0px',
        threshold: 1.0
      };

      const callback = (entries: any[]) => {
        entries.forEach((entry: any) => {
          console.log(entry)
          if(entry.isIntersecting && entry.intersectionRatio >= 1) {
              // 完全看到元素时
            entry.target.classList.add('box-visible');
          } else {
            entry.target.classList.remove('box-visible');
          }
        });
      }

      const observer = new IntersectionObserver(callback, options);
      // 指定观察目标
      const boxes = document.querySelectorAll('.box');
      boxes.forEach((box) => {
        observer.observe(box);
      });
    })
  },
})
</script>

<style lang="scss" scoped>
.transition-page {
  height: 100%;
  text-align: center;
  overflow-y: scroll;
}
.opacity-title {
  font-size: 36px;
  font-weight: bold;
  padding: 20px;
  line-height: 36px;
}
.box {
  height: 150px;
  width: 150px;
  background-color: violet;
}
.box-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box1.box-visible {
  transform: scale(2);
  transition: 1s;
}
</style>