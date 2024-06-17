<script setup>
import { Message } from '@element-plus/icons-vue'
import { defineEmits, ref } from 'vue'

const emit = defineEmits(['submit'])

const textarea = ref('')
</script>

<template>
  <div class="editor">
    <el-input
      v-model="textarea"
      maxlength="50"
      style="width: 80%"
      placeholder="Please input"
      show-word-limit
      type="textarea"
    >
    </el-input>
    <el-button
      type="info"
      :icon="Message"
      circle
      style="font-size: 18px; width: 3em; height: 3em"
      @click="emit('submit')"
    />
  </div>
</template>
