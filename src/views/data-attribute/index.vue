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
      <div class="auto-focus-form-panel">
        <el-form :model="ruleForm" :rules="rules" ref="formName" label-width="100px" class="demo-ruleForm">
          <el-form-item data-id="name" label="活动名称" prop="name">
            <el-input id="name" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item data-id="region" label="活动区域" prop="region">
            <el-select id="region" v-model="ruleForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间" required>
            <el-col :span="11">
              <el-form-item data-id="date1" prop="date1">
                <el-date-picker id="date1" type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item data-id="date2" prop="date2">
                <el-time-picker id="date2" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item data-id="delivery" label="即时配送" prop="delivery">
            <el-switch id="delivery" v-model="ruleForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item data-id="type" label="活动性质" prop="type">
            <el-checkbox-group id="type" v-model="ruleForm.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item data-id="resource" label="特殊资源" prop="resource">
            <el-radio-group id="resource" v-model="ruleForm.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item data-id="desc" label="活动形式" prop="desc">
            <el-input id="desc" type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
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

    const ruleForm = ref({
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    })
    const rules = {
      name: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ],
      region: [
        { required: true, message: '请选择活动区域', trigger: 'change' }
      ],
      date1: [
        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
      ],
      date2: [
        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
      ],
      type: [
        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
      ],
      resource: [
        { required: true, message: '请选择活动资源', trigger: 'change' }
      ],
      desc: [
        { required: true, message: '请填写活动形式', trigger: 'blur' }
      ]
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
          first.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth',
          });
          const id = first.getAttribute('data-id');
          const formItem = document.getElementById(id as string);
          formItem?.click();
          formItem?.focus();
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
    }
  },
})
</script>

<style lang="scss" scoped>
  .data-attribute-page {
    overflow-y: scroll;
    height: 100vh;
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
    border: 1px solid #6fbd91;
  }

  // 3. form focus
  .auto-focus-form-panel {
    height: 450px;
    overflow-y: scroll;
    padding: 24px;
    border: 1px solid #6fbd91;
  }
</style>