<script setup>
import { computed } from 'vue'
import TicketConversationMessage from '../components/TicketConversationMessage.vue'

const props = defineProps({
  messages: {
    required: false,
    default() {
      return []
    },
    type: Array,
  },
})

const messages = computed(() => props.messages)
</script>

<template>
  <div class="ticket-conversation">
    <TicketConversationMessage
      v-for="message in messages"
      :key="message.id"
      :message="message"
    />
  </div>
</template>
