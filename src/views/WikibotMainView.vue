<template>
  <div class="container" style="height: 100%">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="Wiki Chat" name="chat" class="chat_container">
      </el-tab-pane>
      <el-tab-pane label="Other..." name="Other"></el-tab-pane>
    </el-tabs>
    <div class="chat_container">
      <WikiChat />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import WikiChat from '../modules/wiki_chat/views/WikiChat.vue'

const activeName = ref('chat')
</script>

<style>
.el-tabs__item.is-top {
  font-size: 20px;
  font-weight: 700;
}

.container {
  display: flex;
  flex-direction: column;
  background-color: rgb(214, 210, 253);
}

.chat_container {
  height: 100%;
  overflow: hidden;
}
</style>
