<script setup>
import { ClassicEditor, Essentials, Mention, Paragraph } from 'ckeditor5'
import { ref } from 'vue'

const editorData = ref('<p>Hello from CKEditor 5 in Vue!</p>')
const editorConfig = {
  plugins: [Essentials, Mention, Paragraph],
  toolbar: ['|', 'bold', 'italic'],
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
