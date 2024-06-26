import { createApp } from 'vue'
import App from './App.vue'
import HDE from './plugin'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

HDE.on('ready', async () => {
  let { plugin } = HDE.getState()
  plugin.showButton = true
  HDE.emit('setPlugin', plugin)

  const app = createApp(App)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.use(ElementPlus)
  app.mount('#app')
})
