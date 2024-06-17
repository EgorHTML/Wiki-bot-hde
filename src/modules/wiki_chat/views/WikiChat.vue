<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref } from 'vue'
import WikiChatEditor from '../components/WikiChatEditor.vue'

const message = {
  text: '',
  sender: {
    name: '',
    id: 0,
  },
}

const textarea = ref('')

function submit() {
  console.log('mes')
  addMessage()
}

function addMessage() {
  console.log('mes')
}
</script>

<template>
  <div class="chat-detail">
    <div class="messages"></div>
    <WikiChatEditor @submit="submit" />
  </div>
</template>

<style scoped></style>
