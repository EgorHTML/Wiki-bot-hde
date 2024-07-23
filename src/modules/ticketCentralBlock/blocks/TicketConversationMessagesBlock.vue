<script setup>
import TicketConversationMessage from '../components/TicketConversationMessage.vue'

const prop = {
  user: {
    id: 1,
    name: 'Егор',
    imageUrl: '',
    type: 'staff',
  },
  content: '<p>Привет !<p>',
}
</script>

<template>
  <div class="ticket-conversation">
    <TicketConversationMessage :message="prop" />
  </div>
</template>
