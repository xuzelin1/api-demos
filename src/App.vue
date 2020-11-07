<template>
  <Layout />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Layout from './layout/index.vue';

@Options({
  components: {
    Layout,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import url('./styles/index.css');
</style>
