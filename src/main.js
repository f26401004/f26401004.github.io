import Vue from 'vue'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/router.js'

import 'normalize.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#mountTarget')
