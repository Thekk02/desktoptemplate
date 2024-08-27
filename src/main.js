import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/router";
//import request from "@/utils/request";
import 'element-plus/dist/index.css'
import ElementPlus from "element-plus";
import './style/global.css'

createApp(App).use(router).use(ElementPlus).mount('#app')

