<script setup>
import { computed, inject } from 'vue'

const ticketValues = inject('ticketValues')
console.log(ticketValues.value)
const title = computed(() => ticketValues.value.title)
const uniqueId = computed(() => ticketValues.value.uniqueId)
const createdAt = computed(() => ticketValues.value.createdAt)
</script>

<template>
  <div class="ticket-detail__title">
    <div class="ticket-detail__unique-id">
      <strong>#{{ uniqueId }}</strong> от {{ createdAt }}
    </div>
    <h1><i class="hde-ticket"></i> {{ title }}</h1>
  </div>
</template>

<style>
.ticket-detail__title {
  font-weight: normal;
  color: #606266;
  border-bottom: 1px solid #c5c9d3;
  margin: 10px 5px 0 5px;
}
</style>
