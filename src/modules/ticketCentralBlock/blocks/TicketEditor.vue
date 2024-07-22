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
  <ckeditor
    v-model="editorData"
    :editor="ClassicEditor"
    :config="editorConfig"
  ></ckeditor>
</template>
