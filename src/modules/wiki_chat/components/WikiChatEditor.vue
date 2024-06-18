<script setup>
import { Message } from '@element-plus/icons-vue'
import { defineEmits, ref } from 'vue'

const emit = defineEmits(['submit'])

const textarea = ref('')

function submit() {
  emit('submit', textarea.value)
  textarea.value = ''
}
</script>

<template>
  <div class="editor">
    <el-input
      v-model="textarea"
      input-style="font-size:20px;max-height: 200px;"
      size="large"
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
      style="font-size: 18px; width: 3em; height: 3em; align-self: center"
      @click="submit"
    />
  </div>
</template>

<style scoped>
textarea {
  min-height: 80px;
  max-height: 200px;
}

.editor {
  align-self: center;
  width: 80%;
  display: flex;
  justify-content: space-between;
}
</style>
