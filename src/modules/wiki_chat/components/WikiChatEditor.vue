<script setup>
import { Promotion } from '@element-plus/icons-vue'
import { defineEmits, ref } from 'vue'
const emit = defineEmits(['submit'])

const textarea = ref('')

function submit() {
  console.log(textarea.value, 'textarea.value')
  emit('submit', textarea.value.replace(/\n/g, '<br/>'))
  textarea.value = ''
}
</script>

<template>
  <div class="editor" @keyup.ctrl.enter="submit">
    <el-input
      v-model="textarea"
      style="width: 80%"
      input-style="font-size:20px;max-height: 200px;"
      size="large"
      placeholder="Введите запрос"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 7 }"
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
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
