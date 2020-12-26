import Vue from 'vue'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/router.js'

import 'normalize.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

// Globally register the computed variable to obtain the layout status
Vue.mixin({
  computed: {
    isMobile: function () {
      console.log(this.$vuetify)
      const desktop = this.$vuetify.breakpoint.md || this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl
      return !desktop
    }
  }
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#mountTarget')
