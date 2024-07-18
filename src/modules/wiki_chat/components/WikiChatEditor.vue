<script setup>
import { Promotion } from '@element-plus/icons-vue'
import { defineEmits, ref } from 'vue'
const emit = defineEmits(['submit'])

const textarea = ref('')

function submit() {
  emit('submit', textarea.value)
  textarea.value = ''
}
</script>

<template>
  <div class="editor" @keyup.enter.prevent="submit">
    <el-input
      v-model="textarea"
      style="width: 80%"
      input-style="font-size:20px;max-height: 200px;"
      size="large"
      placeholder="Введите запрос"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 7 }"
      @keydown.enter.prevent=""
    >
    </el-input>
    <el-button
      type="info"
      circle
      style="font-size: 18px; width: 3em; height: 3em; align-self: center"
      @click="submit"
    >
      <el-icon :size="30">
        <Promotion style="font-size: 25px" />
      </el-icon>
    </el-button>
  </div>
</template>

<style scoped>
.editor {
  align-self: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
