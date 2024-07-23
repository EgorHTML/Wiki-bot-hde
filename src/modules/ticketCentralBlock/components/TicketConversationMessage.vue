<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: {
    required: true,
    type: Object,
    default() {
      return {
        user: {
          id: 1,
          name: 'Егор',
          imageUrl: '',
          type: 'staff',
        },
        content: 'text',
      }
    },
  },
})

const user = computed(() => props.message.user)

function parseCalendarNumber(num) {
  return num < 10 && !isNaN(num) ? '0' + num : num
}

function getDateMessage() {
  const date = new Date()
  const minutes = parseCalendarNumber(date.getMinutes())
  const hours = parseCalendarNumber(date.getHours())
  const fullYear = parseCalendarNumber(date.getFullYear())
  const month = parseCalendarNumber(date.getMonth() + 1)
  const day = parseCalendarNumber(date.getDate())
  return `${day}.${month}.${fullYear} ${hours}:${minutes}`
}
</script>

<template>
  <div
    class="ticket-conversation__message"
    :class="`ticket-conversation__message_${user.type}`"
  >
    <div class="ticket-conversation__message-user-block">
      <div
        class="ticket-conversation__message-image"
        :class="`ticket-conversation__message-image_${user.type}`"
        style="
          background-image: url('/ru/file/image/33_2022$1feb2716da46370167f6e94f7f9b7fa880f19533/height/60');
          cursor: pointer;
        "
      ></div>
    </div>
    <div class="ticket-conversation__message-block">
      <div
        class="ticket-conversation__message-meta"
        :class="`ticket-conversation__message-meta_${user.type}`"
      >
        <span class="el-tooltip" tabindex="0"
          ><span class="hde-question"></span> {{ user.name }}
          {{ getDateMessage() }}
        </span>
      </div>
      <div
        class="ticket-conversation__message-text"
        :class="`ticket-conversation__message-text_${user.type}`"
      >
        <div
          class="ticket-conversation__message-html"
          v-html="props.message.content"
        ></div>
      </div>
    </div>
  </div>
</template>
