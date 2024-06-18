<script setup>
import WikibotMainView from './views/WikibotMainView.vue'
</script>

<template>
  <WikibotMainView />
</template>

<style lang="scss">
#app {
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
  list-style: none;
}

html.dark {
  /* custom dark bg color */
  --el-bg-color: #626aef;
}
</style>
