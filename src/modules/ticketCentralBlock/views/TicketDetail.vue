<script setup>
import TicketConversationTitleBlock from '../blocks/TicketConversationTitleBlock.vue'
import TicketConversationMessagesBlock from '../blocks/TicketConversationMessagesBlock.vue'
import TicketEditor from '../blocks/TicketEditor.vue'
import { provide, ref } from 'vue'
import HDE from '../../../plugin'

const ticketValues = ref(HDE.getState().ticketValues)

HDE.watch('ticketValues', (to) => {
  ticketValues.value = to
})

provide('ticketValues', ticketValues)
</script>

<template>
  <div id="ticket-app">
    <div class="ticket">
      <div class="ticket_detail">
        <TicketConversationTitleBlock />
        <TicketConversationMessagesBlock />
        <TicketEditor />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ticket_detail {
  height: 100%;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #f4f4f5;
}
</style>
