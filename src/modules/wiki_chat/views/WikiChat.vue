<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref } from 'vue'
import asc from '../../../services/wikibot/asc.js'
import { getCurrentUser } from '../utils/user.js'
import TicketDetail from '../../ticketCentralBlock/views/TicketDetail.vue'

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
  } catch (error) {
    addMessage({
      id: messages.value.length + 1,
      text: error.message,
      sender: {
        name: 'Суфлёр Wikibot',
        id: 0,
      },
    })
  } finally {
    setLoading(false)
  }
}

async function getAnswer(textarea) {
  const dataAnswer = (await asc(textarea)).data

  if (!dataAnswer)
    throw new Error('Извините, по техническим причинам я не могу помочь Вам (')

  if (dataAnswer?.error) throw new Error(dataAnswer.error)

  if (dataAnswer.answer) {
    addMessage({
      id: messages.value.length + 1,
      text: dataAnswer.answer,
      sender: {
        name: 'Суфлёр Wikibot',
        id: 0,
      },
    })
  } else {
    addMessage({
      id: messages.value.length + 1,
      text: 'Стрекочут кузнечики...',
      sender: {
        name: 'Суфлёр Wikibot',
        id: 0,
      },
    })
  }
}

function setLoading(flag) {
  loadingAnswer.value = flag
}

function addMessage(message) {
  if (!message.text) throw new Error('Введите сообщение.')
  messages.value = [...messages.value, message]
}
</script>

<template>
  <TicketDetail />
</template>

<style>
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
