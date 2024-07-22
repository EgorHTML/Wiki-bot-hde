<script setup>
import TicketConversationMessage from '../components/TicketConversationMessage.vue'

const prop = {
  imageUrl: '',
  name: 'User',
  content: '<p>Привет !</p>',
  type: 'staff',
}
</script>

<template>
  <div style="flex: 1 1">
    <TicketConversationMessage :message="prop" />
  </div>
</template>
