<template>
  <div class="m-layout">
    <div class="m-layout-menu">
      <div class="u-router-item" v-for="route in routes" :key="route.name">
        <h1 v-if="route.meta.parent">{{ route.meta.parent }}</h1>
        <router-link :to='route.path'>{{ route.meta.title }}</router-link>
      </div>
    </div>
    <div class="m-app-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { routes } from '../router';

export default defineComponent({
  name: 'layout',
  setup() {
    return {
      routes,
    }
  }
});

</script>

<style lang="scss" scoped>
  .m-layout {
    display: flex;
    height: 100vh;
    width: 100vw;
    .m-layout-menu {
      width: 250px;
      border-right: 4px solid #44d2d4;
    }
    h1 {
      font-size: 18px;
      font-weight: bold;
      line-height: 20px;
      padding-bottom: 20px;
    }
    .u-router-item {
      padding: 16px 0 0 16px;
      a {
        padding-left: 20px;
        text-decoration: none;
        font-size: 16px;
      }
    }

    .m-app-main {
      padding: 20px;
      overflow-y: scroll;
      flex: 1;
    }
  }
</style>