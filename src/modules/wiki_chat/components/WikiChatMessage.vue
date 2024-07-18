<script setup>
import { getCurrentUser } from '../utils/user.js'
import linkifyHtml from 'linkify-html'
import { onMounted, ref } from 'vue'
import { DocumentCopy } from '@element-plus/icons-vue'

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
  scroll: {
    type: Boolean,
  },
})

const currentUser = getCurrentUser()
const isMyMessage = currentUser.id === props.message.sender.id

const activeCopy = ref(false)
const message = ref()

const options = {
  target: '_blank',
}
const linkifyText = linkifyHtml(props.message.text, options)

onMounted(() => {
  message.value.scrollIntoView()
})

function showCopyMessage() {
  activeCopy.value = true
}

function hiddenCopyMessage() {
  activeCopy.value = false
}

function copy() {
  navigator.clipboard.writeText(linkifyText)
}
</script>

<template>
  <div
    ref="message"
    class="ticket-conversation__message-block message"
    :style="{ 'align-self': isMyMessage ? '' : 'flex-end' }"
    @mouseover="showCopyMessage"
    @mouseleave="hiddenCopyMessage"
  >
    <el-icon
      style="float: right; padding: 0 5px; cursor: pointer"
      :style="{ visibility: activeCopy ? 'visible' : 'hidden' }"
      @click="copy"
      ><DocumentCopy
    /></el-icon>
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
