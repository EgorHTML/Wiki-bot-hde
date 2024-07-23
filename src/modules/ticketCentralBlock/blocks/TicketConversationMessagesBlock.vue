<script setup>
import TicketConversationMessage from '../components/TicketConversationMessage.vue'

const prop = {
  imageUrl: '',
  name: 'User',
  content: '<p>Привет !</p>',
  type: 'user',
}
</script>

<template>
  <div class="ticket-conversation">
    <TicketConversationMessage :message="prop" />
  </div>
</template>
