<script setup>
import TicketConversationTitleBlock from '../blocks/TicketConversationTitleBlock.vue'
import TicketConversationMessagesBlock from '../blocks/TicketConversationMessagesBlock.vue'
import TicketEditor from '../blocks/TicketEditor.vue'
import { provide, ref } from 'vue'
import HDE from '../../../plugin'
import { getCurrentUser } from '../../wiki_chat/utils/user'
import asc from '../../../services/wikibot/asc'
import linkifyHtml from 'linkify-html'

const ticketValues = ref(HDE.getState().ticketValues)

HDE.watch('ticketValues', (to) => {
  ticketValues.value = to
})

const messages = ref([])
const currentUser = getCurrentUser()
const loadingAnswer = ref(false)

provide('ticketValues', ticketValues)

async function submit(textarea) {
  try {
    addMessage({
      id: messages.value.length + 1,
      content: textarea,
      user: {
        name: currentUser.name,
        id: currentUser.id,
        imageUrl: '',
        type: 'staff',
      },
    })
    setLoading(true)
    await getAnswer(textarea)
    setLoading(false)
  } catch (error) {
    addMessage({
      id: messages.value.length + 1,
      content: error.message,
      user: {
        name: 'Суфлёр Wikibot',
        id: 0,
        imageUrl: '',
        type: 'user',
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
      content: dataAnswer.answer,
      user: {
        name: 'Суфлёр Wikibot',
        id: 0,
        imageUrl: '',
        type: 'user',
      },
    })
  } else {
    addMessage({
      id: messages.value.length + 1,
      content: '<p>Стрекочут кузнечики...</p>',
      sender: {
        name: 'Суфлёр Wikibot',
        id: 0,
        imageUrl: '',
        type: 'user',
      },
    })
  }
}

function setLoading(flag) {
  loadingAnswer.value = flag
}

function addMessage(message) {
  if (!message.content) throw new Error('Введите сообщение.')
  const options = {
    target: '_blank',
  }
  const linkifyText = linkifyHtml(message.content, options)
  message.content = linkifyText
  messages.value = [...messages.value, message]
}
</script>

<template>
  <div id="ticket-app">
    <div class="ticket">
      <div class="ticket_detail">
        <TicketConversationTitleBlock />
        <TicketConversationMessagesBlock :messages="messages" />
        <TicketEditor @submit="submit" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ticket_detail {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #f4f4f5;
}
</style>
