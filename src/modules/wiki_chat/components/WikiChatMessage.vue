<script setup>
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
</script>

<template>
  <div class="ticket-conversation__message-block message">
    <div
      class="ticket-conversation__message-meta ticket-conversation__message-meta_staff"
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
</template>

<style scoped>
.message {
  margin-bottom: 10px;
}
</style>
