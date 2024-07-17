<script setup>
import { getCurrentUser } from '../utils/user.js'
import linkifyHtml from 'linkify-html'

const props = defineProps({
  message: {
    type: Object,
    required: true,
    default: () => {
      return {
        id: 0,
        text: 'system',
        sender: {
          id: 0,
          name: 'Bot',
        },
      }
    },
  },
})

const currentUser = getCurrentUser()

const isMyMessage = currentUser.id === props.message.sender.id

const options = {
  target: '_blank',
}
const linkifyText = linkifyHtml(props.message.text, options)
</script>

<template>
  <div
    class="ticket-conversation__message-block message"
    :style="{ 'align-self': isMyMessage ? '' : 'flex-end' }"
  >
    <div class="message_info">
      <div
        class="ticket-conversation__message-meta ticket-conversation__message-meta_staff"
      >
        {{ props.message.sender.name }}
      </div>
      <div
        class="ticket-conversation__message-text ticket-conversation__message-text_post-own"
      >
        <div
          class="ticket-conversation__message-html"
          v-html="linkifyText"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ticket-conversation__message-meta_staff {
  color: #294ddb;
  font-weight: 700;
  font-size: 18px;
}
.message {
  letter-spacing: 1px;
  word-spacing: 2px;
  margin: 20px 10px;
  width: 85%;
  border: 2px dashed #77cadd;
  box-shadow: 0px 5px 10px 0px rgb(5, 39, 178, 0.4);
  border-radius: 5px;
  color: #fff;
  padding: 7px 0;
  background-color: #1795b1;
}

.message_info {
  margin: 0 4%;
}
</style>
