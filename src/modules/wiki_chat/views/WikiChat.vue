<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref } from 'vue'
import WikiChatEditor from '../components/WikiChatEditor.vue'
import WikiChatMessage from '../components/WikiChatMessage.vue'
import asc from '../../../services/wikibot/asc.js'
import { getCurrentUser } from '../utils/user.js'

const messages = ref([])
const currentUser = getCurrentUser()
const loadingAnswer = ref(false)
const messegesContainer = ref()

async function submit(textarea) {
  try {
    addMessage({
      id: messages.value.length + 1,
      text: textarea,
      sender: {
        name: currentUser.name,
        id: currentUser.id,
      },
    })
    setLoading(true)
    await getAnswer(textarea)
    setLoading(false)
    messegesContainer.value.setScrollTop(
      messegesContainer.value.wrapRef.scrollHeight
    )
  } catch {
    console.warn('write message')
  } finally {
    setLoading(false)
  }
}

async function getAnswer(textarea) {
  const dataAnswer = (await asc(textarea)).data

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
}

function setLoading(flag) {
  loadingAnswer.value = flag
}

function addMessage(message) {
  if (!message.text) throw new Error('Text message undefined')
  messages.value = [...messages.value, message]
}
</script>

<template>
  <div class="chat-detail">
    <el-scrollbar ref="messegesContainer" class="messages">
      <WikiChatMessage
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
    </el-scrollbar>
    <div style="align-self: center; width: 70%">
      <span v-if="loadingAnswer" style="text-align: left" class="loading"
        >Суфлёр Wikibot печатает...</span
      >
      <WikiChatEditor @submit="submit" />
    </div>
  </div>
</template>

<style>
.chat-detail {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  word-break: break-word;
}

.messages {
  height: 80%;
  overflow: auto;
}

.el-scrollbar__view {
  display: flex;
  flex-direction: column;
}

.loading {
  font-weight: bold;
  display: inline;
  font-family: monospace;
  font-size: 20px;
  clip-path: inset(0 3ch 0 0);
  animation: l 1s steps(4) infinite;
}

@keyframes l {
  to {
    clip-path: inset(0 -1ch 0 0);
  }
}
</style>
