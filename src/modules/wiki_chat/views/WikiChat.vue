<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref } from 'vue'
import WikiChatEditor from '../components/WikiChatEditor.vue'
import WikiChatMessage from '../components/WikiChatMessage.vue'
import asc from '../../../services/wikibot/asc.js'
import answer from '../../../services/wikibot/answer.js'
import HDE from '../../../plugin'

const messages = ref([])
const currentUser = getCurrentUser()

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
    /* empty */
  }

  getAnswer(textarea)
}

function getAnswer(textarea) {
  console.log(HDE.getState().ticketId + '_' + messages.value.length, 'ask')
  const date = new Date().getMilliseconds()
  asc(textarea, HDE.getState().ticketId + '_' + date).then(async () => {
    let data = (await answer(HDE.getState().ticketId + '_' + date)).data

    console.log(
      (await answer(HDE.getState().ticketId + '_' + date)).data,
      'await answer'
    )

    const id = setInterval(async () => {
      if (data.data?.chatId == HDE.getState().ticketId + '_' + date) {
        if (data.data?.answer) {
          addMessage({
            id: messages.value.length + 1,
            text: data.data.answer,
            sender: {
              name: 'Wiki Bot',
              id: 0,
            },
          })
        }
        clearInterval(id)
        return
      }
      data = (await answer(HDE.getState().ticketId + '_' + date)).data
      console.log(data, 'data')
    }, 1000)
  })
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
