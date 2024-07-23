<script setup>
import { ClassicEditor, Essentials, Mention, Paragraph } from 'ckeditor5'
import { ref } from 'vue'

const emit = defineEmits(['submit'])

const editorData = ref('')
const editorConfig = {
  plugins: [Essentials, Mention, Paragraph],
  toolbar: ['|', 'bold', 'italic'],
}

function submit() {
  emit('submit', editorData.value)
  editorData.value = ''
}
</script>

<template>
  <div class="ticket-detail__editor">
    <ckeditor
      v-model="editorData"
      :editor="ClassicEditor"
      :config="editorConfig"
    ></ckeditor>
    <button
      class="el-button el-button--primary el-button--mini"
      style="float: right"
      @click="submit"
    >
      Добавить ответ
    </button>
  </div>
</template>

<style>
.ck-body-wrapper {
  display: none;
}
.ticket-detail__editor {
  flex: 1;
  margin: 10px 5px;
  position: relative;
}
</style>
