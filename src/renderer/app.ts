import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import App from './components/App' // tslint:disable-line

Vue.use(Vuetify)

new Vue(App).$mount('#app')
