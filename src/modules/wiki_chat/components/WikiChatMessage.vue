<script setup>
import { getCurrentUser } from '../utils/user.js'

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
</script>

<template>
  <div
    class="ticket-conversation__message-block message"
    :style="{ 'align-self': isMyMessage ? '' : 'flex-end' }"
  >
    <div class="message_info">
      <div
        class="ticket-conversation__message-meta ticket-conversation__message-meta_staff"
        style="
          color: var(--el-color-primary);
          font-weight: 700;
          font-size: 18px;
        "
      >
        {{ props.message.sender.name }}
      </div>
      <div
        class="ticket-conversation__message-text ticket-conversation__message-text_post-own"
      >
        <div class="ticket-conversation__message-html">
          <p>{{ props.message.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message {
  letter-spacing: 1px;
  word-spacing: 2px;
  margin: 20px 10px;
  width: 85%;
  border: 2px dashed #77cadd;
  box-shadow: 0px 0px 5px 1px rgb(119, 202, 221, 0.5);
}

.message_info {
  margin: 0 4%;
}

.ticket-conversation__message-html {
}
</style>
