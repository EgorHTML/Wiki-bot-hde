<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref } from 'vue'
import WikiChatEditor from '../components/WikiChatEditor.vue'
import WikiChatMessage from '../components/WikiChatMessage.vue'
import asc from '../../../services/wikibot/asc.js'

const messages = ref([])
const currentUser = getCurrentUser()
const loadingAnswer = ref(false)

function getCurrentUser() {
  const data = JSON.parse(
    window.parent.document.querySelector('#ticketAppInitialState').innerHTML
  )
  const userId = data.currentUser.userId

  return data.usersOnline.find((user) => user.id === userId)
}

async function submit(textarea) {
  try {
    addMessage({
      id: messages.value.length + 1,
      text: textarea,
      sender: {
        name: currentUser.name,
        id: currentUser.userId,
      },
    })
  } catch {
    console.warn('write message')
  }

  getAnswer(textarea)
}

async function getAnswer(textarea) {
  loadingAnswer.value = true

  const dataAnswer = (await asc(textarea)).data
  console.log(dataAnswer)

  if (dataAnswer.answer) {
    addMessage({
      id: messages.value.length + 1,
      text: dataAnswer.answer,
      sender: {
        name: 'Wiki Bot',
        id: 0,
      },
    })
  }

  loadingAnswer.value = false
}

function addMessage(message) {
  if (!message.text) throw new Error('Text message undefined')
  messages.value = [...messages.value, message]
}
</script>

<template>
  <div class="chat-detail">
    <el-scrollbar class="messages">
      <WikiChatMessage
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
    </el-scrollbar>
    <WikiChatEditor @submit="submit" />
  </div>
</template>

<style scoped>
.chat-detail {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.messages {
  height: 80%;
  overflow: auto;
}
</style>
