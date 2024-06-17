<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref } from 'vue'
import WikiChatEditor from '../components/WikiChatEditor.vue'
import WikiChatMessage from '../components/WikiChatMessage.vue'

const messages = ref([])

function submit() {
  addMessage({
    id: 1,
    text: 'testovoe soobchenie',
    sender: {
      name: 'Egor',
      id: 1,
    },
  })
}

function addMessage(message) {
  console.log('mes')
  messages.value = [...messages.value, message]
  console.log(message, 'messages')
}
</script>

<template>
  <div class="chat-detail">
    <div class="messages">
      <WikiChatMessage
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
    </div>
    <WikiChatEditor @submit="submit" />
  </div>
</template>

<style scoped>
.chat-detail {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.messages {
  flex: 1 1;
}
</style>
