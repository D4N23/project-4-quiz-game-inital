import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.vue'

createApp(App)
.use(VueAxios, axios)
.mount('#app')


