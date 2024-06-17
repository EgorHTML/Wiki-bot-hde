<template>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="Wiki Chat" name="chat">
      <WikiChat />
    </el-tab-pane>
    <el-tab-pane label="Other..." name="Other">Other...</el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import WikiChat from '../modules/wiki_chat/views/WikiChat.vue'

const activeName = ref('chat')
</script>

<style>
.el-tabs__item.is-top {
  font-size: 20px;
  font-weight: 700;
}
</style>
