<template>
  <div class="data-attribute-page">
    <section class="demo-item">
      <h2>1. ToolTip</h2>
      <div class="tool-tip-content" :data-content="moreContent">{{ tooltipContent }}</div>
    </section>

    <section class="demo-item">
      <h2>2. lazy image</h2>
      <p class="u-introduction-tips">使用 data-src 存储真正的图片地址，展示的时候，img 标签中的 src 替换成 data-src 中存储的值</p>
      <div class="lazy-image-panel">
        <LazyImage />
      </div>
    </section>

    <section class="demo-item">
      <h2>3. Form validate auto focus</h2>
      <p class="u-introduction-tips">当表单验证失败时，自动滚动并聚焦到第一个必填或错误的表单项</p>
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="formName" label-width="100px" class="demo-ruleForm">
          <el-form-item data-ref="name" label="姓名" prop="name">
            <el-input ref="name" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item data-ref="age" label="年龄" prop="age">
            <el-input v-model="ruleForm.age"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">立即创建</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref } from "vue";
import LazyImage from '../intersection/lazy-image';

export default defineComponent({
  name: 'DataAttribute',
  components: {
    LazyImage,
  },
  setup() {
    const tooltipContent = 'Mouse hover to display content';
    const moreContent = 'Mouse hover to display content: more content,more content,more content,more content,more content,more content,more content,more content,more content,more content';

    const formName = ref<HTMLElement | null>(null);
    const name = ref<HTMLElement | null>(null);
    const age = ref<HTMLElement | null>(null);
    const ruleForm = {
      name: '',
      age: '',
    }
    const rules = {
      name: [{ required: true }],
      age: [{ required: true }],
    }

    onMounted(() => {
      // TODO
      console.log(formName);
    })

    const submitForm = async () => {
      (formName as any).value.validate(async (valid: boolean) => {
        if (valid) {
          alert('submit!');
        } else {
          await nextTick();          
          const errorFormList = document.querySelectorAll('.el-form-item.is-error');
          console.log(errorFormList);
          const first = errorFormList[0];
          first.scrollIntoView();
          return false;
        }
      });
    }
    const resetForm = () => {
      (formName as any).resetFields();
    }

    return {
      tooltipContent,
      moreContent,
      ruleForm,
      rules,
      resetForm,
      submitForm,
      formName,
      name,
      age,
    }
  },
})
</script>

<style lang="scss" scoped>
  .data-attribute-page {
    padding: 24px 0;
    h2 {
      font-size: 24px;
      font-weight: bold;
      margin: 24px 0;
    }
  }
  .demo-item {
    margin: 0 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid #efeeef;

    .u-introduction-tips {
      font-size: 14px;
      color: #666;
      position: relative;
      padding-left: 12px;
      margin-bottom: 16px;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0, -50%);
        width: 4px;
        height: 12px;
        background: #41b883;
      }
    }
  }

  // 1. ToolTip
  .tool-tip-content {
    position: relative;
    &:hover::after {
      content: attr(data-content);
      position: absolute;
      bottom: 100%;
      padding: 8px 9px;
      left: 0;
      display: block;
      border-radius: 4px;
      background-color: rgba($color: #000000, $alpha: 0.6);
      line-height: 1.2em;
      color: #fff;
    }
  }

  // 2. lazy image
  .lazy-image-panel {
    height: 450px;
    overflow-y: scroll;
    border: 1px solid #6fbd91;
  }
</style>