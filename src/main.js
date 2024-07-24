import { createApp } from 'vue'
import App from './App.vue'
import HDE from './plugin'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import CKEditor from '@ckeditor/ckeditor5-vue'
import '@ckeditor/ckeditor5-theme-lark/dist/index.css'

HDE.on('ready', async () => {
  const state = HDE.getState()
  let { plugin } = state
  plugin.showButton = true
  HDE.emit('setPlugin', plugin)
  const app = createApp(App)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  document.head.innerHTML += window.parent.document.head.innerHTML

  app.use(ElementPlus)
  app.use(CKEditor)
  app.mount('#app')
})
