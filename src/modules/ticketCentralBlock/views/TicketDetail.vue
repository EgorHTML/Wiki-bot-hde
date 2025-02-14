<!-- eslint-disable no-unused-vars -->
<script setup>
import TicketConversationTitleBlock from '../blocks/TicketConversationTitleBlock.vue'
import TicketConversationMessagesBlock from '../blocks/TicketConversationMessagesBlock.vue'
import TicketEditor from '../blocks/TicketEditor.vue'
import LoadingBlock from '../blocks/LoadingBlock.vue'
import { provide, ref, watchEffect } from 'vue'
import HDE from '../../../plugin'
import { getCurrentUser } from '../../../utils/user.js'
import { getRandomHexadecimal } from '../../../utils/random.js'
import linkifyHtml from 'linkify-html'
import Wikibot from '../../../services/wikibot/WikiBotService.js'
import { useQueue } from '../../../utils/Queue.js'

const ticketValues = ref(HDE.getState().ticketValues)
const botName = 'Суфлёр Wikibot'
const botImageUrl = import.meta.env.VITE_BOT_IMAGE_URL

HDE.watch('ticketValues', (to) => {
  ticketValues.value = to
})

const messages = ref([])
const currentUser = getCurrentUser()
const loadingAnswer = ref(false)
const queue = useQueue()

watchEffect(() => {
  setLoading(!queue.isEmpty())
  queue.execute()
})

provide('ticketValues', ticketValues)

async function submit(textarea) {
  try {
    addMessage({
      id: messages.value.length + 1,
      content: textarea,
      user: {
        name: currentUser.name,
        id: currentUser.id,
        imageUrl: currentUser.image,
        type: 'staff',
      },
    })
    queue.enqueue(getAnswer.bind(null, textarea))
    // await getAnswer(textarea)
  } catch (error) {
    addMessage({
      id: messages.value.length + 1,
      content: error.message,
      user: {
        name: botName,
        id: 0,
        imageUrl: botImageUrl,
        type: 'user',
      },
    })
  }
}

async function getAnswer(textarea) {
  const ticketId = String(HDE.getState().ticketId)
  const messageId = String(messages.value.length + 1)
  const randomHEX = getRandomHexadecimal()

  const requestId = ticketId + messageId + randomHEX

  const dataAsc = (await Wikibot.asc(textarea, ticketId, requestId))?.data

  if (typeof dataAsc === 'object' && 'error' in dataAsc)
    throw new Error(dataAsc.error)

  await Wikibot.getAnswerAsync(requestId)
    .then((answer) => {
      addMessage({
        id: messageId,
        content: answer,
        user: {
          name: botName,
          id: 0,
          imageUrl: botImageUrl,
          type: 'user',
        },
      })
    })
    .catch((error) => {
      addMessage({
        id: messageId,
        content: error,
        user: {
          name: botName,
          id: 0,
          imageUrl: botImageUrl,
          type: 'user',
        },
      })
    })
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
        <LoadingBlock v-if="loadingAnswer" />
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
