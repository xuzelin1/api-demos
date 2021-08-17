<template>
  <div class="range-slider">
    <div class="range-slider-wrapper">
      <div class="range-img-container">
        <div class="left" :style="{ width: currentWidth + '%' }">
          <img class="left-range-img" src="https://game.gtimg.cn/images/lol/act/img/skin/big121000.jpg" alt="">
        </div>
        <img class="range-img" src="https://game.gtimg.cn/images/lol/act/img/skin/big121003.jpg" alt="">
      </div>
      <div class="slider-container">
        <input class="slider" min="0" max="100" step="1" @input="change" type="range" v-model="currentWidth">
      </div>
      <div class="slider-thumb" :style="{ left: currentWidth + '%' }"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/runtime-core';

export default defineComponent({
  setup() {
    const currentWidth = ref(50);

    const change = async () => {
      console.log(currentWidth);
    }
    return {
      currentWidth,
      change,
    };
  }
})
</script>

<style lang="scss">
  .range-slider-wrapper {
    position: relative;
    width: 980px;

    .slider-container {
      position: absolute;
      top: 0;
      z-index: 100;
      width: 980px;
      height: 100%;
    }
    .slider {
      width: 100%;
      margin: 0;
      position: absolute;
      z-index: 2;
      top: 0;
      bottom: 0;
      height: 100%;
      margin: 0;
      left: -1px;
      width: calc(100% + 2px);
      cursor: pointer;
      -webkit-appearance: slider-horizontal !important;
      -moz-appearance: none;
      opacity: 0;
      -ms-touch-action: auto;
      touch-action: auto;
    }

    input[type="range" i]::-webkit-slider-runnable-track {
      height: 0;
    }
    input[type="range" i]::-webkit-slider-thumb {
      z-index: 9999;
      cursor: pointer;
    }

    .slider-thumb {
      position: absolute;
      z-index: 2;
      pointer-events: none;
      // opacity: 0;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      color: #000;
      background: rgba(255, 255, 255, 0.5);
      width: 48px;
      height: 48px;
      border-radius: 50%;
      box-shadow: 0 0 6px rgb(0 0 0 / 0%);
      transition: background 0.3s, box-shadow 0.3s, opacity 0.5s 0.25s;

      &::before {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        top: 50%;
        border-top: solid 2px;
        border-left: solid 2px;
        transform-origin: 0 0;
        transform: rotate(-45deg);
        left: 10px;
      }
      &::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        top: 50%;
        right: 0;
        border-top: solid 2px;
        border-left: solid 2px;
        transform-origin: 0 0;
        transform: rotate(135deg);
      }
    }
  }
  .range-img-container {
    position: relative;
    height: 500px;
    width: 980px;
    & .left {
      position: absolute;
      z-index: 1;
      overflow: hidden;
    }

    .range-img {
      position: absolute;
    }
  }
</style>