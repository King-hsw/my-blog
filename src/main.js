import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
// 自定义svg全局组件
import "@/assets/icons";



createApp(App)
    .use(store)
    .use(router)
    .use(elementPlus)
    .mount(`#app`)
